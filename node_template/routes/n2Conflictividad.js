var connectionString = require('../config/config');
var pg = require('pg');
var GeoJSON = require('geojson');

var conflictividad = {
    calendario: function (req, res) {
        var results = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            query = "select min(a.cantidad) as minCant,MAX(a.cantidad)as maxCant,MIN(EXTRACT(YEAR FROM a.fecha)) as minFecha, (MAX(EXTRACT(YEAR FROM a.fecha))+1) as maxFecha from (select t.id_tie_fecha as fecha,id_tie_anio as anio, COUNT(*) as cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_tiempo t on t.id_fecha=id_fecha_hecho left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where  1=1";

            if (typeof req.query.val != 'undefined' && req.query.val.length > 0) {
                query = query.concat(" and id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con la conflictividad');
            }
            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                query = query.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        query = query.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        query = query.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                query = query.concat(" ) ");
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                query = query.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                query = query.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                query = query.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }

            query = query.concat(" group by id_tie_fecha,id_tie_anio) a");

            // SQL Query > Select Data
            var query_res = client.query(query);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(query);
                console.log(err);
                return res.status(500).send(err);
            });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
                res.jsonp(results);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    calendarioDatos: function (req, res) {
        var results = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            query = "select trim(substring( to_char(id_fecha_hecho, '99999999') from 1 for 5)||'-'||substring( to_char(id_fecha_hecho, '99999999') from 6 for 2)||'-'||substring( to_char(id_fecha_hecho, '99999999') from 8 for 2)) as id, COUNT(*) as value from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_tiempo t on t.id_fecha=id_fecha_hecho left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where  1=1 ";

            if (typeof req.query.val != 'undefined' && req.query.val.length > 0) {
                query = query.concat(" and id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con el delito');
            }
            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                query = query.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        query = query.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        query = query.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                query = query.concat(" ) ");
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                query = query.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                query = query.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                query = query.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }

            query = query.concat(" group by id_fecha_hecho order by 1");


            // SQL Query > Select Data
            var query_res = client.query(query);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(query);
                console.log(err);
                return res.status(500).send(err);
            });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
                return res.jsonp(results);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    datos: function (req, res) {
        var results = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            sel_query = "SELECT  case tentativa when 1 then 'SI' else 'NO' end as Tentativa ,id_actuacion as Actuacion ,trim( leading ' ' from substring( to_char(id_fecha_hecho, '99999999') from 1 for 5)||'-'||substring( to_char(id_fecha_hecho, '99999999') from 6 for 2)||'-'||substring( to_char(id_fecha_hecho, '99999999') from 8 for 2)) as FechaHecho ,hora_hecho as HoraHecho ,lugar_hecho as LugarHecho ,descripcion_hecho as DescripcionHecho ,total_autores as TotalAutores ,case uso_armas when 0 then 'NO' else 'SI' end as Armas ,lugar_lat as Latitud,lugar_long as Longitud "
            tot_query = "select count(*) as total "
            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined' && req.query.fecha_d.length > 0 && req.query.fecha_h.length > 0)
            {
                query = " FROM ft_modalidad mod  left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where 1=1  and id_fecha_hecho >= ".concat(req.query.fecha_d).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h)
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined' && req.query.val.length > 0) {
                query = query.concat(" and id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con el conflictividad');
            }

            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                query = query.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        query = query.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        query = query.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                query = query.concat(" ) ");
            }
            if (typeof req.query.tag != 'undefined' && req.query.tag.length > 0) {
                palabras = req.query.tag.split(",");
                for (i = 0; i < palabras.length; i++) {
                    query = query.concat(" and descripcion_hecho like ('%").concat(palabras[i]).concat("%')");
                }
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                query = query.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                query = query.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }

            if (typeof req.query.search != 'undefined' && req.query.search.length > 0) {
                query = query.concat(" and (upper(descripcion_hecho) like ('%").concat(req.query.search.toUpperCase()).concat("%')or upper(lugar_hecho) like ('%").concat(req.query.search.toUpperCase()).concat("%'))");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                query = query.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }


            query_ord = " order by id_fecha_hecho asc";
            if (typeof req.query.limit != 'undefined' && req.query.limit.length > 0) {
                query_ord = query_ord.concat(" limit ").concat(req.query.limit);
            }
            if (typeof req.query.offset != 'undefined' && req.query.offset.length > 0) {
                query_ord = query_ord.concat(" offset ").concat(req.query.offset);
            }


            // SQL Query > Select Data
            var query_res = client.query(sel_query.concat(query).concat(query_ord));

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(sel_query.concat(query).concat(query_ord));
                console.log(err);
                return res.status(500).send(err);
            });

            // SQL Query > Select Data
            var query_res = client.query(tot_query.concat(query));

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                total = row['total'];
            });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                salida = {"total": total, "rows": results}
                client.end();
                return res.jsonp(salida);
            });


            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    barrioMax: function (req, res) {
        var results = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                query = "select cod_bahra as name,count(*) as densidad FROM ft_modalidad mod left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad where 1=1 and lugar_lat is not null and lugar_long is not null and id_fecha_hecho >= ".concat(req.query.fecha_d).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h);
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                query = query.concat(" and id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con la conflictividad');
            }

            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                query = query.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        query = query.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        query = query.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                query = query.concat(" ) ");
            }
            if (typeof req.query.tag != 'undefined' && req.query.tag.length > 0) {
                palabras = req.query.tag.split(",");
                for (i = 0; i < palabras.length; i++) {
                    query = query.concat(" and descripcion_hecho like ('%").concat(palabras[i]).concat("%')");
                }
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                query = query.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                query = query.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                query = query.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }

            query = query.concat(" group by 1 order by 2 desc limit 1");


            // SQL Query > Select Data
            var query_res = client.query(query);


            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });
            query_res.on('error', function (row) {
                console.log(query);
                console.log(err);
                return res.status(500).send(err);
            });

            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
                return res.jsonp(results);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    barrioCloroDatos: function (req, res) {
        var results = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.GIS, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            query = "SELECT ST_AsGeoJSON(geom) as poly, cod_bahra,barrio,0 as cant FROM \"MPF\".barrios_poly  where cod_bahra is not null;"


            // SQL Query > Select Data
            var query_res = client.query(query);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                row.poly = JSON.parse(row.poly).coordinates;
                results.push({'name': row.barrio, 'density': row.cant, 'bahra': row.cod_bahra, 'polygon': row.poly});
            });
            query_res.on('error', function (row) {
                console.log(query);
                console.log(err);
                return res.status(500).send(err);
            });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            query = "select cod_bahra as barrio,count(*) as cantidad FROM ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad  left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where 1=1"
            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                query = query.concat(" and id_fecha_hecho >= ").concat(req.query.fecha_d).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h)
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                query = query.concat(" and id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con la conflictividad');
            }

            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                query = query.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        query = query.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        query = query.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                query = query.concat(" ) ");
            }
            if (typeof req.query.tag != 'undefined' && req.query.tag.length > 0) {
                palabras = req.query.tag.split(",");
                for (i = 0; i < palabras.length; i++) {
                    query = query.concat(" and descripcion_hecho like ('%").concat(palabras[i]).concat("%')");
                }
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                query = query.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                query = query.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                query = query.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }


            query = query.concat("group by 1 order by 2 desc")
            // SQL Query > Select Data
            var query_res = client.query(query);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                for (var i = 0; i < results.length; i++) {
                    if (row.barrio == results[i].bahra)
                    {
                        results[i].density = row.cantidad;
                    }

                }

            });
            query_res.on('error', function (row) {
                console.log(query);
                console.log(err);
                return res.status(500).send(err);
            });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
                return res.jsonp(GeoJSON.parse(results, {'MultiPolygon': 'polygon'}))
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });

    },
    tags: function (req, res) {
        var results = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            query = "select * from tagsmodalidadn2(";
            palabras_consulta = '';
            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                query = query.concat(req.query.fecha_d).concat(",").concat(req.query.fecha_h).concat(",");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                consulta = " and id_conflictividad in (".concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con el delito');
            }

            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                consulta = consulta.concat(" and cod_bahra in ( ");

                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        consulta = consulta.concat("''").concat(barrios[i]).concat("''");
                        j = 1;
                    } else {
                        consulta = consulta.concat(",''").concat(barrios[i]).concat("''");
                    }
                }
                consulta = consulta.concat(" ) ");
            }
            if (typeof req.query.tag != 'undefined' && req.query.tag.length > 0) {
                palabras_consulta = palabras_consulta.concat(" and word not in (");

                var j = 0;
                palabras = req.query.tag.split(",");
                for (i = 0; i < palabras.length; i++) {
                    consulta = consulta.concat(" and descripcion_hecho like (''%").concat(palabras[i]).concat("%'')");
                    if (j == 0) {
                        palabras_consulta = palabras_consulta.concat("''").concat(palabras[i]).concat("''");
                        j = 1
                    }
                    else {
                        palabras_consulta = palabras_consulta.concat(",''").concat(palabras[i]).concat("''");
                    }
                }
                palabras_consulta = palabras_consulta.concat(")");
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                consulta = consulta.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                consulta = consulta.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                consulta = consulta.concat(" and upper(lugar_hecho) like (''%").concat(req.query.calle.toUpperCase()).concat("%'') ");
            }

            query = query.concat("'").concat(consulta).concat("','','").concat(palabras_consulta).concat("');");


            // SQL Query > Select Data
            var query_res = client.query(query);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
                return res.jsonp(results);
            });

            query_res.on('error', function (row) {
                console.log(query);
                console.log(err);
                return res.status(500).send(err);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    total: function (req, res) {
        var tent = [];
        var consum = [];
        var categ = [];
        var total = [];
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            query = "select * from listarconflictividadN2(";
            consulta = ''

            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                query = query.concat(req.query.fecha_d).concat(",").concat(req.query.fecha_h).concat(",'").concat(req.query.temp).concat("',");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                if (req.query.tipo == 'level1') {
                    consulta = " and nivel1= (".concat(req.query.val).concat("' ");
                } else if (req.query.tipo == 'level2') {
                    consulta = " and nivel1='".concat(req.query.val).concat("' ");
                } else if (req.query.tipo == 'level3') {
                    consulta = " and and nivel1=".concat(req.query.val).concat("' ");
                } else if (req.query.tipo == 'levels') {
                    consulta = " and conf.mod_sub_tipo_delito='".concat(req.query.val).concat("'");
                }

            }
            else {
                return res.status(500).send('ERRROOOOOOOR con el delito');
            }
            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                consulta = consulta.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        consulta = consulta.concat("''").concat(barrios[i]).concat("''");
                        j = 1;
                    } else {
                        consulta = consulta.concat(",''").concat(barrios[i]).concat("''");
                    }
                }
                consulta = consulta.concat(" ) ");
            }
            if (typeof req.query.tag != 'undefined' && req.query.tag.length > 0) {
                palabras = req.query.tag.split(",");
                for (i = 0; i < palabras.length; i++) {
                    consulta = consulta.concat(" and descripcion_hecho like (''%").concat(palabras[i]).concat("%'')");
                }
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                consulta = consulta.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                consulta = consulta.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                consulta = consulta.concat(" and upper(lugar_hecho) like (''%").concat(req.query.calle.toUpperCase()).concat("%'') ");
            }

            query = query.concat("'").concat(consulta).concat("','');")


            // SQL Query > Select Data
            var query_res = client.query(query);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                categ.push(row['vartemp']);
                tent.push(parseInt(row['tentado']));
                total.push(parseInt(row['tentado']) + parseInt(row['consumado']));
                consum.push(parseInt(row['consumado']));
            });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                salida = {"categories": categ, "datos": [{'names': 'Tentado', 'tipo': 'TC', 'values': tent}, {'names': 'Consumado', 'tipo': 'TC', 'values': consum}, {'names': 'Total', 'tipo': 'T', 'values': total}]};
                client.end();
                return res.jsonp(salida);
            });

            query_res.on('error', function (row) {
                console.log(query);
                console.log(err);
                return res.status(500).send(err);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    hora: function (req, res) {
        var resultados = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            query = "select * from horarioconflictividadn2(";

            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                query = query.concat(req.query.fecha_d).concat(",").concat(req.query.fecha_h).concat(",'").concat(req.query.temp).concat("',");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                consulta = " and id_conflictividad in (".concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con la conflictividad');
            }
            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                consulta = consulta.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        consulta = consulta.concat("''").concat(barrios[i]).concat("''");
                        j = 1;
                    } else {
                        consulta = consulta.concat(",''").concat(barrios[i]).concat("''");
                    }
                }
                consulta = consulta.concat(" ) ");
            }
            if (typeof req.query.tag != 'undefined' && req.query.tag.length > 0) {
                palabras = req.query.tag.split(",");
                for (i = 0; i < palabras.length; i++) {
                    consulta = consulta.concat(" and descripcion_hecho like (''%").concat(palabras[i]).concat("%'')");
                }
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                consulta = consulta.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                consulta = consulta.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                consulta = consulta.concat(" and upper(lugar_hecho) like (''%").concat(req.query.calle.toUpperCase()).concat("%'') ");
            }

            query = query.concat("'").concat(consulta).concat("','');")


            // SQL Query > Select Data
            var query_res = client.query(query);

            // Stream results back one row at a time
            query_res.on('row', function (row) {

                resultados.push({"names": row['vartemp'], 'values': [parseInt(row['0']), parseInt(row['1']), parseInt(row['2']), parseInt(row['3']), parseInt(row['4']), parseInt(row['5']), parseInt(row['6']), parseInt(row['7']), parseInt(row['8']), parseInt(row['9']), parseInt(row['10']), parseInt(row['11']), parseInt(row['12']), parseInt(row['13']), parseInt(row['14']), parseInt(row['15']), parseInt(row['16']), parseInt(row['17']), parseInt(row['18']), parseInt(row['19']), parseInt(row['20']), parseInt(row['21']), parseInt(row['22']), parseInt(row['23']), ]});
            });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
                salida = {"categories": ["0hs", "1hs", "2hs", "3hs", "4hs", "5hs", "6hs", "7hs", "8hs", "9hs", "10hs", "11hs", "12hs", "13hs", "14hs", "15hs", "16hs", "17hs", "18hs", "19hs", "20hs", "21hs", "22hs", "23hs"], "datos": resultados};
                return res.jsonp(salida);
            });

            query_res.on('error', function (row) {
                console.log(query);
                console.log(err);
                return res.status(500).send(err);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    puntos: function (req, res) {
        var puntos = [];
        var leyenda = [];
        query_p = "SELECT  mod_colour as color_qgis2leaf ,case tentativa when 1 then 'circulo' else 'rombo' end as tipo ,id_actuacion as Actuacion ,id_fecha_hecho as FechaHecho ,hora_hecho ,lugar_hecho ,descripcion_hecho ,total_autores ,case uso_armas when 0 then 'NO' else 'SI' end as uso_armas ,lugar_lat ,lugar_long ,fig.id_conflictividad as conflictividad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where  1=1 and lugar_lat is not null and lugar_long is not null ";
        query_leyenda = "SELECT fig.desc_mod_figura||'-'||fig.desc_mod_modalidad as nombre ,mod_colour as color FROM ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where 1=1 and lugar_lat is not null and lugar_long is not null";
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));

            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                consulta = " and id_fecha_hecho >= ".concat(req.query.fecha_d).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h);
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                consulta = consulta.concat(" and fig.id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con el delito');
            }
            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                consulta = consulta.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        consulta = consulta.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        consulta = consulta.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                consulta = consulta.concat(" ) ");
            }
            if (typeof req.query.tag != 'undefined' && req.query.tag.length > 0) {
                palabras = req.query.tag.split(",");
                for (i = 0; i < palabras.length; i++) {
                    consulta = consulta.concat(" and descripcion_hecho like ('%").concat(palabras[i]).concat("%')");
                }
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                consulta = consulta.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                consulta = consulta.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                consulta = consulta.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }



            // SQL Query > Select Data
            var query_res = client.query(query_p.concat(consulta));

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                //puntos.push({'type':"Feature","properties":row,"geometry":{"type":"Point","coordinates":[row['lugar_long'],row['lugar_lat']] }});
                puntos.push(row);
            });

            var query_res = client.query(query_leyenda.concat(consulta).concat(" group by 1,2"));

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                leyenda.push(row);
            });

            query_res.on('error', function (row) {
                console.log(query_leyenda.concat(consulta).concat(" group by 1,2"));
                console.log(err);
                return res.status(500).send(err);
            });

            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                //     salida={'leyenda':leyenda,'datos':{'type':'FeatureCollection','crs':{'type':'name','properties':{'name':'urn:ogc:def:crs:OGC:1.3:CRS84'}},'features':puntos}};
                salida = {'leyenda': leyenda, 'datos': GeoJSON.parse(puntos, {'Point': ['lugar_lat', 'lugar_long'], 'crs': {'type': 'name', 'properties': {'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'}}})};
                client.end();
                return res.jsonp(salida);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    puntos_tiempo: function (req, res) {
        var puntos = [];

        query_p = "SELECT lugar_lat as LugarLat,lugar_long as LugarLong,trim( leading ' ' from substring( to_char(id_fecha_hecho, '99999999') from 1 for 5)||'-'||substring( to_char(id_fecha_hecho, '99999999') from 6 for 2)||'-'||substring( to_char(id_fecha_hecho, '99999999') from 8 for 2)||'T'||hora_hecho) as date from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where  1=1 and lugar_lat is not null and lugar_long is not null";
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));

            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                consulta = " and id_fecha_hecho >= ".concat(req.query.fecha_d).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h);
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                consulta = consulta.concat(" and fig.id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con el delito');
            }
            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                consulta = consulta.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        consulta = consulta.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        consulta = consulta.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                consulta = consulta.concat(" ) ");
            }
            if (typeof req.query.tag != 'undefined' && req.query.tag.length > 0) {
                palabras = req.query.tag.split(",");
                for (i = 0; i < palabras.length; i++) {
                    consulta = consulta.concat(" and descripcion_hecho like ('%").concat(palabras[i]).concat("%')");
                }
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                consulta = consulta.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                consulta = consulta.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                consulta = consulta.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }


            // SQL Query > Select Data
            var query_res = client.query(query_p.concat(consulta).concat("order by id_fecha_hecho asc"));

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                puntos.push(row);
            });

            query_res.on('error', function (row) {
                console.log(query_p.concat(consulta).concat("order by id_fecha_hecho asc"));
                console.log(err);
                return res.status(500).send(err);
            });

            query_res.on('end', function () {
                client.end();
                return res.jsonp(puntos);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    check: function (req, res) {

        var puntos = [];

        consulta = "SELECT count(*) from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad  left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where  1=1";
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                consulta = consulta.concat(" and id_fecha_hecho >= ").concat(req.query.fecha_d.replace("-", "")).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h.replace("-", ""));
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                consulta = consulta.concat(" and fig.id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con el delito');
            }
            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                consulta = consulta.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        consulta = consulta.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        consulta = consulta.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                consulta = consulta.concat(" ) ");
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                consulta = consulta.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                consulta = consulta.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                consulta = consulta.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }

            if (typeof req.query.tipo != 'undefined' && req.query.tipo.length > 0) {
                consulta = consulta.concat("and lugar_lat is not null and lugar_long is not null");
            }
            // SQL Query > Select Data
            var query_res = client.query(consulta);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                puntos.push(row);
            });

            query_res.on('error', function (row) {
                console.log(consulta);
                console.log(err);
                return res.status(500).send(err);
            });

            query_res.on('end', function () {
                client.end();
                return res.jsonp(puntos);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    check_mapa: function (req, res) {

        var puntos = [];

        consulta = "SELECT count(*) from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional where  1=1 and lugar_lat is not null and lugar_long is not null";
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            if (typeof req.query.fecha_d != 'undefined' && typeof req.query.fecha_h != 'undefined') {
                consulta = consulta.concat(" and id_fecha_hecho >= ").concat(req.query.fecha_d.replace("-", "")).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h.replace("-", ""));
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.val != 'undefined') {
                consulta = consulta.concat(" and fig.id_conflictividad in (").concat(req.query.val).concat(")");
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con el delito');
            }
            if (typeof req.query.bar != 'undefined' && req.query.bar.length > 0) {
                var j = 0;
                consulta = consulta.concat(" and cod_bahra in ( ");
                barrios = req.query.bar.split(",");
                for (i = 0; i < barrios.length; i++) {
                    if (j == 0) {
                        consulta = consulta.concat("'").concat(barrios[i]).concat("'");
                        j = 1;
                    } else {
                        consulta = consulta.concat(",'").concat(barrios[i]).concat("'");
                    }
                }
                consulta = consulta.concat(" ) ");
            }
            if (typeof req.query.dist != 'undefined' && req.query.dist.length > 0) {
                consulta = consulta.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != 'undefined' && req.query.sec.length > 0) {
                consulta = consulta.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.calle != 'undefined' && req.query.calle.length > 0) {
                consulta = consulta.concat(" and upper(lugar_hecho) like ('%").concat(req.query.calle.toUpperCase()).concat("%') ");
            }

            if (typeof req.query.tipo != 'undefined' && req.query.tipo.length > 0) {
                consulta = consulta.concat("and lugar_lat is not null and lugar_long is not null");
            }
            // SQL Query > Select Data
            var query_res = client.query(consulta);


            // Stream results back one row at a time
            query_res.on('row', function (row) {
                puntos.push(row);
            });

            query_res.on('error', function (row) {
                console.log(consulta);
                console.log(err);
                return res.status(500).send(err);
            });

            query_res.on('end', function () {
                client.end();
                return res.jsonp(puntos);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    }

};



module.exports = conflictividad;