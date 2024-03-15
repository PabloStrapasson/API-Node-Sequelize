'use strict';
const isCPFValid = require('../../utils/validaCPFHelper.js');

const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Pessoa extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			Pessoa.hasMany(models.Curso, {
				foreignKey: 'docente_id'
			});
			Pessoa.hasMany(models.Matricula, {
				foreignKey: 'estudante_id',
				scope: { status: 'matriculado' },
				as: 'aulasMatriculadas'
			});
			Pessoa.hasMany(models.Matricula, {
				foreignKey: 'estudante_id',
				as: 'todasAsMatriculas'
			});
		}
	}
	Pessoa.init({
		nome: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [2, 50],
					msg: 'O campo nome deve ter no mínimo 2 caracteres'
				}
			}
		},	
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: {
					args: true,
					msg: 'formato do email inválido'
				}
			}
		},
		cpf: {
			type: DataTypes.STRING,
			validate: {
				cpfIsValid: (cpf) => {
					if(!isCPFValid(cpf)) throw new Error('Número de CPF inválido');
				}
			}
		},
		ativo: DataTypes.BOOLEAN,
		role: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Pessoa',
		tableName: 'pessoas',
		paranoid: true,
		defaultScope: {
			where: {
				ativo: true
			} 
		},
		scopes: {
			todosOsRegistros: {
				where: {}
			}
		}
	});
	return Pessoa;
};