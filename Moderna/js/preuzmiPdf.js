$(document).ready(function(){
    //alert("usao");
    function dohvatiTrenutniRecept(id){
        let recepti = JSON.parse(localStorage.getItem("recepti"));

        for(let i=0; i < recepti.length; i++){
            if( recepti[i]["id"] == id) return recepti[i];
        }
    }
    let trenutniRecept = JSON.parse(localStorage.getItem("trenutniRecept"));
    
    let recept = dohvatiTrenutniRecept(trenutniRecept);

    var pdf = new jsPDF();
    let text = recept["naziv"];
    text += "\n\n" + recept["postupak"];

    pdf.text(pdf.splitTextToSize(text, 200), 6, 16); 

    pdf.save("Recept - " + recept["naziv"]);

    window.location.href = "recept.html";
});