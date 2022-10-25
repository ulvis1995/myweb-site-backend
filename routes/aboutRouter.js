import { Router } from "express";
import { aboutController } from "../controllers/aboutController.js";

export const aboutRouter = new Router();

aboutRouter.post('/', aboutController.create);
aboutRouter.get('/', aboutController.getAll);
aboutRouter.delete('/', aboutController.remove);
aboutRouter.patch('/:id', aboutController.update);