import { Router } from "express";
import { aboutRouter } from "./aboutRouter.js";
import { contactsRouter } from "./contactsRouter.js";
import { newsRouter } from "./newsRouter.js";
import { typeRouter } from "./typeRouter.js";
import { workRouter } from "./workRouter.js";
// import { userRouter } from "./userRouter.js";

export const router = new Router();

// router.use('/user', userRouter);
router.use('/news', newsRouter);
router.use('/contacts', contactsRouter);
router.use('/about', aboutRouter);
router.use('/work', workRouter);
router.use('/type', typeRouter);