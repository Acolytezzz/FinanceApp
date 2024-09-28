import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connect from "./connect";

const connectDB =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    await connect();
    return handler(req, res);
  };

export default connectDB;

export const config = {
  runtime: "nodejs",
};
