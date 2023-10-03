const Arvore = require('./Arvore');
const Estado = require('./Estado');
const GeradorEstados = require('./GeradorEstados');
const Nodo = require('./Nodo');
const ResultadoBusca = require('./ResultadoBusca')

class BuscaAEstrela {
    /**
     * @param {Estado} estadoInicial 
     * @param {Estado} estadoFinal 
     * @param {GeradorEstados} geradorEstados
     * @param {function(Estado, Estado): Number} calculoValorHeuristico 
     * @returns {ResultadoBusca} 
     */
    static getResultado(estadoInicial, estadoFinal, geradorEstados, calculoValorHeuristico) {
        const tempoInicial = Date.now();

        const arvore = new Arvore(estadoInicial);

        arvore.getRaiz()
            .getEstado()
            .setValorHeuristico(calculoValorHeuristico(arvore.getRaiz().getEstado(), estadoFinal));

        /**
         * @type {Array<Nodo>}
         */
        const abertos = [arvore.getRaiz()];

        /**
         * @type {Array<Nodo>}
         */
        const fechados = [];

        do {
            const nodo = abertos.shift();

            if (nodo.getEstado().isIgual(estadoFinal)) {
                return new ResultadoBusca(arvore, Date.now() - tempoInicial);
            }

            const sucessores = geradorEstados.gerar(nodo.getEstado()).map(estado => arvore.add(nodo, estado));

            for (const sucessor of sucessores) {
                const nodoEmAbertos = this.getNodoInArray(nodo, abertos);
                const nodoEmFechados = this.getNodoInArray(nodo, fechados);
    
                if(nodoEmAbertos === null && nodoEmFechados === null) {
                    const estado = sucessor.getEstado();
                    const valorHeuristico = calculoValorHeuristico(estado, estadoFinal); 
                    sucessor.getEstado().setValorHeuristico(valorHeuristico);
                    abertos.push(sucessor);

                    continue;
                }

                if(nodoEmAbertos !== null) {
                    if(sucessor.getNivel() < nodoEmAbertos.nodo.getNivel()) {
                        abertos[nodoEmAbertos.indice] = sucessor;
                    }

                    continue;
                }

                if(nodoEmFechados !== null) {
                    if(sucessor.getNivel() < nodoEmFechados.nodo.getNivel()) {
                        fechados.splice(nodoEmFechados.indice, 1);
                        abertos.push(sucessor);
                    }
                }
            }

            fechados.push(nodo);
            abertos.sort((a, b) => a.getEstado().getValorHeuristico() - b.getEstado().getValorHeuristico());
        } while (true);
    }

    /**
     * @param {Nodo} nodo 
     * @param {Array<Nodo>} array
     * @returns {null|NodoArray}
     * 
     * @typedef {Object} NodoArray
     * @property {Nodo} nodo
     * @property {Number} indice 
     */
    static getNodoInArray(nodo, array) {
        for (let indice = 0; indice < array.length; indice++) {
            const nodoArray = array[indice];

            if (nodo.getEstado().isIgual(nodoArray.getEstado())) {
                return { nodo: nodoArray, indice: indice }
            }
        }

        return null;
    }
}

module.exports = BuscaAEstrela;