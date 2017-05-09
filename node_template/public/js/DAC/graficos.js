
var spline = function (data, title, subtitle, divName, exclude, visible, tooltip) {
    visible = typeof visible !== 'undefined' ? visible : true;
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    var options = {
        chart: {
            renderTo: divName,
            type: 'spline',
            width: 500,
            marginRight: 20,
        },
        title: {
            text: title},
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        xAxis: {
            categories: [{}],
            gridLineWidth: 1
        },
        tooltip: {
            enabled: tooltip
        },
        yAxis: {
            title: {
                text: ''
            }

        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
    };

    /*$.getJSON(url, function(data) {*/
    ajaxRecord = data;
    cnt_all = ajaxRecord.datos.length;

    if (exclude !== null)
    {
        cnt = 0;
        for (var i = 0, j = 0; i < ajaxRecord.datos.length; i++) {
            if (ajaxRecord.datos[i].tipo === exclude) {
                cnt = cnt + 1;
            }
        }
    } else
    {
        cnt = ajaxRecord.datos.length;
    }
    var jsonSerie = [];
    for (var i = 0; i < cnt; i++) {
        jsonSerie.push({});
    }
    $.extend(options, {series: jsonSerie});
    options.xAxis.categories = ajaxRecord.categories;
    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                options.series[j].data = ajaxRecord.datos[i].values;
                options.series[j].name = ajaxRecord.datos[i].names;

                j = j + 1;
            }
        } else {
            options.series[i].data = ajaxRecord.datos[i].values;
            options.series[i].name = ajaxRecord.datos[i].names;
            options.series[i].visible = visible;

        }

    }
    var chart = new Highcharts.Chart(options);
    /*});*/
};

var stacked_column = function (data, title, subtitle, divName, exclude, visible, tooltip) {
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    visible = typeof visible !== 'undefined' ? visible : true;
    var options = {
        chart: {
            renderTo: divName,
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        xAxis: {
            categories: [{}]
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            enabled: tooltip
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
    };

    /*$.getJSON(url, function(data) {*/
    ajaxRecord = data;
    cnt_all = ajaxRecord.datos.length;

    if (exclude !== null)
    {
        cnt = 0;
        for (var i = 0, j = 0; i < ajaxRecord.datos.length; i++) {
            if (ajaxRecord.datos[i].tipo === exclude) {
                cnt = cnt + 1;
            }
        }
    } else
    {
        cnt = ajaxRecord.datos.length;
    }
    var jsonSerie = [];
    for (var i = 0; i < cnt; i++) {
        jsonSerie.push({});
    }
    $.extend(options, {series: jsonSerie});
    options.xAxis.categories = ajaxRecord.categories;
    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                options.series[j].data = ajaxRecord.datos[i].values;
                options.series[j].name = ajaxRecord.datos[i].names;
                j = j + 1;
            }
        } else {
            options.series[i].data = ajaxRecord.datos[i].values;
            options.series[i].name = ajaxRecord.datos[i].names;
            options.series[i].visible = visible;
        }

    }
    var chart = new Highcharts.Chart(options);
    /*});*/
};

var column = function (data, title, subtitle, divName, exclude, tooltip) {
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    var options = {
        chart: {
            renderTo: divName,
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        xAxis: {
            categories: [{}]
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            enabled: tooltip
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
    };

    /*$.getJSON(url, function(data) {*/
    ajaxRecord = data;
    cnt_all = ajaxRecord.datos.length;

    if (exclude !== null)
    {
        cnt = 0;
        for (var i = 0, j = 0; i < ajaxRecord.datos.length; i++) {
            if (ajaxRecord.datos[i].tipo === exclude) {
                cnt = cnt + 1;
            }
        }
    } else
    {
        cnt = ajaxRecord.datos.length;
    }
    var jsonSerie = [];
    for (var i = 0; i < cnt; i++) {
        jsonSerie.push({});
    }
    $.extend(options, {series: jsonSerie});
    options.xAxis.categories = ajaxRecord.categories;
    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                options.series[j].data = ajaxRecord.datos[i].values;
                options.series[j].name = ajaxRecord.datos[i].names;
                j = j + 1;
            }
        } else {
            options.series[i].data = ajaxRecord.datos[i].values;
            options.series[i].name = ajaxRecord.datos[i].names;
        }

    }
    var chart = new Highcharts.Chart(options);
    /*});*/
};

