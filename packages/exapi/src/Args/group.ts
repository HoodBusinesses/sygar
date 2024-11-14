export interface CreateGroupParams {
  themeId: string;
  theme: string;
  location: string;
  action: 'Planned' | 'NotPlanned';
  startDate: number;
  endDate: number;
}

export interface UpdateGroupParams {
  location: string;
  action: 'Planned' | 'NotPlanned';
}
