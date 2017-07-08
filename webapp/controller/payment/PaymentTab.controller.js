sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController',
		'sap/ui/model/json/JSONModel'
	],
	function (BaseController, JSONModel) {
	
		'use strict';

		var Controller = BaseController.extend('ui5.mobile.app.controller.payment.PaymentTab');
		
		Controller.prototype.onInit = function () {
		};

		Controller.prototype.onBeforeRendering = function () {
		};

		return Controller;
	}
);