
var objXMLHTTP = new XMLHttpRequest();

objXMLHTTP.open('GET', 'http://127.0.0.1:5000/user/')

objXMLHTTP.addEventListener('load', agregarUsuario);

objXMLHTTP.send();


function agregarUsuario(evt){
    //var nombre =document.getElementById("NombreP"); 
    var data = JSON.parse(this.response);
    var admin = "Administrador";
    var user = "Usuario";
    var superAdmin = "SuperAdministrador";

    console.log(data);

    for (var i = 0; i < data.length; i++) {

        var mensaje = data[i];
        var usuario = document.createElement("tr");
        var idUser = document.createElement("td") ; 
        var nombreUsuario = document.createElement("td") ; 
        var direccUsuario = document.createElement("td") ;  
        var telUsuario = document.createElement("td") ; 
        var correoUsuario = document.createElement("td");
        var perfilUsuario = document.createElement("td");

        idUser.innerHTML = mensaje.ID;
        nombreUsuario.innerHTML= mensaje.Nombre;
        direccUsuario.innerHTML= mensaje.Direccion;
        telUsuario.innerHTML = mensaje.Telefono;
        correoUsuario.innerHTML = mensaje.Correo;
        
        if(mensaje.Perfil ==1){
            perfilUsuario.innerHTML = user;
        }else if(mensaje.Perfil ==2 ){
            perfilUsuario.innerHTML = admin;
        }else{
            perfilUsuario.innerHTML = superAdmin;
        }

        usuario.appendChild(idUser);
        usuario.appendChild(nombreUsuario);
        usuario.appendChild(direccUsuario);
        usuario.appendChild(telUsuario);
        usuario.appendChild(correoUsuario);
        usuario.appendChild(perfilUsuario);
        otroUser = document.getElementById("tablaUsuarios").appendChild(usuario);       
    }
}

function completado() {
    console.log('request completo');
    var div= document.getElementById("tablaUsuarios");
    div.addEventListener('load', agregarUsuario)
    
}