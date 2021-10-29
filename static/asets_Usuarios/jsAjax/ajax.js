
var objXMLHTTP = new XMLHttpRequest();

objXMLHTTP.open('GET', 'http://127.0.0.1:5000/usu/')

objXMLHTTP.addEventListener('load', agregarUsuario);

objXMLHTTP.send();


function agregarUsuario(evt){

    var data = JSON.parse(this.response);

    var admin = "Administrador";
    var user = "Usuario";


    for (var i = 1; i < data.length; i++) {

        var mensaje = data[i];
        var posicion = i;
        var usuario = document.createElement("tr");
        var idUser = document.createElement("td") ; 
        var nombreUsuario = document.createElement("td") ; 
        var direccUsuario = document.createElement("td") ;  
        var telUsuario = document.createElement("td") ; 
        var correoUsuario = document.createElement("td");
        var perfilUsuario = document.createElement("td");
        var tdlink = document.createElement("td");
        var link = document.createElement("a") ;
        var boton = "Borrar";


        idUser.innerHTML = mensaje.idPersona;
        nombreUsuario.innerHTML= mensaje.nombres;
        direccUsuario.innerHTML= mensaje.direccion;
        telUsuario.innerHTML = mensaje.telefono;
        correoUsuario.innerHTML = mensaje.correoElectronico;


        if(mensaje.idPerfil ==1){
            perfilUsuario.innerHTML = user;
        }else if(mensaje.idPerfil ==2 ){
            perfilUsuario.innerHTML = admin;
        }

        idUser.className = "items";
        nombreUsuario.className = "items";
        direccUsuario.className = "items";
        telUsuario.className = "items";
        correoUsuario.className = "items";
        perfilUsuario.className = "items";


        link.href = "/borrarUsuario/ " + posicion + "/";
        link.className = "nav__link__borrar items";
        link.innerHTML = boton;

        usuario.appendChild(idUser);
        usuario.appendChild(nombreUsuario);
        usuario.appendChild(perfilUsuario);
        usuario.appendChild(direccUsuario);
        usuario.appendChild(telUsuario);
        usuario.appendChild(correoUsuario);
        usuario.appendChild(tdlink).appendChild(link);
        otroUser = document.getElementById("tablaUsuarios").appendChild(usuario);       
    }
}

function completado() {
    console.log('request completo');
    var div= document.getElementById("tablaUsuarios");
    div.addEventListener('load', agregarUsuario)
    
}