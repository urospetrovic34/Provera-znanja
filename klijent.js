const http = require('http');
	function vratiSveOsobe(){
		const options={
			hostname:"localhost",
			port:"8080",
			path:encodeURI('/sveOsobe'),
			method:"GET"
		};
		function handleResponse(res){
			var serverData = ' ';
			res.on('data',function(chunk){
				serverData+=chunk;
			});
			res.on('end',function(){
				console.log(JSON.parse(serverData));
			});
		}
		http.request(options,function(response){
			handleResponse(response);
		}).end();
	}

	function dodajJednuOsobu(id,ime,prezime,adresa){
		const options={
			hostname:"localhost",
			port:"8080",
			path:encodeURI('/dodajOsobu'),
			method:"GET"
		};
		function handleResponse(res){
			var responseData = ' ';
			res.on('data',function(chunk){
				responseData+=chunk;
			})
			res.on('end',function(){
				console.log("PRIMLJENO")
			})
		}
		var http = require('http');
		var req = http.request(options,handleResponse);
		req.write('id='+id+'&ime='+ime+'&prezime='+prezime+'&adresa='+adresa);
		req.end();
	}

	function obrisiJednuOsobu(id){
		const options={
			hostname:"localhost",
			port:"8080",
			path:encodeURI('/obrisiOsobu'),
			method:"GET"
		};
		function handleResponse(res){
			var responseData = ' ';
			res.on('data',function(chunk){
				responseData+=chunk;
			})
			res.on('end',function(){
				console.log("PRIMLJENO")
			})
		}
		var http = require('http');
		var req = http.request(options,handleResponse);
		req.write('id='+id);
		req.end();
	}
	function postaviJednuAdresu(id,adresa){
		const options={
			hostname:"localhost",
			port:"8080",
			path:encodeURI('/postaviAdresu'),
			method:"GET"
		};
		function handleResponse(res){
			var responseData = ' ';
			res.on('data',function(chunk){
				responseData+=chunk;
			})
			res.on('end',function(){
				console.log("PRIMLJENO")
			})
		}
		var http = require('http');
		var req = http.request(options,handleResponse);
		req.write('id='+id+'&adresa='+adresa);
		req.end();
	}