import { Message, MultipleFilter, SingleFilter } from "../types/types";
import filterValidator from "../helpers/filterValidator";

function multipleFieldsFilter(messages: Message[], { type, filters }: MultipleFilter) {
  const result: Message[] = [];
  if (type === "or") {
    for (let index = 0; index < messages.length; index++) {
      const message = messages[index];
      for (let index = 0; index < filters.length; index++) {
        const { value, field, operation } = filters[index] as SingleFilter;
        const found = filterValidator[operation]({ value: value, messageValue: message[field] });

        if (found) {
          result.push(message);
          break;
        }
      }
    }
  }
  if (type === "and") {
    messagesLoop: for (let index = 0; index < messages.length; index++) {
      const message = messages[index];
      for (let index = 0; index < filters.length; index++) {
        const { value, field, operation } = filters[index] as SingleFilter;
        const found = filterValidator[operation]({ value: value, messageValue: message[field] });
        if (!found) {
          continue messagesLoop;
        }
      }

      result.push(message);
    }
  }
  return result;
}

export default multipleFieldsFilter;
