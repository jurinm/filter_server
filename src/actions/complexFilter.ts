import filterComplexityCheck from "../helpers/filterComplexityCheck";
import filterValidator from "../helpers/filterValidator";
import { FilterComplexity, Message, MultipleFilter, SingleFilter } from "../types/types";
import multipleFieldsFilter from "./multipleFieldsFilter";
import singleFieldFilter from "./singleFieldFilter";

function complexFilter(messages: Message[], { type, filters }: MultipleFilter, complexity: FilterComplexity) {
  const result: Message[] = [];

  if (type === "and") {
    if (complexity === "mixed") {
      let filteredMessages: Message[] = messages;
      for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const filteringType = filterComplexityCheck(filter);

        const validatedMessages =
          filteringType === "multipleFields"
            ? multipleFieldsFilter(messages, filter as MultipleFilter)
            : singleFieldFilter(messages, filter as SingleFilter);
        if (!validatedMessages.length) {
          break;
        }
        filteredMessages = validatedMessages;
      }

      filteredMessages.length && Array.prototype.push.apply(result, filteredMessages);
    }
    if (complexity === "multipleComplex") {
      let filteredMessages = messages;
      for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const validatedMessages = multipleFieldsFilter(filteredMessages, filter as MultipleFilter);
        if (!validatedMessages.length) {
          break;
        }
        filteredMessages = validatedMessages;
      }
      filteredMessages.length && Array.prototype.push.apply(result, filteredMessages);
    }
    if (complexity === "multipleFields") {
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
  }
  if (type === "or") {
    if (complexity === "multipleFields") {
      for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const filteredMessages = singleFieldFilter(messages, filter as SingleFilter);

        Array.prototype.push.apply(result, filteredMessages);
      }
    }
    if (complexity === "mixed") {
      for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const filteringType = filterComplexityCheck(filter);
        const filteredMessages =
          filteringType === "multipleFields"
            ? multipleFieldsFilter(messages, filter as MultipleFilter)
            : singleFieldFilter(messages, filter as SingleFilter);

        Array.prototype.push.apply(result, filteredMessages);
      }
    }
    if (complexity === "multipleComplex") {
      for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const filteredMessages = multipleFieldsFilter(messages, filter as MultipleFilter);

        Array.prototype.push.apply(result, filteredMessages);
      }
    }
  }
  return result;
}

export default complexFilter;
