module.exports = function(grunt)
{
	//var util = require(__dirname+"/../util");
	
	
	
	grunt.mergeConfig(
	{
		cfg:
		{
			sections:
			{
				"deps":
				{
					action: ""
				}
			}
		},
		
		
		
		// Tasks
		
		
		
		clean:
		{
			"deps":
			{
				src:  ["<%= cfg.devFolder %>/vendors/", "node_modules/"]
			}
		},
		
		
		
		content: 
		{
			"deps":
			{
				table:
				[
					[
						[
							 "DEPENDENCY MANAGEMENT".underline+" <%= cfg.title_sub %>"
							+"\n\nUpdate & install existing and missing components for Node.js and"
							+"\nBower."
							+"\n\nA reinstall is available for making large changes to dependencies,"
							+"\nor in the remote event that they'd become damaged."
						]
					]
				]
			}
		},
		
		
		
		prompt:
		{
			"deps":
			{
				options:
				{
					questions:
					[
						{
							config: "cfg.sections.deps.action",
							type: "list",
							message: "What would you like to do?",
							choices: [
								{ name:"Update all", value:"update" },
								{ name:"Reinstall all", value:"install" },
								"---",
								{ name:"⟵ Go back", value:"return" }
							]
						}
					],
					then: function(results)
					{
						var task;
						
						switch ( results["cfg.sections.deps.action"] )
						{
							case "return":  task="default";      break;
							case "install": task="deps-install"; break;
							case "update":  task="deps-update";  break;
						}
						
						grunt.task.run(task);
					}
				}
			}
		},
		
		
		
		shell:
		{
			//"bower-install": { command: "bower install" },
			//"bower-update":  { command: "bower update" },
			"npm-install":   { command: "npm install" },
			"npm-update":    { command: "npm update" }
		}
	});
	
	
	
	/*function deps()
	{
		var done = this.async();
		
		util.shell(this.name, grunt.config("action"), process.cwd(), function()
		{
			done();
		});
	}
	
	
	
	grunt.registerTask("bower", "", deps);
	grunt.registerTask("npm",   "", deps);*/
	
	
	
	grunt.registerTask("deps", ["content:deps","prompt:deps"]);
	
	//grunt.registerTask("deps-install", ["clean:deps","npm","bower"]);
	grunt.registerTask("deps-install", ["clean:deps","shell:npm-install"/*,"shell:bower-install"*/]);
	
	//grunt.registerTask("deps-update",  ["npm","bower"]);
	grunt.registerTask("deps-update",  ["shell:npm-update"/*,"shell:bower-update"*/]);
	
	
	
};
