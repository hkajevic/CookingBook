$(document).ready(function(){
    $("#engleski").click(function(){
        let path = window.location.pathname;
        let elements = path.split(".");
        let parts = elements[0].split("/");
        let newPath = parts[parts.length - 1] + "_eng.html";
        window.location.href = newPath;
    });

});