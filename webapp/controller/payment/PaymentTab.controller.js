sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController',
		'sap/ui/model/json/JSONModel'
	],
	function (BaseController, JSONModel) {
	
		'use strict';

		var Controller = BaseController.extend('ui5.mobile.app.controller.payment.PaymentTab');
		
		Controller.prototype.onInit = function () {
			this._oPaymentCarousel = this.getView().byId('ui5Mobile-paymentTab-carousel');
		};

		Controller.prototype.onBeforeRendering = function () {
		};

		Controller.prototype.onPaymentPrev = function () {
			this._oPaymentCarousel.previous();
		};

		Controller.prototype.onPaymentNext = function () {
			this._oPaymentCarousel.next();
		};

		Controller.prototype.onPayment = function () {
			this.navTo('paymentConfirmed');
		};

		return Controller;
	}
);