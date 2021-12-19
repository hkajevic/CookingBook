function dohvatiSveRecepte(){
    let recepti = localStorage.getItem("recepti");
    if(recepti ==  null){
        return null;
    }
    return JSON.parse(recepti);
    
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
function izbrisiKorisnike(){
    let korisnici = JSON.parse(localStorage.getItem("korisnici"));
    let noviKorisnici = [];
    for( let i=0; i < 2; i++){
        //if( (korisnici[i]["ime"] != "halil") && (korisnici[i]["ime"] != "anchi")){
            noviKorisnici.push(korisnici[i]);
        //}
    }
    localStorage.setItem("korisnici", JSON.stringify(noviKorisnici));
}

$(document).ready(function(){
    //izbrisiKorisnike();
    proveraUlogovan();

    let sviRecepti = dohvatiSveRecepte();

    $("#red-recepti").empty();

    let parovi = [];

    if(sviRecepti != null){
        for( let i=0; i < sviRecepti.length; i++){
            let par = {
                "id": parseInt(sviRecepti[i]["id"]),
                "ocena": izracunajProsecnuOcenu(sviRecepti[i]["id"]),
                "naziv": sviRecepti[i]["naziv"],
                "trajanje": sviRecepti[i]["trajanje"],
                "dodao": sviRecepti[i]["dodao"],
                "tezina": sviRecepti[i]["tezina"],
                "grupa": sviRecepti[i]["grupa"],
                "sastojci": sviRecepti[i]["sastojci"],
                "postupak": sviRecepti[i]["postupak"],
                "slike": sviRecepti[i]["slike"],
                "video": sviRecepti[i]["video"],
            }
            parovi.push(par);
        }
    }
    for(let i=0; i < parovi.length - 1; i++){
        for(let j=i + 1; j <parovi.length; j++){
            if( parovi[j]["ocena"] > parovi[i]["ocena"]){
                let temp = parovi[i];
                parovi[i] = parovi[j];
                parovi[j] = temp;
            }

        }
    }
    let edge = parovi.length;
    if(parovi.length > 3)edge = 3;
    if( sviRecepti != null ){
        for( let i=0; i < edge; i++){
            if(parovi[i]["naziv"] == "")continue;
            let glavniDiv = $("<div></div>").addClass("col-sm-12").addClass("entries");
            let artikl = $("<article></article>").addClass("entry");

            let divSlika = $("<div></div>").addClass("entry-img");
            let slika = $("<img>")
                        .attr("src","../slike/" +  parovi[i]["slike"][0]);
                        
                        
            slika.addClass("img-fluid");
            slika.attr("style", "max-height: 500px; width: 100%;");
            divSlika.append(slika);

            artikl.append(divSlika);

            let h2 = $("<h2></h2>").addClass("entry-title");
            //TODO
            let a1 = $("<a></a>").attr("href","#").attr("name", parovi[i]["id"]).addClass("receptLink");
            //let a1 = $("<a></a>").attr("href","recept.html");
            a1.append(parovi[i]["naziv"]);

            h2.append(a1);

            artikl.append(h2);
            //TODO  ovde da se obezbedi da kada se klikne da se lepo predje na novi recept

            let prosecnaOcena = parovi[i]["ocena"];

            let divMeta = $("<div></div>").addClass("entry-meta");
            let lista = $("<ul></ul>");
            let li1 = $("<li></li>").addClass("d-flex").addClass("align-items-center");
            let i1 = $("<i></i>").addClass("icofont-user");
            let a8 = $("<a></a>").attr("href","#");

            a8.append(parovi[i]["dodao"]);
            li1.append(i1);
            li1.append(a8);

            let li2 = $("<li></li>").addClass("d-flex").addClass("align-items-center");
            let i2 = $("<i></i>").addClass("icofont-book-mark");
            let a2 = $("<a></a>").attr("href","#");

            a2.append(prosecnaOcena);
            li2.append(i2);
            li2.append(a2);

            let li3 = $("<li></li>").addClass("d-flex").addClass("align-items-center");
            let i3 = $("<i></i>").addClass("icofont-spreadsheet");
            let a3 = $("<a></a>").attr("href","#");

            a3.append(parovi[i]["trajanje"] + " min");
            li3.append(i3);
            li3.append(a3);

            lista.append(li1).append(li2).append(li3);
            divMeta.append(lista);

            artikl.append(divMeta);

            let divContent = $("<div></div>").addClass("entry-content");
            let divDetaljnije = $("<div></div>").addClass("read-more");
            let a5 = $("<a></a>").attr("href", "#");
            //TODO
            a5.append("Detaljnije");

            divDetaljnije.append(a5);
            //divContent.append(divDetaljnije);

            artikl.append(divContent);

            glavniDiv.append(artikl);
            glavniDiv.show();

            $("#red-recepti-index").append(glavniDiv);
        }

    }
    else{
        let poruka = $("<h6></h6>").attr("style", "text-align: center;");
        poruka.append("Ne postoje dodati recepti jos uvek");
        $("#red-recepti-index").append(poruka);
    }
    $(".receptLink").on('click', function(){
        localStorage.setItem("trenutniRecept", $(this).attr("name"));   
        window.location.href = "recept.html";
    });



  //  });

});