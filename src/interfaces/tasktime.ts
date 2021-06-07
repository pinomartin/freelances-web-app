export interface TaskTime {
    description: string;
    hours: number;
    minutes: number;
    seconds: number;
    isActive: boolean;
    creationDate: number;
    startTimerDate: number;
    stopTimerDate:number;
    projectUID: string;
    clientUID: string;
    id?:string;
}