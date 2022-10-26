import { Router } from "express";
import { typeController } from "../controllers/typeController.js";

export const typeRouter = new Router();

typeRouter.post('/about', typeController.createAboutType);
typeRouter.get('/about', typeController.getAllAboutType);
typeRouter.patch('/about/:id', typeController.updateAboutType);

typeRouter.post('/project', typeController.createProjectType);
typeRouter.get('/project', typeController.getAllProjectType);
typeRouter.patch('/project/:id', typeController.updateProjectType);

typeRouter.post('/contacts', typeController.createContactsType);
typeRouter.get('/contacts', typeController.getAllContactsType);
typeRouter.patch('/contacts/:id', typeController.updateContactsType);