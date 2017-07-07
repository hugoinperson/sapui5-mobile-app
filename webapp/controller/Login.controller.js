sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui5.mobile.app.controller.Login", {
		
		onInit: function () {
			this.coreBus = sap.ui.getCore().getEventBus();
		},

		onLogin: function () {
			this.coreBus.publish("app", "routing", {route: "payment"});
		}

	});
});