import { ApiError } from "../error/ApiError.js";
import { Contacts } from "../models/models.js";

class ContactsController {
  async create (req, res, next) {
    try {
      const {title, ref, text, type_contacts_id} = req.body;
      const contact = await Contacts.create({title, ref, text, type_contacts_id});
      return res.json(contact)
    } catch (e) {
      next(ApiError.badRequest('Не удалось создать контакт'));
    }
  };

  async getAll (req, res, next) {
    try {
      const contacts = await Contacts.findAll();
      return res.json(contacts);
    } catch (e) {
      next(ApiError.badRequest('Не удалось получить информацию'));
    }
  };

  async remove (req, res, next) {
    try {
      const {id} = req.body;
      await Contacts.destroy({where: {id}});
      const news = await Contacts.findAll();
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest('Удаление не удалось'));
    }
  }

  async update (req, res, next) {
    try {
      const {id} = req.params;
      await Contacts.update( {
        title: req.body.title,
        text: req.body.text,
        ref: req.body.ref,
        type_contacts_id: req.body.type_contacts_id
      }, {where: {id}});

      return res.json({
        success: true
      });
    } catch (e) {
      next(ApiError.badRequest('Не удалось обновить информацию'));
    }
  }
};

export const contactsController = new ContactsController();