var palabras = [];
function tags(url) {
    $.getJSON(url, function (data) {
        var items = [];
        var clase;
        $.each(data, function (key, val) {
            if (val.porcentaje < 20) {
                clase = 'smallest'
            }
            else if (val.porcentaje < 40) {
                clase = 'small';
            }
            else if (val.porcentaje < 60) {
                clase = 'medium';
            }
            else if (val.porcentaje < 80) {
                clase = 'large';
            }
            else {
                clase = 'largest';
            }
            items.push('<span class="' + clase + '"><a href="javascript:void(0)" onclick="update(\'' + val.tag + '\');"  title="Cantidad: ' + val.cantidad + '">' + val.tag + ' </a></span> ');
        });
        $('#tagcloud').append(items.join(""))
    })
}
;


function update_grafico(url) {
    $.getJSON(url + "&temp=M")
            .done(function (data) {
                line_update(data, '#lineaM', "T");
                spline_update(data, '#lineaTM', "TC");
                //column(data, "", "", "totalbar", "TC");
                //stacked_column(data, "", "", "stackedbar", "TC");
            })
            ;
    $.getJSON(url + "&temp=S")
            .done(function (data) {
                line_update(data, '#lineaW', "T");
                spline_update(data, '#lineaTW', "TC");
                $("#lineaW").fadeOut();
                $("#lineaTW").fadeOut();
            })

            ;
    $.getJSON(url + "&temp=D")
            .done(function (data) {
                stock_line(data, '#lineaD', "T");
                spline_stock(data, '#lineaTD', "TC");
                $("#lineaTD").fadeOut();
                $("#lineaD").fadeOut();
            });
            
}
function update_grafico_ds(url) {
    $.getJSON(url)
            .done(function (data) {
                line_update(data, '#lineaDS', "T");
                spline_update(data, '#lineaTDS', "TC");
            });
            
}

function update_hora(url) {
    $.getJSON(url)
            .done(function (data) {
                spider_update(data, '#SPIDER');
            })
            ;
}

function line_update(data, grafico, exclude) {
    ajaxRecord = data;

    cnt_all = ajaxRecord.datos.length;

    var chart = $(grafico).highcharts();
    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                chart.series[j].setData(ajaxRecord.datos[i].values);
                j = j + 1;
            }
        } else {
            chart.series[i].setData(ajaxRecord.datos[i].values);
        }

    }
}

function spline_update(data, grafico, exclude) {
    ajaxRecord = data;
    cnt_all = ajaxRecord.datos.length;
    var chart = $(grafico).highcharts();
    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                chart.series[j].setData(ajaxRecord.datos[i].values);
                j = j + 1;
            }
        } else {
            chart.series[i].setData(ajaxRecord.datos[i].values);
        }

    }
}

function stock_line_update() {
    ajaxRecord = data;

    cnt_all = ajaxRecord.datos.length;

    var chart = $(grafico).highcharts();
    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                chart.series[j].setData(ajaxRecord.datos[i].values);
                j = j + 1;
            }
        } else {
            chart.series[i].setData(ajaxRecord.datos[i].values);
        }

    }
}

function spline_stock_update() {
    ajaxRecord = data;
    cnt_all = ajaxRecord.datos.length;

    var chart = $(grafico).highcharts();
    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                chart.series[j].setData(ajaxRecord.datos[i].values);
                j = j + 1;
            }
        } else {
            chart.series[i].setData(ajaxRecord.datos[i].values);
        }

    }
}


function spider_update(data, grafico) {
    ajaxRecord = data;

    cnt_all = ajaxRecord.datos.length;

    var chart = $(grafico).highcharts();
    for (var i = 0, j = 0; i < cnt_all; i++) {
        
        chart.series[i].setData(ajaxRecord.datos[i].values);
        
    }
}