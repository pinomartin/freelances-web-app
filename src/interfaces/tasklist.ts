export interface TasksListProps {
    title: string;
    projectUID: string;
    clientUID?: string;
    projectData:{
      data:{
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
    } 
    tasks: Array<Object>,
  }