import { adminAuthServiceReturn } from "../../../framework/services/admin/adminAuthServiceImp";

export const AdminAuthServiceInterface = (service: adminAuthServiceReturn) => {
  const generateAdminToken = async (id: string,name:string) => {
    return service.generateAdminToken(id,name);
  };
  return { generateAdminToken };
};

export type AdminAuthServiceInterface = typeof AdminAuthServiceInterface;
