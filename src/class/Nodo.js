class Nodo {
    pai;
    valor;
    filhos;

    /**
     * 
     * @param {*} valor 
     * @param {Nodo|null} pai 
     */
    constructor(valor, pai = null) {
        this.valor = valor;
        this.pai = pai;
        this.filhos = [];
    }

    getValor() {
        return this.valor;
    }

    addFilho(valor) {
        this.filhos.push(new Nodo(valor, this));
        return this;
    }

    setFilhos(filhos) {
        this.filhos = filhos;
        return this;
    }

    getFilhos() {
        return this.filhos;
    }

    getNivel() {
        return this.pai ? this.pai.getNivel() + 1 : 0;
    }
}

module.exports = Nodo;