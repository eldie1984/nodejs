var $table = $('#table'),
        $button = $('#button'),
        $buttond = $('#buttond'),
        $tableb = $('#tableb'),
        $buttonb = $('#buttonb'),
        $tablej = $('#tablej'),
        $buttonj = $('#buttonj'),
        $tables = $('#tables'),
        $buttons = $('#buttons');
var valores = [];
var barrios = [];
var seccionales = [];
var distritos = [];
var modalidades_Word = [];
var delitos_Word = [];
var barrios_Word = [];
var seccionales_Word = [];
var distritos_Word = [];
var index_mod = 0;
var index_del = 0;
var index_conf = 0;

function update_mod( valor,modalidad) {
    if (valores.indexOf(valor) === -1) {
        valores.push(valor);
        modalidades_Word.push(modalidad);
        index_mod = index_mod + 1;
        document.getElementById(origen.concat("_modalidad")).value = valores.join(",");
        $table.bootstrapTable('insertRow', {
            index: 1,
            row: {
                IndexMod: index_mod,
                figura: modalidad
            }
        });
    }
}
;
function update_del(ley_valor,ley) {
    if (valores.indexOf(ley_valor) === -1) {
        valores.push(ley_valor);
        delitos_Word.push(ley);
        index_del = index_del + 1;
        document.getElementById("DelN2_ley").value = valores.join(",");
        $table.bootstrapTable('insertRow', {
            index: 1,
            row: {
                IndexDel: index_del,
                ley: ley,
                
            }
        });
    }
}
;

function update_conf(valor,confl) {
    if (valores.indexOf(valor) === -1) {
        valores.push(valor);
        delitos_Word.push(confl);
        index_conf = index_conf + 1;
        document.getElementById("ConfN2_conf").value = valores.join(",");
        $table.bootstrapTable('insertRow', {
            index: 1,
            row: {
                IndexConf: index_conf,
                confl: confl,
                
            }
        });
    }
}
;
function update_bar(valor, label) {
    if (barrios.indexOf(valor) === -1) {
        barrios.push(valor);
        barrios_Word.push(label);
        document.getElementById(origen.concat("_barrio")).value = barrios.join(",");
        $tableb.bootstrapTable('insertRow', {
            index: 1,
            formatNoMatches: 'hola',
            row: {
                barrio: label
            }
        });
    }
}
;

function update_sec(valor,label) {
    if (seccionales.indexOf(valor) === -1) {
        seccionales.push(valor);
        seccionales_Word.push(label);
        document.getElementById(origen.concat("_seccional")).value = seccionales.join(",");
        $tables.bootstrapTable('insertRow', {
            index: 1,
            row: {
                seccional: label
            }
        });
    }
}
;
function update_dist(valor,label ) {
    if (distritos.indexOf(valor) === -1) {
        distritos.push(valor);
        distritos_Word.push(label);
        document.getElementById(origen.concat("_distrito")).value = distritos.join(",");
        $tablej.bootstrapTable('insertRow', {
            index: 1,
            row: {
                distrito: label
            }
        });
    }
}
;
$(function () {
    $button.click(function () {
        var mod = document.getElementById("modalidad").value;
        var mod_val = document.getElementById("modalidad_value").value;
        update_mod(mod,mod_val);
        document.getElementById("modalidad").value=''
        document.getElementById("modalidad_value").value='';
    });
    $buttond.click(function () {
        var ley = document.getElementById("delitos").value;
        var ley_valor = document.getElementById("delitos_val").value;
        update_del(ley, ley_valor);
        document.getElementById("delitos").value=''
        document.getElementById("delitos_val").value='';
    });
    $buttonb.click(function () {
        var barrio = document.getElementById("barrio").value;
        var barrio_value = document.getElementById("barrio_value").value;
        update_bar(barrio_value, barrio);
        document.getElementById("barrio").value=''
        document.getElementById("barrio_value").value='';
    });
    $buttonj.click(function () {
        var jur = document.getElementById("distrito").value;
        var jur_value = document.getElementById("distrito_value").value;
        update_dist(jur, jur_value);
        document.getElementById("distrito").value=''
        document.getElementById("distrito_value").value='';
    });
    $buttons.click(function () {
        var sec = document.getElementById("seccional").value;
        var sec_value = document.getElementById("seccional_value").value;
        update_sec(sec, sec_value);
        document.getElementById("seccional").value=''
        document.getElementById("seccional_value").value='';
    });
});


window.operateEvents = {
    'click .removeMod': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'IndexMod',
            values: [row.IndexMod]
        });
    },
    'click .removeDel': function (e, value, row, index) {
        $tabled.bootstrapTable('remove', {
            field: 'IndexDel',
            values: [row.IndexDel]
        });
    },
    'click .removeBar': function (e, value, row, index) {
        $tableb.bootstrapTable('remove', {
            field: 'barrio',
            values: [row.barrio]
        });
    },
    'click .removeSec': function (e, value, row, index) {
        $tables.bootstrapTable('remove', {
            field: 'seccional',
            values: [row.seccional]
        });
    },
    'click .removeJur': function (e, value, row, index) {
        $tablej.bootstrapTable('remove', {
            field: 'distrito',
            values: [row.distrito]
        });
    }
};
function operateFormatterMod(value, row, index) {
    return [
        '<a class="removeMod" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
function operateFormatterDel(value, row, index) {
    return [
        '<a class="removeDel" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
function operateFormatterBar(value, row, index) {
    return [
        '<a class="removeBar" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
function operateFormatterSec(value, row, index) {
    return [
        '<a class="removeSec" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
function operateFormatterJur(value, row, index) {
    return [
        '<a class="removeJur" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}

function borrarValor(valor, vector, vectorPalabra) {
    var index = vectorPalabra.indexOf(valor);
    if (index > -1) {
        vector.splice(index, 1);
        vectorPalabra.splice(index, 1);
    }
};