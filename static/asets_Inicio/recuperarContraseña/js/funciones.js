
function validarRecuperar() {
    var correoInput = document.formularioRecuperarContraseña.correo;
    var confirmar_correoInput = document.formularioRecuperarContraseña.confirmar_correo;

    var formato_email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    var swErrores = false;

    if (!correoInput.value.match(formato_email) || correoInput.value.length == 0) {
        document.getElementById("errorCorreo").innerHTML = " *";
        correoInput.focus();
        swErrores = true;
    } else if (correoInput.value.match(formato_email)|| correoInput.value.length > 0) {
        document.getElementById("errorCorreo").innerHTML = " ";
    }

    if (!confirmar_correoInput.value.match(formato_email) || confirmar_correoInput.value.length == 0) {
        document.getElementById("errorCorreoConfirmar").innerHTML = " *";
        confirmar_correoInput.focus();
        swErrores = true;
    } else if (confirmar_correoInput.value.match(formato_email) || confirmar_correoInput.value.length > 5) {
        document.getElementById("errorCorreoConfirmar").innerHTML = " ";

        if (swErrores == true) {
            return false;
        }
        else {
            return true;
        }
    }
}