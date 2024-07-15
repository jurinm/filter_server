import { Filter, FilterComplexity } from "../types/types";

function filterComplexityCheck(filterParams: Filter): FilterComplexity {
  if ("filters" in filterParams) {
    if (filterParams!.filters.every((filter) => !("filters" in filter) && filterParams!.filters.length > 1)) {
      return "multipleFields";
    }
    if (filterParams!.filters.every((filter) => "filters" in filter && filterParams!.filters.length > 1)) {
      return "multipleComplex";
    }

    if (
      filterParams!.filters.some((filter) => "filters" in filter) &&
      filterParams!.filters.some((filter) => !("filters" in filter)) &&
      filterParams!.filters.length > 1
    ) {
      return "mixed";
    }
    return "multiple";
  } else return "simple";
}

export default filterComplexityCheck;
