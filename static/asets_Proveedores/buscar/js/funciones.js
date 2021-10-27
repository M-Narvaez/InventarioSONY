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
    var razonSocInput = document.formularioBuscarProv.RazonSocial;
    var swErrores = false;

    //console.log(nitInput.value + " - " + razonSocInput.value + " - " + direccionInput.value + " - " + telefonoInput.value);

    if(nitInput.value.length == 0 || razonSocInput.value.length == 0 ){
        document.getElementById("errorForm").innerHTML="Ingrese almenos un filtro de busqueda";
    }

    if (nitInput.value.length == 0 || nitInput.value.length < 8) {
        document.getElementById("errorNit").innerHTML = " *";
        nitInput.focus();
        swErrores = true;
    }else if(nitInput.value.length > 8){
        document.getElementById("errorNit").innerHTML = " *";
    }

    if (razonSocInput.value.length == 0 || razonSocInput.value.length < 8) {
        document.getElementById("errorRazonSocial").innerHTML = " *";
        razonSocInput.focus();
        swErrores = true;
    }else if(razonSocInput.value.length > 8){
        document.getElementById("errorRazonSocial").innerHTML = " ";
    }

    if (swErrores == true) {
        return false;
    }
    else {
        return true;
    }
}
