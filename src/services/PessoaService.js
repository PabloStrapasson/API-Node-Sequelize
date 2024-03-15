const Services = require('./Services.js');

class PessoaService extends Services{

	constructor(){
		super('Pessoa');
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
}

module.exports = PessoaService;