var line = function (data, title, subtitle, divName, exclude, visible, tooltip) {
    visible = typeof visible !== 'undefined' ? visible : true;
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    var options = {
        credits: {
            enabled: false
        },
        chart: {
            renderTo: divName,
            width: 500,
            height: 300,
            marginRight: 20,
            type: 'line'
        },
        title: {
            text: title,
            x: -20 //center
            , style: {
                font: 'arial',
                fontWeight: 'bold'
            }

        },
        subtitle: {
            text: subtitle,
            x: -20,
            style: {
                fontSize: 'large',
                font: 'arial',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: [{}]
            , style: {
                font: 'arial',
                fontWeight: 'bold'
            }
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            enabled: tooltip
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y}', //format: '<b>{point.name}</b>: {point.y} ({point.percentage:.2f}%)',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                },
                enableMouseTracking: false
            },
            series: {
                dataLabels: {
                    enabled: true
                }

            }
        },
        tooltip: {
            //shared:true,
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                    '<td style="text-align: right"><b>{point.y} %</b></td></tr>',
            enabled: tooltip
        },
        series: [{
                name: 'Promedio Anual',
                data: [50, 50, 50, 50, 50, 50]
            }]
    };

    ajaxRecord = data;

    cnt_all = ajaxRecord.datos.length;

    if (exclude !== null)
    {
        cnt = 0;
        for (var i = 0, j = 0; i < ajaxRecord.datos.length; i++) {
            if (ajaxRecord.datos[i].tipo === exclude) {
                cnt = cnt + 1;
            }
        }
    } else
    {
        cnt = ajaxRecord.datos.length;
    }
    var jsonSerie = [];
    for (var i = 0; i < cnt; i++) {
        jsonSerie.push({});
    }
    $.extend(options, {series: jsonSerie});
    options.xAxis.categories = ajaxRecord.categories;

    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                options.series[j].data = ajaxRecord.datos[i].values;
                options.series[j].name = ajaxRecord.datos[i].names;

                j = j + 1;
            }
        } else {
            options.series[i].data = ajaxRecord.datos[i].values;
            options.series[i].name = ajaxRecord.datos[i].names;
            options.series[i].visible = visible;

        }


    }

    var chart = new Highcharts.Chart(options);
    /*});*/
};

