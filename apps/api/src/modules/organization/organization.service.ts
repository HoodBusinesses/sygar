import { Injectable } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { AnimatorRepository, AssigningGroupRepository, FormatorRepository, GroupRepository, OrganizationRepository, ParticipantRepository, ThemeRepository } from "./organization.repository";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { UserService } from "../user/user.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { CreateAnimatorDto } from "./dto/create-animator.dto";
import { UpdateAnimatorDto } from "./dto/update-animator.dto";
import { Animator } from "./model/animator.model";
import { Formator } from "./model/formator.model";
import { CreateFormatorDto } from "./dto/create-formator.dto";
import { UpdateFormatorDto } from "./dto/update-formator.dto";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { Participant } from "./model/participant.model";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { EnrolledType } from "./model/group.model";
import { AssignToGroupDto } from "./dto/assign-group.dto";

/**
 * @class OrganizationService
 * @description
 * This service class is responsible for managing organizations in the application.
 * It provides methods to create, retrieve, update, and delete organizations.
 * 
 * @remarks
 * The service uses the OrganizationRepository to interact with the database.
 */
@Injectable()
export class OrganizationService {
	/**
	 * Constructor for the OrganizationService class.
	 * 
	 * @param organizationRepository - The repository for organization data.
	 * @param userService - The service for user management.
	 */
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly userService: UserService,
	) {}

	/**
	 * Create a new organization.
	 * 
	 * @param createOrganizationDto - The data for creating the organization.
	 * @returns The created organization.
	 * @throws {Error} If the organization already exists.
	 */
	async create(createOrganizationDto: CreateOrganizationDto) {
		// check if the organization already exists
		const organization = await this.organizationRepository.findByCnss(createOrganizationDto.cnss);

		// Throw an error if the organization already exists
		if (organization) {
			throw new Error('organizationExists');
		}

		// Create the organization
		const createdOrganization = await this.organizationRepository.create(createOrganizationDto);
		
		// Return the created organization
		return createdOrganization;
	}

	/**
	 * Get an organization by CNSS.
	 * 
	 * @param cnss - The CNSS of the organization to retrieve.
	 * @returns The organization found.
	 * @throws {Error} If the organization does not exist.
	 */
	async get(cnss: string) {
		// Find the organization by CNSS
		const organization = await this.organizationRepository.findByCnss(cnss);
		
		// Throw an error if the organization does not exist
		if (!organization) {
			throw new Error('organizationDoesntExists');
		}
		
		// Return the organization found
		return organization;
	}

	/**
	 * Update an organization by CNSS.
	 * 
	 * @param cnss - The CNSS of the organization to update.
	 * @param updateOrganizationDto - The data for updating the organization.
	 * @returns The updated organization.
	 * @throws {Error} If the organization does not exist.
	 */
	async update(cnss: string, updateOrganizationDto: UpdateOrganizationDto) {
		return await this.organizationRepository.updateOrganization(cnss, updateOrganizationDto);
	}

	/**
	 * Delete an organization by CNSS.
	 * 
	 * @param cnss - The CNSS of the organization to delete.
	 * @returns The deleted organization.
	 * @throws {Error} If the organization does not exist.
	 */
	async delete(cnss: string) {
		// Throw an error if the CNSS is not provided
		if (!cnss) {
			throw new Error('cnssRequired');
		}
		
		// Find the organization by CNSS
		const organization = await this.organizationRepository.findByCnss(cnss);
		
		// Throw an error if the organization does not exist
		if (!organization) {
			throw new Error('organizationDoesntExists');
		}

		// Erase all users in the organization
		await this.userService.eraseAllUsersInOrganization(organization.cnss);

		// Delete the organization
		return await this.organizationRepository.deleteOrganization(cnss);
	}
}

@Injectable()
export class ThemeService {
	constructor(
		private readonly themeRepository: ThemeRepository,
		private readonly organizationRepository: OrganizationRepository,
	) {}
	/**
	 * Create a new theme.
	 * 
	 * @param createThemeDto - The data for creating the theme.
	 * @returns The created theme.
	 */
	async createTheme(createThemeDto: CreateThemeDto) {
		if (createThemeDto.startDate > createThemeDto.endDate) {
			throw new Error('invalidDates');
		}

		// Find the organization by organizationId
		const organization = await this.organizationRepository.findByCnss(createThemeDto.organizationId);

		// Throw an error if the organization does not exist
		if (!organization) {
			throw new Error('organizationDoesntExists');
		}

		// Create the theme
		return await this.themeRepository.createTheme(createThemeDto);
	}

