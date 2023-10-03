const Estado = require("./Estado");
const Nodo = require("./Nodo");

class Arvore {

    /**
     * @type {Nodo}
     */
    raiz;

    /**
     * 
     * @param {Estado} estado 
     */
    constructor(estado) {
        this.raiz = new Nodo(estado);
    }

    /**
     * @returns {Nodo}
     */
    getRaiz() {
        return this.raiz;
    }

    /**
     * @param {Nodo} pai 
     * @param {Estado} estado 
     */
    add(pai, estado) {
        const nodo = new Nodo(estado, pai);
        pai.addFilho(nodo);
        return nodo;
    }

    /**
     * @param {Estado} estado
     * @returns {Array<Nodo>} 
     */
    getNodos(estado) {
        return this.getNodosPorCondicao((nodo) =>  nodo.getEstado().isIgual(estado));
    }

    /**
     * @returns {Number}
     */
    getNumeroNodos() {
        return this.getNodosPorCondicao(_ => true).length;
    }

    /**
     * @param {function(Nodo): boolean} condicao
     * @returns {Array<Nodo>}
     */
    getNodosPorCondicao(condicao) {

        /**
         * @type {Array<Nodo>}
         */
        const nodosEncontrados = [];

        const proximosNodos = [this.getRaiz()];

        while(proximosNodos.length !== 0) {
            const nodo = proximosNodos.shift();

            if(condicao(nodo)) {
                nodosEncontrados.push(nodo);
            }

            nodo.getFilhos().forEach(filho => proximosNodos.push(filho));
        }

        return nodosEncontrados;
    }
}

module.exports = Arvore;