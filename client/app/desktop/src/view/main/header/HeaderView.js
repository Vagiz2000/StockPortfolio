Ext.define('StockPortfolio.view.main.header.HeaderView', {
  extend: 'Ext.toolbar.Toolbar',
  height: 50,
  xtype: 'headerview',
  cls: 'headerview',
  defaults: {
    ui:'toolbutton-toolbar', 
    handler:'onToolButtonClicked'
  },
  items: [
    {
      xtype: 'button',
      ui: 'toolbutton-toolbar',
      reference: 'navtoggle',
      handler: 'onHeaderViewNavToggle',
      iconCls: 'x-fa fa-navicon'
    },
    {
      xtype: 'component',
      bind: {html: '{heading}'},
    },
    '->',
    '->',    
  ]
});
