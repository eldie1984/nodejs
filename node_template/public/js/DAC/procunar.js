function addr_search() {
    var inp = document.getElementById("addr");
    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function (data) {
        var items = [];
        $.each(data, function (key, val) {
            items.push(
                    "<li><a href='#' onclick='chooseAddr(" +
                    val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
                    '</a></li>'
                    );
        });
        $('#results').empty();
        if (items.length != 0) {
            $('<p>', {html: "Search results:"}).appendTo('#results');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', {html: "No results found"}).appendTo('#results');
        }
    });
}

function chooseAddr(lat, lng, type) {
    document.getElementById("latitud").value = lat;
    document.getElementById("longitud").value = lng;

}
function crearBoton(texto, name) {
    //Create an input type dynamically.   
    var element = document.createElement("button");
    //Assign different attributes to the element. 
    id = Math.floor((Math.random() * 10000) + 1);
    element.setAttribute("onClick", "borrarBoton(".concat(id).concat(",\"").concat(name).concat("\")"))
    element.setAttribute("id", id)
    var img = document.createElement("img");
    img.setAttribute("src", "http://s3.amazonaws.com/codecademy-content/courses/ltp2/img/uber/close.png")
    var s = document.createElement("span")
    s.appendChild(img)
    s.appendChild(document.createTextNode(texto))
    element.appendChild(s)
    var foo = document.getElementById("elegidos");
    //Append the element in page (in span).  
    foo.appendChild(element);

}
;
function borrarBoton(id, texto) {
    var elemntoId = document.getElementById(id);
    elemntoId.parentNode.removeChild(elemntoId);



}

/* function menorFunction() {
 var menor = document.getElementById("clipping_has_menores");
 if(menor.value === 'S'){
 document.getElementById("menorTraf").disabled = false;
 document.getElementById("menorInvol").disabled = false;
 document.getElementById("menorPart").disabled = false;
 } 
 else {
 document.getElementById("menorTraf").disabled=true;
 document.getElementById("menorInvol").disabled=true;
 document.getElementById("menorPart").disabled=true;
 document.getElementById("menorTraf").value='';
 document.getElementById("menorInvol").value='';
 document.getElementById("menorPart").value='';
 }
 }*/

function operateFormatter(value, row, index) {
    return [
        '<a class="removeDet" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
function operateFormatterMenor(value, row, index) {
    return [
        '<a class="removeMenor" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
function operateFormatterDroga(value, row, index) {
    return [
        '<a class="removeDroga" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}

function agregarTag() {

    var elementoId = document.getElementById("clipping_tags").selectedOptions[0];
    if (tagsArray.indexOf(elementoId.label) == -1) {
        tagsArray.push(elementoId.label);
        crearBoton(elementoId.label, 'tag');
    }

}



