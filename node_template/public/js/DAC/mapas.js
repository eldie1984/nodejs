$(document).ready(function () {
    var owsrootUrl = 'http://dev-sig.mpf.gov.ar:8080/geoserver/dac/ows';

    var asentamientos;
    $("#asentamiento").click(function () {
        if ($("#asentamiento").is(':checked')) {

            var defaultParameters = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: 'dac:Asentamientos',
                outputFormat: 'text/javascript',
                format_options: 'callback:getJson',
                SrsName: 'EPSG:4326'
            };

            var parameters = L.Util.extend(defaultParameters);
            var URL = owsrootUrl + L.Util.getParamString(parameters);

            var datos = $.ajax({
                url: URL,
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (response) {
                    asentamientos = L.geoJson(response, {
                        style: function (feature) {
                            return {
                                stroke: true,
                                //   color: getColour(feature.properties.difficulty),
                                opacity: 0.8,
                                weight: 4
                            };
                        },
                        onEachFeature: function (feature, layer) {
                            popupOptions = {maxWidth: 200};
                            layer.bindPopup("<h3>" + feature.properties.Name + "</h3>", popupOptions);
                            layer.on({
                                //mouseover: highlightFeature,
                                //mouseout: resetHighlight,
                                //      click: highlightOneFeature
                            });
                        }
                    });
                    map.addLayer(asentamientos, "Asentamientos");
                }
            });
        } else {
            map.removeLayer(asentamientos);
        }
    });
    var camarascaba;
    $("#camarascaba").click(function () {
        if ($("#camarascaba").is(':checked')) {

            var defaultParameters = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: 'dac:CamaraCaba_point',
                outputFormat: 'text/javascript',
                format_options: 'callback:getJson',
                SrsName: 'EPSG:4326'
            };

            var parameters = L.Util.extend(defaultParameters);
            var URL = owsrootUrl + L.Util.getParamString(parameters);

            var datos = $.ajax({
                url: URL,
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (response) {
                    camarascaba = L.geoJson(response, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, {
                                radius: 4.0,
                                fillColor: '#F3F781',
                                color: '#000000',
                                weight: 1,
                                opacity: 1.0,
                                fillOpacity: 1.0
                            })
                        },
                        onEachFeature: function (feature, layer) {
                            popupOptions = {maxWidth: 200};
                            layer.bindPopup("<h3>" + feature.properties.Name + "</h3>", popupOptions);
                            layer.on({
                                //mouseover: highlightFeature,
                                //mouseout: resetHighlight,
                                //      click: highlightOneFeature
                            });
                        }
                    });
                    map.addLayer(camarascaba, "Camaras CABA");
                }
            });
        } else {
            map.removeLayer(camarascaba);
        }
    });
    var camaraspfa;
    $("#camaraspfa").click(function () {
        if ($("#camaraspfa").is(':checked')) {

            var defaultParameters = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: 'dac:camarasPFA_point',
                outputFormat: 'text/javascript',
                format_options: 'callback:getJson',
                SrsName: 'EPSG:4326'
            };

            var parameters = L.Util.extend(defaultParameters);
            var URL = owsrootUrl + L.Util.getParamString(parameters);

            var datos = $.ajax({
                url: URL,
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (response) {
                    camaraspfa = L.geoJson(response, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, {
                                radius: 4.0,
                                fillColor: '#0000FF',
                                color: '#000000',
                                weight: 1,
                                opacity: 1.0,
                                fillOpacity: 1.0
                            })
                        },
                        onEachFeature: function (feature, layer) {
                            var popupContent = '<table><tr><th scope="row">objectid</th><td>' + Autolinker.link(String(feature.properties['objectid'])) + '</td></tr><tr><th scope="row">id</th><td>' + Autolinker.link(String(feature.properties['id'])) + '</td></tr><tr><th scope="row">nombre</th><td>' + Autolinker.link(String(feature.properties['nombre'])) + '</td></tr><tr><th scope="row">domicilio</th><td>' + Autolinker.link(String(feature.properties['domicilio'])) + '</td></tr><tr><th scope="row">barrio</th><td>' + Autolinker.link(String(feature.properties['barrio'])) + '</td></tr><tr><th scope="row">telefono</th><td>' + Autolinker.link(String(feature.properties['telefono'])) + '</td></tr><tr><th scope="row">observac</th><td>' + Autolinker.link(String(feature.properties['observac'])) + '</td></tr><tr><th scope="row">objeto</th><td>' + Autolinker.link(String(feature.properties['objeto'])) + '</td></tr></table>';
                            layer.bindPopup(popupContent);
                        }
                    });
                    map.addLayer(camaraspfa, "Camaras PFA");
                }
            });
        } else {
            map.removeLayer(camaraspfa);
        }
    });
    var comisariascaba;
    $("#comisariascaba").click(function () {
        if ($("#comisariascaba").is(':checked')) {

            var defaultParameters = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: 'dac:comisarias_policia_metropolitana_point',
                outputFormat: 'text/javascript',
                format_options: 'callback:getJson',
                SrsName: 'EPSG:4326'
            };

            var parameters = L.Util.extend(defaultParameters);
            var URL = owsrootUrl + L.Util.getParamString(parameters);

            var datos = $.ajax({
                url: URL,
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (response) {
                    comisariascaba = L.geoJson(response, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, {
                                radius: 4.0,
                                fillColor: '#c4562b',
                                color: '#000000',
                                weight: 1,
                                opacity: 1.0,
                                fillOpacity: 1.0
                            })
                        },
                        onEachFeature: function (feature, layer) {
                            var popupContent = '<table><tr><th scope="row">objectid</th><td>' + Autolinker.link(String(feature.properties['objectid'])) + '</td></tr><tr><th scope="row">id</th><td>' + Autolinker.link(String(feature.properties['id'])) + '</td></tr><tr><th scope="row">nombre</th><td>' + Autolinker.link(String(feature.properties['nombre'])) + '</td></tr><tr><th scope="row">domicilio</th><td>' + Autolinker.link(String(feature.properties['domicilio'])) + '</td></tr><tr><th scope="row">barrio</th><td>' + Autolinker.link(String(feature.properties['barrio'])) + '</td></tr><tr><th scope="row">telefono</th><td>' + Autolinker.link(String(feature.properties['telefono'])) + '</td></tr><tr><th scope="row">observac</th><td>' + Autolinker.link(String(feature.properties['observac'])) + '</td></tr><tr><th scope="row">objeto</th><td>' + Autolinker.link(String(feature.properties['objeto'])) + '</td></tr></table>';
                            layer.bindPopup(popupContent);
                        }
                    });
                    map.addLayer(comisariascaba, "Comisarias CABA");
                }
            });
        } else {
            map.removeLayer(comisariascaba);
        }
    });
    var comisariaspfa;
    $("#comisariaspfa").click(function () {
        if ($("#comisariaspfa").is(':checked')) {

            var defaultParameters = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: 'dac:comisarias_policia_federal_point',
                outputFormat: 'text/javascript',
                format_options: 'callback:getJson',
                SrsName: 'EPSG:4326'
            };

            var parameters = L.Util.extend(defaultParameters);
            var URL = owsrootUrl + L.Util.getParamString(parameters);

            var datos = $.ajax({
                url: URL,
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (response) {
                    comisariaspfa = L.geoJson(response, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, {
                                radius: 4.0,
                                fillColor: '#73b346',
                                color: '#000000',
                                weight: 1,
                                opacity: 1.0,
                                fillOpacity: 1.0
                            })
                        },
                        onEachFeature: function (feature, layer) {
                            var popupContent = '<table><tr><th scope="row">id</th><td>' + Autolinker.link(String(feature.properties['id'])) + '</td></tr><tr><th scope="row">nombre</th><td>' + Autolinker.link(String(feature.properties['nombre'])) + '</td></tr><tr><th scope="row">direccion</th><td>' + Autolinker.link(String(feature.properties['direccion'])) + '</td></tr><tr><th scope="row">comuna</th><td>' + Autolinker.link(String(feature.properties['comuna'])) + '</td></tr><tr><th scope="row">barrio</th><td>' + Autolinker.link(String(feature.properties['barrio'])) + '</td></tr><tr><th scope="row">circunscri</th><td>' + Autolinker.link(String(feature.properties['circunscri'])) + '</td></tr></table>';
                            layer.bindPopup(popupContent);
                        }
                    });
                    map.addLayer(comisariaspfa, "Comisarias PFA");
                }
            });
        } else {
            map.removeLayer(comisariaspfa);
        }
    });
    var seccionespoliciales;
    $("#seccionespoliciales").click(function () {
        if ($("#seccionespoliciales").is(':checked')) {

            var defaultParameters = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: 'dac:secciones_policiales_poly',
                outputFormat: 'text/javascript',
                format_options: 'callback:getJson',
                SrsName: 'EPSG:4326'
            };

            var parameters = L.Util.extend(defaultParameters);
            var URL = owsrootUrl + L.Util.getParamString(parameters);

            var datos = $.ajax({
                url: URL,
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (response) {
                    seccionespoliciales = L.geoJson(response, {
                        style: function (feature) {
                            return {
                                color: '#000000',
                                fillColor: '#1712af',
                                weight: 10.0,
                                dashArray: '0',
                                opacity: 0.4,
                                fillOpacity: 0
                            };

                        },
                        onEachFeature: function (feature, layer) {
                            var popupContent = '<table><tr><th scope="row">id</th><td>' + Autolinker.link(String(feature.properties['id'])) + '</td></tr><tr><th scope="row">nombre</th><td>' + Autolinker.link(String(feature.properties['nombre'])) + '</td></tr><tr><th scope="row">area</th><td>' + Autolinker.link(String(feature.properties['area'])) + '</td></tr><tr><th scope="row">perimetro</th><td>' + Autolinker.link(String(feature.properties['perimetro'])) + '</td></tr><tr><th scope="row">circunscri</th><td>' + Autolinker.link(String(feature.properties['circunscri'])) + '</td></tr></table>';
                            layer.bindPopup(popupContent);
                        }
                    });
                    map.addLayer(seccionespoliciales, "Comisarias PFA");
                }
            });
        } else {
            map.removeLayer(seccionespoliciales);
        }
    });
});