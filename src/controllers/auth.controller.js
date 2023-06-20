import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Login
export const login = async (req, res, next) => {
  const { body: { email, password } } = req;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Correo electrónico incorrectos',
      })
    }

    const isMatch = user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Correo electrónico o contraseña incorrectos',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user,
    });
  } catch (err) {
    return next(err);
  }
};

// Signup
export const signup = async (req, res, next) => {
  const { body: { name, email, password, gender, ethnicity, region, education, institution, role } } = req;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'El correo electrónico ya está registrado',
      });
    }

    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      gender,
      ethnicity,
      region,
      education,
      institution,
      role
    });

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      message: 'Nuevo usuario registrado',
      user: savedUser,
    });
  } catch (err) {
    return next(err);
  }
};