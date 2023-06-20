import Test from "../models/Test.js";
import { body, param, validationResult } from 'express-validator';

// Crear nuevo test
export const createTest = async (req, res, next) => {
  const { user, body: { answers } } = req;

  try {
    const score = Test.calculateScore(answers);

    const test = new Test({
      user,
      answers,
      score,
    });

    await test.save();

    res.status(201).json({
      success: true,
      message: 'Test creado con éxito',
      test,
    });
  } catch (err) {
    return next(err);
  }
};