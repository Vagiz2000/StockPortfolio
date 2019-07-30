Ext.define('StockPortfolio.view.strategy.StrategyView',{
	extend: 'Ext.grid.Panel',
	xtype: 'strategyview',
    cls: 'strategyview',
    id:'strategyView',
	requires: [],
	controller: 'strategyviewcontroller',
    viewModel: {type: 'strategyviewmodel'},
    tbar: [
        {
         xtype: 'button',
         text: 'Add Strategy',
         handler: 'onAddClick'
        },
       /* {
            xtype: 'button',
            text: 'Update Data',
            handler: 'onUpdateData'
        }*/
],
    plugins: {
        rowediting: {
            clicksToMoveEditor: 1,
            autoCancel: false
        }
    },
	store: {type: 'strategyviewstore'},
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
			text: 'Income',
			dataIndex: 'income',
			width: 200,
            cell: {userCls: 'bold'},          
            renderer: 'renderIncome',        
        },
        { 
            id : "incomePrcColumn",
			text: 'Income %',
			dataIndex: 'incomePrc',
			width: 200,
            cell: {userCls: 'bold'},  
            renderer: 'renderIncomePercent',        
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
    listeners : {
        //'beforeActivate' : 'onBeforeActivate',
      //  'beforeShow' : 'onBeforeShow'
    }	
});

