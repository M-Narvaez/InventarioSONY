
function validarEdicion() {
    var nombreInput = document.frmEditarDatos.nombre;
    var direccionInput = document.frmEditarDatos.direccion;
    var celularInput = document.frmEditarDatos.celular;
    var correoInput = document.frmEditarDatos.correo;
    
    var formato_email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    var swErrores = false;

    if(nombreInput.value.length == 0 || direccionInput.value.length == 0 || celularInput.value.length == 0 
        ||  correoInput.value.length == 0  ){
        document.getElementById("errorForm").innerHTML="Los campos con (*) son obligatorios";
    }

    if(nombreInput.value.length == 0 )
    {
        document.getElementById("errorNombre").innerHTML=" *";
        nombreInput.focus(); 
        swErrores=true;
    }else if(nombreInput.value.length > 0){
        document.getElementById("errorNombre").innerHTML=" ";
    }

    if(celularInput.value.length == 0 ||celularInput.value.length < 10 )
    {
        document.getElementById("errorCelular").innerHTML=" *";
        celularInput.focus(); 
        swErrores=true;
    }else if(celularInput.value.length == 10){
        document.getElementById("errorCelular").innerHTML=" ";
    }



    if (swErrores == true) {
        return false;
    }
    else {
        return true;
    }
    
}