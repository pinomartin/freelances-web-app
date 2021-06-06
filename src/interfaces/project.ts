export interface ProjectType {
    name: string;
    client: string;
    description: string;
    type: string;
    amountXHour: number;
    estimatedHours: number;
    estimatedTotal: number;
    estimatedFinishDate?: string | number;
    estimatedHoursPerDay: number;
    creationDate: number;
  }
