function valideKey(evt){
    
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;
    
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      return true;
    } else{ // other keys.
      return false;
    }
}

function validarProveedor()
{
    var nitInput = document.formularioCrearProv.Nit;
    var razonSocInput = document.formularioCrearProv.RazonSocial;
    var direccionInput = document.formularioCrearProv.Direccion;
    var telefonoInput = document.formularioCrearProv.Telefono;
    var swErrores=false;

    console.log(nitInput.value + " - "+razonSocInput.value+" - "+direccionInput.value + " - " + telefonoInput.value);

    if(nitInput.value.length == 0 || nitInput.value.length < 8)
    {
        document.getElementById("errorNit").innerHTML="El nit del proveedor debe tener mínimo 8 caracteres.";
        nitInput.focus(); 
        swErrores=true;
    }

    if(razonSocInput.value.length == 0 || razonSocInput.value.length < 8)
    {
        document.getElementById("errorRazonSocial").innerHTML="La razón social debe tener mínimo 8 caracteres.";
        razonSocInput.focus();
       swErrores=true;
    }

    if(direccionInput.value.length == 0 || direccionInput.value.length < 8)
    {
        document.getElementById("errorDireccion").innerHTML="Por favor escriba una dirección válida, mínimo 8 caracteres";
        direccionInput.focus();
        swErrores=true;
    }

    if(telefonoInput.value.length == 0 || telefonoInput.value.length < 8)
    {
        document.getElementById("errorTelefono").innerHTML="El teléfono debe tener mínimo 8 caracteres.";
        telefonoInput.focus();
        swErrores=true;
    }

    if( swErrores==true)
    {
        return false;
    }
    else{
        return true;
    }
}

function validarProveedorEdit()
{
    var nitInput = document.formularioEditaProv.Nit;
    var razonSocInput = document.formularioEditaProv.RazonSocial;
    var direccionInput = document.formularioEditaProv.Direccion;
    var telefonoInput = document.formularioEditaProv.Telefono;

    var swErrores=false;

    console.log(nitInput.value + " - "+razonSocInput.value+" - "+direccionInput.value + " - " + telefonoInput.value);



    if(nitInput.value.length == 0 || nitInput.value.length < 8)
    {
        //alert("El nombre de usuario debe tener mínimo 8 caracteres.");
        document.getElementById("errorNit").innerHTML="El nit del proveedor debe tener mínimo 8 caracteres.";
        nitInput.focus();
        //document.getElementById("botonEnviar").disabled=true; 
        swErrores=true;
    }

    if(razonSocInput.value.length == 0 || razonSocInput.value.length < 8)
    {
        //alert("La clave debe tener mínimo 8 caracteres.");
        document.getElementById("errorRazonSocial").innerHTML="La razón social debe tener mínimo 8 caracteres.";
        razonSocInput.focus();
       swErrores=true;
    }

    if(direccionInput.value.length == 0 || direccionInput.value.length < 8)
    {
        //alert("Por favor escriba un correo válido.");
        document.getElementById("errorDireccion").innerHTML="Por favor escriba una dirección válida, mínimo 8 caracteres";
        direccionInput.focus();
        swErrores=true;
    }

    if(telefonoInput.value.length == 0 || telefonoInput.value.length < 8)
    {
        //alert("Por favor escriba un correo válido.");
        document.getElementById("errorTelefono").innerHTML="El teléfono debe tener mínimo 8 caracteres.";
        telefonoInput.focus();
        swErrores=true;
    }

    if( swErrores==true)
    {
        return false;
    }
    else{
        return true;
    }
}

function validarUsuario()
{
    var idInput = document.formularioCrearUsuario.id;
    var nombreInput = document.formularioCrearUsuario.nombre;
    var direccionInput = document.formularioCrearUsuario.direccion;
    var telefonoInput = document.formularioCrearUsuario.telefono;
    var correoInpunt = document.formularioCrearUsuario.correoElectronico;
    var contrasenaInput = document.formularioCrearUsuario.contrasena;
    var perfilInput = document.formularioCrearUsuario.perfil;
    var formato_email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    var swErrores=false;

    if(idInput.value.length == 0 || nombreInput ==0 || correoInpunt==0 || contrasenaInput== 0   ){
        document.getElementById("errorForm").innerHTML="Los campos con (*) son obligatorios";
    }
   
    if(idInput.value.length == 0 || idInput.value.length < 5)
    {
        document.getElementById("errorId").innerHTML=" *";
        idInput.focus(); 
        swErrores=true;
    }else if(idInput.value.length > 5){
        document.getElementById("errorId").innerHTML=" ";
    }

    if(nombreInput.value.length == 0 )
    {
        document.getElementById("errorNombre").innerHTML=" *";
        nombreInput.focus();
       swErrores=true;
    }else {
        document.getElementById("errorNombre").innerHTML=" ";
    }

    if( telefonoInput.value.length < 10)
    {
        document.getElementById("errorTelefono").innerHTML=" *";
        telefonoInput.focus();
        swErrores=true;
    }else {
        document.getElementById("errorTelefono").innerHTML=" ";
    }

    if(!correoInpunt.value.match(formato_email) || correoInpunt.value.length == 0)
    {        
        document.getElementById("errorCorreo").innerHTML=" *";
        correoInpunt.focus();
        swErrores=true;
    }else if(correoInpunt.value.match(formato_email)){
        document.getElementById("errorCorreo").innerHTML=" ";
    }

    if( contrasenaInput.value.length == 0 || contrasenaInput.value.length < 6 )
    {
        document.getElementById("errorContrasena").innerHTML=" *";
        contrasenaInput.focus();
        swErrores=true;
    }else if(contrasenaInput.value.length > 6){
        document.getElementById("errorContrasena").innerHTML=" ";
    }
/*
    if( perfilInput.value.length == 0   )
    {
        document.getElementById("errorPerfil").innerHTML=" * ";
        perfilInput.focus();
        swErrores=true;
    }*/

    if( swErrores==true)
    {
        return false;
    }
    else{
        return true;
    }
}