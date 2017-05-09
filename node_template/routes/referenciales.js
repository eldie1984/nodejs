var connectionString = require('../config/config');
var pg = require('pg');

var referenciales = {
 
  n2Barrio: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("select cod_bahra as id,nombre_bahra as value from dw.lk_bahra where cod_prov=2 and cod_depto <> 0 order by 2 asc");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            res.jsonp(results);
        });
        query.on('error', function (row) {
                console.log(row);
                console.log(err);
                return res.status(500).send(err);
            });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
  },
  healthcheck: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("select  count(*) from dw.lk_bahra");

        
        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.status(200).send('ok');
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
  },
  n2Seccional: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("SELECT id_secc_seccional as id, desc_secc_seccional as value FROM dw.lk_seccional  order by 2 asc;");

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
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("SELECT id_dist_instruccion as id, 'Distrito '||id_dist_instruccion as value FROM dw.lk_seccional group by 1 order by 1 asc;");

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
  n2Delito: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("SELECT id_del_delito as id,'Ley '||id_del_ley|| ' Art. '||id_del_articulo||' Inc. '||coalesce(id_del_inciso,'')||' - '||desc_del_delito as  value  FROM dw.lk_delito  where id_del_articulo<>0");

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
  n2modalidad: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("SELECT id_mod_modalidad as id,desc_mod_figura||' -> '||desc_mod_modalidad as  value FROM dw.lk_figura_modalidad group by id_mod_modalidad,desc_mod_modalidad order by 2 asc;");

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
  n2conflictividad: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("SELECT id_mod_modalidad as id,nivel1||' -> '||nivel2||' -> '||nivel3 as  value FROM dw.lk_figura_modalidad order by 2 asc;");

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
  distritofiscal: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.MPF, function(err, client, done) {
        
        

        // SQL Query > Select Data
        var query = client.query("select id_secc_distrito as id,'Distrito '|| id_secc_distrito  as value from dw.lk_seccional");

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

  bahra: function(req, res) {
     var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        if (typeof req.query.provincia != undefined && req.query.provincia.length > 0) {
                consulta = "select cod_depto as id,nom_depto as value from dw.lk_bahra where cod_prov=".concat(req.query.provincia);
            if (typeof req.query.localidad != undefined && req.query.localidad.length > 0) {
                consulta = "select cod_bahra as id,nombre_bahra as value from dw.lk_bahra  where cod_depto=".concat(req.query.localidad).concat(" and cod_prov=").concat(req.query.provincia);
                }
            }
        else {
                consulta = "select cod_prov as id,nom_prov as value from dw.lk_bahra ";
            }
        // SQL Query > Select Data
        var query = client.query(consulta.concat(" group by 1,2 order by 2 asc"));

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
 
 
};



module.exports = referenciales;