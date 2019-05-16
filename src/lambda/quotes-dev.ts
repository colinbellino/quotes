import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";

import { quotes } from "../data/quotes";

const body = { data: quotes };

export const handler: Handler = (
  _event: APIGatewayEvent,
  _context: Context,
  callback: Callback,
) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
};
