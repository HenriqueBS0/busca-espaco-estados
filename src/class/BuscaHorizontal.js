const Arvore = require('./Arvore');
const Estado = require('./Estado');
const GeradorEstados = require('./GeradorEstados');
const Nodo = require('./Nodo');
const ResultadoBusca = require('./ResultadoBusca')

class BuscaHorizontal {
    /**
     * @param {Estado} estadoInicial 
     * @param {Estado} estadoFinal 
     * @param {GeradorEstados} geradorEstados
     * @returns {ResultadoBusca} 
     */
    static getResultado(estadoInicial, estadoFinal, geradorEstados) {
        const arvore = new Arvore(estadoInicial);
        
        const tempoInicial = Date.now();

        /**
         * @type {Array<Nodo>}
         */
        const abertos = [arvore.getRaiz()];
        
        /**
         * @type {Array<Nodo>}
         */
        const fechados = [];

        while(!abertos[0].getEstado().isIgual(estadoFinal)) {
            const nodo = abertos.shift();
            const sucessores = geradorEstados.gerar(nodo.getEstado());
            
            fechados.push(nodo);

            sucessores.forEach(estado => {
                const isNovoNodo = arvore.getNodos(estado).length === 0;

                if(isNovoNodo) {
                    abertos.push(arvore.add(nodo, estado));
                }
                else {
                    arvore.add(nodo, estado);
                }
            });
        }


        return new ResultadoBusca(arvore, Date.now() - tempoInicial);
    }
}

module.exports = BuscaHorizontal;