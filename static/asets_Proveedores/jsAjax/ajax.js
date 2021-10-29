
var objXMLHTTP = new XMLHttpRequest();

objXMLHTTP.open('GET', 'http://127.0.0.1:5000/prov/')

objXMLHTTP.addEventListener('load', agregarProveedor);

objXMLHTTP.send();


function agregarProveedor(evt){

    var data = JSON.parse(this.response);

    console.log(data);

    for (var i = 0; i < data.length; i++) {

        var mensaje = data[i];

        var posicion = i;

        console.log(posicion);

        var proveedor = document.createElement("tr");
        var nitProv = document.createElement("td") ; 
        var razonSocProv = document.createElement("td") ; 
        var direccProv = document.createElement("td") ;  
        var telProv = document.createElement("td") ;
        var td = document.createElement("td") ;
        var link = document.createElement("a") ;
        var boton = "Editar";
        var link2 = document.createElement("a") ;
        var boton2 = "Borrar"; 

        nitProv.innerHTML = mensaje.nit;
        razonSocProv.innerHTML= mensaje.razonSocial;
        direccProv.innerHTML= mensaje.direccion;
        telProv.innerHTML = mensaje.telefono;
        
        nitProv.className = "items";
        razonSocProv.className = "items";
        direccProv.className = "items";
        telProv.className = "items";

        link.href = "/editarProveedorL/" + posicion + "/";
        link.className = "nav__link__editar";
        link.innerHTML = boton;
        link2.href = "/eliminarProveedor/" + posicion + "/";
        link2.className = "nav__link__borrar";
        link2.innerHTML = boton2;

        proveedor.appendChild(nitProv);
        proveedor.appendChild(razonSocProv);
        proveedor.appendChild(direccProv);
        proveedor.appendChild(telProv);
        proveedor.appendChild(td).appendChild(link);
        proveedor.appendChild(td).appendChild(link2);
        otroProv = document.getElementById("tablaUsuarios").appendChild(proveedor);       
    }
}

function completado() {
    console.log('request completo');
    var div= document.getElementById("tablaUsuarios");
    div.addEventListener('load', agregarProveedor)
    
}