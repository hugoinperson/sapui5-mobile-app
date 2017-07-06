sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui5.mobile.app.controller.Login", {
		
		onInit: function () {
			console.log('please log in');
		},

		onLogin: function () {
			sap.ui.getCore().getEventBus().publish("app", "routing", {route: "home"});
		}

	});
});