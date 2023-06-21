import Note from "../models/Note.js";
import { body, param, validationResult } from 'express-validator';

// Obtener las notas de un usuario
export const getNotesByUser = (req, res, next) => {
  const { user } = req;

  Note.find({ user }, (err, notes) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: 'Notas encontradas',
      notes,
    });
  });
};

// Crear nota
export const createNote = async (req, res, next) => {
  const { email, emotion, content } = req.body;

  try {
    const newNote = new Note({
      email,
      emotion,
      content
    });

    const savedNote = await newNote.save();

    res.status(201).json({
      success: true,
      message: 'Nota creada con éxito',
      note: savedNote,
    });
  } catch (err) {
    next(err);
  }
};


// Eliminar una nota por id
export const deleteNote = (req, res, next) => {
  const { user } = req;
  const { noteId } = req.params;

  Note.findOneAndDelete({ _id: noteId, user }, (err, note) => {
    if (err) {
      return next(err);
    }
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Nota no encontrada',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Nota eliminada con éxito',
      note,
    });
  });
};