var column_grp = function (url, title, subtitle, divName, visible, tooltip) {
    visible = typeof visible !== 'undefined' ? visible : true;
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    var options = {
        chart: {
            renderTo: divName,
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        xAxis: {
            categories: [{}]
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            enabled: tooltip
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
    };


    $.getJSON(url, function (data) {
        ajaxRecord = data;
        cnt = ajaxRecord.datos.length;
        var jsonSerie = [];
        for (var i = 0; i < cnt; i++) {
            jsonSerie.push({});
        }
        $.extend(options, {series: jsonSerie});
        options.xAxis.categories = ajaxRecord.categories;
        for (var i = 0; i < cnt; i++) {
            options.series[i].data = ajaxRecord.datos[i].values;
            options.series[i].name = ajaxRecord.datos[i].names;
            options.series[i].stack = ajaxRecord.datos[i].stack;
            options.series[i].visible = visible;
        }
        var chart = new Highcharts.Chart(options);
    });
};

var spider = function (data, title, subtitle, divName) {
    var options = {
        chart: {
            polar: true,
            width: 1200,
            // heigth: 800,
            marginRight: 20,
            type: 'line',
            renderTo: divName

        },
        title: {
            text: title

        },
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        pane: {
            size: '85%'
        },
        xAxis: {
            categories: [{}],
            tickmarkPlacement: 'on',
            lineWidth: 0,
            labels: {
                style: {
                    fontSize: 'medium'
                }
            }
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: ' '
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
    };



    ajaxRecord = data;
    cnt = ajaxRecord.datos.length;
    var jsonSerie = [];
    for (var i = 0; i < cnt; i++) {
        jsonSerie.push({});
    }
    $.extend(options, {series: jsonSerie});
    options.xAxis.categories = ajaxRecord.categories;
    for (var i = 0; i < cnt; i++) {
        options.series[i].data = ajaxRecord.datos[i].values;
        options.series[i].name = ajaxRecord.datos[i].names;
        options.series[i].stack = ajaxRecord.datos[i].stack;
    }
    var chart = new Highcharts.Chart(options);

};

var combinado = function (data, title, subtitle, divName) {

    var elementos = 17;
    var options = {
        chart: {
            renderTo: divName
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        xAxis: {
            categories: [{}]
        },
    };

    var jsonSerie = [];
    for (var i = 0; i < elementos; i++) {
        jsonSerie.push({
            type: 'column',
            name: '',
            data: []
        });
    }
    jsonSerie.push({type: 'spline',
        name: '',
        data: [],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    });

    var jsonSerie1 = [];
    for (var i = 0; i < elementos; i++) {
        jsonSerie1.push({
            name: '',
            y: 0,
            color: Highcharts.getOptions().colors[i]
        });
    }

    jsonSerie.push({type: 'pie',
        name: 'Total Jurisdiccion',
        data: jsonSerie1,
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    });
    $.extend(options, {series: jsonSerie});

    /*$.getJSON('prueba_chart.php?callback=?', function(data) {*/
    ajaxRecord = data;
    cnt = ajaxRecord.datos.length

    options.xAxis.categories = ajaxRecord.categories;
    for (var i = 0; i < cnt; i++) {
        if (i < (elementos + 1)) {
            options.series[i].name = ajaxRecord.datos[i].names;
            options.series[i].data = ajaxRecord.datos[i].values;
        } else {
            options.series[elementos + 1].data[i - elementos - 1].name = ajaxRecord.datos[i].names;
            options.series[elementos + 1].data[i - elementos - 1].y = ajaxRecord.datos[i].values[0];
        }
    }
    var chart = new Highcharts.Chart(options);

};

var pie = function (datadb, title, subtitle, divName, tooltip) {
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    var options = {
        credits: {
            enabled: false
        },
        chart: {
            renderTo: divName,
            type: 'pie',
//            options3d: {
//                enabled: true,
//                alpha: 45,
//                beta: 0,
//                //   depth: 40
//            },
        },
        title: {
            text: title

        },
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f}%', //format: '<b>{point.name}</b>: {point.y} ({point.percentage:.2f}%)',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    distance: -30,
                    inside: true,
                },
                showInLegend: true
            }
        },
        tooltip: {
            //shared:true,
            //pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            //   '<td style="text-align: right"><b>{point.percentage:.2f} %</b></td></tr>',
            enabled: tooltip
        },
    };

    var jsonSerie = [];
    var jsonSerie1 = [];
    for (var i = 0; i < datadb.length; i++) {
        jsonSerie1.push({
            name: '',
            y: 0
        });
    }
    jsonSerie.push({type: 'pie',
        data: jsonSerie1
    });


    $.extend(options, {series: jsonSerie});
    for (var i = 0; i < datadb.length; i++) {
        options.series[0].data[i].y = parseInt(datadb[i].y);
        options.series[0].data[i].name = datadb[i].name;

    }

    Highcharts.setOptions({
        colors: ['#6307f5', '#f37f83', '#258279', '#74fec1', '#707ceb', '#48ab65', '#86a11d', '#1c7335', '#6704b9', '#4f2ee5', '#99f4b0', '#572921', '#acfa9d', '#6170ac', '#0b68ec', '#dfdc06', '#137861', '#306152', '#a9c3ee', '#fb177d']
    });

    var chartTortaComisarias = new Highcharts.Chart(options);
};

