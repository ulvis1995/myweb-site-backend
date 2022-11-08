import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { ApiError } from '../error/ApiError.js';
import { TypeProject, Work } from '../models/models.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class WorkController {
  async create(req, res, next) {
    try {
      const { name, gitUrl, description, is_best_work, type_project_id } = req.body;
      const { imgUrl } = req.files;
      const technology = req.body.technology.split(',');
      const deploy = req.body.deploy === 'undefined' ? null : req.body.deploy;
      let fileName = uuidv4() + '.jpg';
      imgUrl.mv(path.resolve(__dirname, '..', 'static', fileName));
      const work = await Work.create({
        name,
        gitUrl,
        deploy: deploy,
        description,
        technology: technology,
        is_best_work,
        type_project_id,
        imgUrl: fileName,
      });
      return res.json(work);
    } catch (e) {
      next(ApiError.badRequest('Не удалось создать проект'));
    }
  }

  async getAll(req, res, next) {
    try {
      const workAll = await Work.findAll({
        attributes: { exclude: ['type_project_id'] },
        include: { model: TypeProject, as: 'type' },
      });
      return res.json(workAll);
    } catch (e) {
      next(ApiError.badRequest('Не удалось получить информацию'));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const work = await Work.findOne({ where: { id } });  
      return res.json(work);
    } catch (e) {
      next(ApiError.badRequest('Не удалось найти проект'));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.body;
      await Work.destroy({ where: { id } });
      const work = await Work.findAll();
      return res.json(work);
    } catch (e) {
      next(ApiError.badRequest('Удаление не удалось'));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const technology = req.body.technology.split(',');
      const deploy = req.body.deploy === '' ? null : req.body.deploy;
      if (req.files === null) {
        await Work.update(
          {
            name: req.body.name,
            gitUrl: req.body.gitUrl,
            deploy: deploy,
            description: req.body.description,
            technology: technology,
            is_best_work: req.body.is_best_work,
            type_project_id: req.body.type_project_id,
            imgUrl: req.body.imgUrl,
          },
          { where: { id } },
        );

        return res.json({
          success: true,
        });
      }
      const { imgUrl } = req.files;
      let fileName = uuidv4() + '.jpg';
      imgUrl.mv(path.resolve(__dirname, '..', 'static', fileName));

      await Work.update(
        {
          name: req.body.name,
          gitUrl: req.body.gitUrl,
          deploy: deploy,
          description: req.body.description,
          technology: technology,
          is_best_work: req.body.is_best_work,
          type_project_id: req.body.type_project_id,
          imgUrl: fileName,
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

export const workController = new WorkController(Work);
