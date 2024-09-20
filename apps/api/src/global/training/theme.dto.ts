export interface ThemeDto {
  readonly themeId: string; // Unique identifier for the theme
  readonly theme: string; // Name of the theme
  readonly cost: number; // Cost per day
  groups?: GroupDto[]; // Optional array of groups
  startDate: string; // Start date of the theme (to manage overlapping periods)
  endDate: string; // End date of the theme (to manage overlapping periods)
}

export interface GroupDto {
  readonly groupId: string; // Unique identifier for the group
  readonly groupName: string; // Name of the group
  participants?: ParticipantDto[]; // Optional array of participants
  validated?: boolean; // Whether the participant list has been validated
}

export interface ParticipantDto {
  readonly participantId: string; // CNSS number (unique identifier)
  readonly name: string; // Full name of the participant
  readonly surname: string; // Surname of the participant
  readonly cine: string; // National Identity Card number
  readonly status: string; // Participant status (e.g., active, pending, etc.)
  readonly email: string; // Participant email for notifications
}

export interface AddGroupDto {
  readonly groupId: string; // Unique identifier for the group to be added
  readonly groupName: string; // Name of the group to be added
}

export interface AddParticipantDto {
  readonly participantId: string; // CNSS number (unique identifier)
  readonly name: string; // Full name of the participant
  readonly surname: string; // Surname of the participant
  readonly cine: string; // National Identity Card number
  readonly status: string; // Status (e.g., active, pending)
  readonly email: string; // Email of the participant
}

export interface ModifyParticipantListDto {
  participants: ParticipantDto[]; // List of participants for modification
  modificationReason?: string; // Reason for modification (optional)
  approvedByAdmin?: boolean; // Whether the modification has been approved by the admin
}

export interface NotificationDto {
  participantId: string; // CNSS number of the participant
  emailSent: boolean; // Whether the email has been sent
  reminderSent: boolean; // Whether the reminder has been sent
  reminderDate: string; // Date of the reminder email
}
