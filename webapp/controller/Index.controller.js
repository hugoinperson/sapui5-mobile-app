sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui5.mobile.app.controller.Index", {
		
		onInit: function () {
			this.coreBus = sap.ui.getCore().getEventBus();
		},

		onBeforeRendering: function () {
			this._oLayoutModel = this.getOwnerComponent().getModel("layout");
			this.getView().setModel(this._oLayoutModel, "layoutModel");
			
			// Only run on mobile phone
			var deviceInfo = this.getOwnerComponent().getModel("device").getData();
			if (!deviceInfo.system.phone) {
				this.coreBus.publish("app", "routing", {route: "notPhone"});
			}
		}

	});
});