Ext.define('StockPortfolio.view.portfolio.PortfolioViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.portfolioviewcontroller',

	onRemoveClick: function (view, recIndex, cellIndex, item, e, record) {
        record.drop();
    },
	onAddClick:function() {
		var view = this.getView(),
            rec = new Portfolio({
				//name: '',
                //ticker:''
                count : 0
            });

        view.store.insert(0, rec);
		view.findPlugin('rowediting').startEdit(rec, 0);
	},	
});
