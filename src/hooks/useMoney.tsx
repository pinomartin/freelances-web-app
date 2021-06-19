
const getEstimatedAmount = (seconds: number, amountPerHour: number):number => {
    const hourPortion = seconds / 3600;
    const estimatedTotalAmount = Number((hourPortion * amountPerHour).toFixed(2));

    return estimatedTotalAmount;
}


const getEstimatedTotalVSCurrentAmount = (estimatedProjectHours:number,estimatedProjectAmountXHour:number ,realTotalAmount:number):number => {
    const difference = Number(((estimatedProjectHours * estimatedProjectAmountXHour) - realTotalAmount).toFixed(2));
    return difference;
}

const getTotalExpensesAmount =  (expenses:any) => {
    const totalAmount = expenses.reduce(function (
        accumulator: number,
        expense: any
      ) {
        
        const amount = expense.amount;
    
        return accumulator + amount;
      },
      0);
    
      return totalAmount;
}

export {
    getEstimatedAmount,
    getEstimatedTotalVSCurrentAmount,
    getTotalExpensesAmount
}