	/**
	 * Get a theme by UID.
	 * 
	 * @param uid - The UID of the theme to retrieve.
	 * @returns The theme found.
	 */
	async getTheme(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}

		const theme = await this.themeRepository.findThemeByUid(uid);		

		if (!theme) {
			throw new Error('themeDoesntExists');
		}

		return theme;
	}

	/**
	 * Update a theme by UID.
	 * 
	 * @param uid - The UID of the theme to update.
	 * @param updateThemeDto - The data for updating the theme.
	 * @returns The updated theme.
	 */
	async updateTheme(uid: string, updateThemeDto: UpdateThemeDto) {
		const theme = await this.themeRepository.findThemeByUid(uid);

		if (!theme) {
			throw new Error('themeDoesntExists');
		}

		if (updateThemeDto.startDate && !updateThemeDto.endDate && updateThemeDto.startDate > theme.endDate) {
			throw new Error('invalidDates');
		}
		else if (updateThemeDto.endDate && !updateThemeDto.startDate && updateThemeDto.endDate < theme.startDate) {
			throw new Error('invalidDates');
		}
		else if (updateThemeDto.startDate && updateThemeDto.endDate && updateThemeDto.startDate > updateThemeDto.endDate) {
			throw new Error('invalidDates');
		}

		return await this.themeRepository.updateTheme(uid, updateThemeDto);
	}

	/**
	 * Delete a theme by UID.
	 * 
	 * @param uid - The UID of the theme to delete.
	 * @returns The deleted theme.
	 */
	async deleteTheme(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}

		const theme = await this.themeRepository.findThemeByUid(uid);

		if (!theme) {
			throw new Error('themeDoesntExists');
		}

		return await this.themeRepository.deleteTheme(uid);
	}
}

@Injectable()
export class GroupService {

	/**
	 * Constructor for the GroupService class.
	 * 
	 * @param groupRepository - The repository for group data.
	 * @param themeRepository - The repository for theme data.
	 */
	constructor(
		private readonly groupRepository: GroupRepository,
		private readonly themeRepository: ThemeRepository,
	) {}

	/**
	 * Create a new group.
	 * 
	 * @param createGroupDto - The data for creating the group.
	 * @returns The created group.
	 */
	async createGroup(createGroupDto: CreateGroupDto) {
		// check if the theme exists
		const theme = await this.themeRepository.findThemeByUid(createGroupDto.themeId);
		if (!theme) {
			throw new Error('themeDoesntExists');
		}

		if (createGroupDto.startDate > createGroupDto.endDate) {
			throw new Error('invalidDates');
		}

		if (createGroupDto.startDate < theme.startDate || createGroupDto.endDate > theme.endDate) {
			throw new Error('invalidDates');
		}

		return await this.groupRepository.createGroup(createGroupDto);
	}

	/**
	 * Get a group by UID.
	 * 
	 * @param uid - The UID of the group to retrieve.
	 * @returns The group found.
	 */
	async getGroup(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}

		const group = await this.groupRepository.getByUid(uid);

		if (!group) {
			throw new Error('groupDoesntExists');
		}

		return group;
	}

	/**
	 * Update a group by UID.
	 * 
	 * @param uid - The UID of the group to update.
	 * @param updateGroupDto - The data for updating the group.
	 * @returns The updated group.
	 */
	async updateGroup(uid: string, updateGroupDto: UpdateGroupDto) {
		const group = await this.groupRepository.getByUid(uid);

		if (!group) {
			throw new Error('groupDoesntExists');
		}

		return await this.groupRepository.updateGroup(uid, updateGroupDto);
	}

	/**
	 * Delete a group by UID.
	 * 
	 * @param uid - The UID of the group to delete.
	 * @returns The deleted group.
	 */
	async deleteGroup(uid: string) {
		const group = await this.groupRepository.getByUid(uid);

		if (!group) {
			throw new Error('groupDoesntExists');
		}

		return await this.groupRepository.deleteGroup(uid);
	}
}

/**
 * @class AnimatorService
 * @remarks
 * The service uses the AnimatorRepository to interact with the database.
 */
@Injectable()
export class AnimatorService {
	/**
	 * Constructor for the AnimatorService class.
	 * 
	 * @param animatorRepository - The repository for animator data.
	 * @param organizationRepository - The repository for organization data.
	 */
	constructor(
		private readonly animatorRepository: AnimatorRepository,
		private readonly organizationRepository: OrganizationRepository,
	) {}

