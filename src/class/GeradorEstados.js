const Estado = require("./Estado");

class GeradorEstados {
    funcoes;
    
    constructor(funcoes) {
        this.funcoes = funcoes;
    }

    /**
     * @param {Estado} estado 
     * @returns {Array<Estado>}
     */
    gerar(estado) {
        return this.funcoes.map(funcao => funcao(estado));
    }
}

module.exports = GeradorEstados;