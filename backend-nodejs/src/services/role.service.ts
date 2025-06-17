import RoleModel from "../models/role.model";

export const getRolesService = async () => {
  return await RoleModel.find({});
};

export const getRoleByIdService = async (id: string) => {
  return await RoleModel.findById(id);
};
