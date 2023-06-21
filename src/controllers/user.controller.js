import User from "../models/User.js";
import { body, param, validationResult } from 'express-validator';

// Obtiene todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ 
        success: false,
        message: "Users not found" 
      });
    }
    res.status(200).json({
      success: true,
      body: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Obtiene un usuario por su _id
export const getUser = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    const user = await User.findOne({ email }); // Corrección aquí
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      body: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Crea un nuevo usuario
export const createUser = async (req, res) => {
  const { name, email, password, gender, ethnicity, region, education, institution } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
      gender,
      ethnicity,
      region,
      education,
      institution
    });

    newUser.password = newUser.encrypPassword(newUser.password);
    newUser.createdAt = new Date();

    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
};

export const createPsychologist = async (req, res) => {
  const { name, email, password, gender, region} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
      gender,
      region,
      role : "P"
    });

    newUser.password = newUser.encrypPassword(newUser.password);
    newUser.createdAt = new Date();

    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
};
  

// Actualiza un usuario por su _id
export const updateUser = async (req, res) => {
  await param('id').isMongoId().withMessage('El id del usuario no es válido').run(req);
  await body('name').isLength({ min: 3, max: 255 }).withMessage('El nombre debe tener entre 3 y 255 caracteres').optional().run(req);
  await body('email').isEmail().withMessage('El correo electrónico no es válido').optional().run(req);
  await body('password').isLength({ min: 8, max: 1024 }).withMessage('La contraseña debe tener entre 8 y 1024 caracteres').optional().run(req);
  await body('gender').isIn(['Masculino', 'Femenino', 'Otro']).withMessage('El género no es válido').optional().run(req);
  await body('ethnicity').isIn(['Mestizo', 'Blanco', 'Afrodescendiente', 'Indígena', 'Otro']).withMessage('La etnia no es válida').optional().run(req);
  await body('region').isIn(['Costa', 'Sierra', 'Oriente', 'Galápagos']).withMessage('La región no es válida').optional().run(req);
  await body('education').isIn(['10mo BGU', '1ro bachillerato', '2do de bachillerato', '2ro de bachillerato']).withMessage('La educación no es válida').optional().run(req);
  await body('institution').isIn(['Privado', 'Fiscomisional', 'Municipal']).withMessage('La institución no es válida').optional().run(req);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errores: errors.array() });
  }

  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ mensaje: 'user no encontrado' });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = user.encrypPassword(req.body.password);
    }
    user.gender = req.body.gender || user.gender;
    user.ethnicity = req.body.ethnicity || user.ethnicity;
    user.region = req.body.region || user.region;
    user.education = req.body.education || user.education;
    user.institution = req.body.institution || user.institution;
    user.updatedAt = new Date();
    await user.save();

    return res.status(200).json({ message: 'user actualizado correctamente', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Elimina un usuario por su _id
export const deleteUser = async (req, res) => {
  const { email } = req.params;
  try {
    console.log(email);
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.deleteOne();

    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};