	/**
	 * Create a new animator.
	 * 
	 * @param createAnimatorDto - The data for creating the animator.
	 * @returns The created animator.
	 */
	async createAnimator(createAnimatorDto: CreateAnimatorDto) {
		// check if the organization exists
		const organization = await this.organizationRepository.findByCnss(createAnimatorDto.organizationId);
		if (!organization) {
			throw new Error('organizationDoesntExists');
		}

		// check if the animator already exists
		const animator = await this.animatorRepository.getByEmail(createAnimatorDto.email);

		if (animator) {
			throw new Error('animatorAlreadyExists');
		}

		// create the animator
		return await this.animatorRepository.createAnimator(createAnimatorDto);
	}

	/**
	 * Get an animator by UID.
	 * 
	 * @param uid - The UID of the animator to retrieve.
	 * @returns The animator found.
	 */
	async getAnimator(uid: string): Promise<Animator> {
		if (!uid)
			throw new Error('uidRequired');
		const animator: Animator | null = await this.animatorRepository.getByUid(uid);
		if (!animator)
			throw new Error('There is no animator with the uid being given!');
		return animator;
	}

	/**
	 * Update an animator by UID.
	 * 
	 * @param updateAnimatorDto - The data for updating the animator.
	 * @param uid - The UID of the animator to update.
	 * @returns The updated animator.
	 */
	async updateAnimator(updateAnimatorDto: UpdateAnimatorDto, uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}
		// check if the animator exists
		const animator = await this.animatorRepository.getByUid(uid);
		if (!animator) {
			throw new Error('animatorDoesntExists');
		}

		if (updateAnimatorDto.email && updateAnimatorDto.email !== animator.email) {
			const animatorByEmail = await this.animatorRepository.getByEmail(updateAnimatorDto.email);
			if (animatorByEmail) {
				throw new Error('emailAlreadyExists');
			}
		}

		return await this.animatorRepository.updateAnimator(updateAnimatorDto, uid);
		
	}

	/**
	 * Delete an animator by UID.
	 * 
	 * @param uid - The UID of the animator to delete.
	 * @returns The deleted animator.
	 */
	async deleteAnimator(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}

		const animator = await this.animatorRepository.getByUid(uid);
		if (!animator) {
			throw new Error('animatorDoesntExists');
		}

		return await this.animatorRepository.deleteAnimator(uid);
	}
}

@Injectable()
export class AssigningGroupService {

	/**
	 * Constructor for the AssigningGroupService class.
	 * 
	 * @param assigningGroupRepository - The repository for assigning group data.
	 * @param groupRepository - The repository for group data.
	 * @param animatorRepository - The repository for animator data.
	 * @param formatorRepository - The repository for formator data.
	 * @param participantRepository - The repository for participant data.
	 */
	constructor(
		private readonly assigningGroupRepository: AssigningGroupRepository,
		private readonly groupRepository: GroupRepository,
		private readonly animatorRepository: AnimatorRepository,
		private readonly formatorRepository: FormatorRepository,
		private readonly participantRepository: ParticipantRepository,
	) {}

