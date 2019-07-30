Ext.define('Portfolio', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'integer'
        },
        {
            name: 'count',
            type: 'integer',
            validators: [{
                type: 'presence'
            }],
            validate: function (value, separator, errors, record) {
                if (value <= 0)
                    return "Count must be positive";

                return true;
            }
        },
        {
            name: 'buyPrice',
            type: 'float',
            validators: [{
                type: 'presence'
            }],
            validate: function (value, separator, errors, record) {
                if (value <= 0)
                    return "Price must be positive";

                return true;
            }
        },
        {
            name: 'stockId',
            type: 'integer',
            validators: [{
                type: 'presence'
            }],
            //reference: 'Stock'
        },
        {
            name:'stockName',
            type:'string',
            persist:false
        },
        {
            name: 'strategyId',
            type: 'integer',
            validators: [{
                type: 'presence'
            }],
        },
        {
            name:'strategyName',
            type:'string',
            persist:false
        }
    ],
});