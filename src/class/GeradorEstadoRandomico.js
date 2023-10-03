const Estado = require("./Estado");
const GeradorEstados = require("./GeradorEstados");

module.exports = class GeradorEstadoRandomico {
    
    /**
     * @param {Estado} estadoSemente 
     * @param {GeradorEstados} geradorEstados 
     * @param {Number} movimentacoes
     * @returns {Estado}
     */
    static gerar(estadoSemente, geradorEstados, movimentacoes) {
        const estados = geradorEstados.gerar(estadoSemente);
        const indiceEstado = [Math.floor(Math.random() * estados.length)];
        
        /**
         * @type {Estado}
         */
        const estado = estados[indiceEstado];

        if(movimentacoes === 1) {
            return estado;
        }

        return this.gerar(estado, geradorEstados, movimentacoes - 1);
    }
}