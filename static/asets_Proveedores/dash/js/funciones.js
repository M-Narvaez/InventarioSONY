function valideKey(evt) {

    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;

    if (code == 8) { // backspace.
        return true;
    } else if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        return false;
    }
}

function validarProveedor() {
    var nitInput = document.formularioCrearProv.Nit;
    var razonSocInput = document.formularioCrearProv.RazonSocial;
    var direccionInput = document.formularioCrearProv.Direccion;
    var telefonoInput = document.formularioCrearProv.Telefono;
    var swErrores = false;

    //console.log(nitInput.value + " - " + razonSocInput.value + " - " + direccionInput.value + " - " + telefonoInput.value);

    if(nitInput.value.length == 0 || razonSocInput.value.length == 0 || direccionInput.value.length == 0 
        ||  telefonoInput.value.length == 0 ){
        document.getElementById("errorForm").innerHTML="Los campos con (*) son obligatorios";
    }

    if (nitInput.value.length == 0 || nitInput.value.length < 8) {
        document.getElementById("errorNit").innerHTML = " *";
        nitInput.focus();
        swErrores = true;
    }else if(nitInput.value.length > 8){
        document.getElementById("errorNit").innerHTML = " ";
    }

    if (razonSocInput.value.length == 0 || razonSocInput.value.length < 8) {
        document.getElementById("errorRazonSocial").innerHTML = " *";
        razonSocInput.focus();
        swErrores = true;
    }else if(razonSocInput.value.length > 8){
        document.getElementById("errorRazonSocial").innerHTML = " ";
    }
/*
    if (direccionInput.value.length == 0 || direccionInput.value.length < 8) {
        document.getElementById("errorDireccion").innerHTML = "Por favor escriba una dirección válida, mínimo 8 caracteres";
        direccionInput.focus();
        swErrores = true;
    }*/

    if (telefonoInput.value.length == 0 || telefonoInput.value.length < 10) {
        document.getElementById("errorTelefono").innerHTML = " *";
        telefonoInput.focus();
        swErrores = true;
    }else if (telefonoInput.value.length == 10){
        document.getElementById("errorTelefono").innerHTML = " ";
    }

    if (swErrores == true) {
        return false;
    }
    else {
        return true;
    }
}