var stock_line = function (data, title, subtitle, divName, exclude, dia, mes, ano, visible, tooltip) {
    visible = typeof visible !== 'undefined' ? visible : true;
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    var options = {
        chart: {
            renderTo: divName,
            width: 1200,
            marginRight: 20,
            type: 'line',
            zoomType: 'x'
        },
        title: {
            text: title,
            x: -20 //center
            , style: {
                font: 'arial',
                fontWeight: 'bold'
            }

        },
        subtitle: {
            text: subtitle,
            x: -20,
            style: {
                fontSize: 'large',
                font: 'arial',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: [{}]
            , style: {
                font: 'arial',
                fontWeight: 'bold'
            }
        },
        yAxis: [{
                min: 0,
                title: {
                    text: ''
                },
                opposite: false
            }],
        rangeSelector: {
            selected: 0
        },
        tooltip: {
            enabled: tooltip
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        }
    };

    ajaxRecord = data;

    cnt_all = ajaxRecord.datos.length;

    if (exclude !== null)
    {
        cnt = 0;
        for (var i = 0, j = 0; i < ajaxRecord.datos.length; i++) {
            if (ajaxRecord.datos[i].tipo === exclude) {
                cnt = cnt + 1;
            }
        }
    } else
    {
        cnt = ajaxRecord.datos.length;
    }
    var jsonSerie = [];
    for (var i = 0; i < cnt; i++) {
        jsonSerie.push({});
    }
    $.extend(options, {series: jsonSerie});
    options.xAxis.categories = ajaxRecord.categories;

    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                options.series[j].data = ajaxRecord.datos[i].values;
                options.series[j].name = ajaxRecord.datos[i].names;
                options.series[j].pointStart = Date.UTC(ano, mes, dia);
                options.series[j].pointInterval = 24 * 3600 * 1000;
                j = j + 1;
            }
        } else {
            options.series[i].data = ajaxRecord.datos[i].values;
            options.series[i].name = ajaxRecord.datos[i].names;
            //
            options.series[i].pointStart = Date.UTC(ano, mes, dia);
            options.series[i].pointInterval = 24 * 3600 * 1000;
            options.series[i].visible = visible;
        }

    }
    var chart = new Highcharts.StockChart(options);
    /*});*/
};


var spline_stock = function (data, title, subtitle, divName, exclude, dia, mes, ano, visible, tooltip) {
    visible = typeof visible !== 'undefined' ? visible : true;
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    var options = {
        chart: {
            renderTo: divName,
            type: 'spline',
            width: 1200,
            marginRight: 20,
            zoomType: 'x',
        },
        title: {
            text: title},
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        xAxis: {
            categories: [{}],
            gridLineWidth: 1
        },
        tooltip: {
            enabled: tooltip
        },
        yAxis: [{
                min: 0,
                title: {
                    text: ''
                },
                opposite: false
            }],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
    };

    /*$.getJSON(url, function(data) {*/
    ajaxRecord = data;
    cnt_all = ajaxRecord.datos.length;

    if (exclude !== null)
    {
        cnt = 0;
        for (var i = 0, j = 0; i < ajaxRecord.datos.length; i++) {
            if (ajaxRecord.datos[i].tipo === exclude) {
                cnt = cnt + 1;
            }
        }
    } else
    {
        cnt = ajaxRecord.datos.length;
    }
    var jsonSerie = [];
    for (var i = 0; i < cnt; i++) {
        jsonSerie.push({});
    }
    $.extend(options, {series: jsonSerie});
    options.xAxis.categories = ajaxRecord.categories;
    for (var i = 0, j = 0; i < cnt_all; i++) {
        if (exclude !== null)
        {
            if (ajaxRecord.datos[i].tipo === exclude) {
                options.series[j].data = ajaxRecord.datos[i].values;
                options.series[j].name = ajaxRecord.datos[i].names;
                options.series[j].pointStart = Date.UTC(ano, mes, dia);
                options.series[j].pointInterval = 24 * 3600 * 1000;
                j = j + 1;
            }
        } else {
            options.series[i].data = ajaxRecord.datos[i].values;
            options.series[i].name = ajaxRecord.datos[i].names;
            options.series[j].pointStart = Date.UTC(ano, mes, dia);
            options.series[j].pointInterval = 24 * 3600 * 1000;
            options.series[i].visible = visible;
        }

    }
    var chart = new Highcharts.StockChart(options);
    /*});*/
};

