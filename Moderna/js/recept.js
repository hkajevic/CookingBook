function dohvatiSveDeserte(){
    let recepti = localStorage.getItem("recepti");
    if(recepti ==  null){
        return null;
    }
    recepti = JSON.parse(recepti);
    let deserti = [];
    for( let i=0; i < recepti.length; i++){
        if(recepti[i]["grupa"] == "desert"){
            deserti.push(recepti[i]);
        }
    }
    if( deserti.length == 0){
        return null;
    }
    else return deserti;
}
function izracunajProsecnuOcenu(id){
    //misljenja
    let misljenja = localStorage.getItem("misljenja");
    if( misljenja == null){
        return 0;
    }
    misljenja = JSON.parse(misljenja);

    let sumaOcena = 0;
    let brojOcena = 0;

    for(let i=0; i < misljenja.length; i++){
        if( misljenja[i]["id"] == id){
            sumaOcena += parseInt(misljenja[i]["ocena"]);
            brojOcena++;
        }
    }
    if(brojOcena == 0){
        return 0;
    }
    return sumaOcena / brojOcena;
}
function dohvatiRecept(receptId){
    let recepti = localStorage.getItem("recepti");
    if(recepti ==  null){
        return null;
    }
    recepti = JSON.parse(recepti);
    let recept = parseInt(receptId);
    for( let i=0; i < recepti.length; i++){
        if(recepti[i]["id"] == recept){
            return recepti[i];
        }
    }
    return null;
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
    $("#videoV").ready(function(){
        $("#videoV").trigger('load');
    });
    //alert($(this).val());

    //$(".receptLink").on('click', function(){
        let receptId = parseInt(JSON.parse(localStorage.getItem("trenutniRecept")));
        $("#prvi-deo-recept").empty();
        $("#drugi-deo-recept").empty();
        $("#komentari-jedan-recept").empty();

        let recept = dohvatiRecept(receptId);
        $("#src1").attr("src", "../slike/" + recept["video"]);
        // $("#src2").attr("src", "../slike/" + recept["video"]);

        let grupaJela = recept["grupa"];
        let linkGrupa = "deserti.html";
        let nazivGrupa = "Deserti";
        if( grupaJela == "glavno jelo" ) {linkGrupa = "glavnaJela.html"; nazivGrupa = "Glavna jela";}
        else if( grupaJela == "predjelo" ) {linkGrupa = "predjela.html"; nazivGrupa = "Predjela";}
        else if( grupaJela == "uzina" ) {linkGrupa = "uzine.html"; nazivGrupa = "Uzine";}

        $("#tip-jela").attr("href", linkGrupa).append(nazivGrupa);
        $("#bread-ime-recepta").append(recept["naziv"]);

        $("#naziv-recepta").append(recept["naziv"]).attr("style", "font-weight: bold");

       //PRVI DEO - SLIDE SHOW
       //=====================================================================================================================

        for( let i=0; i < recept["slike"].length; i++){
            let slika = $("<img>").addClass("mySlides").attr("src", "../slike/" + recept["slike"][i]).attr("style", "width:100%; max-height: 500px");
            let num = i + 1;
            let span = $("<span></span>").addClass("w3-badge").addClass("demo").addClass("w3-border").addClass("w3-transparent").addClass("w3-hover-white").attr("onclick", "currentDiv(" + num + ")");
            $("#slideShow").append(slika);
            $("#prikaz").append(span);
          }
          showDivs(1);
        $("#gornji").append(slideShow);
       
       let divPortfolioInfo = $("<div></div>").addClass("portfolio-info");
       let h31 = $("<h3></h3>").append("Opste informacije");

       let ul1 = $("<ul></ul>");

       let li1 = $("<li></li>");
       let strong1 = $("<strong></strong>").append("Trajanje pripreme: ");
       li1.append(strong1)
       li1.append(recept["trajanje"] + " min");

       let li2 = $("<li></li>");
       let strong2 = $("<strong></strong>").append("Tezina pripreme: ");
       li2.append(strong2);
       li2.append(recept["tezina"]);

       let li3 = $("<li></li>");
       let strong3 = $("<strong></strong>").append("Prosecna ocena: ");
       li3.append(strong3);
       li3.append(izracunajProsecnuOcenu(receptId));

       let li4 = $("<li></li>");
       let strong4 = $("<strong></strong>").append("PDF format: ");
       li4.append(strong4);
       let linkPDF = $("<a></a>").attr("href", "preuzmiPdf.html").attr("id", "pdf");
       let dugme = $("<button></button>").attr("type", "button");
       dugme.append("Preuzmi");
       linkPDF.append(dugme);
       li4.append(linkPDF);

       ul1.append(li1);
       ul1.append(li2);
       ul1.append(li3);
       ul1.append(li4);

       divPortfolioInfo.append(h31);
       divPortfolioInfo.append(ul1);

       $("#gornji").append(divPortfolioInfo);

       //DRUGI DEO - SASTOJCI I POSTUPAK PRIPREME
       //=====================================================================================================================

       let h21 = $("<h2></h2>").append("Uputstvo za pripremu");
       let b1 = $("<p></p>").append("Sastojci:");
       let p1 = $("<p></p>").append(b1);

       let ul2 = $("<ul></ul>");
       for( let i=0; i < recept["sastojci"].length; i++){
           let lix = $("<li></li>").append(recept["sastojci"][i]);
           ul2.append(lix);
       }
       let b2 = $("<p></p>").append("Priprema:");
       let p2 = $("<p></p>").append(b2);

       let p3 = $("<p></p>").append(recept["postupak"]).addClass("max-lines");
       let p10 =$("<p></p>").attr("type", "hidden").attr("id","id-recepta").attr("name", receptId);

       $("#drugi-deo-recept").append(h21).append(p1).append(ul2).append(p2).append(p3).append(p10);
       $("#drugi-deo-recept");

       //TRECI DEO - KOMENTARI
       //=====================================================================================================================
       let receptKomentari = [];
       let svaMisljenja = localStorage.getItem("misljenja");
       if( svaMisljenja == null ){
            return;
       }
       svaMisljenja = JSON.parse(svaMisljenja);
       for( let i=0; i < svaMisljenja.length; i++){
           if(parseInt(svaMisljenja[i]["id"]) == receptId){
               receptKomentari.push(svaMisljenja[i]);
           }
       }
       if(receptKomentari.length == 0){
            return;
        }
        else{
            for( let i=receptKomentari.length - 1; i >= 0; i-- ){
                let div5 = $("<div></div>").addClass("be-comment");
                let div6 = $("<div></div>").addClass("be-img-comment");
                let a1 = $("<a></a>").attr("href", "blog-detail-2.html");
                let img1 = $("<img></img>").attr("src", "../slike/avatar1.png").addClass("be-ava-comment");
        
                a1.append(img1);
                div6.append(a1);
                div5.append(div6);
        
                let div3 = $("<div></div>").addClass("be-comment-content");
                let span1 = $("<span></span>").addClass("be-comment-name");
                let a2 = $("<a></a>").attr("href", "blog-detail-2.html");
                let span2 = $("<span></span>").addClass("be-comment-time");
                let i1 = $("<i></i>").addClass("fa").addClass("fa-clock-o");
                let p7 = $("<p></p>").addClass("be-comment-text");
                let p8 = $("<p></p>");
                p8.append("Ocena: " + receptKomentari[i]["ocena"]);
        
                a2.append(receptKomentari[i]["korisnik"]);
                i1.append(receptKomentari[i]["datum"]);
                p7.append(receptKomentari[i]["komentar"]);
                span1.append(a2);
                span2.append(i1);
        
                div3.append(span1);
                div3.append(span2);
                div3.append(p7);
                div3.append(p8);
        
                div5.append(div3);
        
                $("#komentari-jedan-recept").prepend(div5);
            }
        }
        $("#pdf").on('click',function(){
            let receptId = parseInt(JSON.parse(localStorage.getItem("trenutniRecept")));
            let recept = dohvatiRecept(receptId);

            var pdf = new jsPDF();
            let text = recept["naziv"];
            text += "\n\n" + recept["postupak"];

            pdf.text(doc.splitTextToSize(text, 200), 6, 16); 

            pdf.save("Recept - " + recept["naziv"]);
        });

});

