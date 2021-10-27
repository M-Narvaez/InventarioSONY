function validarFiltros() {
    var datoInput = document.formBusquedaProducto.datoBusqueda;
    var swErrores = false;

    if(datoInput.value.length == 0 ){
        document.getElementById("errorForm").innerHTML="Ingrese filtro de busqueda";
    }else{
        document.getElementById("errorForm").innerHTML=" ";
    }
   
    if (swErrores == true) {
        return false;
    }
    else {
        return true;
    }
}