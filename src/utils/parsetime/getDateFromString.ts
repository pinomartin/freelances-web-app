
export const getDateFromString = (dateFromInput: any) => {
    const year = Number(dateFromInput.slice(0,4));
    const month = Number(dateFromInput.slice(5,7))-1;
    const day = Number(dateFromInput.slice(8,10));

    const unixDate = new Date(year, month,day)
    return unixDate;
  };