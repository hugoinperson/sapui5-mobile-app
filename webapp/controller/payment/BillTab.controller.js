sap.ui.define(
	[
		'ui5/mobile/app/control/BaseController',
		'sap/ui/model/json/JSONModel'
	],
	function (BaseController, JSONModel) {
	
		'use strict';

		var Controller = BaseController.extend('ui5.mobile.app.controller.payment.BillTab');
		
		Controller.prototype.onInit = function () {
			this._aMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			this._aMonthAbbrNames = ["Ja", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
			this._oGraphModel = new JSONModel();
			this._oBillTabConfigModel = new JSONModel(this._getConfigData(new Date()));
			this.getView().setModel(this._oBillTabConfigModel, 'billTabConfigModel');	
		};

		Controller.prototype.onBeforeRendering = function () {
			this._oGraph = this.getView().byId('ui5Mobile-usageHistoryChart');
			this._setGraphData();
		};

		Controller.prototype._setGraphData = function () {
			var config = this._oBillTabConfigModel.getData();
			this._oGraphModel.setData(this._getMockData(config.currentMonth + 1, config.currentYear));
			this._oGraph.setDataModel(this._oGraphModel);
			setTimeout(function () {
				this._oGraph.refreshChart();
			}.bind(this), 0);
		};

		Controller.prototype._getConfigData = function (currentDate) {
			return {
				currentMonth: currentDate.getMonth(),
				currentYear: currentDate.getFullYear(),
				currentMonthName: this._aMonthNames[currentDate.getMonth()],
				beginMonthAbbrName: this._aMonthAbbrNames[currentDate.getMonth()],
				endMonthAbbrName: this._aMonthAbbrNames[(currentDate.getMonth() + 1) % 12]
			};
		};

		Controller.prototype._getDaysInMonth = function (month, year) {
			return new Date(year, month, 0).getDate();
		}

		Controller.prototype._getMockData = function (month, year) {
			var data = [];
			var days = this._getDaysInMonth(month, year);
			for (var i = 1; i <= days ; i++) {
				data.push({
					kwhUsage: Math.floor(Math.random() * 60) + 1,
					gasUsage: Math.floor(Math.random() * 40) + 1,
					meterReadDate: month + '/' + i + '/' + year
				});
			}
			return {data: data};
		};

		Controller.prototype._setNewTime = function (bNextMonth) {
			var config = this._oBillTabConfigModel.getData();
			var currentDate = new Date((config.currentMonth + 1) + '/01/' + config.currentYear);
			var newDate = new Date(currentDate.setMonth(bNextMonth ? config.currentMonth + 1 : config.currentMonth - 1));
			this._oBillTabConfigModel.setData(this._getConfigData(newDate));
		};

		Controller.prototype.onSelectMonthPrev = function () {
			this._setNewTime(false);
			this._setGraphData();
		};

		Controller.prototype.onSelectMonthNext = function () {
			this._setNewTime(true);
			this._setGraphData();
		};

		return Controller;
	}
);