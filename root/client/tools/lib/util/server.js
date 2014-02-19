var fs = require("fs");



function middleware(connect, options)
{
	var middlewares = [];
	
	if ( !(options.base instanceof Array) )
	{
		options.base = [options.base];
	}
	
	var directory = options.directory || options.base[options.base.length - 1];
	
	// Serve static files
	options.base.forEach( function(base)
	{
		middlewares.push( connect.static(base) );
	});
	
	// Make directory browse-able
	middlewares.push( connect.directory(directory) );
	
	// Not found -- just serve index.html
	middlewares.push( function(req, res)
	{
		for (var file, i=0; i<options.base.length; i++)
		{
			file = options.base + "/index.html"; 
			
			if ( grunt.file.exists(file) )
			{
				fs.createReadStream(file).pipe(res);
				return;
			}
		}
		
		res.statusCode(404); // where's index.html?
		res.end();
	});
	
	return middlewares;
}



module.exports =
{
	connect:
	{
		middleware: middleware
	}
};
