const EstadoEstadoPuzzleOito = require('./PuzzleOito/EstadoPuzzleOito');
const BuscaHorizontal = require('./class/BuscaHorizontal');
const { numeroPecasForaLugar, numeroPecasForaLugarEDistanciaManhattan } = require('./PuzzleOito/valorHeuristico');
const mover = require('./PuzzleOito/movimentacao');
const GeradorEstadoRandomico = require('./class/GeradorEstadoRandomico');
const GeradorEstados = require('./class/GeradorEstados');
const BuscaAEstrela = require('./class/BuscaAEstrela');
const readline = require('readline');
const ResultadoBusca = require('./class/ResultadoBusca');

const estadoFinal = new EstadoEstadoPuzzleOito([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null]
]);

const geradorEstados = new GeradorEstados([
    mover.baixo,
    mover.cima,
    mover.esquerda,
    mover.direita,
]);

/**
 * @param {String} titulo 
 * @param {EstadoEstadoPuzzleOito} estado 
 */
const stringEstado = (estado) => {
    const matriz = JSON.parse(JSON.stringify(estado.getMatrizValores()));

    return matriz.map(linha => linha.map(elemento => elemento !== null ? elemento : 'n').join('|')).join('\n-|-|-\n');
}

const gerarResultado = (movimentos, metodo) => {
    const estadoInicial = GeradorEstadoRandomico.gerar(estadoFinal, geradorEstados, movimentos);

    const metodos = {
        '1': () => BuscaHorizontal.getResultado(estadoInicial, estadoFinal, geradorEstados),
        '2': () => BuscaAEstrela.getResultado(estadoInicial, estadoFinal, geradorEstados, numeroPecasForaLugar),
        '3': () => BuscaAEstrela.getResultado(estadoInicial, estadoFinal, geradorEstados, numeroPecasForaLugarEDistanciaManhattan),
    }

    /**
     * @type {ResultadoBusca}
     */
    const resultado = metodos[metodo]();

    console.log([
        'Estado Inicial',
        stringEstado(estadoInicial),
        'Estado Final',
        stringEstado(estadoFinal),
        `Tempo: ${resultado.getTempo()}`,
        `Nodos da Àrvore: ${resultado.getArvore().getNumeroNodos()}`
    ].join('\n'))
}

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

terminal.question(`Informe no seguinte formato: 'movimentos|método-de-busca'\n\n`
    + `- 'movimentos' é o número de movimentos para embaralhar.\n`
    + `- 'método-de-busca' é o método que você deseja usar para resolver o quebra-cabeça.\n`
    + `  Escolha um dos seguintes métodos:\n`
    + `  1 - Busca Horizontal\n`
    + `  2 - A* com Peças Fora do Lugar\n`
    + `  3 - A* com Peças Fora do Lugar e Distância de Manhattan\n`
    + `Exemplo de entrada: 10|2 (para embaralhar 10 vezes usando o método 2)\n`,
    (resposta) => {

        [movimentos, metodo] = resposta.split('|');

        gerarResultado(movimentos, metodo);

        terminal.close();
    });