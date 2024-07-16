import { DateType, FilterParams } from "../types/types";
import { convertToDate, validateDate } from "./dates";

const filterValidator: FilterParams = {
  after: function ({ messageValue, value }) {
    return !!(convertToDate(messageValue as DateType) < convertToDate(value as DateType));
  },
  before: function ({ messageValue, value }) {
    return !!(convertToDate(messageValue as DateType) > convertToDate(value as DateType));
  },
  gt: function ({ messageValue, value }) {
    return !!(messageValue && value && messageValue > value);
  },
  lt: function ({ messageValue, value }) {
    return !!(messageValue && value && messageValue < value);
  },
  gte: function ({ messageValue, value }) {
    return !!(messageValue && value && messageValue >= value);
  },
  lte: function ({ messageValue, value }) {
    return !!(messageValue && value && messageValue <= value);
  },
  eq: function ({ messageValue, value }) {
    const verifiedMessageValue =
      validateDate(messageValue as DateType) && typeof value === "string"
        ? convertToDate(messageValue as DateType)
        : messageValue;
    console.log(typeof messageValue);
    const verifiedValue = validateDate(value as DateType) ? convertToDate(value as DateType) : value;

    return !!(verifiedMessageValue === verifiedValue);
  },
  startsWith: function ({ messageValue, value }) {
    return typeof messageValue === "string" && typeof value === "string" && !!messageValue?.startsWith(value);
  },
  endsWith: function ({ messageValue, value }) {
    return typeof messageValue === "string" && typeof value === "string" && !!messageValue?.endsWith(value);
  },
  contains: function ({ messageValue, value }) {
    return typeof messageValue === "string" && typeof value === "string" && !!messageValue?.includes(value);
  },
};

export default filterValidator;
