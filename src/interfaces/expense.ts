export interface Expense{
    uid:string;
    description:string;
    amount:number;
    clientUID?:string;
    projectUID?:string;
    isProjectDone?: boolean;
}