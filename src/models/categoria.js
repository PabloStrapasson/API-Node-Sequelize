'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Categoria extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			Categoria.hasMany(models.Curso, {
				foreignKey: 'categoria_id'
			});
		}
	}
	Categoria.init({
		titulo: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Categoria',
		tableName: 'categorias',
	});
	return Categoria;
};