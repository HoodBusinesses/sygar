import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { OrganizationRepository } from '../organization/organization.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoles } from './model/user.model';
import { AbilityService } from '../ability/abiliry.service';
import { NotificationService } from 'src/global/notifactions/notifications.service';
import { NotificationsGateway } from 'src/global/notifactions/notifications.gateway';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/global/mail/mail.service';

/**
 * @class UserService
 * @description
 * This class is responsible for managing users.
 */
@Injectable()
export class UserService {
  /**
   * @constructor
   * @description
   * This constructor is used to inject the user repository, organization repository, and ability service.
   */
  constructor(
    private readonly userRepository: UserRepository, // Inject the user repository for database operations
    private readonly organizationRepository: OrganizationRepository, // Inject the organization repository for database operations
    private readonly abilityService: AbilityService, // Inject the ability service for ability operations
    private readonly notificationService: NotificationService,
    private readonly notificationGetWay: NotificationsGateway,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) {}

  /**
   * @method create
   * @description
   * This method is used to create a new user.
   */
  async create(user: CreateUserDto, creatorUid: string) {
    // check if the user already exists
    let userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      throw new Error('alreadyExistsWithThisEmail');
    }

    // check if the user already exists with the provided CNSS
    userExists = await this.userRepository.findByCnss(user.cnss);

    if (userExists) {
      throw new Error('alreadyExistsWithThisCNSS');
    }

    // check if the organization exists
    if (user.role === UserRoles.ORG_ADMIN || user.role === UserRoles.ORG_USER) {
      const organization = await this.organizationRepository.findByCnss(
        user.organizationId
      );

      if (!organization) {
        throw new Error('orgnNotFoundWithThisOrgId');
      }

      // check if the organization is has an admin
      if (user.role === UserRoles.ORG_ADMIN) {
        const organizationAdmin =
          await this.userRepository.findByOrganizationId(user.organizationId);

        if (
          organizationAdmin.length > 0 &&
          organizationAdmin.some((u) => u.role === UserRoles.ORG_ADMIN)
        ) {
          throw new Error('orgnAlreadyHasAdmin');
        }
      }
    }
    const newUser = await this.userRepository.create(user);

    await this.notificationService.createNotification(
      creatorUid,
      `User ${newUser.email} has been created.`
    );

    this.notificationGetWay.server.emit('notification', {
      userUid: creatorUid,
      message: `User ${newUser.email} has been created.`,
    });

    await this.requestActiveAccount(newUser.email);
    return newUser;
  }

  async requestActiveAccount(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('userNotFound');
    }

    const token = uuid();
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

    // set the reset password token for the user
    await this.setResetPasswordToken(user.uid, token, expiresAt);

    // generate the activation link
    const activationLink = `${this.configService.getOrThrow('APP_URL')}/activate-account?token=${token}`;

    // Load the activation account template
    const activationAccountTemplate =
      await this.mailService.getTemplate('activationAccount');

    // Replace the placeholders with the actual values
    let html = activationAccountTemplate.replace(
      '{{resetLink}}',
      activationLink
    );
    html = html.replace(
      '{{organizationName}}',
      (await this.organizationRepository.findByCnss(user.organizationId)).name
    );
    html = html.replace('{{username}}', `${user.firstName} ${user.lastName}`);

    // send the activation email
    const mailOptions = {
      from: this.configService.getOrThrow('MAILER_FROM_ADDRESS'), // from address
      to: user.email, // to address
      subject: 'Activate your account', // subject
      html: html,
    };

    try {
      await this.mailService.sendEmail(mailOptions);
    } catch (error: any) {
      await this.setResetPasswordToken(user.uid, null, null);
      return { error: error.message };
    }
  }

  /**
   * @method update
   * @description
   * This method is used to update a user.
   */
  async update(user: UpdateUserDto) {
    // Check if the user exists
    const existingUser = await this.userRepository.findByUid(user.uid);

    if (!existingUser) {
      throw new Error('userNotFound');
    }
    if (
      user.cnss &&
      user.cnss !== existingUser.cnss &&
      (await this.userRepository.findByCnss(user.cnss))
    ) {
      throw new Error('alreadyExistsWithThisCNSS');
    }
    if (
      user.email &&
      user.email !== existingUser.email &&
      (await this.userRepository.findByEmail(user.email))
    ) {
      throw new Error('alreadyExistsWithThisEmail');
    }
    return await this.userRepository.update(user);
  }

  /**
   * @method delete
   * @description
   * This method is used to delete a user.
   */
  async delete(email: string) {
    // Check if the user exists
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      throw new Error('userNotFound');
    }

    try {
      await this.abilityService.eraseAbilities(existingUser.uid);
      return await this.userRepository.delete(email);
    } catch (error: any) {
      return { error: error.message };
    }
  }

  /**
   * @method get
   * @description
   * This method is used to get a user by uid.
   */
  async get(uid: string) {
    // Check if the user exists
    const existingUser = await this.userRepository.findByUid(uid);

    if (!existingUser) {
      throw new Error('User does not exist');
    }

    const { password, ...userWithOutPassword } = existingUser;

    return userWithOutPassword;
  }

  /**
   * @method getByEmail
   * @description
   * This method is used to get a user by email.
   */
  async getByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return await this.userRepository.findByEmail(email);
  }

  /**
   * @method eraseAllUsersInOrganization
   * @description
   * This method is used to erase all users in an organization.
   */
  async eraseAllUsersInOrganization(organizationId: string) {
    const users =
      await this.userRepository.findByOrganizationId(organizationId);

    for (const user of users) {
      await this.delete(user.email);
    }

    return { message: 'Users deleted successfully' };
  }

  /**
   * @method setResetPasswordToken
   * @description
   * This method is used to set the reset password token for a user.
   */
  async setResetPasswordToken(
    uid: string,
    token: string | null,
    expiresAt: number | null
  ) {
    const user = await this.userRepository.findByUid(uid);

    if (!user) {
      throw new Error('User does not exist');
    }

    return await this.userRepository.update({
      uid,
      resetPasswordToken: token ?? null,
      resetPasswordTokenExpiresAt: expiresAt ? expiresAt.toString() : null,
    });
  }

  /**
   * @method getByResetPasswordToken
   * @description
   * This method is used to get a user by reset password token.
   */
  async getByResetPasswordToken(token: string) {
    return await this.userRepository.findByResetPasswordToken(token);
  }

  /**
   * @method updatePassword
   * @description
   * This method is used to update the password for a user.
   */
  async updatePassword(uid: string, password: string) {
    // Update the password for the user
    return await this.userRepository.update({
      uid,
      password,
      passwordUpdatedAt: Date.now(),
    });
  }

  /**
   * @method activateTheUser
   * @description
   * This method is used to activate the user.
   */
  async activateTheUser(uid: string) {
    return await this.userRepository.update({
      uid,
      isActive: true,
    });
  }
}
