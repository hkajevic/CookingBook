$(document).ready(function(){
    function dohvatiUlogovanogKorisnika(){
        let korisnici = JSON.parse(localStorage.getItem("korisnici"));
        for(let i=0; i < korisnici.length; i++){
            if(korisnici[i]["ulogovan"] == "da"){
                return korisnici[i];
            }
        }
    }
    function ukloniGreske(){
        $("#greska-misljenje").empty();
    }
    function dohvatiImeRecepta(idRecepta){
        let recepti = JSON.parse(localStorage.getItem("recepti"));
        for( let i=0; i < recepti.length; i++){
            if( recepti[i]["id"] == idRecepta){
                return recepti[i]["naziv"];
            }
        }

    }
    $("#ostavi-komentar").click(function(){
        ukloniGreske();
        let tekst = $("#tekst-komentar").val();
        let ocena = $("#ocena-komentar").val();

        if( tekst == "" || ocena == ""){
            $("#greska-misljenje").append("Unesite komentar i ocenu");
            return;
        }

        let ulogovanKorisnik = dohvatiUlogovanogKorisnika();
        let imeKorisnika = ulogovanKorisnik["korIme"];
        let punoIme = ulogovanKorisnik["ime"];
        let idRecepta = $("#id-recepta").attr("name");
        idRecepta = parseInt(idRecepta);
        let imeRecepta = dohvatiImeRecepta(idRecepta);

        //TODO ime recepta kako da dohvatim
        

        let misljenja = localStorage.getItem("misljenja");
        if( misljenja == null ){
            misljenja = [{}]
        }
        else misljenja = JSON.parse(misljenja);

        novoMisljenje = {
            "id": idRecepta,
            "imeRecepta": imeRecepta,
            "korisnik": imeKorisnika,
            "komentar": tekst,
            "ocena": ocena,
            "datum": new Date().toLocaleString()
        }

        misljenja.push(novoMisljenje);
        $("#greska-misljenje").append("Hvala vam na vasem misljenju!");

        localStorage.setItem("misljenja", JSON.stringify(misljenja));

       let div1 = $("<div></div>").addClass("be-comment");
       let div2 = $("<div></div>").addClass("be-img-comment");
       let a1 = $("<a></a>").attr("href", "blog-detail-2.html");
       let img1 = $("<img></img>").attr("src", "../slike/avatar1.png").addClass("be-ava-comment");

       a1.append(img1);
       div2.append(a1);
       div1.append(div2);

       let div3 = $("<div></div>").addClass("be-comment-content");
       let span1 = $("<span></span>").addClass("be-comment-name");
       let a2 = $("<a></a>").attr("href", "blog-detail-2.html");
       let span2 = $("<span></span>").addClass("be-comment-time");
       let i1 = $("<i></i>").addClass("fa").addClass("fa-clock-o");
       let p1 = $("<p></p>").addClass("be-comment-text");
       let p2 = $("<p></p>");
       p2.append("Ocena: " + ocena);

       a2.append(punoIme);
       i1.append(" " + new Date().toLocaleString());
       p1.append(tekst);
       span1.append(a2);
       span2.append(i1);

       div3.append(span1);
       div3.append(span2);
       div3.append(p1);
       div3.append(p2);

       div1.append(div3);

       $("#komentari-jedan-recept").prepend(div1);

    });

});
