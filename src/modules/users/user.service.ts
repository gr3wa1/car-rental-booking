import User from "./user.model";

export const getAllUsersService = async () => {
  return await User.find().select("-password");
};

export const getSingleUserService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getMyProfileService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateMyProfileService = async (
  userId: string,
  payload: {
    name?: string;
    phone?: string;
  },
) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  if (payload.name !== undefined) {
    user.name = payload.name;
  }

  if (payload.phone !== undefined) {
    user.phone = payload.phone;
  }

  await user.save();

  return user;
};
