const Estado = require('./Estado');

class Nodo {

    /**
     * @type {Estado}
     */
    estado;

    /**
     * @type {Nodo|null}
     */
    pai;

    /**
     * @type {Array<Nodo>}
     */
    filhos = [];

    /**
     * @param {Estado} estado
     * @param {Nodo|null} [pai=null]  
     */
    constructor(estado, pai = null) {
        this.estado = estado
        this.pai = pai;
    }

    /**
     * @returns {Estado}
     */
    getEstado() {
        return this.estado;
    }

    /**
     * @returns {Nodo|null}
     */
    getPai() {
        return this.pai;
    }

    /**
     * @param {Nodo} filho 
     * @returns {Nodo}
     */
    addFilho(filho) {
        this.filhos.push(filho);
        return this;
    }

    /**
     * @returns {Array<Nodo>} 
     */
    getFilhos() {
        return this.filhos;
    }

    getNivel() {
        return this.getPai() !== null ? this.getPai().getNivel() + 1 : 0;
    }
}

module.exports = Nodo;