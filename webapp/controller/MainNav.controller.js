sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController',
		'sap/ui/model/json/JSONModel'
	],
	function (BaseController, JSONModel) {
	
		'use strict';

		var Controller = BaseController.extend('ui5.mobile.app.controller.MainNav');

		Controller.prototype.onInit = function () {
			this._oMainNavConfigModel = new JSONModel(this._initConfigData())
			this.getView().setModel(this._oMainNavConfigModel, 'mainNavConfigModel');	
		};

		Controller.prototype.onBeforeRendering = function () {
			var sRouteName = this.getOwnerComponent().getCurrentRoute();
			this._oMainNavConfigModel.setProperty('/title', this._getTitleByRoute(sRouteName));
		};

		Controller.prototype._initConfigData = function () {
			return {
				title: 'Home'
			};
		};

		Controller.prototype._getTitleByRoute = function (sRouteName) {
			var titleRouteMap = {
				payment: 'Pay My Bill'
			};
			return titleRouteMap[sRouteName];
		};

		Controller.prototype.onNavBack = function () {
			this.navTo('login');
		};

		return Controller;
	}
);