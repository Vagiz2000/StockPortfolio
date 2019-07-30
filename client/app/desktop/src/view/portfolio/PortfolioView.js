Ext.define('StockPortfolio.view.portfolio.PortfolioView',{
	extend: 'Ext.grid.Panel',
	xtype: 'portfolioview',
	cls: 'portfolioview',
	requires: [],
	controller: 'portfolioviewcontroller',
    viewModel: {type: 'portfolioviewmodel'},
    tbar: [{
         xtype: 'button',
         text: 'Add Stock to Portfolio',
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
	store: {type: 'portfolioviewstore'},
	columns: [	       
        { 
			text: 'Stock',
			dataIndex: 'stockId',
			width: 200,
            cell: {userCls: 'bold'},
            editor: {
                xtype: 'combo',
                displayField : 'name',
                valueField : 'id',
                allowBlank: false,
                queryMode: 'remote',
                store : {
                    type : 'stockviewstore',
                }    
            },
            renderer: function(fieldValue, cellValues, record, recordIndex, fullIndex, dataSource){
                return record.data.stockName
                //return fieldValue
            }
        },
        { 
			text: 'Count',
			dataIndex: 'count',
			width: 200,
            cell: {userCls: 'bold'},
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            }
        },  
        { 
			text: 'Buy Price',
			dataIndex: 'buyPrice',
			width: 200,
            cell: {userCls: 'bold'},
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            }
        },
        { 
			text: 'Strategy',
			dataIndex: 'strategyId',
			width: 200,
            cell: {userCls: 'bold'},
            editor: {
                xtype: 'combo',
                displayField : 'name',
                valueField : 'id',
                allowBlank: false,
                queryMode: 'remote',
                store : {
                    type : 'strategyviewstore',
                }    
            },
            renderer: function(fieldValue, cellValues, record, recordIndex, fullIndex, dataSource){
                return record.data.strategyName
                //return fieldValue
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

