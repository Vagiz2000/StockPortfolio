Ext.define("StockPortfolio.util.Config",{
    singleton : true,
    version:'1.0',
    config: {
        serverPath:'http://localhost:8081',
    },
    constructor : function(config) {
        this.initConfig(config);
    },
    getServerPath(path) {
        return this.config.serverPath + '/' + path;
    },
});