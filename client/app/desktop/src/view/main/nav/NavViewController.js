Ext.define("StockPortfolio.view.main.nav.NavViewController", {
  extend: "Ext.app.ViewController",
  alias: "controller.navviewcontroller",

  init: function() {
    var me = this;
  },
  destroy: function() {},
  initViewModel: function(vm) {},

  onMenuViewSelectionChange: function(tree, node) {
    if (!node) {
      return;
    }
    this.getView().setSelection(node);
    this.fireViewEvent("select", node);
  },
  onMenuLoad: function(store) {},
  updateSelection: function(record) {
    this.lookup("menuview").setSelection(record);
  },
  updateMicro: function(micro) {
    this.lookup("menuview").setMicro(micro);
    this.getView().setWidth(micro ? 44 : 300);
    this.lookup("bottomview").setHidden(micro);
  },

  onTopViewNavToggle: function(button) {
    this.getView().setMicro(!this.getView().getMicro());
  },

});