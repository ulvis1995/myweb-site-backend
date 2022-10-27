import { Router } from "express";
import { aboutController } from "../controllers/aboutController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const aboutRouter = new Router();

aboutRouter.post('/', checkRoleMiddleware('ADMIN'), aboutController.create);
aboutRouter.get('/', aboutController.getAll);
aboutRouter.delete('/', checkRoleMiddleware('ADMIN'), aboutController.remove);
aboutRouter.patch('/:id', checkRoleMiddleware('ADMIN'), aboutController.update);