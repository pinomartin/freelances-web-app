import parse from "date-fns/parse";

export const finishDateProcessorForm = (dateFromInput: string) => {
    const parsedDate = parse(dateFromInput, "yyyy-MM-dd", new Date()).getTime();
    return parsedDate;
  };
