const Estado = require("./Estado");

class GeradorEstados {
    funcoes;
    
    /**
     * @param {Array<function(Estado): Estado>} funcoes 
     */
    constructor(funcoes) {
        this.funcoes = funcoes;
    }

    /**
     * @param {Estado} estado 
     * @returns {Array<Estado>}
     */
    gerar(estado) {
        return this.funcoes.map(funcao => funcao(estado)).filter(estadoGerado => !estado.isIgual(estadoGerado));
    }
}

module.exports = GeradorEstados;