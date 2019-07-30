Ext.define('Strategy', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'integer',
        },
        {
            name: 'name',
            type: 'string',
            validators: [{
                type: 'presence'
            }]
        },
        {
            name: 'income',
            type: 'float',
            persist:false
        },
        {
            name: 'incomePrc',
            type: 'float',
            persist:false
        }
    ],
    proxy: {
        type: 'rest',
        url: StockPortfolio.util.Config.getServerPath('strategy'),
        reader: {
            type: 'json',
        },        
    },
});

