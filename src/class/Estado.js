class Estado {

    valorHeuristico = null;

    setValorHeuristico(valor) {
        this.valorHeuristico = valor;
        return this;
    }

    getValorHeuristico() {
        return this.valorHeuristico;
    }

    /**
     * 
     * @param {Estado} estado
     * @returns bool
     */
    isIgual(estado) {
        return true;
    }
}

module.exports = Estado;