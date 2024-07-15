import { Message, Filter, MultipleFilter, SingleFilter } from "../types/types";
import complexFilter from "./complexFilter";
import multipleFieldsFilter from "./multipleFieldsFilter";
import singleFieldFilter from "./singleFieldFilter";
import filterComplexityCheck from "../helpers/filterComplexityCheck";

export function filterMessages(messages: Message[], filterParams: Filter): Message[] | { messages: []; error: string } {
  const complexity = filterComplexityCheck(filterParams);
  if (complexity === "simple") {
    return singleFieldFilter(messages, filterParams as SingleFilter);
  }
  if (complexity === "multipleFields") {
    return multipleFieldsFilter(messages, filterParams as MultipleFilter);
  }
  if (complexity === "mixed" || complexity === "multipleComplex") {
    return complexFilter(messages, filterParams as MultipleFilter, complexity);
  }

  return { messages: [], error: "Wrong filter settings" };
}
