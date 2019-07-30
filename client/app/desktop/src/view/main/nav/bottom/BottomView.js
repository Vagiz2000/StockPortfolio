Ext.define('StockPortfolio.view.main.nav.bottom.BottomView', {
	extend: 'Ext.Toolbar',
	xtype: 'bottomview',
	cls: 'bottomview',
  defaults: {
    ui:'toolbutton-toolbar', 
    handler:'onToolButtonClicked'
  },	
});