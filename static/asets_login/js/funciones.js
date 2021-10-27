function validar()
{
    var passInput = document.fromLogin.contrasena;
    var correoInput = document.fromLogin.correo;

    var formato_email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    var swErrores=false;

    if(correoInput.value.length == 0 || passInput.value.length == 0 ){
        document.getElementById("errorForm").innerHTML="Los campos con (*) son obligatorios";
    }

    if(correoInput.value.length == 0 ){
        document.getElementById("errorMail").innerHTML=" *";
        correoInput.focus();
        swErrores=true;
    }else if(!correoInput.value.match(formato_email))
    {
        document.getElementById("errorMail").innerHTML="Por favor escriba un correo válido.";
        document.getElementById("errorForm").innerHTML="";
        correoInput.focus();
        swErrores=true;
    }else{
        document.getElementById("errorMail").innerHTML=" ";
    }

    if(passInput.value.length == 0){
        document.getElementById("errorPassword").innerHTML=" *";
        passInput.focus();
        swErrores=true;
    }else if(passInput.value.length < 6){
        document.getElementById("errorPassword").innerHTML="La clave debe tener mínimo 6 caracteres.";
        document.getElementById("errorForm").innerHTML="";
        passInput.focus();
        swErrores=true;
    }else{
        document.getElementById("errorPassword").innerHTML=" ";
    }

    


    if( swErrores==true)
    {
        return false;
    }
    else{
        return true;
    }

}

function verClave()
{
    var passInput = document.fromLogin.contrasena;
    passInput.type="text";
}

function ocultarClave()
{
    var passInput = document.fromLogin.contrasena;
    passInput.type="password";    
}

function ocultarVerClave()
{
    var passInput = document.fromLogin.contrasena;
    var tipo = passInput.type;
    console.log(tipo);

    if(tipo=="text")
    {
        passInput.type="password";
    }

    if(tipo == "password")
    {
        passInput.type="text";
    }
}