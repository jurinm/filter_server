import { SingleFilter, Message } from "../types/types";
import filterValidator from "../helpers/filterValidator";

function singleFieldFilter(messages: Message[], { value, field, operation }: SingleFilter) {
  let firstCursor = 0;
  let secondCursor = 1;
  const result: Message[] = [];

  while (firstCursor < messages.length || secondCursor < messages.length) {
    firstCursor < messages.length &&
      filterValidator[operation]({ messageValue: messages[firstCursor][field], value: value }) &&
      result.push(messages[firstCursor]);
    secondCursor < messages.length &&
      filterValidator[operation]({ messageValue: messages[secondCursor][field], value: value }) &&
      result.push(messages[secondCursor]);
    firstCursor = firstCursor + 2;
    secondCursor = firstCursor + 1;
  }

  return result;
}

export default singleFieldFilter;
