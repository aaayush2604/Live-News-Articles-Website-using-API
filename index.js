const apiKey1 = "be27d1b4db0844a096b847d3b1a07312";
const url = "https://newsapi.org/v2/everything?q=";
const submitBtn = document.getElementById("submit-btn");
let list, Input;
let keyWord = "";
const NewsPage = document.querySelector(".News_Template");
const Home = document.querySelector(".Home");
const body = document.querySelector("body");
const searchPad = document.querySelector("#cover");
const searchBar = document.querySelector("#main");
let SubmitFlag = true;
const NewsCards = new Array();

function AddNews() {
  for (const x of list) {
    const link = x.url;
    const anchor = document.createElement("a");
    anchor.classList.add("NewsCard");
    anchor.href = link;
    anchor.target = "_blank";
    const card = document.createElement("div");
    anchor.appendChild(card);
    const title = document.createElement("div");
    title.classList.add("NewsTitle");
    title.innerHTML = x.title;
    const description = document.createElement("div");
    description.innerHTML = "Description: " + x.description;
    description.classList.add("NewsDescription");
    card.appendChild(title);
    card.appendChild(description);
    NewsCards.push(anchor);
    NewsPage.appendChild(anchor);
  }
}

function ClearForNewArticles() {
  for (let i = 0; i < NewsCards.length; i++) {
    NewsPage.removeChild(NewsCards[i]);
  }
  while (NewsCards.length > 0) {
    NewsCards.pop();
  }
}

function GetKeyWords(Input) {
  let KeyWordList = new Array();
  KeyWordList = Input.split(" ");
  keyWord = "";
  for (const x of KeyWordList) {
    keyWord += x;
  }
  return keyWord;
}

submitBtn.addEventListener("click", async () => {
  Input = searchBar.value;
  let KEYword = GetKeyWords(Input);
  const resp = await fetch(url + KEYword, {
    method: "GET",
    mode: "cors",
    headers: {
      "X-Api-Key": apiKey1,
    },
  });
  const Reply = await resp.json();
  list = Reply.articles;
  if (SubmitFlag) {
    NewsPage.appendChild(searchPad);
  }
  ClearForNewArticles();
  AddNews();

  if (SubmitFlag) {
    body.removeChild(Home);
    SubmitFlag = false;
  }
});
