const Estado = require('../class/Estado');
const PosicaoMatriz = require('./PosicaoMatriz');

class EstadoEstadoPuzzleOito extends Estado {
    
    /**
     * @type {Array<Array<Number|null>>} matrizValores
     */
    matrizValores = [];

    /**
     * @type {PosicaoMatriz}
     */
    posicaoVazia;
    
    /**
     * @param {Array<Array<Number|null>>} matrizValores 
     */
    constructor(matrizValores) {
        super();
        this.matrizValores = matrizValores;
        this.setPosicaoVazia(matrizValores);
    }

    getMatrizValores() {
        return this.matrizValores;
    }

    /**
     * @param {Array<Array<Number|null>>} matrizValores 
     */
    setPosicaoVazia(matriz) {
        const posicao = new PosicaoMatriz(0, 0);

        matriz.forEach((linha, indiceLinha) => {
            linha.forEach((elemento, indiceElemento) => {
                if(elemento === null) {
                    posicao.setLinha(indiceLinha).setColuna(indiceElemento);
                }
            })
        });

        this.posicaoVazia = posicao;
    }

    /**
     * @returns {PosicaoMatriz}
     */
    getPosicaoVazia() {
        return this.posicaoVazia;
    }

    /** 
     * @param {EstadoEstadoPuzzleOito} estado
     * @returns {boolean}
     */
    isIgual(estado) {
        return JSON.stringify(this.getMatrizValores()) === JSON.stringify(estado.getMatrizValores()); 
    }
}

module.exports = EstadoEstadoPuzzleOito;