	/**
	 * Check if the dates are overlapping.
	 * 
	 * @param enrolledUid - The UID of the enrolled.
	 * @param enrolledType - The type of the enrolled.
	 * @param groupUid - The UID of the group.
	 * @returns True if the dates are not overlapping, false otherwise.
	 */
	async checkOverlappingDates(assignToGroupDto: AssignToGroupDto): Promise<boolean> {
		const enrolledGroups = await this.getByEnrolleds(assignToGroupDto.enrolledUid, assignToGroupDto.enrolledType);
		if (enrolledGroups.length === 0) return false;

		const group = await this.groupRepository.getByUid(assignToGroupDto.groupUid);

		if (!group) {
			throw new Error('groupDoesntExists');
		}
		// check if the dates are overlapping
		for (const enrolledGroup of enrolledGroups) {
			// check if the start date is before the end date of the group and the end date is after the start date of the group
			if (enrolledGroup.startDate < group.endDate && enrolledGroup.endDate > group.startDate) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Create a new assigning group.
	 * 
	 * @param assignToGroupDto - The data for creating the assigning group.
	 * @returns The created assigning group.
	 */
	async createAssigningGroup(assignToGroupDto: AssignToGroupDto) {
		// check if the enrolled exists
		switch (assignToGroupDto.enrolledType) {
			case EnrolledType.Animator:
				const animator = await this.animatorRepository.getByUid(assignToGroupDto.enrolledUid);
				if (!animator) {
					throw new Error('animatorDoesntExists');
				}
				break;
			case EnrolledType.Formator:
				const formator = await this.formatorRepository.getByUid(assignToGroupDto.enrolledUid);
				if (!formator) {
					throw new Error('formatorDoesntExists');
				}
				break;
			case EnrolledType.Participant:
				const participant = await this.participantRepository.getByUid(assignToGroupDto.enrolledUid);
				if (!participant) {
					throw new Error('participantDoesntExists');
				}
				break;
		}
		// check if the group exists
		const group = await this.groupRepository.getByUid(assignToGroupDto.groupUid);
		if (!group) {
			throw new Error('groupDoesntExists');
		}

		// check if the dates are overlapping
		const isOverlapping = await this.checkOverlappingDates(assignToGroupDto);

		if (isOverlapping) {
			throw new Error('overlappingDates');
		}

		return await this.assigningGroupRepository.createAssigningGroup(assignToGroupDto);
	}

	/**
	 * Get an assigning group by UID.
	 * 
	 * @param uid - The UID of the assigning group to retrieve.
	 * @returns The assigning group found.
	 */
	async getByUid(uid: string) {
		const assigningGroup = await this.assigningGroupRepository.getByUid(uid);
		if (!assigningGroup) {
			throw new Error('assigningGroupDoesntExists');
		}
		return assigningGroup;
	}

	/**
	 * Get an assigning group by enrolled UID.
	 * 
	 * @param enrolledUid - The UID of the enrolled.
	 * @param enrolledType - The type of the enrolled.
	 * @returns The assigning group found.
	 */
	async getByEnrolleds(enrolledUid: string, enrolledType: EnrolledType) {
		// check if the enrolled exists
		switch (enrolledType) {
			case EnrolledType.Animator:
				const animator = await this.animatorRepository.getByUid(enrolledUid);
				if (!animator) {
					throw new Error('animatorDoesntExists');
				}
				break;
			case EnrolledType.Formator:
				const formator = await this.formatorRepository.getByUid(enrolledUid);
				if (!formator) {
					throw new Error('formatorDoesntExists');
				}
				break;
			case EnrolledType.Participant:
				const participant = await this.participantRepository.getByUid(enrolledUid);
				if (!participant) {
					throw new Error('participantDoesntExists');
				}
				break;
		}
		return await this.assigningGroupRepository.getByEnrolleds(enrolledUid, enrolledType);
	}

	/**
	 * Get an assigning group by group UID.
	 * 
	 * @param groupUid - The UID of the group.
	 * @param enrolledType - The type of the enrolled.
	 * @returns The assigning group found.
	 */
	async getByGroupUid(groupUid: string, enrolledType: EnrolledType) {
		if (!groupUid) {
			throw new Error('groupUidRequired');
		}
		else if (!enrolledType) {
			throw new Error('enrolledTypeRequired');
		}

		const group = await this.groupRepository.getByUid(groupUid);
		if (!group) {
			throw new Error('groupDoesntExists');
		}

		return await this.assigningGroupRepository.getByGroupUid(groupUid, enrolledType);
	}

	/**
	 * Delete an assigning group by UID.
	 * 
	 * @param uid - The UID of the assigning group to delete.
	 * @returns The deleted assigning group.
	 */
	async deleteAssigningGroup(uid: string) {
		const assigningGroup = await this.assigningGroupRepository.getByUid(uid);
		if (!assigningGroup) {
			throw new Error('assigningGroupDoesntExists');
		}

		return await this.assigningGroupRepository.deleteAssigningGroup(uid);
	}
}

/**
 * @class FormatorService
 * @remarks
 * The service uses the FormatorRepository to interact with the database.
 */
@Injectable()
export class FormatorService {
	/**
	 * Constructor for the FormatorService class.
	 * 
	 * @param formatorRepository - The repository for formator data.
	 * @param organizationRepository - The repository for organization data.
	 */
	constructor(
		private readonly formatorRepository: FormatorRepository,
		private readonly organizationRepository: OrganizationRepository,
	) {}

	/**
	 * Create a new formator.
	 * 
	 * @param createFormatorDto - The data for creating the formator.
	 * @returns The created formator.
	 */
	async createFormator(createFormatorDto: CreateFormatorDto) {
		// check if the organization exists
		const organization = await this.organizationRepository.findByCnss(createFormatorDto.organizationId);
		if (!organization) {
			throw new Error('organizationDoesntExists');
		}

		// check if the formator already exists
		const formator = await this.formatorRepository.getByEmail(createFormatorDto.email);

		if (formator) {
			throw new Error('formatorAlreadyExists');
		}

		// create the formator
		return await this.formatorRepository.createFormator(createFormatorDto);
	}

	/**
	 * Get a formator by email.
	 * 
	 * @param email - The email of the formator to retrieve.
	 * @returns The formator found.
	 */
	async getByEmail(email: string): Promise<Formator> {
		if (!email)
			throw new Error('emailRequired');
		const formator: Formator | null = await this.formatorRepository.getByEmail(email);
		if (!formator)
			throw new Error('There is no formator with the email being given!');
		return formator;
	}

	/**
	 * Get a formator by UID.
	 * 
	 * @param uid - The UID of the formator to retrieve.
	 * @returns The formator found.
	 */
	async getByUid(uid: string): Promise<Formator> {
		if (!uid)
			throw new Error('uidRequired');
		const formator: Formator | null = await this.formatorRepository.getByUid(uid);
		if (!formator)
			throw new Error('There is no formator with the uid being given!');
		return formator;
	}

	/**
	 * Update a formator by UID.
	 * 
	 * @param updateFormatorDto - The data for updating the formator.
	 * @param uid - The UID of the formator to update.
	 * @returns The updated formator.
	 */
	async updateFormator(updateFormatorDto: UpdateFormatorDto, uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}
		// check if the formator exists
		const formator = await this.formatorRepository.getByUid(uid);
		if (!formator) {
			throw new Error('formatorDoesntExists');
		}

		if (updateFormatorDto.email && updateFormatorDto.email !== formator.email) {
			const formatorByEmail = await this.formatorRepository.getByEmail(updateFormatorDto.email);
			if (formatorByEmail) {
				throw new Error('emailAlreadyExists');
			}
		}

		return await this.formatorRepository.updateFormator(updateFormatorDto, uid);
	}

	/**
	 * Delete a formator by UID.
	 * 
	 * @param uid - The UID of the formator to delete.
	 * @returns The deleted formator.
	 */
	async deleteFormator(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}
		const formator = await this.formatorRepository.getByUid(uid);
		if (!formator) {
			throw new Error('formatorDoesntExists');
		}

		return await this.formatorRepository.deleteFormator(uid);
	}
}

