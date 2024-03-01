import fs from "fs";
import { Cv } from "../models/cv.model.js";
import { User } from "../models/user.model.js";

export const isUser = async (email) => {
  return await User.findOne({ email });
};

export const signup = async (user) => {
  const userData = await User.create(user);
  return userData.save();
};

export const uploadCv = async (id, link, templetId) => {
  let ranNo = generateRandom();
  console.log(ranNo);
  return await User.findByIdAndUpdate(
    id,
    {
      cvLink: [
        {
          link: `http://116.202.210.102:3030/resumes/${ranNo}/${link}`,
          updatedAt: new Date(),
          templetId,
        },
      ],
    },
    { new: true }
  ).select("-password");
};

export const updateTemplet = async (id, data) => {
  return await Cv.findByIdAndUpdate(id, data, { new: true });
};

export const updateCv = async (userId, id) => {
  const userData = await User.findById(userId);
  let i = 0;
  let filename
  userData.cvLink.some((cvLinkObj) => {
    if (cvLinkObj.templetId == id) {
      filename = cvLinkObj.link
      userData.cvLink.splice(i, 1);
      return true;
    }
    i++;
  });
};

export const getUser = async (id) => {
  return await User.findById(id).select("-password");
};

export const saveTemplet = async (id, data) => {
  const userData = await Cv.create({ userId: id, ...data });
  return await userData.save();
};

export const getTemplet = async (id) => {
  return await Cv.findById(id).select("-userId");
};

export const deleteCv = async (id, userId) => {
  try {
    const userData = await User.findById(userId);
    let i = 0;
    let filename;
    let templetId;
    userData.cvLink.some((cvLinkObj) => {
      if (cvLinkObj._id == id) {
        templetId = cvLinkObj.templetId;
        filename = cvLinkObj.link;
        userData.cvLink.splice(i, 1);
        return true;
      }
      i++;
    });

    const lastIndex = filename.lastIndexOf("/");
    const imgName = filename.slice(lastIndex + 1);
    if (fs.existsSync(`src/uploads/${imgName}`))
      fs.unlinkSync(`src/uploads/${imgName}`);
    if (templetId) await Cv.findByIdAndDelete(templetId);
    return await userData.save();
  } catch (error) {
    console.log(error);
  }
};

export const generateRandom = () => {
  let token = "";
  for (let i = 0; i < 4; i++) {
    token += Math.floor(Math.random() * 10);
  }
  return token;
};
