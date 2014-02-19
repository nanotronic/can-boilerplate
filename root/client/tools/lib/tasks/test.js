module.exports = function(grunt)
{
	grunt.mergeConfig(
	{
		connect:
		{
			"test-dev":
			{
				options:
				{
					base: "<%= cfg.devFolder %>",
					port: 8081
				}
			},
			"test-dist":
			{
				options:
				{
					base: "<%= cfg.distFolder %>",
					port: 8082
				}
			}
		},
		
		
		
		copy:
		{
			"test-dest":
			{
				files:
				[
					{ cwd:"<%= cfg.devFolder %>/test/",    src:["**"], dest:"<%= cfg.distFolder %>/test/",    expand:true },
					{ cwd:"<%= cfg.devFolder %>/vendors/", src:["**"], dest:"<%= cfg.distFolder %>/vendors/", expand:true }
				]
			}
		},
		
		
		
		mocha:
		{
			options:
			{
				bail: true,
				logErrors: true,
				reporter: "Spec",
				run: true
			},
			"test-dev":
			{
				options:
				{
					urls: ["http://localhost:<%= connect['test-dev'].options.port %>/test/test.html"]
				}
			},
			"test-dist":
			{
				options:
				{
					urls: ["http://localhost:<%= connect['test-dist'].options.port %>/test/test.html"]
				}
			}
		}
	});
	
	
	
	grunt.registerTask("test", ["test-dev","test-dist"]);
	
	grunt.registerTask("test-dev",  ["connect:test-dev","mocha:test-dev"]);
	grunt.registerTask("test-dist", ["connect:test-dist","compile","copy:test-dest","mocha:test-dist","clean:compile-pre"]);
	
	
	
};
