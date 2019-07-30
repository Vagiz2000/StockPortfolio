Ext.define('StockPortfolio.view.stock.StockViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockviewstore',
    storeId: 'stockStore',
    model: 'Stock',
    proxy: {
        type: 'rest',
        url: StockPortfolio.util.Config.getServerPath('stocks'),
        reader: {
            type: 'json',
        },        
    },
    autoLoad: true,
    autoSync: true,
    listeners: {
        'update':function(_this,record, operation, modifiedFieldNames, details, eOpts ) {
            if (operation === Ext.data.Model.EDIT && modifiedFieldNames.includes("name")) {
                var store = Ext.data.StoreManager.lookup('portfolioStore'); 
                if (store !== undefined) {
                    let records = store.queryRecords("stockId",record.data.id);
                    for (portfolio of records) {
                        portfolio.set("stockName",record.data.name);
                    }
                }
            }
        },
        'remove' : function(store, records, index, isMove, eOpts) {
            var store = Ext.data.StoreManager.lookup('portfolioStore'); 
            if (store !== undefined) {
                let toDelete = [];
                for (record of records) {
                    toDelete = toDelete.concat(store.queryRecords("stockId",record.data.id));
                }
                store.remove(toDelete);
            }
        }
    },
});
