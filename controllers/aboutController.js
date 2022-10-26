import { ApiError } from '../error/ApiError.js';
import { About, TypeAbout } from '../models/models.js';

class AboutController {
  async create(req, res) {
    const { text, type_about_id } = req.body;
    const about = await About.create({ text, type_about_id });
    return res.json(about);
  }

  async getAll(req, res) {
    const aboutAll = await About.findAll({
      attributes: { exclude: ['type_about_id'] },
      include: { model: TypeAbout, as: 'type' },
    });
    return res.json(aboutAll);
  }

  async remove(req, res, next) {
    try {
      const { id } = req.body;

      await About.destroy({ where: { id } });

      const news = await About.findAll();
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
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
      next(ApiError.badRequest(e.message));
    }
  }
}

export const aboutController = new AboutController();
