sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui5.mobile.app.controller.Index", {
		
		onInit: function () {
			sap.ui.Device.media.attachHandler( function (oParam) {
				// console.log(oParam.name === 'Phone');
			}.bind(this), null, sap.ui.Device.media.RANGESETS.SAP_STANDARD);
		},

		onBeforeRendering: function () {
			this._oLayoutModel = this.getOwnerComponent().getModel("layout");
			this.getView().setModel(this._oLayoutModel, "layoutModel");
		}

	});
});