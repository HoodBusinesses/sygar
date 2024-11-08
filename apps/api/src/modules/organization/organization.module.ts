import { Global, Module } from '@nestjs/common';
import {
  AnimatorController,
  AssigningGroupController,
  FormatorController,
  GroupController,
  OrganizationController,
  ParticipantController,
  ThemeController,
} from './organization.controler';
import {
  AnimatorRepository,
  AssigningGroupRepository,
  FormatorRepository,
  GroupRepository,
  OrganizationRepository,
  ParticipantRepository,
  ThemeRepository,
} from './organization.repository';
import {
  AnimatorService,
  AssigningGroupService,
  FormatorService,
  GroupService,
  OrganizationService,
  ParticipantService,
  ThemeService,
} from './organization.service';
import { TaskService } from 'src/global/schedule/task.service';

/**
 * @module OrganizationModule
 * @description
 * This module is responsible for managing organizations in the application.
 * It provides the necessary providers and exports for handling organization functionality.
 *
 * @remarks
 * The `OrganizationModule` is decorated with the `@Global()` decorator to ensure that the module is available
 * globally throughout the application.
 */
@Global()
@Module({
  controllers: [
    OrganizationController,
    ThemeController,
    AnimatorController,
    FormatorController,
    ParticipantController,
    GroupController,
    AssigningGroupController,
  ],
  providers: [
    OrganizationRepository,
    OrganizationService,
    ThemeService,
    ThemeRepository,
    AnimatorService,
    AnimatorRepository,
    FormatorService,
    FormatorRepository,
    ParticipantService,
    ParticipantRepository,
    GroupService,
    GroupRepository,
    AssigningGroupService,
    AssigningGroupRepository,
    TaskService,
  ],
  exports: [OrganizationRepository, OrganizationService],
})
export class OrganizationModule {}
