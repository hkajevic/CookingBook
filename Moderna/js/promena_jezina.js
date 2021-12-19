$(document).ready(function(){
    $("#srpski").click(function(){

        let path = window.location.pathname;
        let elements = path.split("_");
        if( elements[0] == "/Moderna/moj" )elements[0] = "/Moderna/moj_nalog";
        let parts = elements[0].split("/");
        let newPath = parts[parts.length - 1] + ".html";
        window.location.href = newPath;

    });
});