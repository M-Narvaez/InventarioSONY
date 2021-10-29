function valideKey(evt) {

    var code = (evt.which) ? evt.which : evt.keyCode;
    if (code == 8) {
        return true;
    } else if (code >= 48 && code <= 57) { 
        return true;
    } else { 
        return false;
    }
}

function validarBusqueda() {
    var nitInput = document.formularioBuscarProv.Nit;
    var swErrores = false;


    if(nitInput.value.length == 0 ){
        document.getElementById("errorForm").innerHTML="Campos obligatorios (*)";
    }

    if (nitInput.value.length == 0 || nitInput.value.length < 8) {
        document.getElementById("errorNit").innerHTML = " *";
        nitInput.focus();
        swErrores = true;
    }else if(nitInput.value.length > 8){
        document.getElementById("errorNit").innerHTML = " *";
    }

    if (swErrores == true) {
        return false;
    }
    else {
        return true;
    }
}
