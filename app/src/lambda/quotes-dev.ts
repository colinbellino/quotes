import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";

import { persons, quotes } from "../data";

const body = { data: { persons, quotes } };

export const handler: Handler = (
  _event: APIGatewayEvent,
  _context: Context,
  callback: Callback,
) => {
  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
