const EstadoEstadoPuzzleOito = require("./EstadoPuzzleOito");
const PosicaoMatriz = require("./PosicaoMatriz")

/**
 * @param {PosicaoMatriz} posicao 
 * @param {PosicaoMatriz} posicaoDestino 
 * @param {Array<Array>} matriz
 * @returns {Array<Array>} 
 */
const mover = function (posicao, posicaoDestino, matriz) {

    const novaMatriz = JSON.parse(JSON.stringify(matriz));

    const elemento = novaMatriz[posicao.getLinha()][posicao.getColuna()];
    novaMatriz[posicao.getLinha()][posicao.getColuna()] = novaMatriz[posicaoDestino.getLinha()][posicaoDestino.getColuna()];
    novaMatriz[posicaoDestino.getLinha()][posicaoDestino.getColuna()] = elemento;

    return novaMatriz;
}

/** 
 * @param {EstadoEstadoPuzzleOito} estado
 * @returns {EstadoEstadoPuzzleOito} 
 */
const moverPraCima = function (estado) {
    const posicao = estado.getPosicaoVazia();

    const matriz = posicao.getLinha() !== 0
        ? mover(posicao, new PosicaoMatriz(posicao.getLinha() - 1, posicao.getColuna()), estado.getMatrizValores())
        : estado.getMatrizValores();

    return new EstadoEstadoPuzzleOito(matriz);
}

/** 
 * @param {EstadoEstadoPuzzleOito} estado
 * @returns {EstadoEstadoPuzzleOito} 
 */
const moverPraBaixo = function (estado) {
    const posicao = estado.getPosicaoVazia();

    const matriz = posicao.getLinha() !== 2
        ? mover(posicao, new PosicaoMatriz(posicao.getLinha() + 1, posicao.getColuna()), estado.getMatrizValores())
        : estado.getMatrizValores();

    return new EstadoEstadoPuzzleOito(matriz);
}

/** 
 * @param {EstadoEstadoPuzzleOito} estado
 * @returns {EstadoEstadoPuzzleOito} 
 */
const moverPraDireita = function (estado) {
    const posicao = estado.getPosicaoVazia();

    const matriz = posicao.getColuna() !== 2
        ? mover(posicao, new PosicaoMatriz(posicao.getLinha(), posicao.getColuna() + 1), estado.getMatrizValores())
        : estado.getMatrizValores();

    return new EstadoEstadoPuzzleOito(matriz);
}

/** 
 * @param {EstadoEstadoPuzzleOito} estado
 * @returns {EstadoEstadoPuzzleOito} 
 */
const moverPraEsquerda = function (estado) {
    const posicao = estado.getPosicaoVazia();

    const matriz = posicao.getColuna() !== 0
        ? mover(posicao, new PosicaoMatriz(posicao.getLinha(), posicao.getColuna() - 1), estado.getMatrizValores())
        : estado.getMatrizValores();

    return new EstadoEstadoPuzzleOito(matriz);
}

module.exports = { baixo: moverPraBaixo, cima: moverPraCima, direita: moverPraDireita, esquerda: moverPraEsquerda };