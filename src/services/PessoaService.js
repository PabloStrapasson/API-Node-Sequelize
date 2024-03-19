const dataSource = require('../database/models');
const Services = require('./Services.js');

class PessoaService extends Services{

	constructor(){
		super('Pessoa');
		this.matriculaService = new Services('Matricula');
	}

	async pegaMatriculasPorEstudante(id){
		const estudante = await super.pegaUmRegistroPorId(id);
		const listaMatriculas = await estudante.getAulasMatriculadas();
		return listaMatriculas;
	}

	async pegaTodasMatriculasPorEstudante(id){
		const estudante = await super.pegaUmRegistroPorId(id);
		const listaMatriculas = await estudante.getTodasAsMatriculas();
		return listaMatriculas;
	}

	async pegaPessoasEscopo(){
		const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
		return listaPessoas;
	}

	async cancelaPessoaEMatriculas(id){
		return dataSource.sequelize.transaction(async (transacao) => {
			await super.updateRegister({ ativo: false }, { id: id }, transacao);
			await this.matriculaService.updateRegister({ status: 'cancelado' }, { estudante_id: id }, transacao);
		});
	}
}

module.exports = PessoaService;