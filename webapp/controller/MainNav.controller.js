sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend('ui5.mobile.app.controller.MainNav', {
		
		onInit: function () {
			this.coreBus = sap.ui.getCore().getEventBus();
			this._oMainNavConfigModel = new JSONModel(this._initConfigData())
			this.getView().setModel(this._oMainNavConfigModel, 'mainNavConfigModel');
		},

		onBeforeRendering: function () {
			var sRouteName = this.getOwnerComponent().getCurrentRoute();
			this._oMainNavConfigModel.setProperty('/title', this._getTitleByRoute(sRouteName));
		},

		_initConfigData: function () {
			return {
				title: 'Home'
			};
		},

		_getTitleByRoute: function (sRouteName) {
			var titleRouteMap = {
				payment: 'Pay My Bill'
			};
			return titleRouteMap[sRouteName];
		},

		onNavBack: function () {
			this.coreBus.publish("app", "routing", {route: "login"});
		}

	});
});