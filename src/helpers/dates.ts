import { DateType } from "../types/types";

export function validateDate(value: DateType) {
  const date = new Date(value);
  return !isNaN(date.getTime());
}
export function convertToDate(value: DateType) {
  return new Date(value).getTime();
}
