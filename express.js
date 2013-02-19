var http = require("http");
var fs = require("fs");
var express = require('express');
var sys = require('util');
var exec = require('child_process').exec;
var app = express();
app.enable("jsonp callback");
app.use( express.static(__dirname + '/' ) )
app.use( express.directory(__dirname + '/' ) )
app.use(express.bodyParser());

//call any public method in /apps
app.get('/rest/:app/:method', function(req, res){
		var q=req.query.q||req.body.q;
		if(q && apps[req.params.app] && apps[req.params.app][req.params.method]){
		 apps[req.params.app][req.params.method](q, function(result){
		 	res.json(result);
		 })
		}else{
				res.send(500, fail())
		}
});

//fail nicely
app.get('/test*', function(req, res){
		res.json({hai:true});
});

app.get('/rest*', function(req, res){
		res.send(500, fail())
});


app.get('/update', function(req, res){
	exec("git pull", puts);
	//exec("forever stopall && git pull && echo 'hiiii' && forever start express.js", puts);
	function puts(error, stdout, stderr) { sys.puts(stdout) }
})



//find all the apps, and their methods
var apps={}
fs.readdirSync("./apps").forEach(function(file) {
  try{
    apps[file]=require("./apps/" + file);
	}catch(e){}
});

//nowjs
// var server = http.createServer(app).listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + app.get('port'));
// })
// var everyone = require('now').initialize(server);


var port= process.argv[2] || 3141;
app.listen(port);
console.log('listening on http://localhost:'+port)


//print all public method calls in /apps
function fail(){
  var json=Object.keys(apps).map(function(a,i){return {app:a, methods:Object.keys(apps[a])} })
  return '<div style="color:grey;">please format your request as  /rest/{app}/{function} and there must be a <b>q</b> parameter somewhere'
	+json.map(function(a){
		return '<h2>'+a.app+':</h2>'
		+a.methods.map(function(m){
			var url='http://localhost:'+port+'/rest/'+a.app+'/'+m+'?q=foo'
			return '<a href="'+url+'">'+url+'</a>'
		}).join('<br/>')
	}).join('')
	+'</div>'
}