const database = require('../models');

class Services {

	constructor(nomeModel){
		this.model = nomeModel;
	}

	async getAllRegisters(){
		return database[this.model].findAll();
	}

	async pegaUmRegistroPorId(id) {
		return database[this.model].findByPk(id);
	}

	async criaRegistro(dadosDoRegistro) {
		return database[this.model].create(dadosDoRegistro);
	}

	async updateRegister(dadosAtualizados, id){
		const listaRegistrosAtualizados = await database[this.model].update(dadosAtualizados, { where: { id :id } });

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