
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

            idProductoL.innerHTML = mensaje.ID;
            divId.appendChild(idProductoL);

            nombreProductoL.innerHTML = mensaje.Nombre;
            divNombre.appendChild(nombreProductoL);

            descProductoL.innerHTML = mensaje.Descripcion;
            divDescripcion.appendChild(descProductoL);

            provProductoL.innerHTML = mensaje.Proveedor;
            divProveedor.appendChild(provProductoL);

            bodProductoL.innerHTML = mensaje.CantidadBodega;
            divBodega.appendChild(bodProductoL);

            minProductoL.innerHTML = mensaje.CantidadMinima;
            divMinima.appendChild(minProductoL);
        }

    }
}