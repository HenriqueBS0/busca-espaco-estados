const Estado = require('./Estado'); 
const GeradorEstados = require('./GeradorEstados');
const Nodo = require('./Nodo');
const ResultadoBusca = require('./ResultadoBusca')

class BuscaAEstrela {
    /**
     * @param {Estado} estadoInicial 
     * @param {Estado} estadoFinal 
     * @param {GeradorEstados} geradorEstados
     * @returns {ResultadoBusca} 
     */
    static getResultado(estadoInicial, estadoFinal, geradorEstados, calculoValorHeuristico) {
        const tempoInicial = Date.now();

        const nodoRaiz = new Nodo(estadoInicial.setValorHeuristico(calculoValorHeuristico(estadoInicial, estadoFinal)));

        let nodoAtual = nodoRaiz;

        const abertos = [nodoRaiz];
        const fechados = [];

        while(abertos.length !== 0) {
            nodoAtual = abertos.shift();

            if(nodoAtual.getValor().isIgual(estadoFinal)) {
                break;
            }

            const filhos = geradorEstados.gerar(nodoAtual.getValor()).map(estado => new Nodo(estado, nodoAtual));

            nodoAtual.setFilhos(filhos);

            for (const filho of filhos) {
                const indiceFilhoEmAbertos = abertos.findIndex(nodo => nodo.getValor().isIgual(filho.getValor()));
                const indiceFilhoEmFechados = fechados.findIndex(nodo => nodo.getValor().isIgual(filho.getValor()));

                if(indiceFilhoEmAbertos === -1 && indiceFilhoEmFechados === -1) {
                    filho.getValor().setValorHeuristico(calculoValorHeuristico(filho.getValor(), estadoFinal));
                    abertos.push(filho);
                }
                else if(indiceFilhoEmAbertos !== -1) {
                    if(filho.getNivel() < abertos[indiceFilhoEmAbertos].getNivel()) {
                        abertos[indiceFilhoEmAbertos] = filho;
                    }
                }
                else if(indiceFilhoEmFechados !== -1) {
                    if(filho.getNivel() < fechados[indiceFilhoEmFechados].getNivel()) {
                        fechados.splice(indiceFilhoEmFechados, 1);
                        abertos.push(filho);
                    }
                }
            }

            fechados.push(nodoAtual);
            abertos.sort((a, b) => a.getValor().getValorHeuristico() - b.getValor().getValorHeuristico());
        }
        
        const tempoFinal = Date.now() - tempoInicial;

        return new ResultadoBusca(nodoAtual, nodoRaiz, tempoFinal);
    }
}

module.exports = BuscaAEstrela;