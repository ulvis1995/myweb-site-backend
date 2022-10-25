import { ApiError } from "../error/ApiError.js";
import { Contacts } from "../models/models.js";

class ContactsController {
  async create (req, res) {
    const {title, ref, text, type_contacts_id} = req.body;
    const contact = await Contacts.create({title, ref, text, type_contacts_id});
    return res.json(contact)
  };

  async getAll (req, res) {
    const contacts = await Contacts.findAll();
    return res.json(contacts);
  };

  async remove (req, res, next) {
    try {
      const {id} = req.body;

      await Contacts.destroy({where: {id}});

      const news = await Contacts.findAll();
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
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
      next(ApiError.badRequest(e.message));
    }
  }
};

export const contactsController = new ContactsController();