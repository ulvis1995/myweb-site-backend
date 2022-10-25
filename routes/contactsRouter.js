import { Router } from "express";
import { contactsController } from "../controllers/contactsController.js";

export const contactsRouter = new Router();

contactsRouter.post('/', contactsController.create);
contactsRouter.get('/', contactsController.getAll);
contactsRouter.delete('/', contactsController.remove);
contactsRouter.patch('/:id', contactsController.update);