import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { News } from '../models/models.js';
import { ApiError } from '../error/ApiError.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class NewsController {
  async create(req, res, next) {
    try {
      const { title, text, date} = req.body;
      if (req.files === null) {
        const news = await News.create({ title, text, date });
        return res.json(news);
      }
      const { imgUrl } = req.files;
      let fileName = uuidv4() + '.jpg';
      imgUrl.mv(path.resolve(__dirname, '..', 'static', fileName));
      const news = await News.create({ title, text, date, imgUrl: fileName });

      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const news = await News.findAll();
    return res.json(news);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const news = await News.findOne({ where: { id }});

    return res.json(news);
  }

  async remove (req, res, next) {
    try {
      const {id} = req.body;

      await News.destroy({where: {id}});

      const news = await News.findAll();
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update (req, res, next) {
    try {
      const {id} = req.params;
      const { imgUrl } = req.files;
      let fileName = uuidv4() + '.jpg';
      imgUrl.mv(path.resolve(__dirname, '..', 'static', fileName));

      await News.update( {
        title: req.body.title,
        text: req.body.text,
        imgUrl: fileName,
        date: req.body.date
      }, {where: {id}});

      return res.json({
        success: true
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const newsController = new NewsController();
