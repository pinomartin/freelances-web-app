export interface TaskTime {
    description: string;
    hours: number;
    minutes: number;
    seconds: number;
    isActive: boolean;
    creationDate: number;
    startTimerDate: number;
    stopTimerDate:number;
    isFastHourCharge?: boolean;
    projectUID: string;
    clientUID: string;
    id?:string;
}