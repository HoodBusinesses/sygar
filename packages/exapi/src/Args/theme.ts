export interface CreateThemeParams {
  name: string;
  cost: number;
  description: string;
  organizationId: string;
  startDate: number;
  endDate: number;
}

export interface UpdateThemeParams {
  description: string;
  startDate: number;
  endDate: number;
}
