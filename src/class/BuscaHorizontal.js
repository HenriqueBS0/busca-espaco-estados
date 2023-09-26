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
        const tempoInicial = Date.now();

        let nodoAtual = new Nodo(estadoInicial);

        const nodoRaiz = nodoAtual;

        const abertos = [];
        const fechados = [];

        while (!nodoAtual.getValor().isIgual(estadoFinal)) {

            const sucessores = geradorEstados.gerar(nodoAtual.getValor())
                .map(estado => new Nodo(estado, nodoAtual))
                .filter(nodoGerado => !fechados.some(nodo => nodoGerado.getValor().isIgual(nodo.getValor())) && !abertos.some(nodo => nodoGerado.getValor().isIgual(nodo.getValor())));

            nodoAtual.setFilhos(sucessores);

            fechados.push(nodoAtual);

            sucessores.forEach(sucessor => abertos.push(sucessor));

            nodoAtual = abertos.shift();
        }

        const tempoFinal = Date.now() - tempoInicial;

        return new ResultadoBusca(nodoAtual, nodoRaiz, tempoFinal);
    }
}

module.exports = BuscaHorizontal;