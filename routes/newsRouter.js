import { Router } from "express";
import { newsController } from "../controllers/newsController.js";

export const newsRouter = new Router();

newsRouter.post('/', newsController.create);
newsRouter.get('/', newsController.getAll);
newsRouter.get('/:id', newsController.getOne);
newsRouter.delete('/', newsController.remove);
newsRouter.patch('/:id', newsController.update);