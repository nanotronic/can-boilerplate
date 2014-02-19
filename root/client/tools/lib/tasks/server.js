module.exports = function(grunt)
{
	var util = require(__dirname+"/../util");
	
	
	
	grunt.mergeConfig(
	{
		cfg:
		{
			sections:
			{
				"server":
				{
					defaultPort: 80,
					secondaryPort: 8000	// if defaultPort is busy
				}
			}
		},
		
		
		
		// Tasks
		
		
		
		connect:
		{
			options:
			{
				middleware: util.server.connect.middleware
			},
			"server":
			{
				options:
				{
					base: "<%= cfg.devFolder %>",	// gets changed by prompt:server
					keepalive: true,
					port: "<%= cfg.sections.server.defaultPort %>",	// gets changed by prompt:server and findport
				}
			}
		},
		
		
		
		content: 
		{
			"server":
			{
				table:
				[
					[
						[
							 "SIMPLE WEBSERVER".underline+" <%= cfg.title_sub %>"
							+"\n\nThis will route 404s to /index.html for your app to handle."
						]
					],
					function()
					{
						var defaultPort = grunt.config("cfg.sections.server.defaultPort");
						
						if ( parseInt( grunt.config("connect.server.options.port") ) != defaultPort )
						{
							return [ ["Note:".yellow+" Default port ("+defaultPort+") is already in use"] ];
						}
					}
				]
			}
		},
		
		
		
		findport:
		{
			options:
			{
				gruntLogHeader: false
			}
		},
		
		
		
		prompt:
		{
			"server":
			{
				options:
				{
					questions:
					[
						{
							config: "connect.server.options.base",
							type: "list",
							message: "Which folder?",
							choices: [
								{ name:"<%= cfg.devFolder %>/" },
								{ name:"<%= cfg.distFolder %>/" }
							]
						},
						{
							config: "connect.server.options.port",
							type: "input",
							message: "What port?",
							default: "<%= connect.server.options.port %>",
						}
					]
				}
			}
		}
	});
	
	
	
	grunt.registerTask("server", ["findport","connect:server"]);
	
	grunt.registerTask("server-w-menu", ["findport","content:server","prompt:server","connect:server"]);
	
	
	
};
