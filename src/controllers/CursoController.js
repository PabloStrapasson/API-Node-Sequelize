const Controller = require('./Controller.js');
const CursoService = require('../services/CursoService.js');
const { Op } = require('sequelize');

const cursoService = new CursoService();

class CursoController extends Controller{

	constructor(){
		super(cursoService);
	}

	async pegaCursos(req, res){
		const { data_inicial, data_final } = req.query;
		const where = {};

		//se existirem os params, criar uma prop {}
		data_inicial || data_final? where.data_inicio = {} : null;
		//se existir data_inicial, adiciona a prop gte com o valor data_inicial
		data_inicial? where.data_inicio[Op.gte] = data_inicial : null;
		//se existir data_final, adiciona a prop lte com o valor data_final
		data_final? where.data_inicio[Op.lte] = data_final : null;

		try {
			const listaCursos = await cursoService.getAllRegisters(where);
			return res.status(200).json(listaCursos);
		} catch(erro) {
			res.status(500).json({ erro: erro.message });
		}
	}
}

module.exports = CursoController;