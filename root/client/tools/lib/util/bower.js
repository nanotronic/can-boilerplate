var bower = require("bower");
var path = require("path");



function install(callback)
{
	//console.log("run bower install shit");
	
	var json = require("../../../bower.json")/*.dependencies*/;
	
	var previous_cwd = process.cwd();
	
	// Change cwd for Bower's inner functions to find bower.json and .bowerrc
	// (only necessary for first install after generating the project)
	process.chdir( path.resolve(__dirname+"/../../../") );
	
	console.log( process.cwd() );
	
	bower.commands.install(null,null, json/*['jquery'], { save: true }, {  }*/)
	.on('log', function(result) {
		//grunt.log.writeln(['bower', result.id.cyan, result.message].join(' '));
		console.log("log", result);
	})
	.on('end', function (installed) {
		console.log("installed", installed);
	});
	
	// Reset to avoid any issues
	//process.chdir(previous_cwd);
}



function update(callback)
{
	console.log("run bower update shit");
}



module.exports =
{
	install: install,
	update: update
};
