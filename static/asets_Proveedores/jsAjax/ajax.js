
var objXMLHTTP = new XMLHttpRequest();

objXMLHTTP.open('GET', 'http://127.0.0.1:5000/prov/')

objXMLHTTP.addEventListener('load', agregarProveedor);

objXMLHTTP.send();


function agregarProveedor(evt){
    
    console.log(data);

    for (var i = 0; i < data.length; i++) {

        var mensaje = data[i];
        var proveedor = document.createElement("tr");
        var nitProv = document.createElement("td") ; 
        var razonSocProv = document.createElement("td") ; 
        var direccProv = document.createElement("td") ;  
        var telProv = document.createElement("td") ; 

        nitProv.innerHTML = mensaje.nit;
        razonSocProv.innerHTML= mensaje.RazonSocial;
        direccProv.innerHTML= mensaje.Direccion;
        telProv.innerHTML = mensaje.Telefono;
        

        proveedor.appendChild(nitProv);
        proveedor.appendChild(razonSocProv);
        proveedor.appendChild(direccProv);
        proveedor.appendChild(telProv);
        otroProv = document.getElementById("tablaUsuarios").appendChild(proveedor);       
    }
}

function completado() {
    console.log('request completo');
    var div= document.getElementById("tablaUsuarios");
    div.addEventListener('load', agregarProveedor)
    
}