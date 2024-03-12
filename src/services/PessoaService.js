const Services = require('./Services.js');

class PessoaService extends Services{

	constructor(){
		super('Pessoa');
	}
}

module.exports = PessoaService;