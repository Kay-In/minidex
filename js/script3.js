$("#check").on("click", function check() {
    if ($("#pokesearch").val() < 1 || $("#pokesearch").val() > 893) {
        $(".alert").html("Aucun pokemon ne corrsepond a ce nom ou a ce numéro");
        //étape inutile au chargement de la page,mais permet d'enchainer les recherches
        $("#poketitre").html("");
        $("#pokecapture").html("");
        $("#pokefamille").html("");
        $("#pokefamille").html("");
        $("#pokedesc").html("");
        $("#pokedesc").append("");
        $("#pokeimg").css({
            "border": "transparent"
        });
        $("#pokeimg")
            .attr("src", "")
            .hide();

    } else {
        $.ajax({
            // appel du json en fonction de ce qui est rentré en valeur
            url: "https://pokeapi.co/api/v2/pokemon-species/" + $("#pokesearch").val() + "/",
            type: "get",
            datatype: "json",
            success: function(pokemon) {
                console.log(pokemon);
                // console.log(pokemon.names[4].name);
                // filtre fr sur les différentes entrées language de l'objet renvoye
                pokenom = pokemon.names.filter(item => item.language.name.includes("fr"));
                // console.log(pokenom);
                nom = "#" + pokemon.id + " " + pokenom[0].name;
                capture = "Taux de Capture: " + pokemon.capture_rate + "%";
                //idem mais pour la famille
                var pokefamille = pokemon.genera.filter(item => item.language.name.includes("fr"));
                famille = "Famille: " + pokefamille[0].genus + ".";
                //idem pour les description du pokedex
                var pokedesc = pokemon.flavor_text_entries.filter(item => item.language.name.includes("fr"));


                if (pokedesc.length === 1) {
                    var description = pokedesc[0].flavor_text;
                    var description2 = "";
                } else {
                    var description = pokedesc[0].flavor_text;
                    var description2 = pokedesc[1].flavor_text;
                    // Tant que les textes de description sont les mêmes, on passe au suivant 
                    // et on l'affiche ... !!!
                    var i = 0;
                    while (i < pokedesc.length) {
                        if (description === description2) {
                            description2 = pokedesc[i + 1].flavor_text;
                        }
                        i = i + 1;
                    }
                }
                //remplissage du html avec les valeurs attribuées plus haut
                // console.log(description);
                // console.log(description2);
                $("#poketitre").html(nom);
                $("#pokecapture").html(capture);
                $("#pokefamille").html(famille);
                $("#pokefamille").html(famille);
                $("#pokedesc").html(description);
                $("#pokedesc").append("<p>" + description2 + "</p>");
                color = pokemon.color.name;
                // console.log(color);
                $("#pokeimg").css({
                    "border": "5px solid " + color
                });
                //on efface le message d'alerte si multi recherche
                $(".alert").html("");
                //reactivation de l'image et attribution de l'id de la valeur rentreé
                $("#pokeimg").show();
                $("#pokeimg").attr("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png")

                ///travailler sur la bordure;l'image et faire le filtre sur function filter(french)=§.§.languages=="fr"
            },

            Error: function() {
                console.log("error")
            },
        });
    };
});

//filtre
// var pokename = pokemon.flavor_text_entries.filter(item => item.languages.name.includes("fr"));
//                 pokename = pokename[0].name;
//                 console.log(pokename);
//var pokename=data_genera.filter(ItemS=>item.languages.name.includes("fr"));

//border
//