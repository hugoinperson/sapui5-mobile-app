sap.ui.define(
	[
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller'
	],
	function ($, Controller) {
		
		'use strict';

		var BaseController = Controller.extend('ui5.mobile.app.control.BaseController', {
			constructor: function () {
				Controller.prototype.constructor.apply(this, arguments);
			}
		});

		BaseController.prototype.onInit = function () {
			// Only run on mobile phone
			sap.ui.Device.media.attachHandler( function (oParam) {
				if (oParam.name !== 'Phone') {
					this.navTo('notPhone');
				}
			}.bind(this), null, sap.ui.Device.media.RANGESETS.SAP_STANDARD);
		};

		BaseController.prototype.onBeforeRendering = function () {
			// Only run on mobile phone
			var deviceInfo = this.getOwnerComponent().getModel("device").getData();
			if (!deviceInfo.system.phone) {
				this.navTo('notPhone');
			}
		};

		BaseController.prototype.navTo = function (sName, oParameters, bReplace) {
			var oRouter = this._getRouter();
			var oRouteParams = oParameters || {};
			var bHistReplace = bReplace || false;

			if (sName === 'login' || sName === 'notPhone') {
				this.getOwnerComponent().useSplashLayout();
			} else {
				this.getOwnerComponent().useMainLayout();
			}

			this.getOwnerComponent().setCurrentRoute(sName);
			setTimeout(function () {
				oRouter.navTo(sName, oRouteParams, bHistReplace);
			}.bind(this), 0);
		};

		BaseController.prototype._getRouter = function () {
			if (!this._oRouter) this._oRouter = this.getOwnerComponent().getRouter();
			return this._oRouter;
		};

		return BaseController;
	}
);