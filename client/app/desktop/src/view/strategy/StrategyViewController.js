Ext.define('StockPortfolio.view.strategy.StrategyViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.strategyviewcontroller',
    requires: [
    ],


    onRemoveClick: function (view, recIndex, cellIndex, item, e, record) {
        record.drop();
    },
    onAddClick: function () {
        var view = this.getView(),
            rec = new Strategy({
                name: '',
            });

        view.store.insert(0, rec);
        view.findPlugin('rowediting').startEdit(rec, 0);
    },
    renderIncome: function (value, meta) {
        return this.renderSigned(value, '0.00', meta);
    },
    renderIncomePercent: function (value, meta) {
        return this.renderSigned(value, '0.00%', meta);
    },

    renderSigned: function (value, format, meta) {
        var text = Ext.util.Format.number(value, format);
        if (parseFloat(value) > 0.0) {
            meta.style = "color:green;";
        } else {
            meta.style = "color:red;";
        }
        return text;
    },
   /* onUpdateData: function ()  {
    //onBeforeShow: function (_this, eOpts) {
        let store = Ext.data.StoreManager.lookup('strategyStore');
        if (store !== undefined) {
            Ext.Ajax.request({
                url: StockPortfolio.util.Config.getServerPath('strategy')
            }).then(function (response, opts) {
                var records = Ext.decode(response.responseText);
                for (item of store.data.items) {
                    let record = records.find((el) => {
                        return el.id === item.data.id;
                    })
                    if (record !== undefined) {
                        item.set({
                            income: record.income * 2,
                            incomePrc: 222.12//record.incomePrc
                        })
                        let a = 1;
                    }
                }
            })
        }
    },*/
    /*onUpdateData: function () {
        let store = Ext.data.StoreManager.lookup('strategyStore');
        if (store !== undefined) {
            for (item of store.data.items) {
                item.set("incomePrc", 111);
                //item.load()
            }

        }
    }*/
});
