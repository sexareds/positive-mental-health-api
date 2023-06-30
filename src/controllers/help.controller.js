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
  try {
    const help = await Help.findById(helpId);
    if (!help) {
      res.status(404).json({ error: 'Help not found' });
      return;
    }
    const user = await User.findOne({ email: help.email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const userInfo = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      birthdate: user.birthdate,
      ethnicity: user.ethnicity,
      region: user.region,
      education: user.education,
      institution: user.institution,
      selfSteemLevel: help.selfSteemLevel,
      lastTestDate : help.createdAt
    };
    res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

