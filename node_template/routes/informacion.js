var connectionString = require('../config/config');
var pg = require('pg');


//pg.defaults.poolSize = 25;

var informativas = {

  indec: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.MPF, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("select * from indec");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            res.jsonp(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
  },

  distrito: function(req, res) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.MPF, function(err, client, done) {
        
        query="SELECT df.distrito_id as id,amt.distrito_descripcion as valor,sum(edad_total) as poblacion ,sum(replace(st_area_sh,',','.')::double precision)*10000 as area,sum(edad_total)/(sum(replace(st_area_sh,',','.')::double precision)*10000) as densidad FROM (select distrito_descripcion,cod_depto from ambitoterritorialdistrito group by distrito_descripcion,cod_depto) amt  left outer join  indec on amt.cod_depto=provinciaid*1000+departamentoid  left outer join distritofiscal df on df.distrito_descripcion = amt.distrito_descripcion  left outer join departamentos dep on dep.cod_depto=amt.cod_depto  "

        if (typeof req.query.id != 'undefined'&& req.query.id.length > 0){
            query=query.concat(" where  df.distrito_id = ").concat(req.query.id);
        }


        // SQL Query > Select Data
        var query_res = client.query(query.concat(" group by df.distrito_id,amt.distrito_descripcion"));
        // Stream results back one row at a time
        query_res.on('row', function(row) {
            results.push(row);
        });

        query_res.on('error', function(row) {
            console.log(query);
            console.log(err);
            return res.status(500).send(err);
        });
        // After all data is returned, close connection and return results
        query_res.on('end', function() {
            client.end();
            res.jsonp(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
  },

  fiscalia: function(req, res) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.MPF, function(err, client, done) {
        
        query="SELECT amt.objectid as id,amt.fiscalia as valor,sum(edad_total) as poblacion ,sum(replace(st_area_sh,',','.')::double precision)*10000 as area,sum(edad_total)/(sum(replace(st_area_sh,',','.')::double precision)*10000) as densidad  FROM ambitoterritorialdistrito amt  left outer join  indec on amt.cod_depto=provinciaid*1000+departamentoid  left outer join departamentos dep on dep.cod_depto=amt.cod_depto "

        if (typeof req.query.id != 'undefined'&& req.query.id.length > 0){
            query=query.concat(" where  amt.objectid = ").concat(req.query.id);
        }
        // SQL Query > Select Data
        var query_res = client.query(query.concat("  group by amt.objectid,amt.fiscalia  "));

        // Stream results back one row at a time
        query_res.on('row', function(row) {
            results.push(row);
        });

        query_res.on('error', function(row) {
            console.log(query);
            console.log(err);
            return res.status(500).send(err);
        });
        // After all data is returned, close connection and return results
        query_res.on('end', function() {
            client.end();
            res.jsonp(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
  },
 
};



module.exports = informativas;