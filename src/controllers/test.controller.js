import Test from "../models/Test.js";
import { body, param, validationResult } from 'express-validator';

// Crear nuevo test
export const createTest = async (req, res, next) => {
  const {email}= req.body;

  try {
    const test = new Test({
      email: email.toString(),
      score : 0
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

export const updateQuestionScore = async (req, res, next) => {
  const {id} = req.params;
  let {score} = req.body

  try{
    const test = await Test.findById(id);

    if(!test){
      return res.status(404).json({
        success: false,
        message: 'Test no encontrado'
      });
    }
    const newScore = parseInt(test.score) + parseInt(score);
    test.score = newScore;

    test.answers.push(score);
    await test.save();

    res.status(200).json({
      success: true,
      message: 'Valor guardado con exito',
      test
    });
  }catch(err){
    return next(err);
  }
}

export const getTestById = async (req, res, next) => {
  const {id} = req.params;

  try{
    const test = await Test.findById(id);

    if(!test){
      return res.status(404).json({
        success: false,
        message: 'Test no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      test
    })
  } catch(err){
    return next(err);
  }
}

export const getTestsPerUser = async (req, res, next) =>{
  const {email} = req.params;

  try{
    const tests = await Test.find({email})
    console.log("heyoooooo")
    if (!tests){
      
      return res.status(400).json({
        success: false,
        message: 'El usuario no tiene test realizados'
      })
    }

    res.status(200).json({
      success: true,
      tests
    })
  }catch(err){
    return next(err);
  }
}