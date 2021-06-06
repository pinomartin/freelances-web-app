const getEstimatedAmount = (seconds: number, amountPerHour: number):number => {
    const hourPortion = seconds / 3600;
    const estimatedTotalAmount = Number((hourPortion * amountPerHour).toFixed(2));

    return estimatedTotalAmount;
}

export {
    getEstimatedAmount
}