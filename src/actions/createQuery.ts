import { Filter, DbQueries } from "../types/types";

import filterComplexityCheck from "../helpers/filterComplexityCheck";
import generateDatabaseQueries from "../db/generateDatabaseQueries";

export function createQuery(filterParams: Filter): { queries: DbQueries } | { error: string } {
  const complexity = filterComplexityCheck(filterParams);

  if (complexity === "simple") {
    return generateDatabaseQueries(filterParams, complexity);
  }
  if (complexity === "multipleFields") {
    return generateDatabaseQueries(filterParams, complexity);
  }
  if (complexity === "mixed" || complexity === "multipleComplex") {
    return generateDatabaseQueries(filterParams, complexity);
  }
  return { error: `Can't create valid query, check filter object` };
}

export default createQuery;
