function dohvatiSveUzine(){
    let recepti = localStorage.getItem("recepti");
    if(recepti ==  null){
        return null;
    }
    recepti = JSON.parse(recepti);
    let uzine = [];
    for( let i=0; i < recepti.length; i++){
        if(recepti[i]["grupa"] == "uzina"){
            uzine.push(recepti[i]);
        }
    }
    if( uzine.length == 0){
        return null;
    }
    else return uzine;
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

$(document).ready(function(){
    proveraUlogovan();

    let sveUzine = dohvatiSveUzine();

    $("#red-uzine").empty();

    if( sveUzine != null ){
        for( let i=0; i < sveUzine.length; i++){
            let glavniDiv = $("<div></div>").addClass("col-sm-6").addClass("entries");
            let artikl = $("<article></article>").addClass("entry");

            let divSlika = $("<div></div>").addClass("entry-img").attr("style", "max-height: 250px");
            let slika = $("<img>").attr("src","../slike/" +  sveUzine[i]["slike"][0]).addClass("img-fluid");
            divSlika.append(slika);

            artikl.append(divSlika);

            let h2 = $("<h2></h2>").addClass("entry-title");
            let a1 = $("<a></a>").attr("href","recept.html").attr("name", sveUzine[i]["id"]).addClass("receptLink");
            a1.append(sveUzine[i]["naziv"]);

            h2.append(a1);

            artikl.append(h2);
            //TODO  ovde da se obezbedi da kada se klikne da se lepo predje na novi recept

            let prosecnaOcena = izracunajProsecnuOcenu(sveUzine[i]["id"]);

            let divMeta = $("<div></div>").addClass("entry-meta");
            let lista = $("<ul></ul>");
            let li1 = $("<li></li>").addClass("d-flex").addClass("align-items-center");
            let i1 = $("<i></i>").addClass("icofont-user");
            let a8 = $("<a></a>").attr("href","#");

            a8.append(sveUzine[i]["dodao"]);
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

            a3.append(sveUzine[i]["trajanje"] + "min");
            li3.append(i3);
            li3.append(a3);

            let li4 = $("<li></li>").addClass("d-flex").addClass("align-items-center");
            let i4 = $("<i></i>").addClass("icofont-hammer");
            let a9 = $("<a></a>").attr("href","#");

            a9.append(sveUzine[i]["tezina"]);
            li4.append(i4);
            li4.append(a9);

            lista.append(li1).append(li2).append(li3).append(li4);
            divMeta.append(lista);

            artikl.append(divMeta);

            let divContent = $("<div></div>").addClass("entry-content");
            let divDetaljnije = $("<div></div>").addClass("read-more");
            let a4 = $("<a></a>").attr("href", "#");
            //TODO
            a4.append("Detaljnije");

            divDetaljnije.append(a4);
            //divContent.append(divDetaljnije);

            artikl.append(divContent);

            glavniDiv.append(artikl);

            $("#red-uzine").append(glavniDiv);
        }

    }
    else{
        let poruka = $("<h6></h6>").attr("style", "text-align: center;");
        poruka.append("Ne postoje dodate uzine jos uvek");
        $("#red-uzine").append(poruka);
    }
    $(".receptLink").on('click', function(){
        localStorage.setItem("trenutniRecept", $(this).attr("name"));   
        window.location.href = "recept.html";
    });

    $("#sortiranje").click(function(){
        let poTezini = $('input[id="tezina-sort"]:checked').val();

        let kriterijum = 0;
        if( poTezini == "on" ) kriterijum = 1;

        let recepti = localStorage.getItem("recepti");
        if( recepti == null) return;
        recepti = JSON.parse(recepti);

        for( let i=0; i < recepti.length - 1; i++){
            for( let j=i + 1; j < recepti.length; j++){
                let temp = null;
                if( kriterijum == 0){
                    let ocena1 = izracunajProsecnuOcenu(recepti[i]["id"]);
                    let ocena2 = izracunajProsecnuOcenu(recepti[j]["id"]);

                    if( ocena2 > ocena1){
                        temp = recepti[i];
                        recepti[i] = recepti[j];
                        recepti[j] = temp; 
                    }

                }
                else{
                    let tezina1 = parseInt(recepti[i]["tezina"]);
                    let tezina2 = parseInt(recepti[j]["tezina"]);

                    if( tezina2 < tezina1 ){
                        temp = recepti[i];
                        recepti[i] = recepti[j];
                        recepti[j] = temp;
                    }
                }
                
            }
        }
        localStorage.setItem("recepti", JSON.stringify(recepti));
        window.location.reload();

    });

});