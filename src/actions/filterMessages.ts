import { Message, Filter, MultipleFilter, SingleFilter, DbQueries } from "../types/types";
import complexFilter from "./complexFilter";
import multipleFieldsFilter from "./multipleFieldsFilter";
import singleFieldFilter from "./singleFieldFilter";
import filterComplexityCheck from "../helpers/filterComplexityCheck";
import generateDatabaseQueries from "../db/generateDatabaseQueries";

export function filterMessages(messages: any, filterParams: Filter): Message[] | { messages: []; error: string } {
  const complexity = filterComplexityCheck(filterParams);

  let queries: any = {};
  let result: Message[] = [];
  if (complexity === "simple") {
    queries = generateDatabaseQueries(filterParams, complexity);
    result = singleFieldFilter(messages, filterParams as SingleFilter);
  }
  if (complexity === "multipleFields") {
    queries = generateDatabaseQueries(filterParams, complexity);
    result = multipleFieldsFilter(messages, filterParams as MultipleFilter);
  }
  if (complexity === "mixed" || complexity === "multipleComplex") {
    queries = generateDatabaseQueries(filterParams, complexity);
    result = complexFilter(messages, filterParams as MultipleFilter, complexity);
  }
  console.log(queries);
  return result;
}
