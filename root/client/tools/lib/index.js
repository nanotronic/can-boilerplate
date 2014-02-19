//var bower = require("./util/bower");
var fs = require("fs");
var shell = require("./util/shell");

var client = require("path").resolve(__dirname+"/../../");



function init(endGruntTask)
{
	// If parent Grunt task, reinstall everything
	var hasBowerComponents = (endGruntTask) ? false : fs.existsSync(client+"/private/vendors/");
	var hasNodeModules     = (endGruntTask) ? false : fs.existsSync(client+"/node_modules/");
	
	if (hasNodeModules)
	{
		if (hasBowerComponents)
		{
			finished(endGruntTask);
		}
		else
		{
			bowerInstall( function()
			{
				finished(endGruntTask);
			});
		}
	}
	else
	{
		shell("npm", "install", client, function()
		{
			if (!hasBowerComponents)
			{
				bowerInstall( function()
				{
					finished(endGruntTask);
				});
			}
			else
			{
				finished(endGruntTask);
			}
		});
	}
	
	return exports;
}



function bowerInstall(callback)
{
	shell("bower", "install", client, callback);
	
	//bower.install(callback);
}



function finished(endGruntTask)
{
	// Complete any parent Grunt task
	if (endGruntTask)
	{
		endGruntTask();
	}
	// Tools should not run after generating a project
	else
	{
		// Hack
		require("grunt").cli(
		{
			//stack: true,	// debug
			base: client,
			gruntfile: client+"/Gruntfile.js"
		});
	}
}



// Not called from parent Grunt task
if (process.argv[2] != undefined)
{
	// Remove "tools" as it is not a Grunt task
	if (process.argv[2] == "tools")
	{
		process.argv.splice(2);
	}
	
	// Any other parameter will be passed as a Grunt task
	
	init();
}



module.exports =
{
	init: init
};