@Injectable()
export class ParticipantService {
	
	/**
	 * Constructor for the ParticipantService class.
	 * 
	 * @param participantRepository - The repository for participant data.
	 */
	constructor(
		private readonly participantRepository: ParticipantRepository,
	) {}

	/**
	 * Create a new participant.
	 * 
	 * @param createParticipantDto - The data for creating the participant.
	 * @returns The created participant.
	 */
	async createParticipant(createParticipantDto: CreateParticipantDto) {
		const participantByEmail = await this.participantRepository.getByEmail(createParticipantDto.email);

		if (participantByEmail) {
			throw new Error('Participant already exist with this email!');
		}

		const participantByCnss = await this.participantRepository.getByCnss(createParticipantDto.cnss);

		if (participantByCnss) {
			throw new Error('Participant already exist with this CNSS!');
		}

		const newParticipant = await this.participantRepository.createParticipant(createParticipantDto);


		return newParticipant;
	}

	/**
	 * Get a participant by UID.
	 * 
	 * @param uid - The UID of the participant to retrieve.
	 * @returns The participant found.
	 */
	async getParticipant(uid: string): Promise<Participant> {
		if (!uid)
			throw new Error('uidRequired');
		const participant: Participant | null = await this.participantRepository.getByUid(uid);
		if (!participant)
			throw new Error('There is no participant with the uid being given!');
		return participant;
	}

	/**
	 * Update a participant by UID.
	 * 
	 * @param updateParticipantDto - The data for updating the participant.
	 * @param uid - The UID of the participant to update.
	 * @returns The updated participant.
	 */
	async updateParticipant(updateParticipantDto: UpdateParticipantDto, uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}
		// check if the participant exists
		const participant = await this.participantRepository.getByUid(uid);
		if (!participant) {
			throw new Error('participantDoesntExists');
		}

		if (updateParticipantDto.email && updateParticipantDto.email !== participant.email) {
			const participantByEmail = await this.participantRepository.getByEmail(updateParticipantDto.email);
			if (participantByEmail) {
				throw new Error('emailAlreadyExists');
			}
		}

		return await this.participantRepository.updateParticipant(updateParticipantDto, uid);
	}

	/**
	 * Delete a participant by UID.
	 * 
	 * @param uid - The UID of the participant to delete.
	 * @returns The deleted participant.
	 */
	async deleteParticipant(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}
		const participant = await this.participantRepository.getByUid(uid);
		if (!participant) {
			throw new Error('participantDoesntExists');
		}
		return await this.participantRepository.deleteParticipant(uid);
	}
}
