import Help from "../models/Help.js";
import User from "../models/User.js";

export const createHelp = async (req, res) => {
  const { email, selfSteemLevel } = req.body;
  const newHelp = new Help({ email, selfSteemLevel });
  await newHelp.save();
  res.status(201).json(newHelp);
};

export const getHelps = async (req, res) => {
  const helps = await Help.find();
  res.json(helps);
}

export const deleteHelp = async (req, res) => {
  const { helpId } = req.params;
  await Help.findByIdAndDelete(helpId);
  res.status(204).json();
}



export const getHelpInfo = async (req, res) => {
  const { helpId } = req.params;
  const { email } = req.body;
  try {
    const help = await Help.findById(helpId);
    if (help.email === email) {
      const user = await User.findOne({ email: help.email });
      const userInfo = {
        name: user.name,
        email: user.email,
				gender: user.gender,
        ethnicity: user.ethnicity,
        region: user.region,
        education: user.education,
        institution: user.institution,
        selfSteemLevel: user.selfSteemLevel
      };
      res.status(200).json(userInfo);
    } else {
      res.status(403).json();
    }
  } catch (error) {
    console.log(error);
  }
}
