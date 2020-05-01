const http = require('http');
const url = require('url');
const fs = require('fs');
/*const fileName = "adresar.xml";*/
/*const util = require('util');*/
/*const xml2js = require('xml2js');
const parser = new xml2js.Parser();*/
const fileName = "adresar.json"
const queryString = require('queryString');

/*const server = http.createServer(function(req,res){
	let urlObj = url.parse(req.url,true,false);
	if(req.method=='GET'){
		if(urlObj.pathname=='/sveOsobe'){
			fs.readFile( fileName, function(err, data) {
  				parser.parseString(data,function(err,result){
  					console.log(util.inspect(result, false, null))
  				})
			});
		}
	}
});*/

const server = http.createServer(function(req,res){
	let urlObj = url.parse(req.url,true,false);
	if(req.method=='GET'){
		if(urlObj.pathname=='/sveOsobe'){
			fs.readFile( fileName, function(err, data) {
  				if(err){
  					res.writeHead(404);
  					res.end(JSON.stringify(err));
  					return;
  				}
  				else{
  					res.writeHead(200);
  					res.end(data)
  				}
			});
		}
	}
	else if(req.method=="POST"){
		if(urlObj.pathname=="/dodajOsobu"){
			var body = '';
			req.on('data',function(data){
				body+=data;
			})
			req.on('end',function(){
				let osobe = JSON.parse(fs.readFileSync(fileName),function(err,data){
					if(err){
						res.writeHead(404);
						res.end(JSON.stringify(err));
						return;
					}
				})
				let osoba = {
					"id":parseInt(queryString.parse(body).id),
					"ime":queryString.parse(body).ime,
					"prezime":queryString.parse(body).prezime,
					"adresa":queryString.parse(body).adresa,
				}
				osobe.push(osoba);
				fs.writeFileSync(fileName,JSON.stringify(osobe));
			})
		}
		else if(urlObj.pathname=="/obrisiOsobu"){
			var body = '';
			req.on('data',function(data){
				body+=data;
			})
			req.on('end',function(){
				let osobe = JSON.parse(fs.readFileSync(fileName),function(err,data){
					if(err){
						res.writeHead(404);
						res.end(JSON.stringify(err));
						return;
					}
				})
				let id=parseInt(queryString.parse(body).id);
				for(let i=0;i<osobe.length;i++)
				{
					if(osobe[i].id==id)
					{
						osobe.splice(i,1);
					}
				}
				fs.writeFileSync(fileName,JSON.stringify(osobe));
			})
		}
		else if(urlObj.pathname=="/postaviAdresu"){
			var body = '';
			req.on('data',function(data){
				body+=data;
			})
			req.on('end',function(){
				let osobe = JSON.parse(fs.readFileSync(fileName),function(err,data){
					if(err){
						res.writeHead(404);
						res.end(JSON.stringify(err));
						return;
					}
				})
				let id = parseInt(queryString.parse(body).id);
				let adresa = queryString.parse(body).adresa;
				for(let i=0;i<osobe.length;i++)
				{
					if(osobe[i].id==id)
					{
						osobe[i].adresa=adresa;
					}
				}
				fs.writeFileSync(fileName,JSON.stringify(osobe));
			})
		}
	}
});

const port = 8080;
const host = "127.0.0.1";
server.listen(port,host);