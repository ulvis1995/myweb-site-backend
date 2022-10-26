import { ApiError } from '../error/ApiError.js';
import { TypeAbout, TypeContacts, TypeProject } from '../models/models.js';

class TypeController {
  async createAboutType(req, res) {
    const { title } = req.body;
    const type = await TypeAbout.create({ title });
    return res.json(type);
  }

  async getAllAboutType(req, res) {
    const types = await TypeAbout.findAll();
    return res.json(types);
  }

  async updateAboutType(req, res, next) {
    try {
      const { id } = req.params;
      await TypeAbout.update({ title: req.body.title }, { where: { id } });

      return res.json({ success: true });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createProjectType(req, res) {
    const { title, description } = req.body;
    const type = await TypeProject.create({ title, description });
    return res.json(type);
  }

  async getAllProjectType(req, res) {
    const types = await TypeProject.findAll();
    return res.json(types);
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
      next(ApiError.badRequest(e.message));
    }
  }

  async createContactsType(req, res) {
    const { header } = req.body;
    const type = await TypeContacts.create({ header });
    return res.json(type);
  }

  async getAllContactsType(req, res) {
    const types = await TypeContacts.findAll();
    return res.json(types);
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
      next(ApiError.badRequest(e.message));
    }
  }
}

export const typeController = new TypeController();
