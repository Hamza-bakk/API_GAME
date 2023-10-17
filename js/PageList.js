import API_KEY from "./key.js";

export const PageList = (argument = '') => {
    const preparePage = () => {
      const cleanedArgument = argument.trim().replace(/\s+/g, '-');
  
      const displayResults = (articles) => {
        const resultsContent = articles.map((article) => (
          `<article class="cardGame">
            <h1>${article.name}</h1>
            <h2>${article.released}</h2>
            <img src="${article.background_image}" alt="${article.name}" class="game-image">
            <a href="#pagedetail/${article.id}">${article.id}</a>
          </article>`
        ));
        const resultsContainer = document.querySelector('.page-list .articles');
        resultsContainer.innerHTML = resultsContent.join("\n");
      };
  
      const fetchList = (url, argument) => {
        const finalURL = argument ? `${url}&search=${argument}` : url;
        fetch(finalURL)
          .then((response) => response.json())
          .then((responseData) => {
            displayResults(responseData.results)
          });
      };
  
      fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
    };
  
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-list">
          <div class="articles">Loading...</div>
        </section>
      `;
  
      preparePage();
    };
  
    render();
  };