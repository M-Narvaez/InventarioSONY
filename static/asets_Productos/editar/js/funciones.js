function valideKey(evt){   
    var code = (evt.which) ? evt.which : evt.keyCode;
    
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { 
      return true;
    } else{
      return false;
    }
}

function validarProducto() {
    var idInput = document.formEditarProd.idEdit;
    var nombreInput = document.formEditarProd.nombreEdit;
    var descripcionInput = document.formEditarProd.descripcionEdit;
    var proveedorInput = document.formEditarProd.proveedorEdit;
    var bodegaInput = document.formEditarProd.bodegaEdit;
    var minimaInput = document.formEditarProd.minimaEdit;
    var swErrores = false;

    if(idInput.value.length == 0 || nombreInput.value.length == 0 || descripcionInput.value.length == 0 
        ||  bodegaInput.value.length == 0 || minimaInput.value.length == 0   ){
        document.getElementById("errorForm").innerHTML="Los campos con (*) son obligatorios";
    }
   
    if(idInput.value.length == 0 || idInput.value.length < 5)
    {
        document.getElementById("errorId").innerHTML=" *";
        idInput.focus(); 
        swErrores=true;
    }else if(idInput.value.length > 5){
        document.getElementById("errorId").innerHTML=" ";
    }

    if(nombreInput.value.length == 0 || nombreInput.value.length < 5)
    {   
        document.getElementById("errorNombre").innerHTML=" *";
        nombreInput.focus(); 
        swErrores=true;
    }else if(nombreInput.value.length > 5){
        document.getElementById("errorNombre").innerHTML=" ";
    }

    if(descripcionInput.value.length == 0 || descripcionInput.value.length < 5)
    {
        document.getElementById("errorDescripcion").innerHTML=" *";
        descripcionInput.focus(); 
        swErrores=true;
    }else if(descripcionInput.value.length > 5){
        document.getElementById("errorDescripcion").innerHTML=" ";
    }
    
    if(bodegaInput.value.length == 0 )
    {   
        document.getElementById("errorBodega").innerHTML=" *";
        bodegaInput.focus(); 
        swErrores=true;
    }else {
        document.getElementById("errorBodega").innerHTML=" ";
    }

    if(minimaInput.value.length == 0 )
    {
        document.getElementById("errorMinima").innerHTML=" *";
        minimaInput.focus(); 
        swErrores=true;
    }else {
        document.getElementById("errorMinima").innerHTML=" ";
    }

    if (swErrores == true) {
        return false;
    }
    else {
        return true;
    }
}