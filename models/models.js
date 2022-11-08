import {sequelize} from '../db.js';
import { DataTypes} from 'sequelize';

export const TypeContacts = sequelize.define('type_contacts', {
  id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
  header: {type: DataTypes.TEXT, allowNull: false},
}, {
  tableName: 'type_contacts',
  timestamps: false
});

export const TypeAbout = sequelize.define('type_about', {
  id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.TEXT, allowNull: false},
}, {
  tableName: 'type_about',
  timestamps: false
});


export const TypeProject = sequelize.define('type_project', {
  id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.TEXT, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: false},
}, {
  tableName: 'type_project',
  timestamps: false
});

export const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'USER'},
}, {
  tableName: 'user',
  timestamps: false
});

export const Work = sequelize.define('work', {
  id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.TEXT, allowNull: false},
  gitUrl: {type: DataTypes.TEXT},
  deploy: {type: DataTypes.TEXT},
  description: {type: DataTypes.TEXT, allowNull: false},
  imgUrl: {type: DataTypes.STRING, allowNull: false},
  technology: {type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
  is_best_work: {type: DataTypes.BOOLEAN, allowNull: false},
  type_project_id: {type: DataTypes.BIGINT, allowNull: false, references: {model: TypeProject, key: 'id'}}
}, {
  tableName: 'work',
  timestamps: false
});

export const News = sequelize.define('news', {
  id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.TEXT, allowNull: false},
  text: {type: DataTypes.TEXT, allowNull: false},
  imgUrl: {type: DataTypes.STRING},
  date: {type: DataTypes.DATEONLY, allowNull: false}
}, {
  tableName: 'news',
  timestamps: false
});

export const Contacts = sequelize.define('contacts', {
  id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.TEXT, allowNull: false},
  ref: {type: DataTypes.TEXT, allowNull: false},
  text: {type: DataTypes.STRING, allowNull: false},
  type_contacts_id: {type: DataTypes.BIGINT, allowNull: false, references: {model: TypeContacts, key: 'id'}}
}, {
  tableName: 'contacts',
  timestamps: false
});

export const About = sequelize.define('about_list', {
  id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.TEXT, allowNull: false},
  type_about_id: {type: DataTypes.BIGINT, allowNull: false, references: {model: TypeAbout, key: 'id'}}
}, {
  tableName: 'about_list',
  timestamps: false
});


Work.belongsTo(TypeProject, { foreignKey: 'type_project_id', as: 'type' });
TypeProject.hasOne(Work, { foreignKey: 'type_project_id' });

Contacts.belongsTo(TypeContacts, { foreignKey: 'type_contacts_id' });
TypeContacts.hasOne(Contacts, { foreignKey: 'type_contacts_id' });

About.belongsTo(TypeAbout, { foreignKey: 'type_about_id' , as: 'type'});
TypeAbout.hasOne(About, { foreignKey: 'type_about_id' });