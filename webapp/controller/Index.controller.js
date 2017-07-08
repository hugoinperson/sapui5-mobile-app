sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController'
	],
	function (BaseController) {
	
		'use strict';

		var Controller = BaseController.extend("ui5.mobile.app.controller.Index");
		
		Controller.prototype.onInit = function () {
			BaseController.prototype.onInit.call(this, arguments);			
		};

		Controller.prototype.onBeforeRendering = function () {
			BaseController.prototype.onBeforeRendering.call(this, arguments);
			
			this._oLayoutModel = this.getOwnerComponent().getModel("layout");
			this.getView().setModel(this._oLayoutModel, "layoutModel");
		};

		return Controller;
	}
);