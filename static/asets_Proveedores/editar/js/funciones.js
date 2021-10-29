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

function validarProveedorEdit() {
    var nitInput = document.formularioEditaProv.Nit;
    var razonSocInput = document.formularioEditaProv.RazonSocial;
    var direccionInput = document.formularioEditaProv.Direccion;
    var telefonoInput = document.formularioEditaProv.Telefono;
    var swErrores = false;

    //console.log(nitInput.value + " - " + razonSocInput.value + " - " + direccionInput.value + " - " + telefonoInput.value);

    if(razonSocInput.value.length == 0 || direccionInput.value.length == 0 
        ||  telefonoInput.value.length == 0 ){
        document.getElementById("errorForm").innerHTML="Los campos con (*) son obligatorios";
    }


    if (razonSocInput.value.length == 0 || razonSocInput.value.length < 8) {
        document.getElementById("errorRazonSocial").innerHTML = " *";
        razonSocInput.focus();
        swErrores = true;
    }else if(razonSocInput.value.length > 8){
        document.getElementById("errorRazonSocial").innerHTML = " ";
    }


    if (telefonoInput.value.length == 0 || telefonoInput.value.length < 10) {
        document.getElementById("errorTelefono").innerHTML = " *";
        telefonoInput.focus();
        swErrores = true;
    }else if(telefonoInput.value.length == 10){
        document.getElementById("errorTelefono").innerHTML = " ";
    }

    if (swErrores == true) {
        return false;
    }
    else {
        return true;
    }
}
