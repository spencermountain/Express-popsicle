Express-popsicle
================

a js webserver that dynamically routes methods for prototyping

prototype without thinking

the Dao
====
create a folder in the /apps directory

create an index.js file like:

     exports.yoyo=function(q){return "yo " + q}

when you (re)start the webserver, 

    node express.js 3141

you can call:

    http://localhost:3141/my_folder/yoyo?q=mama


create an index.html file beside it, and you can ajax right to it

its a cute little framework for hacking in nodejs.