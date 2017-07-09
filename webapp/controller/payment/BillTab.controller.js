sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController',
		'sap/ui/model/json/JSONModel'
	],
	function (BaseController, JSONModel) {
	
		'use strict';

		var Controller = BaseController.extend('ui5.mobile.app.controller.payment.BillTab');
		
		Controller.prototype.onInit = function () {
			this._oGraphModel = new JSONModel();
		};

		Controller.prototype.onBeforeRendering = function () {
			this._oGraph = this.getView().byId('ui5Mobile-usageHistoryChart');
			this._oGraphModel.setData(this._getMockData());
			this._oGraph.setDataModel(this._oGraphModel);
		};

		Controller.prototype._getMockData = function () {
			return {
				data: [
					{kwhUsage: 30, gasUsage: 20, meterReadDate: '06/01/2017'},
					{kwhUsage: 40, gasUsage: 22, meterReadDate: '06/02/2017'},
					{kwhUsage: 28, gasUsage: 23, meterReadDate: '06/03/2017'},
					{kwhUsage: 24, gasUsage: 25, meterReadDate: '06/05/2017'},
					{kwhUsage: 34, gasUsage: 22, meterReadDate: '06/06/2017'},
					{kwhUsage: 36, gasUsage: 20, meterReadDate: '06/07/2017'},
					{kwhUsage: 32, gasUsage: 24, meterReadDate: '06/08/2017'},
					{kwhUsage: 30, gasUsage: 28, meterReadDate: '06/09/2017'},
					{kwhUsage: 23, gasUsage: 26, meterReadDate: '06/10/2017'},
					{kwhUsage: 20, gasUsage: 24, meterReadDate: '06/11/2017'},
					{kwhUsage: 19, gasUsage: 21, meterReadDate: '06/12/2017'},
					{kwhUsage: 24, gasUsage: 20, meterReadDate: '06/13/2017'},
					{kwhUsage: 22, gasUsage: 19, meterReadDate: '06/14/2017'},
					{kwhUsage: 18, gasUsage: 16, meterReadDate: '06/15/2017'},
					{kwhUsage: 12, gasUsage: 18, meterReadDate: '06/16/2017'},
					{kwhUsage: 10, gasUsage: 20, meterReadDate: '06/17/2017'},
					{kwhUsage: 26, gasUsage: 22, meterReadDate: '06/18/2017'},
					{kwhUsage: 28, gasUsage: 23, meterReadDate: '06/19/2017'},
					{kwhUsage: 30, gasUsage: 25, meterReadDate: '06/20/2017'},
					{kwhUsage: 33, gasUsage: 28, meterReadDate: '06/21/2017'},
					{kwhUsage: 36, gasUsage: 25, meterReadDate: '06/22/2017'},
					{kwhUsage: 38, gasUsage: 23, meterReadDate: '06/23/2017'},
					{kwhUsage: 40, gasUsage: 21, meterReadDate: '06/24/2017'},
					{kwhUsage: 46, gasUsage: 20, meterReadDate: '06/25/2017'},
					{kwhUsage: 42, gasUsage: 18, meterReadDate: '06/26/2017'},
					{kwhUsage: 40, gasUsage: 16, meterReadDate: '06/27/2017'},
					{kwhUsage: 43, gasUsage: 14, meterReadDate: '06/28/2017'},
					{kwhUsage: 44, gasUsage: 16, meterReadDate: '06/29/2017'},
					{kwhUsage: 50, gasUsage: 20, meterReadDate: '06/30/2017'}
				]
			};
		};

		return Controller;
	}
);