
var request=require('request');

exports.freebase=function(q, callback){
  var url='https://www.googleapis.com/freebase/v1/search?limit=1&lang=en&type=/common/topic&filter='
  var filter=encodeURIComponent('(any name{full}:"'+q+'" alias{full}:"'+q+'")')
  http(url+filter, callback)
}

//exports.freebase("toronto", console.log)

function http(url, callback){
   request({
        uri: url
    }, function(error, response, body) {
        try{
          body=JSON.parse(body)
        }catch(e){console.log(e)}
        if (error || response.statusCode != 200 ) {
              console.log('----error----');
              console.log(body);
              return callback([])
              }
              body=body.result || []
        return callback(body);
    })
}