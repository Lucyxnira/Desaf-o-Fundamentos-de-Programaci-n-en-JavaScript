var myChart;

$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
            const searchTerm = $("#superhero").val().trim();
              if (!searchTerm.match(/^\d+$/)) {
                alert("Por favor, ingresa solo números.");
                return;
              }
              
            const apiKey = "10233328160331856";
            const heroId = searchTerm;
            const apiUrl = `https://superheroapi.com/api.php/${apiKey}/${heroId}`;

            searchSuperhero(apiUrl);
});

    // Pedir a la API
    function searchSuperhero(apiUrl){
        $.ajax({
            type:"GET",
            url: apiUrl,
            dataType:"json",
            success:function(response){
                generarinfoheroe(response);
                
                updateGraficoTorta(response.powerstats);
            },
             // Si hay un error en la petición
            error:function(){
                alert("Error al buscar el superhéroe");
            }
        });
    }
    // Cards
    function generarinfoheroe(superHero){
        const cardSuperHero = `
        <div class="card" style="width: 20rem;">
            <div class="row no gutters">
                <div class="col-md-15">
                    <img src="${superHero.image.url}" class="card-img" alt="${superHero.name}">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                    <h5 class="card-title">${superHero.name}</h5>
                    <hr></hr>
                    <p class="card-text">ID: ${superHero.id}</p>
                    <hr></hr>
                    <p class="card-text">Lugar de nacimiento: ${superHero.biography["place-of-birth"]}</p>
                    <hr></hr>
                    <p class="card-text">Altura: ${superHero.appearance.height}</p>
                    <hr></hr>
                    <p class="card-text">Ocupación: ${superHero.work.occupation}</p>
                </div>
          </div>
        </div>
        `;
            $("#cardsSuperHero").html(cardSuperHero);
        }
    // Gráfico
    function generarGraficoTorta(powerstats){
        const labels = Object.keys(powerstats);
        const data = Object.values(powerstats);

        const ctx = document.getElementById('powerstats-chart').getContext('2d');
        myChart = new Chart(ctx,{
            type: "pie",
            data:{
                labels: labels,
                datasets:[{
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderWidth: 1
                }]
            },
            options:{
                responsive:true,
                mainainAspectRatio: false,
                title:{
                    display:true,
                    text: 'Powerstats'
                }       
            }
        });
    }
    //Revisa si existe gráfico y crea nuevo al cambiar de superheroe
    function updateGraficoTorta(powerstats){
        if(myChart){
            myChart.destroy();
        }
        generarGraficoTorta(powerstats);
    }
});




                    
            

                    

        