import { Filter, MultipleFilter, SingleFilter } from "../types/types";
import filterQueries from "./filterQueries";
import filterComplexityCheck from "../helpers/filterComplexityCheck";

function generateDatabaseQueries(filter: Filter, complexity: string) {
  let pgQueryRaw = "";
  let elasticQueryRaw = {};

  if (complexity === "mixed") {
    const { filters, type } = filter as MultipleFilter;
    const operationType = type;
    const pgQueryParams = [];
    const elasticComparisonType = type === "and" ? "must" : "should";
    const elasticParams = [];
    for (let index = 0; index < filters.length; index++) {
      const filter = filters[index];
      const filterComplexity = filterComplexityCheck(filter);

      let filterQuery;

      if ("multipleFields" === filterComplexity) {
        filterQuery = filterQueries.complexQueryBuilder(filter);
      }
      if ("simple" === filterComplexity) {
        const { operation, field, value, type } = filter as SingleFilter;

        filterQuery = filterQueries[operation]({ field: field, value: value as string, type: type });
      }
      elasticParams.push(filterQuery?.elasticQuery);
      if (filters.length - 1 === index) {
        pgQueryParams.push(filterQuery?.pgQuery);
      } else pgQueryParams.push(filterQuery?.pgQuery, operationType.toUpperCase());
    }
    elasticQueryRaw = { query: { bool: { [elasticComparisonType]: elasticParams } } };
    pgQueryRaw = pgQueryParams.join(" ").trim();
  }
  if (complexity === "multipleFields") {
    const { pgQuery, elasticQuery } = filterQueries.complexQueryBuilder(filter);
    pgQueryRaw = pgQuery;
    elasticQueryRaw = { query: elasticQuery };
  }

  if (complexity === "simple") {
    const { operation, field, value, type } = filter as SingleFilter;

    const { pgQuery, elasticQuery } = filterQueries[operation]({ field: field, value: value as string, type: type });
    pgQueryRaw = pgQuery;
    elasticQueryRaw = { query: elasticQuery };
  }
  return { queries: { pgQuery: `SELECT * FROM messages WHERE ${pgQueryRaw};`, elasticQuery: elasticQueryRaw } };
}

export default generateDatabaseQueries;
