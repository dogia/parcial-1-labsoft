┌────────┬─────────────────────────────────────────────────────┬─────────────────────────────────┐
│ Verbo │ Ruta │ Acción │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productores │ Listar productores │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productores/:documento │ Detalle productor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ POST │ /productores │ Crear productor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ PUT │ /productores/:documento │ Actualizar productor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ DELETE │ /productores/:documento │ Eliminar productor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productores/:documento/fincas │ Listar fincas del productor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productores/:documento/fincas/:numeroCatastro │ Detalle finca │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ POST │ /productores/:documento/fincas │ Crear finca │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ PUT │ /productores/:documento/fincas/:numeroCatastro │ Actualizar finca │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ DELETE │ /productores/:documento/fincas/:numeroCatastro │ Eliminar finca │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /fincas/:numeroCatastro/viveros │ Listar viveros de la finca │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /fincas/:numeroCatastro/viveros/:codigo │ Detalle vivero │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ POST │ /fincas/:numeroCatastro/viveros │ Crear vivero │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ PUT │ /fincas/:numeroCatastro/viveros/:codigo │ Actualizar vivero │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ DELETE │ /fincas/:numeroCatastro/viveros/:codigo │ Eliminar vivero │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /viveros/:codigo/labores │ Listar labores del vivero │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /viveros/:codigo/labores/:id │ Detalle labor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ POST │ /viveros/:codigo/labores │ Crear labor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ PUT │ /viveros/:codigo/labores/:id │ Actualizar labor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ DELETE │ /viveros/:codigo/labores/:id │ Eliminar labor │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productos-control │ Listar productos de control │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productos-control/:id │ Detalle producto │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ POST │ /productos-control │ Crear producto │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ PUT │ /productos-control/:id │ Actualizar producto │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ DELETE │ /productos-control/:id │ Eliminar producto │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productos-control/:productoId/control-plaga │ Detalle control plaga │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ POST │ /productos-control/:productoId/control-plaga │ Crear control plaga │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ PUT │ /productos-control/:productoId/control-plaga │ Actualizar control plaga │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ DELETE │ /productos-control/:productoId/control-plaga │ Eliminar control plaga │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productos-control/:productoId/control-hongo │ Detalle control hongo │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ POST │ /productos-control/:productoId/control-hongo │ Crear control hongo │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ PUT │ /productos-control/:productoId/control-hongo │ Actualizar control hongo │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ DELETE │ /productos-control/:productoId/control-hongo │ Eliminar control hongo │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ GET │ /productos-control/:productoId/control-fertilizante │ Detalle control fertilizante │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ POST │ /productos-control/:productoId/control-fertilizante │ Crear control fertilizante │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ PUT │ /productos-control/:productoId/control-fertilizante │ Actualizar control fertilizante │
├────────┼─────────────────────────────────────────────────────┼─────────────────────────────────┤
│ DELETE │ /productos-control/:productoId/control-fertilizante │ Eliminar control fertilizante │
└────────┴─────────────────────────────────────────────────────┴─────────────────────────────────┘
