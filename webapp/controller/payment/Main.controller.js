sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController',
		'sap/ui/model/json/JSONModel'
	],
	function (BaseController, JSONModel) {
	
		'use strict';

		var Controller = BaseController.extend('ui5.mobile.app.controller.payment.Main');
		
		Controller.prototype.onInit = function () {
			var that = this;

			this.coreBus = sap.ui.getCore().getEventBus();
			this.pagesContainer = this.getView().byId('ui5Mobile-payment-pagesContainer');

			// model for data binding in view
			this._oPaymentConfigModel = new JSONModel();
			this.getView().setModel(this._oPaymentConfigModel, 'paymentConfigModel');
			
			// add browser event to each icon tab
			this._oNavBar = this.getView().byId('ui5Mobile-paymentNavBar');
			this._oNavBar.getItems().forEach(function (iconTab) {
				iconTab.attachBrowserEvent('click', that.onIconTabClicked);
			});

			this.onIconTabClicked.bind(this)
		};

		Controller.prototype.onBeforeRendering = function () {
			BaseController.prototype.onBeforeRendering.call(this, arguments);

			this._resetTabs();
		};

		Controller.prototype._resetTabs = function () {
			this._clearTabs();
			this._oPaymentConfigModel.setProperty('/BillTab', true);
			this._renderage();
		};

		Controller.prototype._clearTabs = function () {
			this._oPaymentConfigModel.setData({
				BillTab: false,
				PaymentTab: false,
				SettingsTab: false
			});
		};

		Controller.prototype._renderage = function () {
			var that = this;
			var pages = this.pagesContainer.getPages();
			var tabConfig = this._oPaymentConfigModel.getData();

			pages.forEach(function (page) {
				var tabName = page.data('tabPageName');
				if (tabConfig[tabName]) {
					that.pagesContainer.to(page, 'show');
				}
			});
		};

		Controller.prototype.onLogout = function () {
			this.coreBus.publish('app', 'routing', {route: 'login'});
		};

		// TODO: need to re-write this
		Controller.prototype.onIconTabClicked = function (oEvent, a, b) {
			var key = this.data('key');
			var controller = this.getParent().getParent().getController();
			
			controller._clearTabs();
			controller._oPaymentConfigModel.setProperty('/' + key, true);
			controller._renderage();
		};

		return Controller;
	}
);