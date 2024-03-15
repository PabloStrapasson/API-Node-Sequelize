module.exports = (objParams) => {
	for(let propriedade in objParams) {
		if(/Id|id/.test(propriedade)){
			objParams[propriedade] = Number(objParams[propriedade]);
		}
	}
	return objParams;
};