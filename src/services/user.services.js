import { Cv } from "../models/cv.model.js";
import { User } from "../models/user.model.js";

export const isUser = async (email) => {
  return await User.findOne({ email });
};

export const signup = async (user) => {
  const userData = await User.create(user);
  return userData.save()
};

export const uploadCv = async (id, link) => {
  let flag = 0;
  const user = await User.findById(id).select("-password");

  user.cvLink.forEach((cvLinkObj) => {
    if (cvLinkObj.link == `http://116.202.210.102:3030/resumes/${link}`) {
      flag = 1
      return
    }
  });

  if (!flag)
   {
    return await User.findByIdAndUpdate(
      id,
      {
        cvLink: [
          ...user.cvLink,
          {
            link: `http://116.202.210.102:3030/resumes/${link}`,
            updatedAt: new Date(),
          },
        ],
      },
      { new: true }
    ).select("-password");
  }
  return user;
};

export const getUser = async (id) => {
  return await User.findById(id).select("-password");
};

export const saveTemplet = async (id, data) => {
  const userData = await Cv.create({ userId: id, ...data });
  return await userData.save();
};

export const getTemplet = async (id) => {
  return await Cv.findById(id).select('-userId')
};

export const updateTemplet = async (reqId,data) => {
  return await Cv.findByIdAndUpdate(reqId,data,{new:true})
};
