export interface ProjectType{
    name: string;
    client:string;
    description: string;
    amountXHour: number;
    estimatedHours: number;
    estimatedTotal: number;
    estimatedFinishDate?: string;
    creationDate: number;
}

