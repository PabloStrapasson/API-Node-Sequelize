const Controller = require('./Controller.js');
const PessoaService = require('../services/PessoaService.js');

const pessoaService = new PessoaService();

class PessoaController extends Controller{

	constructor(){
		super(pessoaService);
	}

	async pegaMatriculas(req, res){
		const { estudante_id } = req.params;
		try {
			const listaMatriculas = await pessoaService.pegaMatriculasPorEstudante(Number(estudante_id));
			return res.status(200).json(listaMatriculas);

		} catch(erro) {
			return res.status(500).json({ erro: erro.message });
		}
	}

	async pegaTodasMatriculas(req, res){
		const { estudante_id } = req.params;
		try {
			const listaMatriculas = await pessoaService.pegaTodasMatriculasPorEstudante(Number(estudante_id));
			return res.status(200).json(listaMatriculas);

		} catch(erro) {
			return res.status(500).json({ erro: erro.message });
		}
	}

	async pegaTodasAsPessoas(req, res){
		try {
			const listaTodasPessoas = await pessoaService.pegaPessoasEscopo();
			return res.status(200).json(listaTodasPessoas);
		} catch(erro) {
			return res.status(500).json({erro: erro.message});
		}
	}
}

module.exports = PessoaController;