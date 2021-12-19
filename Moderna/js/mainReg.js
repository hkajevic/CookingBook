
let nizKorisnika = [
    {
        ime : "", 
        email : "",
        korIme: "",
        lozinka : "",
        ulogovan : "ne",
        recepti : [],
        ocene : [],
        komentari : []
    }
]
function inicijalizuj(){
    let korisnici=localStorage.getItem("korisnici");
    if(korisnici!=null){
        nizKorisnika=JSON.parse(korisnici);
    }
    else{
        localStorage.setItem("korisnici",JSON.stringify(nizKorisnika));
    }
}
function proveriJedinstvenost(k){
    for(let i = 0; i < nizKorisnika.length; i++){
        if(k == nizKorisnika[i]["korIme"]){
            return false;
        }
    }
    return true;
}
function ispisi(){
    alert("kliknuo");
}

function predji(){
    alert("usao");
    $("#prelazak").trigger("click");
}
function postojiKorisnik(korIme, lozinka){
    //alert(korIme +"   "+lozinka);
    for(let i = 0; i < nizKorisnika.length; i++){
        if((korIme == nizKorisnika[i]["korIme"]) && (lozinka == nizKorisnika[i]["lozinka"])){
            //alert("nasao");
            return true;
        }
    }
    return false;
}
function dodajKorisnika(i, e, k, l){
    if( ! postojiKorisnik(k, l)){
        nizKorisnika.push(
            {
                ime : i,
                email : e,
                korIme : k,
                lozinka : l,
                ulogovan: "da",
                recepti : [],
                ocene : [],
                komentari : []
            }
        );
    }
    else{
        //postavim tog korisnika da je ulogovan
        for(let i=0; i < nizKorisnika.length; i++){
            if( nizKorisnika[i]["korIme"] == k ){
                nizKorisnika[i]["ulogovan"] = "da";
            }
        }
    }
    localStorage.setItem("korisnici",JSON.stringify(nizKorisnika));

    //localStorage.getItem("korisnici");
}
(function ($) {
    //"use strict";
    inicijalizuj();

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })


    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    var once = true;
    $('.validate-form').on('submit',function(){
        if(once){
            once=false;
        }
        else return false;
        
        var check = true;

        // if(($(input[0]).attr('id') == "korIme-login") && ($(input[1]).attr('id') == "lozinka-login")){
        //     if(postojiKorisnik($(input[0]).val(), $(input[1]).val()))return true;
        //     else return false;
        // }
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if( check ){
            let ime = $(input[0]).val();
            let email = $(input[1]).val();
            let korIme = $(input[2]).val();
            let lozinka = $(input[3]).val();
            if(! korIme )korIme = ime;
            if(! lozinka)lozinka = email;
            //alert("submit");
            dodajKorisnika(ime, email, korIme, lozinka);
            window.location.reload();
        }
        return check;

    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });
    var lozinka = "";
    var korIme = "";
    //var loginLozinka = "";
    var idd = 0;
    function validate (input) {
        if(idd == 1){
            idd=0;
            window.location.reload();
        }
        //alert($(input).attr('id'));
        let fieldId=$(input).attr('id');
        let fieldValue = $(input).val();
        switch (fieldId) {
            case "ime-reg":
                //alert(fieldValue.trim());
                return(/^\w+(\s+\w+)*$/.test(fieldValue));
            case "email-reg":
                return(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/.test(fieldValue));
            case "korIme-reg":
                return(/^[a-zA-Z]\w*$/.test(fieldValue) && proveriJedinstvenost(fieldValue));
            case "lozinka-reg":
                lozinka = fieldValue;
                //alert(lozinka);
                return (
                    /^.{6,}$/.test(fieldValue) &&
                    /[a-z]/.test(fieldValue) &&
                    /[A-Z]/.test(fieldValue) &&
                    /\d/.test(fieldValue)
                );
            case "potvrda-reg":
                return lozinka == fieldValue;
            case "korIme-login":
                korIme = fieldValue;
                return true;
            case "lozinka-login":
                let postoji = postojiKorisnik(korIme, fieldValue);
                if(!postoji){
                    //setTimeout(function(){}, 5000);
                    idd = 1;
                    // window.location.reload();
                }
                // korIme = "";
                // lozinka = "";
                return postoji;
            default:
                break;
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    


})(jQuery);