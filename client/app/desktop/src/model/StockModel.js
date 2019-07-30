Ext.define('Stock', {
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
            name: 'ticker',
            type: 'string',
            validators: [{
                type: 'presence'
            }]
        },
        {
            name: 'price',
            type: 'float',
            validators: [{
                type: 'presence'
            }],
            validate: function (value, separator, errors, record) {
                if (value <= 0)
                    return "Price must be positive";

                return true;
            }
        }]
});

