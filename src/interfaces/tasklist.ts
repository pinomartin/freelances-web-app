export interface TasksListProps {
    title?: string;
    projectUID?: string;
    clientUID?: string;
    projectData:{
      
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
    tasks: Array<Object>,
    expenses?: {
      amount: number;
      description: string;
    }
  }