var pie_drilldown = function (url, title, subtitle, divName, width) {
    visible = typeof visible !== 'undefined' ? visible : true;
    tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
    width = typeof visible !== 'undefined' ? width : 1200;
    var options = {
        chart: {
            renderTo: divName,
            type: 'pie',
            width: width,
            marginRight: 20,
            zoomType: 'x',
        },
        title: {
            text: title},
        subtitle: {
            text: subtitle,
            style: {
                fontSize: 'large'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                },
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        credits: {
            enabled: false
        },
        series: [{
                name: name,
                data: [],
                /* changes bar size */
                pointPadding: -0.3,
                borderWidth: 0,
                pointWidth: 15,
                shadow: false,
                color: 'black' //Sectors icon
            }],
        exporting: {
            enabled: false
        }

    };

//    $.getJSON(url, function (data) {
    var chart = new Highcharts.Chart(options);
//        chart.series[0].setData(data);
//    });

    /*});*/
};

var pie_drilldown_p = function (url, title, subtitle, divName, width, title) {
    width = typeof visible !== 'undefined' ? width : 1200;
    var options = {
        chart: {
            renderTo: divName,
            type: 'pie',
            spacingTop: 3,
            spacingRight: 0,
            spacingBottom: 3,
            spacingLeft: 0,
            events: {
                drilldown: function (e) {

                    if (!e.seriesOptions) {
                        var chart = this;
                        // Show the loading label
                        chart.showLoading();
                        $.getJSON(url.concat(e.point.level).concat("&name=").concat(e.point.name.replace(/á/g,'%E1').replace(/é/g,'%E9').replace(/í/g,"%ED").replace(/ó/g,"%F3").replace(/ú/g,"%FA")))
                                .done(function (data) {

                                    chart.addSeriesAsDrilldown(e.point, data);
                                    chart.hideLoading();
                                });
                    }
                    update_grafico(e.point.level, e.point.name.replace(/á/g,'%E1').replace(/é/g,'%E9').replace(/í/g,"%ED").replace(/ó/g,"%F3").replace(/ú/g,"%FA"));
                },
                drillup: function (e) {
                    var level;
                    if (e.seriesOptions.data[0].level === 'level1') {
                        level = '';
                    } else if (e.seriesOptions.data[0].level === 'level2') {
                        level = 'level1';
                    } else if (e.seriesOptions.data[0].level === 'level3') {
                        level = 'level2';
                    } else if (e.seriesOptions.data[0].level === 'level4') {
                        level = 'level3';
                    } else if (e.seriesOptions.data[0].level === 'modalidad') {
                        level = 'level4';
                    }
                    update_grafico(level, e.seriesOptions.name);
                }
            }
        },
        title: {text: ''},
        subtitle: {
            text: title,
            align: 'left',
            x: 20},
        xAxis: {
            type: 'category'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f}%',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    distance: -30,
                    inside: true
                },
                showInLegend: true,
                point: {
                    events: {
                        legendItemClick: function (e) {
                            if (e.target.drilldown != undefined) {
                                e.preventDefault();
                                e.target.hcEvents.click[0]();
                            } else {
                                return false;
                            }

                        }
                    }
                }
            },
            series: {
                cursor: 'pointer',
                events: {
                    click: function (event) {
                        if (event.point.level === 'modalidad') {
                            mapa_puntos_actualizar(event.point.level, event.point.name.replace(/á/g,'%E1').replace(/é/g,'%E9').replace(/í/g,"%ED").replace(/ó/g,"%F3").replace(/ú/g,"%FA"));
                        }
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}'
        },
        credits: {
            enabled: false
        },
        series: [{
                name: 'Conflictividades',
                colorByPoint: true,
                data: []
            }],
        drilldown: {
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: 'white',
                    'stroke-width': 1,
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#bada55'
                        },
                        select: {
                            stroke: '#039',
                            fill: '#bada55'
                        }
                    }
                }

            },
            series: []
        },
        exporting: {
            enabled: false
        }

    };

    $.getJSON(url.concat("ll"), function (data) {
        var chart = new Highcharts.Chart(options);
        chart.series[0].setData(data);
    });

    /*});*/
};
