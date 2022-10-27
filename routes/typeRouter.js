import { Router } from "express";
import { typeController } from "../controllers/typeController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const typeRouter = new Router();

typeRouter.post('/about', checkRoleMiddleware('ADMIN'), typeController.createAboutType);
typeRouter.get('/about', typeController.getAllAboutType);
typeRouter.patch('/about/:id', checkRoleMiddleware('ADMIN'), typeController.updateAboutType);

typeRouter.post('/project', checkRoleMiddleware('ADMIN'), typeController.createProjectType);
typeRouter.get('/project', typeController.getAllProjectType);
typeRouter.patch('/project/:id', checkRoleMiddleware('ADMIN'), typeController.updateProjectType);

typeRouter.post('/contacts', checkRoleMiddleware('ADMIN'), typeController.createContactsType);
typeRouter.get('/contacts', typeController.getAllContactsType);
typeRouter.patch('/contacts/:id', checkRoleMiddleware('ADMIN'), typeController.updateContactsType);