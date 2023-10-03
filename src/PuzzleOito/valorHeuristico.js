const EstadoEstadoPuzzleOito = require("./EstadoPuzzleOito");
const PosicaoMatriz = require("./PosicaoMatriz");

/**
 * @param {EstadoEstadoPuzzleOito} estado 
 * @param {EstadoEstadoPuzzleOito} estadoFinal 
 * @returns {Number}
 */
const numeroPecasForaLugar = function (estado, estadoFinal) {
    let numeroPecasForaLugar = 0;

    estado.getMatrizValores().forEach((linha, indiceLinha) => {
        linha.forEach((elemento, indiceColuna) => {
            if (elemento !== estadoFinal.getMatrizValores()[indiceLinha][indiceColuna]) {
                numeroPecasForaLugar++;
            }
        });
    });

    return numeroPecasForaLugar;
}

/**
 * @param {EstadoEstadoPuzzleOito} estado 
 * @param {EstadoEstadoPuzzleOito} estadoFinal 
 * @returns {Number}
 */
const distanciaManhattan = function (estado, estadoFinal) {

    let total = 0;

    const encontrarPosicaoElemento = function (matriz, elementoAlvo) {
        for (let linha = 0; linha < matriz.length; linha++) {
            for (let coluna = 0; coluna < matriz[linha].length; coluna++) {
                if (matriz[linha][coluna] === elementoAlvo) {
                    return new PosicaoMatriz(linha, coluna);
                }
            }
        }
    }

    estado.getMatrizValores().forEach((linha, indiceLinha) => {
        linha.forEach((elemento, indiceColuna) => {
            if (elemento !== estadoFinal.getMatrizValores()[indiceLinha][indiceColuna]) {
                const posicao = encontrarPosicaoElemento(estadoFinal.getMatrizValores(), elemento);

                const distanciaX = Math.abs(indiceLinha - posicao.getLinha());
                const distanciaY = Math.abs(indiceColuna - posicao.getColuna());

                total += distanciaX + distanciaY;
            }
        });
    });

    return total;
}

const numeroPecasForaLugarEDistanciaManhattan = (estadoInicial, estadoFinal) => {
    return numeroPecasForaLugar(estadoInicial, estadoFinal) + distanciaManhattan(estadoInicial, estadoFinal);
}

module.exports = { numeroPecasForaLugar, distanciaManhattan, numeroPecasForaLugarEDistanciaManhattan }

