export interface Expense{
    uid?:string|number;
    description:string;
    amount:number;
    clientUID?:string;
    projectUID?:string;
}