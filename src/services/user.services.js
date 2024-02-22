import { User } from "../models/user.model.js";

export const isUser = async (email) => {
  return await User.findOne({ email });
};

export const signup = async (user) => {
  return await User.create(user);
};

export const uploadCv = async (id, link) => {
  const user = await User.findById(id).select('-password');
  if (!user.cvLink.includes(`http://116.202.210.102:3030/resumes/${link}`)) {
    return await User.findByIdAndUpdate(
      id,
      {
        cvLink: [...user.cvLink, `http://116.202.210.102:3030/resumes/${link}`],
      },
      { new: true }
    ).select("-password");
  }
  return user
};

export const getUser = async (id) => {
  return await User.findById(id).select("-password");
};
