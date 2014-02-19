module.exports = function(grunt)
{
	var portscanner = require("portscanner");
	
	
	
	grunt.registerTask("findport", "", function()
	{
		var done = this.async();
		
		function savePort(port)
		{
			grunt.config("connect.server.options.port", port);
			done();
		}
		
		var defaultPort   = grunt.config("cfg.sections.server.defaultPort");
		var secondaryPort = grunt.config("cfg.sections.server.secondaryPort");
		
		// First choice
		portscanner.checkPortStatus(defaultPort, "localhost", function(error, status)
		{
			if (status == "closed")
			{
				savePort(defaultPort);
			}
			else
			{
				// Whatever's available
				portscanner.findAPortNotInUse(secondaryPort, secondaryPort+30, "localhost", function(error, port)
				{
					if (port)
					{
						savePort(port);
					}
					else
					{
						grunt.fail.fatal("Could not find an available port.");
					}
				});
			}
		});
	});
}
