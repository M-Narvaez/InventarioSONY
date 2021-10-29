
var objXMLHTTP = new XMLHttpRequest();

objXMLHTTP.open('GET', 'http://127.0.0.1:5000/pro/')

objXMLHTTP.addEventListener('load', mostrarProducto);

objXMLHTTP.send();


function mostrarProducto(evt) {

    var data = JSON.parse(this.response);
    var posicion = document.getElementById("posicion").value;


    console.log(posicion); // obtener dato de la posicion

    for (i = 0; i < data.length; i++) {
        
        if (i == posicion) {

            var mensaje = data[i];

            var idProductoL = document.createElement("label");
            var nombreProductoL = document.createElement("label");
            var descProductoL = document.createElement("label");
            var provProductoL = document.createElement("label");
            var bodProductoL = document.createElement("label");
            var minProductoL = document.createElement("label");

            idProductoL.innerHTML = mensaje.idProducto;
            divId.appendChild(idProductoL);

            nombreProductoL.innerHTML = mensaje.nombreProducto;
            divNombre.appendChild(nombreProductoL);

            descProductoL.innerHTML = mensaje.descripcion;
            divDescripcion.appendChild(descProductoL);

            provProductoL.innerHTML = mensaje.fechaRegistro;
            divProveedor.appendChild(provProductoL);

            bodProductoL.innerHTML = mensaje.cantidadBodega;
            divBodega.appendChild(bodProductoL);

            minProductoL.innerHTML = mensaje.cantidadDisponible;
            divMinima.appendChild(minProductoL);
        }

    }
}