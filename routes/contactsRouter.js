import { Router } from "express";
import { contactsController } from "../controllers/contactsController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const contactsRouter = new Router();

contactsRouter.post('/', checkRoleMiddleware('ADMIN'), contactsController.create);
contactsRouter.get('/', contactsController.getAll);
contactsRouter.delete('/', checkRoleMiddleware('ADMIN'), contactsController.remove);
contactsRouter.patch('/:id', checkRoleMiddleware('ADMIN'), contactsController.update);