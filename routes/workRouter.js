import { Router } from "express";
import { workController } from "../controllers/workController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const workRouter = new Router();

workRouter.post('/', checkRoleMiddleware('ADMIN'), workController.create);
workRouter.get('/', workController.getAll);
workRouter.get('/:id', workController.getOne);
workRouter.delete('/', checkRoleMiddleware('ADMIN'), workController.remove);
workRouter.patch('/:id', checkRoleMiddleware('ADMIN'), workController.update);