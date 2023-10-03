const Arvore = require('./Arvore');

class ResultadoBusca {
    /**
     * @type {Arvore};
     */
    arvore;

    /**
     * @type {Number}
     */
    tempo;

    
    constructor(arvore, tempo) {
        this.arvore = arvore;
        this.tempo = tempo;
    }

    /**
     * 
     * @returns {Arvore} 
     */
    getArvore() {
        return this.arvore;
    }

    getTempo() {
        return this.tempo;
    }
}

module.exports = ResultadoBusca;