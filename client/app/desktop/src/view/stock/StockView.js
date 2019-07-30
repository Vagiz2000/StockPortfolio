Ext.define('StockPortfolio.view.stock.StockView',{
	extend: 'Ext.grid.Panel',
	xtype: 'stockview',
	cls: 'stockview',
	requires: [],
	controller: 'stockviewcontroller',
    viewModel: {type: 'stockviewmodel'},
    tbar: [{
         xtype: 'button',
         text: 'Add Stock',
         handler: 'onAddClick'
    }],
    plugins: {
        /*cellediting: {
            clicksToEdit: 1
        },*/
        rowediting: {
            clicksToMoveEditor: 1,
            autoCancel: false
        }
    },
	store: {type: 'stockviewstore'},
	columns: [
		{ 
			text: 'Name',
			dataIndex: 'name',
			width: 200,
            cell: {userCls: 'bold'},
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            text: 'Ticker',
            dataIndex: 'ticker',
			width: 100,
			editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            text: 'Price',
            dataIndex: 'price',
			width: 100,
			editor: {
                xtype: 'numberfield',
                allowBlank: false
            }
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            sortable: false,
            menuDisabled: true,
            items: [{
                iconCls: 'x-fa fa-times',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    grid.getStore().removeAt(rowIndex)
                }
            }]
        }		
	],
	listeners: {
		//select: 'onItemSelected'
	}
});

