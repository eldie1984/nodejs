var connectionString = require('../config/config');
var pg = require('pg');
var GeoJSON = require('geojson');

var conflicto_query = function (consulta, level, results, res) {
    query_mod = "select fig.desc_mod_figura||' - '||fig.desc_mod_modalidad as \"modalidad\",count(*) cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia where 1=1 ";
    query_n1 = "select nivel1, count(*) cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional  left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia where 1=1 ";
    query_n2 = "select nivel2,  count(*) cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia where 1=1 and nivel2 is not null";
    query_n3 = "select nivel3,  count(*) cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia where 1=1 and nivel3 is not null";
    query_n4 = "select nivel4,  count(*) cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia where 1=1 and nivel4 is not null";
    total = 0

    pg.connect(connectionString.DAC, function (err, client, done) {
        var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
        if (level == 'level1') {
            var query_res = client.query(query_n2.concat(consulta).concat(" group by 1 order by 1"));
            query_res.on('row', function (row) {
                results['data'].push({'y': parseInt(row['cantidad']), 'perc': 0, 'level': 'level2', 'name': row['nivel2'], 'drilldown': true});
                total = total + parseInt(row['cantidad']);
            });
            query_res.on('error', function (row) {
                console.log(query_n2.concat(consulta).concat(" group by 1 order by 1"));
                console.log(row);
                return res.status(500).send(err);
            });
        } else if (level == 'level2') {
            var query_res = client.query(query_n3.concat(consulta).concat(" group by 1 order by 1"));
            query_res.on('row', function (row) {
                results['data'].push({'y': parseInt(row['cantidad']), 'perc': 0, 'level': 'level3', 'name': row['nivel3'], 'drilldown': true});
                total = total + parseInt(row['cantidad']);
            });
            query_res.on('error', function (row) {
                console.log(query_n3.concat(consulta).concat(" group by 1 order by 1"));
                console.log(err);
                return res.status(500).send(err);
            });
        } else if (level == 'level3') {
            var query_res = client.query(query_n4.concat(consulta).concat(" group by 1 order by 1"));
            query_res.on('row', function (row) {
                results['data'].push({'y': parseInt(row['cantidad']), 'perc': 0, 'level': 'level4', 'name': row['nivel4'], 'drilldown': true});
                total = total + parseInt(row['cantidad']);
            });
            query_res.on('error', function (row) {
                console.log(query_n4.concat(consulta).concat(" group by 1 order by 1"));
                console.log(err);
                return res.status(500).send(err);
            });
        } else if (level == 'level4') {
            var query_res = client.query(query_mod.concat(consulta).concat(" group by 1 order by 1"));
            query_res.on('row', function (row) {
                results['data'].push({'y': parseInt(row['cantidad']), 'perc': 0,'level': 'modalidad', 'name': row['modalidad']});
                total = total + parseInt(row['cantidad']);
            });
            
            query_res.on('error', function (row) {
                console.log(query_modsub.concat(consulta).concat(" group by 1 order by 1"));
                console.log(err);
                return res.status(500).send(err);
            });
        } else {
            var query_res = client.query(query_n1.concat(consulta).concat(" group by 1 order by 1"));

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push({'y': parseInt(row['cantidad']), 'perc': 0, 'level': 'level1', 'name': row['nivel1'], 'drilldown': true});
                total = total + parseInt(row['cantidad']);
            });

            query_res.on('error', function (row) {
                console.log(query_n1.concat(consulta).concat(" group by 1 order by 1"));
                console.log(err);
                return res.status(500).send(err);
            });
        }

        query_res.on('end', function () {
            client.end();
            if (results['data'] != undefined && results['data'].length == 0) {
                if (level == 'level1') {
                    level = 'level2';
                }
                else if (level == 'level2') {
                    level = 'level3';
                }
                else if (level == 'level3') {
                    level = 'level4';
                }
                conflicto_query(consulta, level, results, res);
            }
            else {
                if (results['data'] == undefined) {
                    for (i = 0; i < results.length; i++) {
                        results[i]['perc'] = results[i]['y'] * 100 / total
                    }
                }
                else {
                    for (i = 0; i < results['data'].length; i++) {
                        results['data'][i]['perc'] = results['data'][i]['y'] * 100 / total
                    }


                }
                res.jsonp(results);
                ;
            }

        });

        // Handle Errors
        if (err) {
            console.log(err);
        }

    });


};


