import { Request, Response } from "express";
import { filterMessages } from "../actions/filterMessages";
import mockMessages from "../../mockMessages";
import createQuery from "../actions/createQuery";
import { Filter } from "../types/types";

const defaultFilter: Filter = {
  type: "or",
  filters: [
    {
      type: "or",
      filters: [
        {
          type: "string",
          field: "stringField",
          operation: "eq",
          value: "xylophone",
        },
        {
          type: "number",
          field: "numberField",
          operation: "eq",
          value: 240,
        },
      ],
    },
    {
      type: "string",
      field: "stringField",
      operation: "eq",
      value: "yellow",
    },
  ],
};

export function filterController(req: Request, res: Response) {
  let result;
  const { messages, filter } = req.body;
  if (req.method === "POST") {
    result = filterMessages(messages, filter);
    result = { ...createQuery(filter), result };
  } else {
    result = filterMessages(mockMessages, defaultFilter);
    result = { ...createQuery(defaultFilter), result };
  }

  if (Array.isArray(result)) {
    res.status(200).json({
      length: `${result.length} filtered from ${
        req.method === "POST" ? messages.length : mockMessages.length
      } messages`,
      result,
      error: "",
    });
  } else {
    res.json(result);
  }
}
