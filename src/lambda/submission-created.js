export function handler(event, context, callback) {
  const body = JSON.parse(event.body);
  console.log({ body });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ title: "submission-created", body }),
  });
}
