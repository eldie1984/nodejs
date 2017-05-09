var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js')
var delito = require('./n2Delito.js');
var modalidad = require('./n2Modalidad.js');
var ref = require('./referenciales.js');
var info = require('./informacion.js');
var user = require('./users.js');
var conflictividad = require('./n2Conflictividad.js');
var control = require('./control.js');
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

router.get('/healthcheck', ref.healthcheck);
router.get('/referenciales/n2/barrio', ref.n2Barrio);
router.get('/referenciales/bahra', ref.bahra);
router.get('/referenciales/n2/seccional', ref.n2Seccional);
router.get('/referenciales/distrito', ref.distrito);
router.get('/referenciales/n2/delito', ref.n2Delito);
router.get('/referenciales/n2/conflictividad', ref.n2conflictividad);
router.get('/referenciales/n2/modalidad', ref.n2modalidad);
router.get('/referenciales/distritofiscal', ref.distritofiscal);
/* servicios usados por la ddi
router.get('/informacion/indec', info.indec);
router.get('/informacion/distritofiscal', info.distrito);
router.get('/informacion/fiscalia', info.fiscalia);
router.post('/referenciales/n2/barrio', ref.N2Barrio);
*
/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/n2/delito/calendario/Ref', delito.calendario);
router.get('/n2/delito/datos', delito.datos);
router.get('/n2/delito/mapa/barrio/max', delito.barrioMax)
router.get('/n2/delito/mapa/barrio/dato', delito.barrioCloroDatos)
router.get('/n2/delito/calendario/dato', delito.calendarioDatos);
router.get('/n2/delito/tags', delito.tags);
router.get('/n2/delito/grafico/total', delito.total);
router.get('/n2/delito/grafico/hora', delito.hora);
router.get('/n2/delito/mapa/puntos/datos',delito.puntos);
// router.get('/n2/delito/mapa/puntos/leyenda',delito.leyenda_ptos);
router.get('/n2/delito/mapa/puntos/tiempo',delito.puntos_tiempo);
router.get('/n2/delito/check',delito.check);
router.get('/n2/delito/mapa/check',delito.check_mapa);


router.get('/n2/modalidad/calendario/Ref', modalidad.calendario);
router.get('/n2/modalidad/calendario/dato', modalidad.calendarioDatos);
router.get('/n2/modalidad/datos', modalidad.datos);
router.get('/n2/modalidad/mapa/barrio/max', modalidad.barrioMax)
router.get('/n2/modalidad/mapa/barrio/dato', modalidad.barrioCloroDatos)
router.get('/n2/modalidad/tags', modalidad.tags);
router.get('/n2/modalidad/grafico/total', modalidad.total);
router.get('/n2/modalidad/grafico/hora', modalidad.hora);
router.get('/n2/modalidad/mapa/puntos/datos',modalidad.puntos);
router.get('/n2/modalidad/mapa/test',modalidad.puntos_test);

router.get('/n2/modalidad/mapa/puntos/tiempo',modalidad.puntos_tiempo);
router.get('/n2/modalidad/check',modalidad.check);
router.get('/n2/modalidad/mapa/check',modalidad.check_mapa);

/* Se comenta hasta hacer la revision correspondiente
router.get('/n2/conflictividad/calendario/Ref', conflictividad.calendario);
router.get('/n2/conflictividad/calendario/dato', conflictividad.calendarioDatos);
router.get('/n2/conflictividad/datos', conflictividad.datos);
router.get('/n2/conflictividad/mapa/barrio/max', conflictividad.barrioMax)
router.get('/n2/conflictividad/mapa/barrio/dato', conflictividad.barrioCloroDatos)
router.get('/n2/conflictividad/tags', conflictividad.tags);
router.get('/n2/conflictividad/grafico/total', conflictividad.total);
router.get('/n2/conflictividad/grafico/hora', conflictividad.hora);
router.get('/n2/conflictividad/mapa/puntos/datos',conflictividad.puntos);
router.get('/n2/conflictividad/mapa/puntos/tiempo',conflictividad.puntos_tiempo);
router.get('/n2/conflictividad/check',conflictividad.check);
router.get('/n2/conflictividad/mapa/check',conflictividad.check_mapa);
*/
router.get('/control',control.errorN2);
router.get('/control/fluctuaciones',control.fluctuaciones);
router.get('/control/conflicto',control.conflicto);
router.get('/control/total',control.total);
router.get('/control/comisarias',control.comisarias);
router.get('/control/max', control.comisariaMax)
router.get('/control/cloro', control.comisariaCloroDatos)
router.get('/control/puntos',control.puntos);
router.get('/control/center',control.center);
router.get('/control/diferencia',control.diferencia);
//router.post('/api/v1/product/', products.create);
//router.put('/api/v1/product/:id', products.update);
//router.delete('/api/v1/product/:id', products.delete);
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
//router.get('/api/v1/admin/users', user.getAll);
//router.get('/api/v1/admin/user/:id', user.getOne);
//router.post('/api/v1/admin/user/', user.create);
//router.put('/api/v1/admin/user/:id', user.update);
//router.delete('/api/v1/admin/user/:id', user.delete);
 
module.exports = router;
