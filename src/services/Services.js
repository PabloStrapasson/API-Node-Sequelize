const database = require('../database/models');

class Services {

	constructor(nomeModel){
		this.model = nomeModel;
	}

	async getAllRegisters(where = {}){
		return database[this.model].findAll({ where: {...where} });
	}

	async pegaRegistrosPorEscopo(escopo) {
		return database[this.model].scope(escopo).findAll();
	}

	async pegaUmRegistroPorId(id) {
		return database[this.model].findByPk(id);
	}

	async pegaUmRegistro(whereObj) {
		return database[this.model].findOne({ where: { ...whereObj }});
	}

	async pegaEContaRegistros(options) {
		return database[this.model].findAndCountAll({ ...options });
	}

	async criaRegistro(dadosDoRegistro) {
		return database[this.model].create(dadosDoRegistro);
	}

	async updateRegister(dadosAtualizados, whereObj){
		const listaRegistrosAtualizados = await database[this.model].update(dadosAtualizados, { where: { ...whereObj } });

		if(listaRegistrosAtualizados[0] === 0){
			return false;
		} else {
			return true;
		}
	}
  
	async excluiRegistro(id) {
		return database[this.model].destroy({ where: { id: id } });
	}

}

module.exports = Services;