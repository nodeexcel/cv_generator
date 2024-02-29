import mongoose from "mongoose";
const cvSchema = new mongoose.Schema({
  personalInfo: {
    firstName: {
      type: String,
      required: true
    },
    lastName: String,
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: String,
    links: {
      github: String,
      linkedin: String,
      website: String
    }
  },
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String
    },
  ],
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      responsibilities: [String],
      environments:[String]
    },
  ],
  skills: [String],
  languages: [
    {
      language: String,
      proficiency: String
    },
  ],
  projects:[{
    projectName:String,
    desc:String,
    technologies:[String]
  }],
  certifications: [
    {
      name: String,
      organization: String,
      date: String,
    },
  ],
  userId: {
    type: String,
  }
});

export const Cv = mongoose.model("Cv", cvSchema);
