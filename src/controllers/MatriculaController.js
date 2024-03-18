const Sequelize = require('sequelize');
const Controller = require('./Controller.js');
const MatriculaService = require('../services/MatriculaService.js');

const matriculaService = new MatriculaService();

class MatriculaController extends Controller{

	constructor(){
		super(matriculaService);
	}

	async pegaMatriculaPorEstudante(req, res) {
		const { estudante_id } = req.params;

		try {
			const listaMatriculasEstudante = await matriculaService.pegaEContaRegistros({
				where: {
					estudante_id: Number(estudante_id),
					status: 'matriculado'
				},
				limit: 2,
				order: [['id', 'ASC']]
			});
			return res.status(200).json(listaMatriculasEstudante);
		} catch (erro) {
			return res.status(500).json({ erro: erro.message });
		}
	}

	async pegaCursosLotados(req, res){
		const lotacaoCurso = 2;
		try {
			const cursosLotados = await matriculaService.pegaEContaRegistros({
				where: {
					status: 'matriculado'
				},
				attributes: ['curso_id'],
				group: ['curso_id'],
				having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
			});
			return res.status(200).json(cursosLotados.count);

		} catch(erro) {
			return res.status(500).json({ erro: erro.message });
		}
	}
}

module.exports = MatriculaController;