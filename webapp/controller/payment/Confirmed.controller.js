sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController',
		'sap/ui/model/json/JSONModel'
	],
	function (BaseController, JSONModel) {
	
		'use strict';

		var Controller = BaseController.extend('ui5.mobile.app.controller.payment.Confirmed');
		
		Controller.prototype.onInit = function () {
		};

		Controller.prototype.onBeforeRendering = function () {
			BaseController.prototype.onBeforeRendering.call(this, arguments);
		};
		
		return Controller;
	}
);