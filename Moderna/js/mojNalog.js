function dohvatiUlogovanogKorisnika(){
    let korisnici = JSON.parse(localStorage.getItem("korisnici"));
    for(let i=0; i < korisnici.length; i++){
        if(korisnici[i]["ulogovan"] == "da"){
            return korisnici[i];
        }
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

    $("#red-moji-recepti").empty();

    //PRVO DODAJEM MOJE RECEPTE
    let korisnik = dohvatiUlogovanogKorisnika();
    let mojiRecepti = korisnik["recepti"];
    let korImeKorisnika = korisnik["korIme"];
    let korisnikIme = korisnik["ime"];

    if( mojiRecepti.length == 0 ){
        let par1 = $("<p></p>").attr("style", "text-align: center;");
        par1.append("Jos uvek niste uneli svoje recepte");
        $("#red-moji-recepti").append(par1);
    }
    else{
        for( let i=0; i < mojiRecepti.length; i++ ){
        
            let divKolona = $("<div></div>").addClass("col-md-6").addClass("d-flex").addClass("align-items-stretch").attr("data-aos", "fade-up");
            let divCard = $("<div></div>").addClass("card");
            let divCardImg = $("<div></div>").addClass("card-img").attr("style", "max-height: 250px;");

            let linkBrisanje = $("<a></a>").attr("id", mojiRecepti[i]["dodao"]).attr("name", mojiRecepti[i]["id"]).addClass("brisanje").attr("href", "#");
            let brisanje = $("<i></i>").addClass("fas").addClass("fa-trash");

            linkBrisanje.append(brisanje);
            
            let prvaSlika = mojiRecepti[i]["slike"][0];

            let putanja = "../slike/" + prvaSlika;

            let slika1 = $("<img>").attr("src", putanja);

            
            divCardImg.append(slika1);
            divCard.append(divCardImg);

            let divCardBody = $("<div></div>").addClass("card-body");
            let h5 = $("<h5></h5>").addClass("card-title");
            let a1 = $("<a></a>").attr("href", "#").attr("name", mojiRecepti[i]["id"]).addClass("receptLink");
            let p1 = $("<p></p>").addClass("card-text");

            p1.append(mojiRecepti[i]["postupak"]);
            a1.append(mojiRecepti[i]["naziv"]);
            h5.append(a1);

            divCardBody.append(linkBrisanje);
            divCardBody.append(h5).append(p1);

            divCard.append(divCardBody);

            divKolona.append(divCard);

            $("#red-moji-recepti").append(divKolona);
        }
    }
    
    //OVDE DODAJEM KOMENTARE KOJE SAM JA DAO
    $("komentari-nalog").empty();

    let svaMisljenja = localStorage.getItem("misljenja");
    if( svaMisljenja == null){
        let par = $("<p></p>").attr("style", "text-align:center;");
        par.append("Niste davali do sada komentare i ocene drugim korisnicima");
        $("#komentari-nalog").append(par);  
    }
    else{
        svaMisljenja = JSON.parse(svaMisljenja);
        let mojiKomentari = [];
        for( let i=0; i < svaMisljenja.length; i++){
            if(svaMisljenja[i]["korisnik"] == korImeKorisnika){
                mojiKomentari.push(svaMisljenja[i]);
            }
        }
        if(mojiKomentari.length == 0){
            $("#komentari-nalog").append("Niste davali do sada komentare i ocene drugim korisnicima"); 
        }
        else{
            for( let i=0; i < mojiKomentari.length; i++){
                let div1 = $("<div></div>").addClass("be-comment");
                let div2 = $("<div></div>").addClass("be-img-comment");
                let a1 = $("<a></a>").attr("href", "blog-detail-2.html");
                let img1 = $("<img></img>").attr("src", "../slike/avatar1.png").addClass("be-ava-comment");
        
                a1.append(img1);
                div2.append(a1);
                div1.append(div2);
        
                let div3 = $("<div></div>").addClass("be-comment-content");
                let span1 = $("<span></span>").addClass("be-comment-name");
                let a2 = $("<a></a>").attr("href", "blog-detail-2.html").attr("style", "font-size: 25px; color: #088F8F;");
                let span2 = $("<span></span>").addClass("be-comment-time");
                let i1 = $("<i></i>").addClass("fa").addClass("fa-clock-o");
                let p1 = $("<p></p>").addClass("be-comment-text");
                let p2 = $("<p></p>");
                p2.append("Ocena: " + mojiKomentari[i]["ocena"]);
        
                a2.append(mojiKomentari[i]["imeRecepta"]);
                i1.append(mojiKomentari[i]["datum"]);
                p1.append(mojiKomentari[i]["komentar"]);
                span1.append(a2);
                span2.append(i1);
        
                div3.append(span1);
                div3.append(span2);
                div3.append(p1);
                div3.append(p2);
        
                div1.append(div3);
        
                $("#komentari-nalog").append(div1);
            }
        }
    }
    $(".receptLink").on('click', function(){
        localStorage.setItem("trenutniRecept", $(this).attr("name"));   
        window.location.href = "recept.html";
    });
    $(".brisanje").on('click', function(){
        let recept = $(this).attr("name");
        let dodao = $(this).attr("id");
        let receptId = parseInt(recept);

        let korisnici = JSON.parse(localStorage.getItem("korisnici"));

        for( let i=0; i < korisnici.length; i++){
            if( korisnici[i]["korIme"] == dodao){
                let noviRecepti1 = [];
                let korisnikRecepti = korisnici[i]["recepti"];

                for(let i=0; i < korisnikRecepti.length; i++){
                    if( korisnikRecepti[i]["id"] != receptId){
                        noviRecepti1.push(korisnikRecepti[i]);
                    }
                }
                korisnici[i]["recepti"] = noviRecepti1;
            }
        }
        localStorage.setItem("korisnici", JSON.stringify(korisnici));

        let recepti = JSON.parse(localStorage.getItem("recepti"));
        let noviRecepti = [];

        for(let i=0; i < recepti.length; i++){
            if( recepti[i]["id"] != receptId){
                noviRecepti.push(recepti[i]);
            }
        }
        localStorage.setItem("recepti", JSON.stringify(noviRecepti));
        let misljenja = localStorage.getItem("misljenja");
        if( misljenja != null){
            misljenja = JSON.parse(misljenja);
            let novaMisljenja = [];
            for( let i=0; i < misljenja.length; i++){
                if( misljenja[i]["id"] != receptId){
                    novaMisljenja.push(misljenja[i]);
                }
            }
            localStorage.setItem("misljenja", JSON.stringify(novaMisljenja));
        }
        window.location.href = "moj_nalog.html";
    });
});