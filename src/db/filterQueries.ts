import { validateDate } from "../helpers/dates";
import { MultipleFilter, QueryParams, SingleFilter } from "../types/types";

const filterQueries: QueryParams = {
  complexQueryBuilder: function (filter) {
    const { filters, type } = filter as MultipleFilter;
    const operationType = type;
    const pgParams = [];
    const elasticComparisonType = type === "and" ? "must" : "should";
    const elasticParams = [];
    for (let index = 0; index < filters.length; index++) {
      const { field, value, operation, type } = filters[index] as SingleFilter;
      const { pgQuery, elasticQuery } = this[operation]({ type: type, field: field, value: value as string });
      elasticParams.push(elasticQuery);
      if (index === filters.length - 1) {
        pgParams.push(pgQuery);
      } else {
        pgParams.push(pgQuery, operationType.toUpperCase());
      }
    }

    return { pgQuery: `(${pgParams.join(" ")})`, elasticQuery: { bool: { [elasticComparisonType]: elasticParams } } };
  },
  after: function ({ field, value, type }) {
    const date = new Date(value).toISOString();
    const queries = {
      pgQuery: `${field} > '${date}'`,
      elasticQuery: { range: { [field]: { gt: date } } },
    };
    return queries;
  },
  before: function ({ field, value, type }) {
    const date = new Date(value).toISOString();
    const queries = {
      pgQuery: `${field} < '${date}'`,
      elasticQuery: { range: { [field]: { lt: date } } },
    };
    return queries;
  },
  gt: function ({ field, value, type }) {
    const queries = {
      pgQuery: `${field} > ${value}`,
      elasticQuery: { range: { [field]: { gt: value } } },
    };
    return queries;
  },
  lt: function ({ field, value, type }) {
    const queries = {
      pgQuery: `${field} < ${value}`,
      elasticQuery: { range: { [field]: { lt: value } } },
    };
    return queries;
  },
  gte: function ({ field, value, type }) {
    const queries = {
      pgQuery: `${field} >= ${value}`,
      elasticQuery: { range: { [field]: { gte: value } } },
    };
    return queries;
  },
  lte: function ({ field, value, type }) {
    const queries = {
      pgQuery: `${field} <= ${value}`,
      elasticQuery: { range: { [field]: { lte: value } } },
    };
    return queries;
  },
  eq: function ({ field, value, type }) {
    const correctValue = validateDate(value) && type !== "number" ? new Date(value).toISOString() : value;
    const queries = {
      pgQuery: `${field} = ` + (type === "number" ? correctValue : `'${correctValue}'`),
      elasticQuery: { match: { [field]: value } },
    };
    return queries;
  },
  startsWith: function ({ field, value, type }) {
    const queries = {
      pgQuery: `${field} LIKE '${value}%'`,
      elasticQuery: { prefix: { [field]: value } },
    };
    return queries;
  },
  endsWith: function ({ field, value, type }) {
    const queries = {
      pgQuery: `${field} LIKE '%${value}'`,
      elasticQuery: { wildcard: { [field]: `*${value}` } },
    };
    return queries;
  },
  contains: function ({ field, value, type }) {
    const queries = {
      pgQuery: `${field} LIKE '%${value}%'`,
      elasticQuery: { match_phrase: { [field]: value } },
    };
    return queries;
  },
};

export default filterQueries;
