const Estado = require('../class/Estado');
const PosicaoMatriz = require('./PosicaoMatriz');

class EstadoEstadoPuzzleOito extends Estado {
    
    matrizValores = [];
    posicaoVazia;
    
    /**
     * @param {Array<Array>} matrizValores 
     */
    constructor(matrizValores) {
        super();
        this.matrizValores = matrizValores;
        this.posicaoVazia = EstadoEstadoPuzzleOito.#encontraPosicaoVazia(matrizValores);
    }

    getMatrizValores() {
        return this.matrizValores;
    }

    /**
     * @returns {PosicaoMatriz}
     */
    getPosicaoVazia() {
        return this.posicaoVazia;
    }

    /** 
     * @param {EstadoEstadoPuzzleOito} estado
     * @returns bool
     */
    isIgual(estado) {
        return this.matrizValores
            .every((linha, indiceLinha) => linha.every((elemento, indiceElemento) => elemento === estado.getMatrizValores()[indiceLinha][indiceElemento]));
    }    

    /**
     * @param {Array<Array>} matrizValores 
     * @returns {PosicaoMatri}
     */
    static #encontraPosicaoVazia(matrizValores) {

        const posicao = new PosicaoMatriz(0, 0);

        matrizValores.forEach((linha, indiceLinha) => {
            linha.forEach((elemento, indiceElemento) => {
                if(elemento === null) {
                    posicao.setLinha(indiceLinha).setColuna(indiceElemento);
                }
            })
        });

        return posicao;
    }
}

module.exports = EstadoEstadoPuzzleOito;