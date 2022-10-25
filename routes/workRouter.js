import { Router } from "express";
import { workController } from "../controllers/workController.js";

export const workRouter = new Router();

workRouter.post('/', workController.create);
workRouter.get('/', workController.getAll);
workRouter.get('/:id', workController.getOne);
workRouter.delete('/', workController.remove);
workRouter.patch('/:id', workController.update);