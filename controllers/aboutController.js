import { ApiError } from '../error/ApiError.js';
import { About, TypeAbout } from '../models/models.js';

class AboutController {
  async create(req, res, next) {
    try {
      const { text, type_about_id } = req.body;
      const about = await About.create({ text, type_about_id });
      return res.json(about);
    } catch (e) {
      next(ApiError.badRequest('Не удалось создать текст'));
    }
  }

  async getAll(req, res, next) {
    try {
      const aboutAll = await About.findAll({
        attributes: { exclude: ['type_about_id'] },
        include: { model: TypeAbout, as: 'type'},
      });
      return res.json(aboutAll);
    } catch (e) {
      next(ApiError.badRequest('Не удалось получить информацию'));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.body;
      await About.destroy({ where: { id } });
      const news = await About.findAll();
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest('Удаление не удалось'));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      await About.update(
        {
          text: req.body.text,
          type_about_id: req.body.type_about_id,
        },
        { where: { id } },
      );

      return res.json({
        success: true,
      });
    } catch (e) {
      next(ApiError.badRequest('Не удалось обновить информацию'));
    }
  }
}

export const aboutController = new AboutController();
