
var objXMLHTTP = new XMLHttpRequest();

objXMLHTTP.open('GET', 'http://127.0.0.1:5000/pro/')

objXMLHTTP.addEventListener('load', mostrarProv);

objXMLHTTP.send();


function mostrarProv(evt){
    var data = JSON.parse(this.response);
    var posicion= document.getElementById("posicion");
    var i = 0;  

    console.log(data);
    console.log(posicion); // obtener dato de la posicion

    for ( i = 0; i < data.length; i++) {
        console.log("for");
        console.log("data legth : " + data.length);
        console.log("i: " + i);
        if (i == 1) {
            console.log("if");
            console.log(i);
            //var posicion = i;
            var mensaje = data[i];

            var nitProv = document.createElement("label");
            var razonSocProv = document.createElement("input");
            var direcProv = document.createElement("input");
            var celProv = document.createElement("input");           

            nitProv.innerHTML = mensaje.Nit
            nitProv.setAttribute(id, "Nit");
            nitProv.classList.add("form__input input"); // estilo
            //nitProv.onkeypress llamado javascript
            document.getElementById("divNitEdP").appendChild(nitProv);

            razonSocProv.innerHTML = mensaje.Nombre;
            razonSocProv.setAttribute(id, "RazonSocial");
            razonSocProv.classList.add("form__label nombre"); // estilo
            document.getElementById("divRsEdP").appendChild(razonSocProv);

            direcProv.innerHTML = mensaje.Direccion;
            direcProv.setAttribute(id, "direccion");
            direcProv.classList.add("form__input input"); // estilo
            document.getElementById("divDirEdP").appendChild(direcProv);

            celProv.innerHTML = mensaje.Telefono;
            celProv.setAttribute(id, "telefono");
            celProv.classList.add("form__input input_tel"); // estilo
            document.getElementById("divTelEdU").appendChild(celProv);            
        }      
    }
}