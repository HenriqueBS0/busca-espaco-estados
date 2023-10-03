class PosicaoMatriz {
    linha;
    coluna;

    constructor(linha, coluna) {
        this.linha = linha;
        this.coluna = coluna;
    }

    setLinha(linha) {
        this.linha = linha; 
        return this;
    }

    setColuna(coluna) {
        this.coluna = coluna; 
        return this;
    }

    getLinha() {
        return this.linha;
    }

    getColuna() {
        return this.coluna;
    }
}

module.exports = PosicaoMatriz;