sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ui5/mobile/app/model/models",
	'sap/ui/model/json/JSONModel'
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("ui5.mobile.app.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// set the model for toggling layouts
			this._oLayoutModel = new JSONModel({splash: true, main: false});
			this.setModel(this._oLayoutModel, "layout");

			this._currentRoute = "";
			this.getRouter().initialize();
			this.subscribeEvent();
		},

		subscribeEvent: function () {
			var oCoreEventBus = sap.ui.getCore().getEventBus();
      oCoreEventBus.subscribe("app", "routing", this.goToPage, this);
		},

		goToPage: function (sChannel, sEvent, oPayload) {
			if (oPayload.route === 'login' || oPayload.route === 'notPhone') {
				this.useSplashLayout();
			} else {
				this.useMainLayout();
			}
			this._currentRoute = oPayload.route;
			setTimeout(function () {
				this.getRouter().navTo(oPayload.route);
			}.bind(this), 0);
			
    },

		getCurrentRoute: function () {
			return this._currentRoute;
		},

		useSplashLayout: function () {
			this._oLayoutModel.setProperty('/splash', true);
			this._oLayoutModel.setProperty('/main', false);
		},

		useMainLayout: function () {
			this._oLayoutModel.setProperty('/splash', false);
			this._oLayoutModel.setProperty('/main', true);
		}
	});
});