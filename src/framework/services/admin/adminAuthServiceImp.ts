import configKeys from "../../../config/config";
import jwt from "jsonwebtoken";

export const adminAuthServices = () => {
  const generateAdminToken = async (id: string,name:string) => {
    if (configKeys.secretKey) {
      const token = jwt.sign({ id,name }, configKeys.secretKey, {
        expiresIn: "30d",
      });
      return token;
    } else {
      throw new Error("JWT TOKEN is not defined");
    }
  };
  return { generateAdminToken };
};

export type adminAuthServices = typeof adminAuthServices;
export type adminAuthServiceReturn = ReturnType<adminAuthServices>;
