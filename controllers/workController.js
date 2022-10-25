import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { ApiError } from "../error/ApiError.js";
import { Work } from "../models/models.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class WorkController {
  async create (req, res) {
    const {name, gitUrl, deploy, description, is_best_work, type_project_id} = req.body;
    const { imgUrl } = req.files;
    const technology = req.body.technology.split(',')
    let fileName = uuidv4() + '.jpg';
    imgUrl.mv(path.resolve(__dirname, '..', 'static', fileName));
    const work = await Work.create({name, gitUrl, deploy, description, technology: technology, is_best_work, type_project_id, imgUrl: fileName});
    return res.json(work)
  };

  async getAll (req, res) {
    const workAll = await Work.findAll();
    return res.json(workAll);
  };

  async getOne(req, res) {
    const { id } = req.params;
    const work = await Work.findOne({ where: { id }});

    return res.json(work);
  };

  async remove (req, res, next) {
    try {
      const {id} = req.body;

      await Work.destroy({where: {id}});

      const work = await Work.findAll();
      return res.json(work);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };

  async update (req, res, next) {
    try {
      const {id} = req.params;

      await Work.update( {
        text: req.body.text,
        type_about_id: req.body.type_about_id,
      }, {where: {id}});

      return res.json({
        success: true
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };
};

export const workController = new WorkController(Work);