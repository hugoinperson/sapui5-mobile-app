/*global sap, d3*/
sap.ui.define(
	[
		'jquery.sap.global',
		'sap/ui/core/Control',
		'sap/ui/thirdparty/d3'
	],
	function ($, Control, d3) {
		'use strict';

		var CustomControl = Control.extend('ui5.mobile.app.control.UsageHistoryChart', {
			metadata: {
				properties: {
					width: { type: 'int', defaultValue: 380 },
					height: { type: 'int', defaultValue: 200 }
				}
			},

			renderer: function (oRm, oCustomControl) {
				oRm.write('<div');
				oRm.writeControlData(oCustomControl);
				oRm.addClass('ui5Mobile-usageHistoryChart');
				oRm.writeClasses();
				oRm.write('>');
				oRm.write('</div>');
			}
		});

		CustomControl.prototype.onInit = function () {};
		
		CustomControl.prototype.onBeforeRendering = function () {};

		CustomControl.prototype.onAfterRendering = function () {
			this._createChart();
		};

		CustomControl.prototype.onExit = function () {
			this._oDataModel = null;
		};

		CustomControl.prototype.refreshChart = function () {
			this.rerender();
		};

		CustomControl.prototype.setDataModel = function (model) {
			this._oDataModel = model;
			return this;
		};

		CustomControl.prototype.getDataModel = function () {
			return this._oDataModel;
		};

		CustomControl.prototype._getDataSet = function () {
			if (!this.getDataModel()) {
				return [];
			}
			var dataPoints = this.getDataModel().getData().data;
			var dateParser = d3.time.format('%x').parse;

			return dataPoints.map(function (data) {
				return {
					gasUsage: data.gasUsage,
					kwhUsage: data.kwhUsage,
					meterReadDate: dateParser(data.meterReadDate)
				};
			}, this);
		};

		CustomControl.prototype._createChart = function () {
			var oMargin = { top: 20, right: 20, bottom: 20, left: 20 };
			var width = this.getWidth() - oMargin.left - oMargin.right;
			var height = this.getHeight() - oMargin.top - oMargin.bottom;
			var dataSet = this._getDataSet();
			
			if (!dataSet || dataSet.length <= 0) {
				return;
			}
			
			// Create a canvas with margin
			var oCanvas = d3.select('#' + this.getId())
				.append('svg')
				.attr('width', this.getWidth())
				.attr('height', this.getHeight())
				.append('g')
				.attr('transform', 'translate(' + [oMargin.left, oMargin.top] + ')');

			// Base X scale - meter reading date
			var xScaleDomain = d3.extent(dataSet, function (data) {
				return data.meterReadDate;
			});
			xScaleDomain[0] = new Date(xScaleDomain[0].getFullYear(), xScaleDomain[0].getMonth(), 1); // Beginning of month of smallest date
			xScaleDomain[1] = new Date(xScaleDomain[1].getFullYear(), xScaleDomain[1].getMonth() + 1, 0); // End of month of biggest date

			var xScale = d3.time.scale().domain(xScaleDomain).range([0, width]);

			// Base Y scale
			var yAxisTickSize = 5;
			var maxKwhUsage = d3.max(dataSet, function (data) { return data.kwhUsage; });
			var maxGasUsage = d3.max(dataSet, function (data) { return data.gasUsage; });
			var maxUsage = Math.max(maxKwhUsage, maxGasUsage);

			var yScale = d3.scale.linear().domain([0, maxUsage + (yAxisTickSize - (maxUsage % yAxisTickSize))]).range([height, 0]);

			// kwh usage line
			var usageLine1 = d3.svg.line()
				.interpolate('monotone')
				.x(function (data) {
					return xScale(data.meterReadDate);
				})
				.y(function (data) {
					return yScale(data.kwhUsage);
				});
			
			// gas usage line
			var usageLine2 = d3.svg.line()
				.interpolate('monotone')
				.x(function (data) {
					return xScale(data.meterReadDate);
				})
				.y(function (data) {
					return yScale(data.gasUsage);
				});

			oCanvas.append('g').append('path')
				.attr('d', usageLine1(dataSet))
				.attr('class', 'ui5Mobile-usageHistoryChart-kwhUsageLine');

			oCanvas.append('g').append('path')
				.attr('d', usageLine2(dataSet))
				.attr('class', 'ui5Mobile-usageHistoryChart-gasUsageLine');

			// kwh usage data points
			var kwhUsageDataPoint = oCanvas.append('g').selectAll('circle.ui5Mobile-usageHistoryChart-kwhUsageDataPoint')
				.data(dataSet)
				.enter()
				.append('circle')
				.attr('r', '3')
				.attr('cx', function (data) {
					return xScale(data.meterReadDate);
				})
				.attr('cy', function (data) {
					return yScale(data.kwhUsage);
				})
				.attr('class', 'ui5Mobile-usageHistoryChart-kwhUsageDataPoint');

			// kwh usage data points
			var gasUsageDataPoint = oCanvas.append('g').selectAll('circle.ui5Mobile-usageHistoryChart-gasUsageDataPoint')
				.data(dataSet)
				.enter()
				.append('circle')
				.attr('r', '3')
				.attr('cx', function (data) {
					return xScale(data.meterReadDate);
				})
				.attr('cy', function (data) {
					return yScale(data.gasUsage);
				})
				.attr('class', 'ui5Mobile-usageHistoryChart-gasUsageDataPoint');

			// kwh usage data point tooltip
			var kwhUsageDataPointTooltip = oCanvas.append('g')
				.attr('class', 'ui5Mobile-usageHistoryChart-kwhUsageDataPointTooltip')
				.style('display', 'none');

			// gas usage data point tooltip
			var gasUsageDataPointTooltip = oCanvas.append('g')
				.attr('class', 'ui5Mobile-usageHistoryChart-gasUsageDataPointTooltip')
				.style('display', 'none');

			// kwh usage data point tooltip background
			kwhUsageDataPointTooltip.append('path')
				.attr('d', 'M1,16 C1,7.71572875 7.71655983,1 15.9980512,1 L86.0019488,1 C94.2851438,1 101,7.71390727 101,16 L101,16 C101,24.2842712 94.2823898,31 86.0015316,31 L59.3333333,31 L51,41 L42.6666667,31 L15.9984684,31 C7.71504305,31 1,24.2860927 1,16 L1,16 Z');

			// gas usage data point tooltip background
			gasUsageDataPointTooltip.append('path')
				.attr('d', 'M1,16 C1,7.71572875 7.71655983,1 15.9980512,1 L86.0019488,1 C94.2851438,1 101,7.71390727 101,16 L101,16 C101,24.2842712 94.2823898,31 86.0015316,31 L59.3333333,31 L51,41 L42.6666667,31 L15.9984684,31 C7.71504305,31 1,24.2860927 1,16 L1,16 Z');

			// kwh usage data point tooltip text
			kwhUsageDataPointTooltip.append('text').attr('dy', '0.35em');

			// gas usage data point tooltip text
			gasUsageDataPointTooltip.append('text').attr('dy', '0.35em');

			function onKwhDataPointMouseOver(data) {
				var aCircleXY = [xScale(data.meterReadDate), yScale(data.kwhUsage)];

				kwhUsageDataPointTooltip.select('path')
					.attr('transform', 'translate(' + [aCircleXY[0] - 52, aCircleXY[1] - 55] + ')');

				kwhUsageDataPointTooltip.select('text')
					.attr('transform', 'translate(' + [aCircleXY[0], aCircleXY[1] - 40] + ')')
					.text(data.kwhUsage);

				kwhUsageDataPointTooltip.style('display', null);
			}

			function onGasDataPointMouseOver(data) {
				var aCircleXY = [xScale(data.meterReadDate), yScale(data.gasUsage)];

				gasUsageDataPointTooltip.select('path')
					.attr('transform', 'translate(' + [aCircleXY[0] - 52, aCircleXY[1] - 55] + ')');

				gasUsageDataPointTooltip.select('text')
					.attr('transform', 'translate(' + [aCircleXY[0], aCircleXY[1] - 40] + ')')
					.text(data.gasUsage);

				gasUsageDataPointTooltip.style('display', null);
			}

			function onKwhDataPointMouseOut(data) {
				kwhUsageDataPointTooltip.style('display', 'none');
			}

			function onGasDataPointMouseOut(data) {
				gasUsageDataPointTooltip.style('display', 'none');
			}


			var hoverLineGroup = oCanvas.append("svg:g").attr("class", "hover-line");
			// add the line to the group
			var hoverLine = hoverLineGroup
				.append("svg:line")
					.attr("x1", 10).attr("x2", 10) // vertical line so same value on each
					.attr("y1", 0).attr("y2", height); // top to bottom	
				
			// hide it by default
			// hoverLine.classed("hide", true);

			$(oCanvas.select('svg')).mousemove(function(event) {
				console.log('kkk');
			})


			kwhUsageDataPoint.on('mouseover', onKwhDataPointMouseOver);
			kwhUsageDataPoint.on('mouseout', onKwhDataPointMouseOut);
			gasUsageDataPoint.on('mouseover', onGasDataPointMouseOver);
			gasUsageDataPoint.on('mouseout', onGasDataPointMouseOut);
		};

		return CustomControl;
	}
);