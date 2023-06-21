import Help from "../models/Help.js";

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
    const help = await Help.findById(helpId);
    res.json(help);
}
