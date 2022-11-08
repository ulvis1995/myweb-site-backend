import { ApiError } from '../error/ApiError.js';
import { TypeAbout, TypeContacts, TypeProject } from '../models/models.js';

class TypeController {
  async createAboutType(req, res, next) {
    try {
      const { title } = req.body;
      const type = await TypeAbout.create({ title });
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest('Не удалось создать тип'));
    }
  }

  async getAllAboutType(req, res, next) {
    try {
      const types = await TypeAbout.findAll();
      return res.json(types);
    } catch (e) {
      next(ApiError.badRequest('Не найти типы'));
    }
  }

  async updateAboutType(req, res, next) {
    try {
      const { id } = req.params;
      await TypeAbout.update({ title: req.body.title }, { where: { id } });

      return res.json({ success: true });
    } catch (e) {
      next(ApiError.badRequest('Не удалось обновить информацию'));
    }
  }

  async createProjectType(req, res, next) {
    try {
      const { title, description } = req.body;
      const type = await TypeProject.create({ title, description });
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest('Не удалось создать тип'));
    }
  }

  async getAllProjectType(req, res, next) {
    try {
      const types = await TypeProject.findAll();
      return res.json(types);
    } catch (e) {
      next(ApiError.badRequest('Не найти типы'));
    }
  }

  async updateProjectType(req, res, next) {
    try {
      const { id } = req.params;
      await TypeProject.update(
        {
          title: req.body.title,
          description: req.body.description,
        },
        { where: { id } },
      );

      return res.json({ success: true });
    } catch (e) {
      next(ApiError.badRequest('Не удалось обновить информацию'));
    }
  }

  async createContactsType(req, res, next) {
    try {
      const { header } = req.body;
      const type = await TypeContacts.create({ header });
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest('Не удалось создать тип'));
    }
  }

  async getAllContactsType(req, res, next) {
    try {
      const types = await TypeContacts.findAll();
      return res.json(types);
    } catch (e) {
      next(ApiError.badRequest('Не найти типы'));
    }
  }

  async updateContactsType(req, res, next) {
    try {
      const { id } = req.params;
      await TypeContacts.update(
        {
          header: req.body.header,
        },
        { where: { id } },
      );

      return res.json({ success: true });
    } catch (e) {
      next(ApiError.badRequest('Не удалось обновить информацию'));
    }
  }
}

export const typeController = new TypeController();
