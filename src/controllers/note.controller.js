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
export const createNote = (req, res, next) => {
  const { user } = req;
  const { title, content } = req.body;

  const newNote = new Note({
    user,
    title,
    content,
  });

  newNote.save((err, note) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      success: true,
      message: 'Nota creada con éxito',
      note,
    });
  });
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