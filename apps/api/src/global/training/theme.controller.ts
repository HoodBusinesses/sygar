import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as trainingDto from './theme.dto';

@Controller('theme')
export class TrainingController {
  // Static arrays to store data
  private themes: trainingDto.ThemeDto[] = [];

  /**
   * * Create a new training theme.
   * Optionally, create theme groups at the same time.
   * @param createTrainingDto - The data for the new training theme.
   */
  @Post()
  async createTraining(@Body() createTrainingDto: trainingDto.ThemeDto) {
    const existingTheme = this.themes.find(
      (t) => t.themeId === createTrainingDto.themeId,
    );
    if (existingTheme) {
      throw new BadRequestException('Theme already exists with this ID.');
    }

    this.themes.push(createTrainingDto);
    return {
      message: 'Training theme created successfully',
      themeId: createTrainingDto.themeId,
    };
  }

  /**
   * * Add a group to an existing training theme.
   * @param themeId - The ID of the theme.
   * @param addGroupDto - The group to be added.
   */
  @Put(':themeId/group')
  async addGroup(
    @Param('themeId') themeId: string,
    @Body() addGroupDto: trainingDto.AddGroupDto,
  ) {
    const theme = this.themes.find((t) => t.themeId === themeId);
    if (!theme) {
      throw new NotFoundException('Theme not found.');
    }

    if (!theme.groups) {
      theme.groups = [];
    }

    // Check for duplicate groupId
    const existingGroup = theme.groups.find(
      (g) => g.groupId === addGroupDto.groupId,
    );
    if (existingGroup) {
      throw new BadRequestException('Group already exists with this ID.');
    }

    theme.groups.push({
      groupId: addGroupDto.groupId,
      groupName: addGroupDto.groupName,
      participants: [],
    });

    return {
      message: `Group ${addGroupDto.groupName} added successfully to theme ${themeId}`,
    };
  }

  /**
   * * Add a participant to a group within a theme.
   * Ensures the participant is not enrolled in two overlapping themes or groups.
   * @param themeId - The ID of the theme.
   * @param groupId - The ID of the group.
   * @param addParticipantDto - The participant to be added.
   */
  @Put(':themeId/group/:groupId/participant')
  async addParticipant(
    @Param('themeId') themeId: string,
    @Param('groupId') groupId: string,
    @Body() addParticipantDto: trainingDto.AddParticipantDto,
  ) {
    const theme = this.themes.find((t) => t.themeId === themeId);
    if (!theme) {
      throw new NotFoundException('Theme not found.');
    }

    const group = theme.groups?.find((g) => g.groupId === groupId);
    if (!group) {
      throw new NotFoundException('Group not found.');
    }

    // Check for conflicts: participant cannot be in two themes/groups with overlapping dates
    const conflict = this.checkParticipantConflicts(
      addParticipantDto.participantId,
      themeId,
    );
    if (conflict) {
      throw new BadRequestException(
        `Participant ${addParticipantDto.name} is already enrolled in an overlapping theme or group.`,
      );
    }

    // Add the participant
    group.participants?.push({
      participantId: addParticipantDto.participantId,
      name: addParticipantDto.name,
      surname: addParticipantDto.surname,
      cine: addParticipantDto.cine,
      status: addParticipantDto.status,
      email: addParticipantDto.email,
    });

    return {
      message: `Participant ${addParticipantDto.name} added to group ${group.groupName} successfully`,
    };
  }

  /**
   * * Notify formateurs and participants via email.
   * This would involve email notifications for a real-world scenario.
   * For now, it just simulates by returning a message.
   * @param themeId - The ID of the theme.
   */
  @Get(':themeId/notify')
  async notifyParticipants(@Param('themeId') themeId: string) {
    const theme = this.themes.find((t) => t.themeId === themeId);
    if (!theme) {
      throw new NotFoundException('Theme not found.');
    }

    let message = `Notification: Formation for theme "${theme.theme}" is coming up! \n`;

    if (theme.groups) {
      theme.groups.forEach((group) => {
        message += `Group: ${group.groupName} \n`;

        group.participants?.forEach((participant) => {
          message += `Notifying participant: ${participant.name} (Email: ${participant.email}) \n`;
        });
      });
    }

    return { message };
  }

  /**
   * * Fetch a specific training theme by its ID.
   * @param themeId - The ID of the theme.
   */
  @Get(':themeId')
  async getTheme(@Param('themeId') themeId: string) {
    const theme = this.themes.find((t) => t.themeId === themeId);
    if (!theme) {
      throw new NotFoundException('Theme not found.');
    }

    return theme;
  }

  /**
   * * Updates an existing training theme by its ID.
   * @param themeId - The ID of the theme.
   * @param updateTrainingDto - The updated data for the training theme.
   */
  @Put(':themeId')
  async updateTheme(
    @Param('themeId') themeId: string,
    @Body() updateTrainingDto: trainingDto.ThemeDto,
  ) {
    const themeIndex = this.themes.findIndex((t) => t.themeId === themeId);
    if (themeIndex === -1) {
      throw new NotFoundException('Theme not found.');
    }

    this.themes[themeIndex] = {
      ...this.themes[themeIndex],
      ...updateTrainingDto,
    };

    return { message: 'Theme updated successfully' };
  }

  /**
   * * Deletes a theme by its ID.
   * @param themeId - The ID of the theme.
   */
  @Delete(':themeId')
  async deleteTheme(@Param('themeId') themeId: string) {
    const themeIndex = this.themes.findIndex((t) => t.themeId === themeId);
    if (themeIndex === -1) {
      throw new NotFoundException('Theme not found.');
    }

    this.themes.splice(themeIndex, 1);
    return { message: 'Theme deleted successfully' };
  }

  /**
   * Helper function to check if a participant is already registered in overlapping themes/groups.
   * @param participantId - The CNSS number of the participant.
   * @param currentThemeId - The theme in which the participant is being added.
   * @returns boolean - Whether a conflict exists.
   */
  private checkParticipantConflicts(
    participantId: string,
    currentThemeId: string,
  ): boolean {
    for (const theme of this.themes) {
      if (theme.themeId !== currentThemeId) {
        if (theme.groups) {
          for (const group of theme.groups) {
            if (
              group.participants?.some((p) => p.participantId === participantId)
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
