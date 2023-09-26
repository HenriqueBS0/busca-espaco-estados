const EstadoEstadoPuzzleOito = require('./PuzzleOuito/EstadoPuzzleOito');
const BuscaHorizontal = require('./class/BuscaHorizontal');
const GeradorEstados = require('./class/GeradorEstados');
const mover = require('./PuzzleOuito/movimentacao');
const BuscaAEstrela = require('./class/BuscaAEstrela');
const { numeroPecasForaLugar } = require('./PuzzleOuito/valorHeuristico');

const estadoFinal = new EstadoEstadoPuzzleOito([
    [2, 4, 7],
    [5, 6, 8],
    [1, 3, null]
]);

const gerarEstadoInicial = function(estadoFinal, movimentos) {
    let estado = estadoFinal;
    for (let index = 0; index < movimentos; index++) {
        estado = [
            mover.baixo,
            mover.cima,
            mover.esquerda,
            mover.direita,
        ][Math.floor(Math.random() * 4)](estado);
    }

    return estado;
}

const estadoInicial = gerarEstadoInicial(estadoFinal, 45653);
const resultado = BuscaAEstrela.getResultado(estadoInicial, estadoFinal, new GeradorEstados([
    mover.baixo,
    mover.cima,
    mover.esquerda,
    mover.direita,
]), numeroPecasForaLugar);



console.log(resultado.nodoResultado.getNivel());
