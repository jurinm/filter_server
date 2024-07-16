import { Request, Response } from "express";
import { filterMessages } from "../actions/filterMessages";
import mockMessages from "../../mockMessages";

export function filterController(req: Request, res: Response) {
  let result;
  const { messages, filter } = req.body;
  if (req.method === "POST") {
    result = filterMessages(messages, filter);
  } else {
    result = filterMessages(mockMessages, {
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
    });
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
