export type DateType = Date | string;

export type FilterValidator = {
  [key: string]: ({
    messageValue,
    value,
  }: {
    messageValue?: string | number | boolean | DateType;
    value?: string | number | boolean | DateType;
  }) => boolean;
};
export type Message = {
  [key: string]: string | boolean | DateType | number | undefined;
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
