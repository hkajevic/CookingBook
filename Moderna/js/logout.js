$(document).ready(function(){

    $("#logout").on('click', function(){
        let korisnici = JSON.parse(localStorage.getItem("korisnici"));

        for( let i=0; i < korisnici.length; i++){
            if( korisnici[i]["ulogovan"] == "da"){
                korisnici[i]["ulogovan"] = "ne";
                //break;
            }
        }
        localStorage.setItem("korisnici", JSON.stringify(korisnici));
        window.location.href = "login.html";
    });
});