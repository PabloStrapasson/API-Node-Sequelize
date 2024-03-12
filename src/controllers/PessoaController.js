const Controller = require('./Controller.js');
const PessoaService = require('../services/PessoaService.js');

const pessoaService = new PessoaService();

class PessoaController extends Controller{

	constructor(){
		super(pessoaService);
	}
}

module.exports = PessoaController;