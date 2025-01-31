const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  console.log("Buscando por:", searchTerm);

  if (!searchTerm.trim()) {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => {
      console.log("Resultados da API:", results);
      displayResults(results, searchTerm);
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
}

function displayResults(results, searchTerm) {
  hidePlaylists();
  resultArtist.innerHTML = '';


  const filteredResults = results.filter(artist => {
    return artist.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log("Resultados filtrados:", filteredResults);

  if (filteredResults.length === 0) {
    resultArtist.innerHTML = "<p>Nenhum artista encontrado.</p>";
    resultArtist.classList.remove("hidden");
    return;
  }

  filteredResults.forEach((element) => {
    const artistCard = createArtistCard(element);
    resultArtist.appendChild(artistCard);
  });

  resultArtist.classList.remove("hidden");
}

function createArtistCard(artist) {
  const artistCard = document.createElement("div");
  artistCard.classList.add("artist-card");

  artistCard.innerHTML = `
    <div class="card-img">
      <img class="artist-img" src="${artist.urlImg}" />
      <div class="play">
        <span class="fa fa-solid fa-play"></span>
      </div>
    </div>
    <div class="card-text">
      <a href="#" title="${artist.name}" class="vst"></a>
      <span class="artist-name">${artist.name}</span>
      <span class="artist-categorie">Artista</span>
    </div>
  `;

  return artistCard;
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();
  console.log("Termo de pesquisa:", searchTerm);

  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  requestApi(searchTerm);
});
