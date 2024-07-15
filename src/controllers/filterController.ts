import { Request, Response } from "express";
import { filterMessages } from "../actions/filterMessages";
import { mockMessages } from "../../mockMessages";

export function filterController(req: Request, res: Response) {
  const messages = filterMessages(mockMessages, {
    type: "and",
    filters: [
      {
        type: "or",
        filters: [
          {
            type: "boolean",
            field: "boolean",
            operation: "eq",
            value: true,
          },
          {
            type: "boolean",
            field: "boolean",
            operation: "eq",
            value: false,
          },
        ],
      },
      {
        type: "and",
        filters: [
          {
            type: "string",
            field: "string",
            operation: "eq",
            value: "2021-03-12T10:17:33.456Z",
          },
          {
            type: "string",
            field: "message",
            operation: "eq",
            value: "a2b9J8mK7pL4RqWxV0N3",
          },
        ],
      },
    ],
  });
  if (Array.isArray(messages)) {
    res.json({ filteredMessages: messages, error: "" });
  } else {
    res.json(messages);
  }
}
