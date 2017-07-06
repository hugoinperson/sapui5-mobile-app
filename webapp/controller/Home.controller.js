sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui5.mobile.app.controller.Home", {
		
		onInit: function () {
			console.log('home');
		},

		onLogout: function () {
			sap.ui.getCore().getEventBus().publish("app", "routing", {route: "login"});
		}

	});
});