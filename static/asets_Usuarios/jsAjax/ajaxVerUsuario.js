
var objXMLHTTP = new XMLHttpRequest();

objXMLHTTP.open('GET', 'http://127.0.0.1:5000/user/')

objXMLHTTP.addEventListener('load', mostrarUser);

objXMLHTTP.send();


function mostrarUser(evt) {
    //var nombre =document.getElementById("NombreP"); 
    var data = JSON.parse(this.response);
    var posicion = document.getElementById("posicion");
    var i = 0;

    //alert("posicion : "+ posicion);

    console.log(data);
    console.log(posicion); // obtener dato de la posicion

    for (i = 0; i < data.length; i++) {
        console.log("for");
        console.log("data legth : " + data.length);
        console.log("i: " + i);
        if (i == 1) {
            console.log("if");
            console.log(i);
            //var posicion = i;
            var mensaje = data[i];

            var idUser = document.createElement("label");
            var nombreUser = document.createElement("input");
            var direcUser = document.createElement("input");
            var celUser = document.createElement("input");
            var corrUser = document.createElement("input");


            idUser.innerHTML = mensaje.ID;
            idUser.setAttribute(id, "ID");
            document.getElementById("divIDEdU").appendChild(idUser);

            nombreUser.innerHTML = mensaje.Nombre;
            nombreUser.setAttribute(id, "nombre");
            nombreUser.classList.add("form__input");
            document.getElementById("divNomEdU").appendChild(nombreUser);

            direcUser.innerHTML = mensaje.Direccion;
            direcUser.setAttribute(id, "direccion");
            direcUser.classList.add("form__input");
            document.getElementById("divDirEdU").appendChild(direcUser);

            celUser.innerHTML = mensaje.Telefono;
            celUser.setAttribute(id, "celular");
            celUser.classList.add("form__input");
            document.getElementById("divCelEdU").appendChild(celUser);

            corrUser.innerHTML = mensaje.Correo;
            corrUser.setAttribute(id, "correo");
            celUser.classList.add("form__input");
            document.getElementById("divCorEdU").appendChild(corrUser);

        }

    }
}