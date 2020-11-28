import { persons, quotes } from "../../data";

export default (_req: any, res: any) => {
  res.statusCode = 200;
  res.json({ data: { persons, quotes } });
}
