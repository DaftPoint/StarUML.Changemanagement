define(function (require, exports, module) {
	"use strict";

	//# Import libs
	var AppInit					= app.getModule("utils/AppInit");
    var Commands            	= app.getModule("command/Commands");
    var CommandManager      	= app.getModule("command/CommandManager");
    var MenuManager        		= app.getModule("menu/MenuManager");

    var TeamworkPreferences     = require("changemanagementPreferences");

    //# Define Commands
    var CMD_CHANGEMANAGEMENT         		= 'changemanagement';
    var CMD_CHANGEMANAGEMENT_SELECT_VERSION = 'changemanagement.select-changeversion';
    var CMD_CHANGEMANAGEMENT_CREATE_VERSION = 'changemanagement.create-changeversion';
    var CMD_CHANGEMANAGEMENT_SHOW_DIFF  	= 'changemanagement.show-diff';
    var CMD_CHANGEMANAGEMENT_CONFIGURE  	= 'changemanagement.configure';

    //# register commands
    CommandManager.register("Changemanagement",             		CMD_CHANGEMANAGEMENT,           		CommandManager.doNothing);
    CommandManager.register("Select Version...", 					CMD_CHANGEMANAGEMENT_SELECT_VERSION,  	CommandManager.doNothing);
    CommandManager.register("Create Version...",  					CMD_CHANGEMANAGEMENT_CREATE_VERSION,   	CommandManager.doNothing);
    CommandManager.register("Show Difference between Versions...",  CMD_CHANGEMANAGEMENT_SHOW_DIFF, 		CommandManager.doNothing);
    CommandManager.register("Configure Change-Management...", 		CMD_CHANGEMANAGEMENT_CONFIGURE, 		CommandManager.doNothing);


    var menu;
    var menuItem;
    menu = MenuManager.addMenu(CMD_CHANGEMANAGEMENT);
    //menuItem = menu.addMenuItem(CMD_TEAMWORK);
    menu.addMenuItem(CMD_CHANGEMANAGEMENT_CREATE_VERSION);
    menu.addMenuDivider();
    menu.addMenuItem(CMD_CHANGEMANAGEMENT_SELECT_VERSION);
    menu.addMenuItem(CMD_CHANGEMANAGEMENT_SHOW_DIFF);
    menu.addMenuDivider();
    menu.addMenuItem(CMD_CHANGEMANAGEMENT_CONFIGURE);

    AppInit.htmlReady(function () {

    });
});