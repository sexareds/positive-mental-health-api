import {Router} from "express";
import {getHelps, createHelp, deleteHelp, getHelpInfo} from "../controllers/help.controller.js";

const router = Router();

router
  .get("/help", getHelps)
  .post("/help", createHelp)
  .delete("/help/:helpId", deleteHelp)
  .get("/help/helpInfo/:helpId", getHelpInfo);

export default router;

// {
//   "name": "César Rojas",
//   "email": "sexareds@gmail.com",
//   "password": "1234567890",
//   "gender": "Masculino",
//   "ethnicity": "Mestizo",
//   "region": "Costa",
//   "education": "1ro bachillerato",
//   "institution": "Privado"
// }