var control = {
    errorN2: function (req, res) {
        var results = [];
        var max;

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            listaErr = ['penitenciario%', 'capital%', 'caba', 'c.a.b.a', 'no %', 'capital%', 'comisaria%', '%aeropuerto%', '%estacion%', '%ffcc%', '%interior%', '% determinar%', '% ignora%', '%subte%', '%omnibus%', '%hospital%', '%via publica%', '%manzana%', '%villa %', 'ciudad autonoma de buenos aires', '%mza%']
            var i;
            var text_err = "";
            var text_no_err = "";
            for (i = 0; i < listaErr.length; i++) {
                text_err += "when lower(lugar_hecho) like '" + listaErr[i] + "' then 1 ";
                text_no_err += "when lower(lugar_hecho) like '" + listaErr[i] + "' then 0 ";
            }
            

            //queryErr = "select avg(cantidad) from (select id_fecha_hecho /100,count(id_fecha_hecho /100) as cantidad from ft_modalidad where cod_bahra is null and (lower(lugar_hecho) like 'capital%' or lower(lugar_hecho) like 'caba' or lower(lugar_hecho) like 'c.a.b.a' or lower(lugar_hecho) like 'no %') and id_fecha_hecho < 20160000 group by (id_fecha_hecho /100)) a union select count(*) as cantidad from ft_modalidad where cod_bahra is null and (lower(lugar_hecho) like 'capital%' or lower(lugar_hecho) like 'caba' or lower(lugar_hecho) like 'c.a.b.a' or lower(lugar_hecho) like 'no %') and id_fecha_hecho/100 = 201509 ";
            queryErr = "select (cantidad * 100 /total) porcentaje from (select sum(case " + text_err + " else 0 end) cantidad,count(*) total from ft_modalidad where cod_bahra is null) a";
            //queryVac = "select avg(cantidad) from (select id_fecha_hecho /100,count(id_fecha_hecho /100) as cantidad from ft_modalidad where cod_bahra is null and lugar_hecho is null and id_fecha_hecho < 20160000 group by (id_fecha_hecho /100)) a union select count(*) as cantidad from ft_modalidad where cod_bahra is null and lugar_hecho is null  and id_fecha_hecho/100 = 201509"
            queryVac = "select (cantidad * 100 /total) porcentaje from (select sum(case when lugar_hecho is null then 1 else 0 end ) cantidad, count(*) total from ft_modalidad where cod_bahra is null ) a"
            //queryref = "select avg(cantidad) from (select id_fecha_hecho /100,count(id_fecha_hecho /100) as cantidad from ft_modalidad where cod_bahra is null and lugar_hecho is not null and (lower(lugar_hecho) not like 'capital%' and lower(lugar_hecho) not like 'caba' and lower(lugar_hecho) not like 'c.a.b.a' and lower(lugar_hecho) not like 'no %' and lower(lugar_hecho) not like '% y %'and lower(lugar_hecho) not like 'esquina') and id_fecha_hecho < 20160000 group by (id_fecha_hecho /100)) a union select count(*) as cantidad from ft_modalidad where cod_bahra is null and lugar_hecho is not null and (lower(lugar_hecho) not like 'capital%' and lower(lugar_hecho) not like 'caba' and lower(lugar_hecho) not like 'c.a.b.a' and lower(lugar_hecho) not like 'no %' and lower(lugar_hecho) not like '% y %'and lower(lugar_hecho) not like 'esquina')  and id_fecha_hecho/100 = 201509"
            queryref = "select (cantidad * 100 /total) porcentaje from (select sum(case when lugar_hecho is null then 0 " + text_no_err + " else 1 end ) cantidad, count(*) total from ft_modalidad where cod_bahra is null ) a"
            //querybar = "select avg(cantidad) from (select id_fecha_hecho /100,count(id_fecha_hecho /100) as cantidad from ft_modalidad where cod_bahra =0 and id_fecha_hecho < 20160000 group by (id_fecha_hecho /100)) a union select count(*) as cantidad from ft_modalidad where cod_bahra ='0000000000'  and id_fecha_hecho/100 = 201509"
            querybar = "select (cantidad * 100 /total) porcentaje from (select sum(case cod_bahra when 0 then 1 else 0 end) cantidad, count(*) total  from ft_modalidad where cod_bahra is not null) a"
            //queryInter = "select avg(cantidad) from (select id_fecha_hecho /100,count(id_fecha_hecho /100) as cantidad from ft_modalidad where cod_bahra is null and (lower(lugar_hecho) like '% y %'or lower(lugar_hecho) like 'esquina') and id_fecha_hecho < 20160000 group by (id_fecha_hecho /100)) a union select count(*) as cantidad from ft_modalidad where cod_bahra is null and (lower(lugar_hecho) like '% y %'or lower(lugar_hecho) like 'esquina') and id_fecha_hecho/100 = 201509 "
            queryInter = "select (cantidad * 100 /total) porcentaje from (select sum(case when lugar_hecho is null then 0 " + text_no_err + " when lower(lugar_hecho) like '% y %' then 1 when lower(lugar_hecho) like 'esquina' then 1 else 0 end ) cantidad, sum(case when lugar_hecho is null then 0 " + text_no_err + " else 1 end )  total from ft_modalidad where cod_bahra is null ) a"
            // SQL Query > Select Data
            var query_res = client.query(queryErr);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(queryErr);
                console.log(err);
                return res.status(500).send(err);
            });
            query_res = client.query(queryVac);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(queryVac);
                console.log(err);
                return res.status(500).send(err);
            });
            query_res = client.query(queryref);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(queryref);
                console.log(err);
                return res.status(500).send(err);
            });

            query_res = client.query(querybar);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(querybar);
                console.log(err);
                return res.status(500).send(err);
            });

            query_res = client.query(queryInter);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(queryInter);
                console.log(err);
                return res.status(500).send(err);
            });

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
    delitosUrbanos: function (req, res) {
        var results = [];
        var sum = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {

            //query = "select sum(case conf.mod_conflictividad when 'Delitos Urbanos' then 1 else 0 end) urbanos, sum(case conf.mod_conflictividad when 'Delitos Urbanos' then 0 else 1 end)  nourbanos from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_conflictividad conf on fig.id_conflictividad=conf.id_conflictividad where 1=1 and conf.id_conflictividad <> 30 ";
            query_sub_del = "select case conf.mod_conflictividad when 'Delitos Urbanos' then 'Delitos Urbanos' else 'No Delitos Urbanos' end conflictividad, conf.mod_tipo_delito delito ,conf.mod_sub_tipo_delito subdelito,count(*) cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_conflictividad conf on fig.id_conflictividad=conf.id_conflictividad where 1=1 and conf.id_conflictividad <> 30 ";
            query_del = "select case conf.mod_conflictividad when 'Delitos Urbanos' then 'Delitos Urbanos' else 'No Delitos Urbanos' end conflictividad, conf.mod_tipo_delito delito ,  count(*) cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_conflictividad conf on fig.id_conflictividad=conf.id_conflictividad where 1=1 and conf.id_conflictividad <> 30 ";
            query_conf = "select case conf.mod_conflictividad when 'Delitos Urbanos' then 'Delitos Urbanos' else 'No Delitos Urbanos' end conflictividad, count(*) cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_conflictividad conf on fig.id_conflictividad=conf.id_conflictividad where 1=1 and conf.id_conflictividad <> 30 "

            if (typeof req.query.fecha_d != undefined && typeof req.query.fecha_h != undefined) {
                consulta = " and id_fecha_hecho/100 >= ".concat(req.query.fecha_d);
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.dist != undefined && req.query.dist.length > 0) {
                consulta = consulta.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != undefined && req.query.sec.length > 0) {
                consulta = consulta.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }

            //query_data=query_data.concat(consulta).concat(" group by conf.mod_tipo_delito,1 order by 1");
            // SQL Query > Select Data
            var query_res = client.query(query_conf.concat(consulta).concat(" group by 1 order by 1"));

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push({'y': parseInt(row['cantidad']), 'name': row['conflictividad'], 'drilldown': {'name': row['conflictividad'], 'data': []}});
            });

            query_res.on('error', function (row) {
                console.log(query_conf.concat(consulta).concat(" group by 1 order by 1"));
                console.log(err);
                return res.status(500).send(err);
            });

            var query_res = client.query(query_del.concat(consulta).concat(" group by conf.mod_tipo_delito,1 order by 1"));
            query_res.on('row', function (row) {

                for (i = 0; i < results.length; i++) {
                    if (results[i]['name'] == row['conflictividad']) {
                        results[i]['drilldown']['data'].push({'y': parseInt(row['cantidad']), 'name': row['delito'], 'drilldown': {'name': row['delito'], 'categories': [], 'data': []}});
                    }
                }
            });
            query_res.on('error', function (row) {
                console.log(query_del.concat(consulta).concat(" group by conf.mod_tipo_delito,1 order by 1"));
                console.log(err);
                return res.status(500).send(err);
            });
            var query_res = client.query(query_sub_del.concat(consulta).concat(" group by conf.mod_sub_tipo_delito,conf.mod_tipo_delito,1 order by 1"));
            query_res.on('row', function (row) {
                for (i = 0; i < results.length; i++) {
                    if (results[i]['name'] == row['conflictividad']) {
                        for (j = 0; j < results[i]['drilldown']['data'].length; j++) {
                            if (results[i]['drilldown']['data'][j]['name'] == row['delito']) {
                                results[i]['drilldown']['data'][j]['drilldown']['categories'].push(row['subdelito']);
                                results[i]['drilldown']['data'][j]['drilldown']['data'].push(parseInt(row['cantidad']));
                            }
                        }
                    }
                }
            });

            query_res.on('error', function (row) {
                console.log(query_del.concat(consulta).concat(" group by conf.mod_tipo_delito,1 order by 1"));
                console.log(err);
                return res.status(500).send(err);
            });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                //salida={"urbano":sum[0]['urbanos'] ,"nourbano" : sum[0]['nourbanos'] , datos: results}
                client.end();
                res.jsonp(results);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }

        });
    },
    espacioUrbanos: function (req, res) {
        var results = [];
        var sum = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {

            query_data = "select conf.mod_tipo_delito,id_fecha_hecho/100 fecha,count(*) from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_conflictividad conf on fig.id_conflictividad=conf.id_conflictividad where 1=1 ";

            if (typeof req.query.fecha_d != undefined && typeof req.query.fecha_h != undefined) {
                query_data = query_data.concat(" and id_fecha_hecho/100 >= ").concat(req.query.fecha_d);
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.dist != undefined && req.query.dist.length > 0) {
                query_data = query_data.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != undefined && req.query.sec.length > 0) {
                query_data = query_data.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }
            if (typeof req.query.tipo != undefined && req.query.tipo.length > 0) {
                if (req.query.tipo == 'urbano') {
                    query_data = query_data.concat(" and conf.mod_conflictividad = 'Delitos Urbanos'");
                } else {
                    query_data = query_data.concat(" and conf.mod_conflictividad <> 'Delitos Urbanos' ");
                }
            }

            query_data = query_data.concat("group by conf.mod_tipo_delito,2 order by 1")
            // SQL Query > Select Data
            var query_res = client.query(query_data);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(query_data);
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
    subtipoUrbanos: function (req, res) {
        var results = [];
        var sum = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {

            query_data = "select conf.mod_sub_tipo_delito,id_fecha_hecho/100 fecha,count(*) from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_conflictividad conf on fig.id_conflictividad=conf.id_conflictividad where 1=1 ";

            if (typeof req.query.fecha_d != undefined && typeof req.query.fecha_h != undefined) {
                query_data = query_data.concat(" and id_fecha_hecho/100 >= ").concat(req.query.fecha_d);
            }
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
            }
            if (typeof req.query.dist != undefined && req.query.dist.length > 0) {
                query_data = query_data.concat(" and id_secc_distrito in (").concat(req.query.dist).concat(") ");
            }
            if (typeof req.query.sec != undefined && req.query.sec.length > 0) {
                query_data = query_data.concat(" and id_sec_seccional in (").concat(req.query.sec).concat(") ");
            }

            if (typeof req.query.tipo != undefined && req.query.tipo.length > 0) {
                if (req.query.tipo == 'urbano') {
                    query_data = query_data.concat(" and conf.mod_conflictividad = 'Delitos Urbanos'");
                } else {
                    query_data = query_data.concat(" and conf.mod_conflictividad <> 'Delitos Urbanos' ");
                }
            }

            if (typeof req.query.delito != undefined && req.query.delito.length > 0) {
                query_data = query_data.concat(" and conf.mod_tipo_delito = '").concat(req.query.delito).concat("' ");
            }

            query_data = query_data.concat(" group by conf.mod_sub_tipo_delito,2 order by 1")
            // SQL Query > Select Data
            var query_res = client.query(query_data);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(query_data);
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
    fluctuaciones: function (req, res) {
        var results = [];
        var sum = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {

            query_data = "select mod.id_mod_modalidad as id_mod_modalidad ,anio,anio1,anio2,anio3,anio4, mod.desc_mod_figura||' - '||mod.desc_mod_modalidad as \"modalidad\",s.z from dw.sat_dist s left outer join dw.lk_figura_modalidad mod on mod.id_mod_modalidad=s.id_mod_modalidad "

           if (typeof req.query.dist !== 'undefined' && req.query.dist.length > 0) {
                query_data = query_data.concat(" where id_dist_instruccion=").concat(req.query.dist);
                } else {
                    query_data = query_data.concat(" where id_dist_instruccion=0");
                }


            // SQL Query > Select Data
            var query_res = client.query(query_data);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(query_data);
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
    diferencia: function (req, res) {
        var results = [];
        var sum = [];

        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {

            query_data = "SELECT diff  FROM dw.diference; "

           
            // SQL Query > Select Data
            var query_res = client.query(query_data);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                results.push(row);
            });

            query_res.on('error', function (row) {
                console.log(query_data);
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
    conflicto: function (req, res) {
        var results = [];
        if (typeof req.query.fecha_d !== 'undefined' && typeof req.query.fecha_h !== 'undefined') {
                consulta = (" and id_fecha_hecho >=").concat(req.query.fecha_d).concat(" and id_fecha_hecho <=").concat(req.query.fecha_h);
                } 
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
                }
        
        if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                if(req.query.tipo == 'correccional'){
                    consulta = consulta.concat(" and id_dist_correcional= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'correccional'");

                    }
                else if(req.query.tipo == 'instruccion'){
                    consulta = consulta.concat(" and id_dist_instruccion= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'instrucción'");
                    }
                else if(req.query.tipo == 'menores'){
                    consulta = consulta.concat(" and lower(desc_fisc_fuero)= 'menores'");
                    }
                }
        if (typeof req.query.level != 'undefined' && req.query.level.length > 0 && typeof req.query.name != 'undefined' && req.query.name.length > 0) {
            req.query.name=req.query.name.replace(/%E1/g,'á').replace(/%E9/g,'é').replace(/%ED/g,"í").replace(/%F3/g,"ó").replace(/%FA/g,"ú").replace(/%20/g," ");
            if (req.query.level == 'level1') {
                consulta = consulta.concat(" and nivel1='").concat(req.query.name).concat("'")
                results = {'name': req.query.name, 'data': []};
                } 
            else if (req.query.level == 'level2') {
                consulta = consulta.concat(" and nivel2='").concat(req.query.name).concat("'")
                results = {'name': req.query.name, 'data': []};
                } 
            else if (req.query.level == 'level3') {
                consulta = consulta.concat(" and nivel3='").concat(req.query.name).concat("'")
                results = {'name': req.query.name, 'data': []};
                } 
            else if (req.query.level == 'level4') {
                consulta = consulta.concat(" and nivel4='").concat(req.query.name).concat("'");
                results = {'name': req.query.name, 'data': []};
                }
            }

        results = conflicto_query(consulta, req.query.level, results, res);

        },
    total: function (req, res) {
        var categ = [];
        var total = [];
        var prom = [];
        sum=0;
        
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            //query = "SELECT  id_tie_anio,numero_mes,to_char(to_date(trim(to_char(id_tie_anio,'0000'))||trim(to_char(numero_mes,'00')) || '00', 'YYYYMMDD'),'TMMon-YYYY') as vartemp, count(*) as cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional sec on sec.id_secc_seccional=mod.id_sec_seccional left outer join lk_tiempo tie on id_fecha = id_fecha_hecho";
            query=",'99999999'), 'YYYYMMDD') as fulldate ) select  to_char(fulldate,'TMMon-YYYY') as vartemp,cantidad from simul_data left outer join (select to_date(to_char(id_tie_mes,'99999999'), 'YYYYMM') as id_tie_mes ,count(*) as cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional sec on sec.id_secc_seccional=mod.id_sec_seccional left outer join lk_tiempo on id_fecha=id_fecha_hecho left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia where 1=1 "
            if (typeof req.query.fecha_d !== 'undefined') {
                query = "with simul_data as(select interval '1 month' *generate_series(0,5) +to_date(to_char(".concat(req.query.fecha_d).concat(query);
                } 
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
                }
            if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                if(req.query.tipo == 'correccional'){
                    query = query.concat(" and id_dist_correcional= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'correccional'");

                    }
                else if(req.query.tipo == 'instruccion'){
                    query = query.concat(" and id_dist_instruccion= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'instrucción'");
                    }
                else if(req.query.tipo == 'menores'){
                    query = query.concat(" and lower(desc_fisc_fuero)= 'menores'");
                    }
                }
                
            if (typeof req.query.level != 'undefined' && req.query.level.length > 0 && typeof req.query.name != 'undefined' && req.query.name.length > 0) {
                req.query.name=req.query.name.replace(/%E1/g,'á').replace(/%E9/g,'é').replace(/%ED/g,"í").replace(/%F3/g,"ó").replace(/%FA/g,"ú").replace(/%20/g," ");
                if (req.query.level == 'level1') {
                    query = query.concat(" and nivel1='").concat(req.query.name).concat("'");
                    results = {'name': req.query.name, 'data': []};
                    } 
                else if (req.query.level == 'level2') {
                    query = query.concat(" and nivel2='").concat(req.query.name).concat("'");
                    results = {'name': req.query.name, 'data': []};
                    } 
                else if (req.query.level == 'level3') {
                    query = query.concat(" and nivel3='").concat(req.query.name).concat("'")
                    results = {'name': req.query.name, 'data': []};
                    } 
                else if (req.query.level == 'level4') {
                    query = query.concat(" and nivel4='").concat(req.query.name).concat("'");
                    results = {'name': req.query.name, 'data': []};
                    } 
                else if (req.query.level == 'modalidad') {
                    query = query.concat(" and fig.desc_mod_figura||' - '||fig.desc_mod_modalidad='").concat(req.query.name).concat("'");
                    results = {'name': req.query.name, 'data': []};
                    }
                } 
            query = query.concat(" group by 1 order by id_tie_mes asc) a on fulldate=id_tie_mes;");
            // SQL Query > Select Data
            var query_res = client.query(query);
            // Stream results back one row at a time
            query_res.on('row', function (row) {
                if (row['vartemp'] != null){
                    categ.push(row['vartemp']);
                    total.push(parseInt(row['cantidad']));
                    sum=sum+parseInt(row['cantidad']);
                    }
                });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                sum=0;
                for(var i in total) { sum += total[i]; }
                for (i = 0; i < total.length; i++) {
                    prom.push(Math.floor(sum/total.length));
                }
                salida = {"categories": categ, "datos": [{'names': 'Total', 'tipo': 'T', 'values': total},{'names': 'Promedio', 'tipo': 'T', 'values': prom}]};
                client.end();
                return res.jsonp(salida);
                });
            query_res.on('error', function (row) {
                console.log(query);
                return res.status(500).send(err);
                });
            // Handle Errors
            if (err) {
                console.log(err);
                }
            });
        },
    comisarias: function (req, res) {
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            // Handle Errors
            if (err) {
            console.log(err);
            }
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            select="select desc_secc_seccional"
            query = ",count(*) as cantidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional sec on sec.id_secc_seccional=mod.id_sec_seccional left outer join lk_tiempo tie on id_fecha = id_fecha_hecho left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia where 1=1";
            if (typeof req.query.fecha_d !== 'undefined' && typeof req.query.fecha_h !== 'undefined') {
                query = query.concat(" and id_fecha_hecho >=").concat(req.query.fecha_d).concat(" and id_fecha_hecho <=").concat(req.query.fecha_h);
                } 
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
                }
            if (typeof req.query.level != 'undefined' && req.query.level.length > 0 && typeof req.query.name != 'undefined' && req.query.name.length > 0) {
                req.query.name=req.query.name.replace(/%E1/g,'á').replace(/%E9/g,'é').replace(/%ED/g,"í").replace(/%F3/g,"ó").replace(/%FA/g,"ú").replace(/%20/g," ");
                if (req.query.level == 'level1') {
                    query = query.concat(" and nivel1='").concat(req.query.name).concat("'")
                    results = {'name': req.query.name, 'data': []};
                    } 
                else if (req.query.level == 'level2') {
                    query = query.concat(" and nivel2='").concat(req.query.name).concat("'")
                    results = {'name': req.query.name, 'data': []};
                    } 
                else if (req.query.level == 'level3') {
                    query = query.concat(" and nivel3='").concat(req.query.name).concat("'")
                    results = {'name': req.query.name, 'data': []};
                    } 
                else if (req.query.level == 'level4') {
                    query = query.concat(" and nivel4='").concat(req.query.name).concat("'");
                    results = {'name': req.query.name, 'data': []};
                    }
                else if (req.query.level == 'modalidad') {
                    query = query.concat(" and fig.desc_mod_figura||' - '||fig.desc_mod_modalidad='").concat(req.query.name).concat("'")
                    results = {'name': req.query.name, 'data': []};
                    }
                } 

            if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                if(req.query.tipo == 'correccional'){
                    query = query.concat(" and id_dist_correcional= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'correccional'");

                    }
                else if(req.query.tipo == 'instruccion'){
                    query = query.concat(" and id_dist_instruccion= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'instrucción'");
                    }
                else if(req.query.tipo == 'menores'){
                    query = query.concat(" and lower(desc_fisc_fuero)= 'menores'");
                    }
                }
            else {
                select="select 'Distrito '|| id_dist_instruccion as desc_secc_seccional";
                query = query.concat(" and id_dist_instruccion is not null ")
                }
            
            // SQL Query > Select Data
            var query_res = client.query(select.concat(query).concat(" group by 1 order by 1"));
            
            // Stream results back one row at a time
            var datos = [];
            var total = 0;
            query_res.on('row', function (row) {
                total = total + parseInt(row['cantidad']);
                datos.push({'y':row['cantidad'],'name':row['desc_secc_seccional'],'perc':0});
                });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
                for (i = 0; i < datos.length; i++) {
                    datos[i]['perc'] = datos[i]['y'] * 100 / total;
                    }
                salida = {'datos':datos, 'total':total};
                return res.jsonp(salida);
                });
            query_res.on('error', function (row) {
                console.log(query);
                console.log(row);
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
        var results = [];
        query_p = "SELECT  mod_colour as color_qgis2leaf ,case tentativa when 1 then 'circulo' else 'rombo' end as tipo ,id_actuacion as Actuacion ,id_fecha_hecho as FechaHecho ,hora_hecho ,lugar_hecho ,descripcion_hecho ,total_autores ,case uso_armas when 0 then 'NO' else 'SI' end as uso_armas ,lugar_lat ,lugar_long ,mod.id_mod_modalidad as modalidad from ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional  left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia  where  1=1 and lugar_lat is not null and lugar_long is not null ";
        query_leyenda = "SELECT fig.desc_mod_figura||'-'||fig.desc_mod_modalidad as nombre ,mod_colour as color FROM ft_modalidad mod left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia  where 1=1 and lugar_lat is not null and lugar_long is not null";
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            var consulta = "";
            if (typeof req.query.fecha_d !== 'undefined' && typeof req.query.fecha_h !== 'undefined') {
                consulta = " and id_fecha_hecho >= ".concat(req.query.fecha_d).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h);
                } 
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
                }

            if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                if(req.query.tipo == 'correccional'){
                    consulta = consulta.concat(" and id_dist_correcional= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'correccional'");

                    }
                else if(req.query.tipo == 'instruccion'){
                    consulta = consulta.concat(" and id_dist_instruccion= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'instrucción'");
                    }
                else if(req.query.tipo == 'menores'){
                    consulta = consulta.concat(" and lower(desc_fisc_fuero)= 'menores'");
                    }
                }
            if (typeof req.query.level != 'undefined' && req.query.level.length > 0 && typeof req.query.name != 'undefined' && req.query.name.length > 0) {
                req.query.name=req.query.name.replace(/%E1/g,'á').replace(/%E9/g,'é').replace(/%ED/g,"í").replace(/%F3/g,"ó").replace(/%FA/g,"ú").replace(/%20/g," ");
                if (req.query.level == 'level1') {
                    consulta = consulta.concat(" and nivel1='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level2') {
                    consulta = consulta.concat(" and nivel2='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level3') {
                    consulta = consulta.concat(" and nivel3='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level4') {
                    consulta = consulta.concat(" and nivel4='").concat(req.query.name).concat("'");
                    } 
                else if (req.query.level == 'modalidad') {
                    consulta = consulta.concat(" and fig.desc_mod_figura||' - '||fig.desc_mod_modalidad='").concat(req.query.name).concat("'")
                    } 
                else{
                    return res.status(500).send('ERRROOOOOOOR con el nivel');
                    }

                }
            // SQL Query > Select Data
            var query_res = client.query(query_p.concat(consulta));
            // Stream results back one row at a time
            query_res.on('row', function (row) {
                puntos.push(row);
                });
            var query_res = client.query(query_leyenda.concat(consulta).concat(" group by 1,2"));
            // Stream results back one row at a time
            query_res.on('row', function (row) {
                leyenda.push(row);
                });
            query_res.on('error', function (row) {
                console.log(query_leyenda.concat(consulta).concat(" group by 1,2"));
                console.log(row);
                return res.status(500).send(err);
                });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
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
    comisariaMax: function (req, res) {
        var results = [];
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            select="select id_sec_seccional as name";
            if (typeof req.query.fecha_d !== 'undefined' && typeof req.query.fecha_h !== 'undefined') {
                query = ",count(*) as densidad FROM ft_modalidad mod left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional  inner join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia  where 1=1 and id_fecha_hecho >= ".concat(req.query.fecha_d).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h);
                } 
            else {
                    return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
                }
            if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                if(req.query.tipo == 'correccional'){
                    query = query.concat(" and id_dist_correcional= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'correccional'");

                    }
                else if(req.query.tipo == 'instruccion'){
                    query = query.concat(" and id_dist_instruccion= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'instrucción'");
                    }
                else if(req.query.tipo == 'menores'){
                    query = query.concat(" and lower(desc_fisc_fuero)= 'menores'");
                    }
                }
            else {
                select="select 'Distrito '|| id_dist_instruccion as name";
                }    
            if (typeof req.query.level != 'undefined' && req.query.level.length > 0 && typeof req.query.name != 'undefined' && req.query.name.length > 0) {
                req.query.name=req.query.name.replace(/%E1/g,'á').replace(/%E9/g,'é').replace(/%ED/g,"í").replace(/%F3/g,"ó").replace(/%FA/g,"ú").replace(/%20/g," ");
                if (req.query.level == 'level1') {
                    query = query.concat(" and nivel1='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level2') {
                    query = query.concat(" and nivel2='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level3') {
                    query = query.concat(" and nivel3='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level4') {
                    query = query.concat(" and nivel4='").concat(req.query.name).concat("'");               
                    } 
                else if (req.query.level == 'modalidad') {
                    query = query.concat(" and fig.desc_mod_figura||' - '||fig.desc_mod_modalidad='").concat(req.query.name).concat("'")
                    } 
                }
            
        
            query = select.concat(query).concat(" group by 1 order by 2 desc limit 1");
           
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
    comisariaCloroDatos: function (req, res) {
        var results = [];
        // Get a Postgres client from the connection pool
        pg.connect(connectionString.GIS, function (err, client, done) {

            query = "SELECT ST_AsGeoJSON(geom) as poly, id_seccion,regexp_replace(nombre, 'í', 'i') as nombre,0 as cant FROM \"CABA\".secciones_policiales_poly where 1=1";

            if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                if(req.query.tipo == 'correccional'){
                    query = query.concat(" and correccion= ").concat(req.query.distrito);
                    }
                else if(req.query.tipo == 'instruccion'){
                    query = query.concat(" and instruccio= ").concat(req.query.distrito);
                    }
                }
            else{
                query="SELECT ST_AsGeoJSON(geom) as poly, instruccio as id_seccion ,'Distrito '|| instruccio as nombre,0 as cant FROM \"CABA\".distrito_instruccion_poly where 1=1";
            }
            // SQL Query > Select Data
            var query_res = client.query(query);
            // Stream results back one row at a time
            query_res.on('row', function (row) {
                row.poly = JSON.parse(row.poly).coordinates;
                results.push({'name': row.nombre, 'density': row.cant, 'seccional': row.id_seccion, 'polygon': row.poly});
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
            select="select secc.desc_secc_seccional as seccional";
            query = ",count(*) as cantidad FROM ft_modalidad mod  left outer join lk_figura_modalidad fig on fig.id_mod_modalidad=mod.id_mod_modalidad left outer join lk_seccional secc on secc.id_secc_seccional=mod.id_sec_seccional left outer join lk_fiscalia fisc on fisc.id_fisc_fiscalia=mod.id_numero_fiscalia where 1=1 ";
            if (typeof req.query.fecha_d !== 'undefined' && typeof req.query.fecha_h !== 'undefined') {
                query = query.concat(" and id_fecha_hecho >= ").concat(req.query.fecha_d).concat(" and id_fecha_hecho <= ").concat(req.query.fecha_h);
                } 
            else {
                return res.status(500).send('ERRROOOOOOOR con con las fechas desde y hasta');
                }
            
            if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                if(req.query.tipo == 'correccional'){
                    query = query.concat(" and id_dist_correcional= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'correccional'");

                    }
                else if(req.query.tipo == 'instruccion'){
                    query = query.concat(" and id_dist_instruccion= ").concat(req.query.distrito).concat(" and lower(desc_fisc_fuero)= 'instrucción'");
                    }
                else if(req.query.tipo == 'menores'){
                    query = query.concat(" and lower(desc_fisc_fuero)= 'menores'");
                    }
                }
            else {
                select="select id_dist_instruccion as seccional";
                }
            if (typeof req.query.level != 'undefined' && req.query.level.length > 0 && typeof req.query.name != 'undefined' && req.query.name.length > 0) {
                req.query.name=req.query.name.replace(/%E1/g,'á').replace(/%E9/g,'é').replace(/%ED/g,"í").replace(/%F3/g,"ó").replace(/%FA/g,"ú").replace(/%20/g," ");
                if (req.query.level == 'level1') {
                    query = query.concat(" and nivel1='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level2') {
                    query = query.concat(" and nivel2='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level3') {
                    query = query.concat(" and nivel3='").concat(req.query.name).concat("'")
                    } 
                else if (req.query.level == 'level4') {
                    query = query.concat(" and nivel4='").concat(req.query.name).concat("'");
                    }
                else if (req.query.level == 'modalidad') {
                    query = query.concat(" and fig.desc_mod_figura||' - '||fig.desc_mod_modalidad='").concat(req.query.name).concat("'")
                    } 
                }
            
            query = select.concat(query).concat(" group by 1 order by 2 desc");
            //console.log(query);
            // SQL Query > Select Data
            var query_res = client.query(query);

            // Stream results back one row at a time
            query_res.on('row', function (row) {
                for (var i = 0; i < results.length; i++) {
                   // console.log(row.seccional)
                   // console.log(results[i].seccional)
                    if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                        if (row.seccional === results[i].name){
                            results[i].density = row.cantidad;
                            }

                        }
                    else {
                        if (row.seccional === results[i].seccional){
                        results[i].density = row.cantidad;
                            }
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
                return res.jsonp(GeoJSON.parse(results, {'MultiPolygon': 'polygon'}));
                });

            // Handle Errors
            if (err) {
                console.log(err);
                }

            });
        },
    center: function (req, res) {
        pg.connect(connectionString.DAC, function (err, client, done) {
            var query_res = client.query("SET SEARCH_PATH TO ".concat(connectionString.DAC_schema));
            query = "select * from lk_distritos where 1=1";
        if (typeof req.query.distrito != undefined && req.query.distrito.length > 0) {
                if(req.query.tipo == 'correccional'){
                    query=query.concat(" and fuero = 'Correccional' and distrito = ").concat(req.query.distrito);

                    }
                else if(req.query.tipo == 'instruccion'){
                    query=query.concat(" and fuero = 'Instruccion' and distrito = ").concat(req.query.distrito);
                    }                        
                else if(req.query.tipo == 'menores'){
                    query=query.concat(" and fuero = 'Caba'");
                    }
                }
            else {
                query=query.concat(" and fuero = 'Caba'");
                }

                // SQL Query > Select Data
            var query_res = client.query(query);
            query_res.on('row', function (row) {
                salida = {'maxZoom':row['zoom'], 'latitud':row['latitud'], 'longitud':row['longitud']};
                });
            // After all data is returned, close connection and return results
            query_res.on('end', function () {
                client.end();
                
                return res.jsonp(salida);
                });
            query_res.on('error', function (row) {
                console.log(query);
                console.log(row);
                return res.status(500).send(err);
                });
            // Handle Errors
            if (err) {
                console.log(err);
                }
              });

        
    }
        
};



module.exports = control;
