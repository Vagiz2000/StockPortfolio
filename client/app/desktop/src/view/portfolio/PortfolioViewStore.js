Ext.define('StockPortfolio.view.portfolio.PortfolioViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.portfolioviewstore',
    storeId: 'portfolioStore',
    model: 'Portfolio',
    proxy: {
        type: 'rest',
        url: StockPortfolio.util.Config.getServerPath('portfolio'),
        reader: {
            type: 'json',
        },
    },
    autoLoad: true,
    autoSync: true,
    listeners: {
        'update': function (_this, record, operation, modifiedFieldNames, details, eOpts) {
            var store = Ext.data.StoreManager.lookup('strategyStore');
            if (store !== undefined) {
            }
        }
    },
});
