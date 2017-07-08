sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController'
	],
	function (BaseController) {
	
		'use strict';

		var Controller = BaseController.extend('ui5.mobile.app.controller.Login');

		Controller.prototype.onInit = function () {
		};

		Controller.prototype.onBeforeRendering = function () {
			BaseController.prototype.onBeforeRendering.call(this, arguments);
		};

		Controller.prototype.onLogin = function () {
			this.navTo('payment');
		};

		return Controller;
	}
);