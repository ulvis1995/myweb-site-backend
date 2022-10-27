import { Router } from "express";
import { newsController } from "../controllers/newsController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const newsRouter = new Router();

newsRouter.post('/', checkRoleMiddleware('ADMIN'), newsController.create);
newsRouter.get('/', newsController.getAll);
newsRouter.get('/:id', newsController.getOne);
newsRouter.delete('/', checkRoleMiddleware('ADMIN'), newsController.remove);
newsRouter.patch('/:id', checkRoleMiddleware('ADMIN'), newsController.update);