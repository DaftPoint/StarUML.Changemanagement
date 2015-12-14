define(function (require, exports, module) {
	"use strict";
	var AppInit           = app.getModule("utils/AppInit");
    var PreferenceManager = app.getModule("core/PreferenceManager");

    var preferenceId 	  = "changemanagement";

    var changemanagementPreferences = {
	    "changemanagement.cr.create": {
	        text: "Allow CRs",
	        description: "Is it allowed to create a new Model for a ChangeRequest",
	        type: "Check",
	        default: true
	    }
	};

    function getId() {
        return preferenceId;
    }

	AppInit.htmlReady(function () {
	    PreferenceManager.register(preferenceId, "changemanagement", changemanagementPreferences);
	});


	//# Backbone
	exports.getId	=	getId;
});