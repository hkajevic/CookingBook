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
function proveriJedinstvenost(k){
    for(let i = 0; i < nizKorisnika.length; i++){
        if(k == nizKorisnika[i]["korisnickoIme"]){
            return false;
        }
    }
    return true;
}
function dodajKorisnika(i, e, k, l){
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
    if(!proveriJedinstvenost(korisnickoIme)){
        document.getElementById("korisnickoImeGreska").innerHTML="Korisnicko ime nije jedinstveno";
    }
    localStorage.setItem("korisnici",JSON.stringify(nizKorisnika));

    //localStorage.getItem("korisnici");
}
function inicijalizuj(){
    let korisnici=localStorage.getItem("korisnici");
    if(korisnici!=null){
        nizKorisnika=JSON.parse(korisnici);
    }
    else{
        localStorage.setItem("korisnici",JSON.stringify(nizKorisnika));
    }
}
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

$(document).ready(function(){
    proveraUlogovan();

    $("#dodaj-sastojak").on('click',function(){
        //alert("pritisnuo");
        let field = $("<input></input>").attr("type", "text").attr("placeholder", "Sastojak").attr("class", "input100").addClass("svi-sastojci").show();
        $("#sastojci").append(field);

    });
    $("#dodaj-recept").on('click',function(){
        //alert("pritisnuo");
        let naziv = $("#naziv-dodavanje").val();
        let trajanje = $("#trajanje-dodavanje").val();
        let tezina = $("#tezina-dodavanje").val();
        let postupak = $("#postupak-dodavanje").val();

        //let sastojci = $("svi-sastojci").val();
        var sastojci = [];
        $(".svi-sastojci").each(function() {
            //console.log($(this).html());
            sastojci.push($(this).val());
        }); 
        let glavno = $("#glavno-jelo-dodavanje").is(":checked"); 
        let desert = $("#desert-dodavanje").is(":checked");  
        let uzina = $("#uzina-dodavanje").is(":checked");  

        let slike = [];
        var totalfiles = document.getElementById('slika-dodavanje').files.length;
        for (var index = 0; index < totalfiles; index++) {
           slike.push(document.getElementById('slika-dodavanje').files[index]["name"]);
        }

        let video = $("#video-dodavanje").val();
        let videoDelovi = video.split("\\");
        let videoPutanja = videoDelovi[2];


        let grupa = "predjelo";
        if( glavno )grupa = "glavno jelo";
        else if( desert )grupa = "desert";
        else if( uzina )grupa = "uzina";

        let korisnici = JSON.parse(localStorage.getItem("korisnici")); 
        
        let i=0;
        let korisnik;
        for(;i < korisnici.length;i++){
            korisnik = korisnici[i];
            if(korisnik["ulogovan"] == "da")break;
        }
        let recept = {
            "naziv": naziv,
            "dodao": korisnik["korIme"],
            "trajanje": trajanje,
            "tezina": tezina,
            "grupa": grupa,
            "sastojci": sastojci,
            "postupak": postupak,
            "slike": slike,
            "video": videoPutanja,
            "id": Math.floor(Math.random() * 100000)
        };
        let recepti = localStorage.getItem("recepti");
        if( recepti == null ){
            recepti = [
                {
                    "naziv": "",
                    "trajanje": "",
                    "tezina": "",
                    "grupa": "",
                    "sastojci": [],
                    "postupak": "",
                    "slike": [],
                    "video": "",
                    "id": ""   
                }
            ];
        }
        else recepti = JSON.parse(recepti);
        recepti.push(recept);

        localStorage.setItem("recepti", JSON.stringify(recepti));

        korisnici.splice(i,1);
        korisnik["recepti"].push(recept);
        korisnici.push(korisnik);

        localStorage.setItem("korisnici", JSON.stringify(korisnici));

        //window.location.href = "index.html";
    });

});