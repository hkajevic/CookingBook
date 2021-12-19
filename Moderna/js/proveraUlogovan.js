$(document).ready(function(){

    function proveraUlogovan(){
        let korisnici = JSON.parse(localStorage.getItem("korisnici"));

        let logedIn = false;
        for( let i=0; i < korisnici.length; i++){
            if( korisnici[i]["ulogovan"] == "da"){
                logedIn = true;
                break;
            }
        }
        if(!logedIn)
            window.location.href = "login.html";
    };
});