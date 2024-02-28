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
      dateRange: [String]
    },
  ],
  experience: [
    {
      company: String,
      position: String,
      dateRange: [String],
      responsibilities: String
    },
  ],
  skills: [String],
  languages: [
    {
      language: String,
      proficiency: String
    },
  ],
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
