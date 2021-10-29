
var objXMLHTTP = new XMLHttpRequest();

objXMLHTTP.open('GET', 'http://127.0.0.1:5000/pro/')

objXMLHTTP.addEventListener('load', agregarProducto);

objXMLHTTP.send();


function agregarProducto(evt){

    var data = JSON.parse(this.response);

    console.log(data);

    for (var i = 0; i < data.length; i++) {

        var posicion = i;
        var mensaje = data[i];
        var boton = "Ver";
        var producto = document.createElement("article");
        var imageProd = document.createElement("img") ; 
        var nombreProducto  = document.createElement("h4")  ;    
        var link = document.createElement("a") ;

        nombreProducto.innerHTML= mensaje.nombreProducto;

        imageProd.src = "/static/asets_Productos/listaProductos/img/smartphone.svg";
        imageProd.alt = "Logot";
        link.href = "/verProducto/" + posicion + "/";
        link.innerHTML = boton;
        producto.appendChild(imageProd);
        producto.appendChild(nombreProducto);
        producto.appendChild(link);
        otro = document.getElementById("divProductos").appendChild(producto);       
    }
}

function completado() {
    console.log('request completo');
    var div= document.getElementById("divProductos");
    div.addEventListener('load', agregarProducto)
    
}