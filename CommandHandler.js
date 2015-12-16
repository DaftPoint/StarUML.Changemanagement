define(function (require, exports, module) {
	"use strict";

    var ExtensionUtils  	= app.getModule("utils/ExtensionUtils");
    var NodeDomain      	= app.getModule("utils/NodeDomain");
    var PreferenceManager 	= app.getModule("core/PreferenceManager");
    
	var Dialogs = app.getModule('dialogs/Dialogs');
    var Toast 	= app.getModule("ui/Toast");
    
    var teamworkServerActions = null;
	
    function initGitModule() {
        if(PreferenceManager.get("teamwork.server.backend") == 0) {
            teamworkServerActions = new NodeDomain("teamwork-simplegit", ExtensionUtils.getModulePath(module, "../staruml.teamwork-server/node/TeamworkServer_simplegit"));
        } else if(PreferenceManager.get("teamwork.server.backend") == 1) {
            teamworkServerActions = new NodeDomain("teamwork-jsgit", ExtensionUtils.getModulePath(module, "../staruml.teamwork-server/node/TeamworkServer_jsgit"));
        } else if(PreferenceManager.get("teamwork.server.backend") == 2) {
            teamworkServerActions = new NodeDomain("teamwork-nodegit", ExtensionUtils.getModulePath(module, "../staruml.teamwork-server/node/TeamworkServer_nodegit"));
        }
    }
    
	function createCR() {
		var dlg = Dialogs.showInputDialog("Enter the name of the CR you want to create.");
		dlg.done(function (buttonId, crName) {
		    if (buttonId === Dialogs.DIALOG_BTN_OK) {
		    	_handleCreateCRCallback(crName);
		    } else {
		        Toast.error("CR-Creation cancelled");
		    }
		});
	}
	
	function _handleCreateCRCallback(crName) {
		initGitModule();
		
        var localPath = PreferenceManager.get("teamwork.server.local") + "\\Teamwork-Project-" + crName;
        var remoteURL = buildRemoteURL();
        teamworkServerActions.exec("createBranch", localPath, remoteURL, crName)
        .done(function (success) {
            if(success) {
                console.log("Creating CR successful!");
                Toast.info("Creating CR successful!");
            } else {
                console.log("An error occured during the CR creation!");
                Toast.error("An error occured during the CR creation!");
            }
        }).fail(function (err) {
            console.error("[Error while loading Teamwork-Project:] ", err);
        });
		
        Toast.info("CR with name " + crName + " created");
	}
	
    function buildRemoteURL() {
    	console.log("Building Remote URL...");
        var username 		= PreferenceManager.get("teamwork.server.username");
        var password 		= PreferenceManager.get("teamwork.server.password");
        var remotePath 		= PreferenceManager.get("teamwork.server.remote");
        var remoteProtocol 	= PreferenceManager.get("teamwork.server.protocol");
        var remoteURL 		= remoteProtocol;
        if(username != "") {
            remoteURL = remoteURL + username;
            if(password != "") {
                remoteURL = remoteURL + ":" + password;
            }
            remoteURL = remoteURL + "@";
        }
        remoteURL = remoteURL + remotePath;
        return remoteURL;
    }
	
	exports.createCR = createCR;
});