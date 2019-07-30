Ext.define('StockPortfolio.view.stock.StockViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.stockviewcontroller',
	requires:[
	],

	
	onRemoveClick: function (view, recIndex, cellIndex, item, e, record) {
        record.drop();
    },
	onAddClick:function() {
		var view = this.getView(),
            rec = new Stock({
				name: '',
				ticker:''
            });

        view.store.insert(0, rec);
		view.findPlugin('rowediting').startEdit(rec, 0);		
	}
});
