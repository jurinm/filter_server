export type DateType = Date | string;

export type DbQueries = {
  pgQuery: string;
  elasticQuery: any;
};

type AvailableTypes = string | number | boolean | DateType;

type OperationsType = "eq" | "startsWith" | "endsWith" | "contains" | "gt" | "lt" | "gte" | "lte" | "after" | "before";

export type QueryKargs = {
  field: string;
  value: AvailableTypes;
  operation: FilterComplexity;
};

type QueryParamsMethods = {
  complexQueryBuilder: (args: Filter) => DbQueries;
};

export type QueryParams = {
  [key in OperationsType]: (args: { field: string; value: string; type?: AvailableTypes }) => DbQueries;
} & QueryParamsMethods;

type FilterKargs = {
  messageValue?: AvailableTypes;
  value?: AvailableTypes;
};

export type FilterParams = {
  [key: string]: (kargs: FilterKargs) => boolean;
};

export type Message = {
  [key: string]: AvailableTypes | undefined;
};

export type StringFilter = {
  type: "string";
  field: string;
  operation: "eq" | "startsWith" | "endsWith" | "contains";
  value: string;
};

export type NumberFilter = {
  type: "number";
  field: string;
  operation: "eq" | "gt" | "lt" | "gte" | "lte";
  value: number;
};

export type BooleanFilter = {
  type: "boolean";
  field: string;
  operation: "eq";
  value: boolean;
};

export type DateFilter = {
  type: "date";
  field: string;
  operation: "eq" | "after" | "before";
  value: DateType;
};

export type OrFilter = {
  type: "or";
  filters: Filter[];
};

export type AndFilter = {
  type: "and";
  filters: Filter[];
};

export type FilterComplexity = "multiple" | "simple" | "mixed" | "multipleComplex" | "multipleFields";

export type SingleFilter = StringFilter | NumberFilter | BooleanFilter | DateFilter;

export type MultipleFilter = OrFilter | AndFilter;

export type Filter = SingleFilter | MultipleFilter;
