//
// variables globales
//
var validation  = document.getElementById("validation");
var ajout       = document.getElementById("ajout");
var errors      = document.getElementsByClassName("error");
var articles = new Array();

//
// validation des champs d'inscription
//
validation.onclick = function(event) {
    var info_inputs = {
        nom              : document.getElementById("nom"),
        error_nom        : document.querySelector("#nom + .error"),
        prenom           : document.getElementById("prenom"),
        error_prenom     : document.querySelector("#prenom + .error"),
        adresse          : document.getElementById("adresse"),
        error_adresse    : document.querySelector("#adresse + .error"),
        cpladresse       : document.getElementById("cpladresse"),
        error_cpladresse : document.querySelector("#cpladresse + .error"),
        cp               : document.getElementById("cp"),
        error_cp         : document.querySelector("#cp + .error"),
        ville            : document.getElementById("ville"),
        error_ville      : document.querySelector("#ville + .error"),
        datenais         : document.getElementById("datenais"),
        phone            : document.getElementById("phone"),
        error_phone      : document.querySelector("#phone + .error"),
        mail             : document.getElementById("mail"),
        error_mail       : document.querySelector("#mail + .error") //,
    };
    var flagerror = 0;
    event.preventDefault();
    for (var error of errors ) {
        error.innerText = "";
    }
    if( info_inputs.nom.value.length < 1 ) {
        info_inputs.error_nom.innerText += "Le nom ne peut pas être vide";
        flagerror = 1;
    }
    if( info_inputs.nom.value.search(/\d/) != -1 ) { //expression rationnelle
        info_inputs.error_nom.innerText += "Il n y a pas de chiffre dans le nom";
        flagerror = 1;
    }
    if( info_inputs.prenom.value.length < 1 ) {
        info_inputs.error_prenom.innerText += "Le prénom ne peut pas être vide";
        flagerror = 1;
    }
    if( info_inputs.prenom.value.search(/\d/) != -1 ) { //expression rationnelle
        info_inputs.error_prenom.innerText += "Il n y a pas de chiffre dans le prenom";
        flagerror = 1;
    }
    if( info_inputs.adresse.value.length < 1 ) { //adresse
        info_inputs.error_adresse.innerText += "L'adresse ne peut pas être vide";
        flagerror = 1;
    }
    if( info_inputs.cp.value.length != 5 ) { //code postal
        info_inputs.error_cp.innerText = "code postal erroné !";
        flagerror = 1;
    }
    if( !Number.isInteger ( parseFloat( info_inputs.cp.value ) ) //code postal
        || parseFloat( info_inputs.cp.value ) < 0
    ){
        info_inputs.error_cp.innerText = "code postal erroné !"; // code postal
        flagerror = 1;
        }
    if( info_inputs.ville.value.length < 1 ) { // ville
        info_inputs.error_ville.innerText += "La ville doit être renseignée";
        flagerror = 1;
    }
    if( info_inputs.ville.value.search(/\d/) != -1 ) { // ville
        info_inputs.error_ville.innerText += "Il n y a pas de chiffre dans le nom d'une ville";
        flagerror = 1;
    }
    if( info_inputs.phone.value.length < 1 ) { // Téléphone
        info_inputs.error_phone.innerText += "Le numéro de téléphone doit être renseigné";
        flagerror = 1;
    }
    if( info_inputs.mail.value.length < 1 ) { // mail
        info_inputs.error_mail.innerText += "L'adresse mail doit être renseignée";
        flagerror = 1;
    }
    if (flagerror == 0) {
        var profil = {
            fnom        : document.getElementById("nom").value,
            fprenom     : document.getElementById("prenom").value,
            fadresse    : document.getElementById("adresse").value,
            fcpladresse : document.getElementById("cpladresse").value,
            fcp         : document.getElementById("cp").value,
            fville      : document.getElementById("ville").value,
            fdatenais   : document.getElementById("datenais").value,
            fphone      : document.getElementById("phone").value,
            fmail       : document.getElementById("mail").value
        };
        var string_profil = JSON.stringify(profil);
        localStorage.setItem("inscrit", string_profil);
    } else {
        setTimeout(function(){},2000); // attendre 2 secondes
    }

};
//
// validation des champs de publication d'article
//
ajout.onclick = function(event) {
    var info_inputs = {
        titre            : document.getElementById("titre"),
        error_titre      : document.querySelector("#titre + .error"),
        contenu          : document.getElementById("contenu"),
        error_contenu    : document.querySelector("#contenu + .error")
    };
    var flagerror = 0;
    event.preventDefault();
    for (var error of errors ) {
        error.innerText = "";
    }

    if( info_inputs.titre.value.length < 1 ) {
        info_inputs.error_titre.innerText += "Le titre ne peut pas être vide";
        flagerror = 1;
    }
    if( info_inputs.contenu.value.length < 1 ) {
        info_inputs.error_contenu.innerText += "Le contenu ne peut pas être vide";
        flagerror = 1;
    }
    if (flagerror == 0) {
        var article = {
            ftitre   : document.getElementById("titre").value,
            fcontenu : document.getElementById("contenu").value
        };        
        articles.push(article);
        var string_articles = JSON.stringify(articles);
        localStorage.setItem("articles", string_articles);
        loadarticles(articles);
    } else {
        setTimeout(function(){},2000); // attendre 2 secondes
    }
};
//
// choix du menu
//
var $inscription = $("#inscription");
var $publication = $("#publication");

inscrire.onclick = function() {
    $publication.hide();
    $inscription.show();
    var retrieved_profil = localStorage.getItem("inscrit");  
    var profil = JSON.parse( retrieved_profil );
    if (profil != null) {
        loadprofil(profil);
    }
};

publier.onclick = function() {
    $inscription.hide();
    $publication.show();
    var retrieved_profil = localStorage.getItem("inscrit");  
    var profil = JSON.parse( retrieved_profil );
    if (profil != null) {
        loadprofil(profil);
    }
    var retrieved_articles = localStorage.getItem("articles");
    articles = JSON.parse( retrieved_articles );
    if (articles.length > 0) {
        loadarticles(articles);
    }
};

// Chargement des données du local storage dans les zones écrans
function loadprofil(profil) {
    document.getElementById("nom").value = profil.fnom;
    document.getElementById("prenom").value = profil.fprenom;
    document.getElementById("adresse").value = profil.fadresse;
    document.getElementById("cpladresse").value = profil.fcpladresse;
    document.getElementById("cp").value = profil.fcp;
    document.getElementById("ville").value =  profil.fville; 
    document.getElementById("datenais").value = profil.fdatenais;
    document.getElementById("phone").value = profil.fphone;
    document.getElementById("mail").value = profil.fmail;
    document.getElementById("auteur").innerText = profil.fprenom + " " + profil.fnom;
};

// Chargement des données du local storage dans les zones écrans

function loadarticles(articles) {
    var $containerarticles = $("#containerarticles");    
    $containerarticles.html("");
        for (var i=0; i < articles.length ; i++) {
            var elements = "<div class='carre'>";
                    elements += "<div class='title'>" + articles[i].ftitre + "</div>";
                    elements += "<div class='texte'>" + articles[i].fcontenu + "</div>";
                elements += "</div>";     
            var $elements = $( elements );
            $containerarticles.append( $elements );
        }

};



