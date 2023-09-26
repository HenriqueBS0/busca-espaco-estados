const Nodo = require('./Nodo');

class ResultadoBusca {
    nodoRaiz;
    tempo;
    nodoResultado;

    constructor(nodoResultado, tempo) {
        this.nodoResultado = nodoResultado;
        this.tempo = tempo;    
    }
}

module.exports = ResultadoBusca;