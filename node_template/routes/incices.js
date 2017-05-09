var connectionString = require('../config/config');
var pg = require('pg');

var indices = {

  temprana: function(req, res) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        
    	if (typeof req.query.agrup != 'undefined'&& req.query.agrup.length > 0){
        	if (req.query.agrup == "caba")
        	{
        		query = "select mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year,sum(year2) as year2,sum(year1) as year1,sum(year0) as year0,sum(month4) as month4,sum(month3) as month3,sum(month2) as month2,sum(month1) as month1,sum(umbral) as umbral,sum(evol_temp) as evol_temp,case when sum(umbral) = 0 then sum(year0) *100 else floor(sum(year0)*100 /sum(umbral))-100 end as umbral_perc,case when sum(evol_temp) = 0 then sum(year0) * 100 else floor(sum(year0) *100 / sum(evol_temp))-100 end as evol_perc from conf_sumarise_sec su left outer join lk_conflictividad conf on conf.id_conflictividad=su.conf_if where 1=1";
                group=" group by mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year"
        	}else if (req.query.agrup == "comi")
        	{
        		query = "select mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year,su.year2,year1,year0,month4,month3,month2,month1,umbral,evol_temp,seccional,case when umbral = 0 then year0 *100 else floor(year0*100 /umbral)-100 end as umbral_perc,case when evol_temp = 0 then year0 * 100 else floor(year0 *100 / evol_temp) -100 end as evol_perc from conf_sumarise_sec su left outer join lk_conflictividad conf on conf.id_conflictividad=su.conf_if where 1=1";
        		group=""
        	}else if (req.query.agrup == "jur")
        	{
        		query = "select mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year,id_secc_jurisdiccion as jurisdiccion,sum(year2) as year2,sum(year1) as year1,sum(year0) as year0,sum(month4) as month4,sum(month3) as month3,sum(month2) as month2,sum(month1) as month1,sum(umbral) as umbral,sum(evol_temp) as evol_temp,case when sum(umbral) = 0 then sum(year0) *100 else floor(sum(year0)*100 /sum(umbral))-100 end as umbral_perc,case when sum(evol_temp) = 0 then sum(year0) * 100 else floor(sum(year0) *100 / sum(evol_temp))-100 end as evol_perc from conf_sumarise_sec su left outer join lk_conflictividad conf on conf.id_conflictividad=su.conf_if left outer join lk_seccional sec on sec.id_secc_seccional=su.seccional where 1=1 ";
                group="group by mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year,id_secc_jurisdiccion";
        	} else{
        		return res.status(500).send('ERRROOOOOOOR con la agrupacion');
        	}
            
        }
        
        if (typeof req.query.mayor != 'undefined' && req.query.mayor.length > 0){
          query=query.concat(" and umbral_perc >=").concat(req.query.mayor).concat(" and evol_perc >=").concat(req.query.mayor);
        }

        if (typeof req.query.menor != 'undefined' && req.query.menor.length > 0){
          query=query.concat(" and umbral_perc <=").concat(req.query.menor).concat(" and evol_perc <=").concat(req.query.menor);
        }
        
       
        if (typeof req.query.aniomes != 'undefined' && req.query.aniomes.length > 0){
            
        }
        
        
        // SQL Query > Select Data
        var query_res = client.query(query.concat(group));

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
    mensual: function(req, res) {
    var results = [];
    var today = new Date();
    var dd = today.getDate();
    
    if(dd<10) {
      dd='0'+dd
    } 

    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString.DAC, function(err, client, done) {
        
        
        if (typeof req.query.agrup != 'undefined'&& req.query.agrup.length > 0){
            if (req.query.agrup == "caba")
            {
                query = "select mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year,sum(year2) as year2,sum(year1) as year1,sum(year0) as year0,sum(month4) as month4,sum(month3) as month3,sum(month2) as month2,sum(month1) as month1,sum(umbral) as umbral,sum(evol_temp) as evol_temp,case when sum(umbral) = 0 then sum(year0) *100 else floor(sum(year0)*100 /sum(umbral))-100 end as umbral_perc,case when sum(evol_temp) = 0 then sum(year0) * 100 else floor(sum(year0) *100 / sum(evol_temp))-100 end as evol_perc from conf_sumarise_sec su left outer join lk_conflictividad conf on conf.id_conflictividad=su.conf_if where 1=1";
                group=" group by mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year"
            }else if (req.query.agrup == "comi")
            {
                query = "select mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year,su.year2,year1,year0,month4,month3,month2,month1,umbral,evol_temp,seccional,case when umbral = 0 then year0 *100 else floor(year0*100 /umbral)-100 end as umbral_perc,case when evol_temp = 0 then year0 * 100 else floor(year0 *100 / evol_temp) -100 end as evol_perc from conf_sumarise_sec su left outer join lk_conflictividad conf on conf.id_conflictividad=su.conf_if where 1=1";
                group=""
            }else if (req.query.agrup == "jur")
            {
                query = "select mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year,id_secc_jurisdiccion as jurisdiccion,sum(year2) as year2,sum(year1) as year1,sum(year0) as year0,sum(month4) as month4,sum(month3) as month3,sum(month2) as month2,sum(month1) as month1,sum(umbral) as umbral,sum(evol_temp) as evol_temp,case when sum(umbral) = 0 then sum(year0) *100 else floor(sum(year0)*100 /sum(umbral))-100 end as umbral_perc,case when sum(evol_temp) = 0 then sum(year0) * 100 else floor(sum(year0) *100 / sum(evol_temp))-100 end as evol_perc from conf_sumarise_sec su left outer join lk_conflictividad conf on conf.id_conflictividad=su.conf_if left outer join lk_seccional sec on sec.id_secc_seccional=su.seccional where 1=1 ";
                group="group by mod_conflictividad,mod_tipo_delito,mod_sub_tipo_delito,month_year,id_secc_jurisdiccion";
            } else{
                return res.status(500).send('ERRROOOOOOOR con la agrupacion');
            }
            
        }
        
        if (typeof req.query.mayor != 'undefined' && req.query.mayor.length > 0){
          query=query.concat(" and umbral_perc >=").concat(req.query.mayor).concat(" and evol_perc >=").concat(req.query.mayor);
        }

        if (typeof req.query.menor != 'undefined' && req.query.menor.length > 0){
          query=query.concat(" and umbral_perc <=").concat(req.query.menor).concat(" and evol_perc <=").concat(req.query.menor);
        }
        
        if (dd<20){
            today.setMonth(today.getMonth() - 2);
        } else {
            today.setMonth(today.getMonth() - 1);
        }

        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(mm<10) {
        mm='0'+mm
        } 

        query=query.concat(" and month_year =").concat(yyyy).concat(mm);
       
        
        
        // SQL Query > Select Data
        var query_res = client.query(query.concat(group));

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



module.exports = indices;