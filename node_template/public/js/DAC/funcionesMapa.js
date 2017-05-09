function getColor(d) {
    return d > Math.floor(7 * number) ? '#800026' :
            d > Math.floor(6 * number) ? '#BD0026' :
            d > Math.floor(5 * number) ? '#E31A1C' :
            d > Math.floor(4 * number) ? '#FC4E2A' :
            d > Math.floor(3 * number) ? '#FD8D3C' :
            d > Math.floor(2 * number) ? '#FEB24C' :
            d > Math.floor(1 * number) ? '#FED976' :
            '#FFEDA0';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5,
        fillColor: getColor(feature.properties.density)
    };
}
function resetHighlight(e) {
    geojsonCloro.resetStyle(e.target);
    title.updateCl();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    title.updateCl(layer.feature.properties);
}
(function () {
    /* Inicio creacion de los marcadores*/
    (function (window, document, undefined_) {
        "use strict";
        L.VectorMarkers = {};
        L.VectorMarkers.Icon = L.Icon.extend({
            options: {
                iconSize: [30, 50],
                iconAnchor: [15, 50],
                popupAnchor: [2, -40],
                shadowAnchor: [7, 45],
                shadowSize: [54, 51],
                className: "vector-marker",
                prefix: "fa",
                spinClass: "fa-spin",
                extraClasses: "",
                icon: "home",
                markerColor: "blue",
                iconColor: "white"
            },
            initialize: function (options) {
                return options = L.Util.setOptions(this, options);
            },
            createIcon: function (oldIcon) {
                var div, icon, options, pin_path;
                div = (oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"));
                options = this.options;
                if (options.icon) {
                    icon = this._createInner();
                }

                if (options.tipo_marker == "circulo")
                {
                    div.innerHTML = '<svg version="1.2" baseProfile="tiny" width="87.95mm" height="99.6mm" viewBox="0 0 8795 9960" preserveAspectRatio="xMidYMid" fill-rule="evenodd" stroke-width="28.222" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" xmlns:ooo="http://xml.openoffice.org/svg/export" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <defs class="ClipPathGroup">  <clipPath id="presentation_clip_path" clipPathUnits="userSpaceOnUse">   <rect x="0" y="0" width="8795" height="9960"/>  </clipPath> </defs> <defs class="TextShapeIndex">  <g ooo:slide="id1" ooo:id-list="id3 id4 id5"/> </defs> <defs class="EmbeddedBulletChars">  <g id="bullet-char-template(57356)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 580,1141 L 1163,571 580,0 -4,571 580,1141 Z"/>  </g>  <g id="bullet-char-template(57354)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 8,1128 L 1137,1128 1137,0 8,0 8,1128 Z"/>  </g>  <g id="bullet-char-template(10146)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 174,0 L 602,739 174,1481 1456,739 174,0 Z M 1358,739 L 309,1346 659,739 1358,739 Z"/>  </g>  <g id="bullet-char-template(10132)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 2015,739 L 1276,0 717,0 1260,543 174,543 174,936 1260,936 717,1481 1274,1481 2015,739 Z"/>  </g>  <g id="bullet-char-template(10007)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 0,-2 C -7,14 -16,27 -25,37 L 356,567 C 262,823 215,952 215,954 215,979 228,992 255,992 264,992 276,990 289,987 310,991 331,999 354,1012 L 381,999 492,748 772,1049 836,1024 860,1049 C 881,1039 901,1025 922,1006 886,937 835,863 770,784 769,783 710,716 594,584 L 774,223 C 774,196 753,168 711,139 L 727,119 C 717,90 699,76 672,76 641,76 570,178 457,381 L 164,-76 C 142,-110 111,-127 72,-127 30,-127 9,-110 8,-76 1,-67 -2,-52 -2,-32 -2,-23 -1,-13 0,-2 Z"/>  </g>  <g id="bullet-char-template(10004)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 285,-33 C 182,-33 111,30 74,156 52,228 41,333 41,471 41,549 55,616 82,672 116,743 169,778 240,778 293,778 328,747 346,684 L 369,508 C 377,444 397,411 428,410 L 1163,1116 C 1174,1127 1196,1133 1229,1133 1271,1133 1292,1118 1292,1087 L 1292,965 C 1292,929 1282,901 1262,881 L 442,47 C 390,-6 338,-33 285,-33 Z"/>  </g>  <g id="bullet-char-template(9679)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 813,0 C 632,0 489,54 383,161 276,268 223,411 223,592 223,773 276,916 383,1023 489,1130 632,1184 813,1184 992,1184 1136,1130 1245,1023 1353,916 1407,772 1407,592 1407,412 1353,268 1245,161 1136,54 992,0 813,0 Z"/>  </g>  <g id="bullet-char-template(8226)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 346,457 C 273,457 209,483 155,535 101,586 74,649 74,723 74,796 101,859 155,911 209,963 273,989 346,989 419,989 480,963 531,910 582,859 608,796 608,723 608,648 583,586 532,535 482,483 420,457 346,457 Z"/>  </g>  <g id="bullet-char-template(8211)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M -4,459 L 1135,459 1135,606 -4,606 -4,459 Z"/>  </g> </defs> <defs class="TextEmbeddedBitmaps"/> <g>  <g id="id2" class="Master_Slide">   <g id="bg-id2" class="Background"/>   <g id="bo-id2" class="BackgroundObjects"/>  </g> </g> <g class="SlideGroup">  <g>   <g id="id1" class="Slide" clip-path="url(#presentation_clip_path)">    <g class="Page">     <g class="com.sun.star.drawing.PolyPolygonShape">      <g id="id3">       <path fill="rgb(0,0,0)" stroke="none" d="M 514,414 L 340,1300 580,443 514,414 Z"/>      </g>     </g>     <g class="com.sun.star.drawing.ClosedBezierShape">      <g id="id4">       <path fill="rgb(0,0,0)" stroke="none" d="M 800,345 C 800,486 694,599 564,599 432,599 327,486 327,345 327,203 432,89 564,89 694,89 800,203 800,345 Z"/>       <path fill="none" stroke="rgb(0,0,0)" stroke-width="50" stroke-linejoin="miter" d="M 800,345 C 800,486 694,599 564,599 432,599 327,486 327,345 327,203 432,89 564,89 694,89 800,203 800,345 Z"/>      </g>     </g>     <g class="com.sun.star.drawing.ClosedBezierShape">      <g id="id5">       <path fill="' + options.markerColor + '" stroke="none" d="M 747,346 C 747,457 663,546 560,546 455,546 372,457 372,346 372,235 455,145 560,145 663,145 747,235 747,346 Z"/>      </g>     </g>    </g>   </g>  </g> </g></svg>';
                } else {
                    div.innerHTML = '<svg version="1.2" baseProfile="tiny" width="87.95mm" height="99.6mm" viewBox="0 0 8795 9960" preserveAspectRatio="xMidYMid" fill-rule="evenodd" stroke-width="28.222" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" xmlns:ooo="http://xml.openoffice.org/svg/export" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <defs class="ClipPathGroup">  <clipPath id="presentation_clip_path" clipPathUnits="userSpaceOnUse">   <rect x="0" y="0" width="8795" height="9960"/>  </clipPath> </defs> <defs class="TextShapeIndex">  <g ooo:slide="id1" ooo:id-list="id3 id4 id5"/> </defs> <defs class="EmbeddedBulletChars">  <g id="bullet-char-template(57356)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 580,1141 L 1163,571 580,0 -4,571 580,1141 Z"/>  </g>  <g id="bullet-char-template(57354)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 8,1128 L 1137,1128 1137,0 8,0 8,1128 Z"/>  </g>  <g id="bullet-char-template(10146)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 174,0 L 602,739 174,1481 1456,739 174,0 Z M 1358,739 L 309,1346 659,739 1358,739 Z"/>  </g>  <g id="bullet-char-template(10132)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 2015,739 L 1276,0 717,0 1260,543 174,543 174,936 1260,936 717,1481 1274,1481 2015,739 Z"/>  </g>  <g id="bullet-char-template(10007)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 0,-2 C -7,14 -16,27 -25,37 L 356,567 C 262,823 215,952 215,954 215,979 228,992 255,992 264,992 276,990 289,987 310,991 331,999 354,1012 L 381,999 492,748 772,1049 836,1024 860,1049 C 881,1039 901,1025 922,1006 886,937 835,863 770,784 769,783 710,716 594,584 L 774,223 C 774,196 753,168 711,139 L 727,119 C 717,90 699,76 672,76 641,76 570,178 457,381 L 164,-76 C 142,-110 111,-127 72,-127 30,-127 9,-110 8,-76 1,-67 -2,-52 -2,-32 -2,-23 -1,-13 0,-2 Z"/>  </g>  <g id="bullet-char-template(10004)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 285,-33 C 182,-33 111,30 74,156 52,228 41,333 41,471 41,549 55,616 82,672 116,743 169,778 240,778 293,778 328,747 346,684 L 369,508 C 377,444 397,411 428,410 L 1163,1116 C 1174,1127 1196,1133 1229,1133 1271,1133 1292,1118 1292,1087 L 1292,965 C 1292,929 1282,901 1262,881 L 442,47 C 390,-6 338,-33 285,-33 Z"/>  </g>  <g id="bullet-char-template(9679)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 813,0 C 632,0 489,54 383,161 276,268 223,411 223,592 223,773 276,916 383,1023 489,1130 632,1184 813,1184 992,1184 1136,1130 1245,1023 1353,916 1407,772 1407,592 1407,412 1353,268 1245,161 1136,54 992,0 813,0 Z"/>  </g>  <g id="bullet-char-template(8226)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M 346,457 C 273,457 209,483 155,535 101,586 74,649 74,723 74,796 101,859 155,911 209,963 273,989 346,989 419,989 480,963 531,910 582,859 608,796 608,723 608,648 583,586 532,535 482,483 420,457 346,457 Z"/>  </g>  <g id="bullet-char-template(8211)" transform="scale(0.00048828125,-0.00048828125)">   <path d="M -4,459 L 1135,459 1135,606 -4,606 -4,459 Z"/>  </g> </defs> <defs class="TextEmbeddedBitmaps"/> <g>  <g id="id2" class="Master_Slide">   <g id="bg-id2" class="Background"/>   <g id="bo-id2" class="BackgroundObjects"/>  </g> </g> <g class="SlideGroup">  <g>   <g id="id1" class="Slide" clip-path="url(#presentation_clip_path)">    <g class="Page">     <g class="com.sun.star.drawing.PolyPolygonShape">      <g id="id3">       <path fill="rgb(0,0,0)" stroke="none" d="M 534,613 L 359,1500 600,642 534,613 Z"/>      </g>     </g>     <g class="com.sun.star.drawing.PolyPolygonShape">      <g id="id4">       <path fill="rgb(0,0,0)" stroke="none" d="M 200,450 L 551,800 900,450 551,99 200,450 Z"/>      </g>     </g>     <g class="com.sun.star.drawing.PolyPolygonShape">      <g id="id5">       <path fill="' + options.markerColor + '" stroke="none" d="M 300,451 L 551,701 801,451 551,200 300,451 Z"/>      </g>     </g>    </g>   </g>  </g> </g></svg>';
                }
                this._setIconStyles(div, "icon");
                this._setIconStyles(div, "icon-" + options.markerColor + options.tipo_marker);
                return div;
            },
            _createInner: function () {
                var iconClass, iconColorClass, iconColorStyle, iconSpinClass, options;
                iconClass = void 0;
                iconSpinClass = "";
                iconColorClass = "";
                iconColorStyle = "";
                options = this.options;
                if (options.icon.slice(0, options.prefix.length + 1) === options.prefix + "-") {
                    iconClass = options.icon;
                } else {
                    iconClass = options.prefix + "-" + options.icon;
                }
                if (options.spin && typeof options.spinClass === "string") {
                    iconSpinClass = options.spinClass;
                }
                if (options.iconColor) {
                    if (options.iconColor === "white" || options.iconColor === "black") {
                        iconColorClass = "icon-" + options.iconColor;
                    } else {
                        iconColorStyle = "style='color: " + options.iconColor + "' ";
                    }
                }
                return "<i " + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + iconClass + " " + iconSpinClass + " " + iconColorClass + "'></i>";
            },
            _setIconStyles: function (img, name) {
                var anchor, options, size;
                options = this.options;
                size = L.point(options[(name === "shadow" ? "shadowSize" : "iconSize")]);
                anchor = void 0;
                if (name === "shadow") {
                    anchor = L.point(options.shadowAnchor || options.iconAnchor);
                } else {
                    anchor = L.point(options.iconAnchor);
                }
                if (!anchor && size) {
                    anchor = size.divideBy(2, true);
                }
                img.className = "vector-marker-" + name + " " + options.className;
                if (anchor) {
                    img.style.marginLeft = (-anchor.x) + "px";
                    img.style.marginTop = (-anchor.y) + "px";
                }
                if (size) {
                    img.style.width = size.x + "px";
                    return img.style.height = size.y + "px";
                }
            },
            createShadow: function () {
                var div;
                div = document.createElement("div");
                this._setIconStyles(div, "shadow");
                return div;
            }
        });
        return L.VectorMarkers.icon = function (options) {
            return new L.VectorMarkers.Icon(options);
        };
    })(this, document);

}).call(this);


function detailFeature(e) {
    $table.bootstrapTable('updateRow', {
        index: 0,
        row: {
            Actuacion: e.target.feature.properties.actuacion,
            FechaHecho: e.target.feature.properties.fechahecho,
            HoraHecho: e.target.feature.properties.hora_hecho,
            LugarHecho: e.target.feature.properties.lugar_hecho,
            DescripcionHecho: e.target.feature.properties.descripcion_hecho,
            TotalAutores: e.target.feature.properties.total_autores,
            Armas: e.target.feature.properties.uso_armas,
            Modalidad: e.target.feature.properties.modalidad
        }
    });
}

