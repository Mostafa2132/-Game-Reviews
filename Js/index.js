
AOS.init({
  duration:2200,
  once:false,
  delay:750
});


// https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';

let allLinks = document.querySelectorAll("a.nav-link");
for (let i = 0; i < allLinks.length; i++) {
  allLinks[i].addEventListener("click", function (e) {
    localStorage.setItem("mygame", e.target.innerHTML);
  });
}

async function GetGames(game = "mmorpg") {
  game = localStorage.getItem("mygame");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ccaac91295mshd14701794290dbcp16be91jsn9c10d33e541d",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  try {
    const games = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${game}`,
      options
    );
    let res = await games.json();
    // console.log(res);
    displayMmorpg(res);
  } catch (error) {
    console.log(error);
  }
}

GetGames();

// display mmorpg games

function displayMmorpg(arr) {
  let x = ``;
  for (let i = 0; i < arr.length; i++) {
    x += `
      
             <div data-aos="fade-right" class="col-lg-3 col-md-6 game" id=${arr[i].id}>
                        <div class="inner">
                            <div class="card bg-transparent " >
                                <img src="${
                                  arr[i].thumbnail
                                }" class="card-img-top  p-4  " loading="lazy" alt="${
      arr[i].short_description
    }">
                                <div class="card-body  d-flex justify-content-between align-items-center">
                                  <h5 class=" fs-6 text-light">${
                                    arr[i].title
                                  }</h5>
                                  <button type="button" class="btn btn-primary fs-6 p-2 px-3">Free</button>
                                </div>
                                <p class="card-text text-center px-4 py-2 ">${arr[
                                  i
                                ].short_description.slice(0, 80)}</p>
                                <div class="card-footer d-flex justify-content-between align-items-center">
                                    <span class="badge text-bg-secondary">${
                                      arr[i].genre
                                    }</span>
                                    <span class="badge text-bg-secondary">${
                                      arr[i].platform
                                    }</span>
                                </div>
                              </div>
                        </div>
                    </div>
      
      
      `;
  }

  // mmorpg games
  if (document.getElementById("rowData")) {
    document.getElementById("rowData").innerHTML = x;
  }

  // shooter games

  if (document.getElementById("shootData")) {
    document.getElementById("shootData").innerHTML = x;
  }

  //  sailing games

  if (document.getElementById("sailingData")) {
    document.getElementById("sailingData").innerHTML = x;
  }

  // permadeath  games
  if (document.getElementById("premandData")) {
    document.getElementById("premandData").innerHTML = x;
  }

  // superhero games

  if (document.getElementById("superData")) {
    document.getElementById("superData").innerHTML = x;
  }
  // pixel  games

  if (document.getElementById("pixelData")) {
    document.getElementById("pixelData").innerHTML = x;
  }

  // get games from id

  let allGames = document.querySelectorAll(".game");

  for (let i = 0; i < allGames.length; i++) {
    allGames[i].addEventListener("click", () => {
      // console.log(allGames[i].getAttribute("id"));
      localStorage.setItem("gameId", allGames[i].getAttribute("id"));
      location.pathname = "/gameDetalis.html";
    });
  }
}

// show game details

// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/game?id=452';

async function showGameDetails() {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ccaac91295mshd14701794290dbcp16be91jsn9c10d33e541d",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  try {
    const res = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${localStorage.getItem(
        "gameId"
      )}`,
      options
    );
    let data = await res.json();
    // console.log(data);
    displayGameDetails(data);
  } catch (error) {}
}
if (location.pathname.includes("/gameDetalis.html")) {
  showGameDetails();
}

function displayGameDetails(ele) {
  let x = `
  
                  <div data-aos="fade-left" class="col-lg-5 px-0 ps-3 mx-0">
                    <img src="${ele.thumbnail}" class="" alt="">
                </div>
                <div class="col-lg-7 text-white px-0 ps-2 mx-0 ">
                        <h2 class="pb-0 ps-2 mt-0">title : ${ele.title} </h2>
                        <h4 class="py-3 ps-2">Category : <span class="btn btn-info">${ele.genre}</span></h4>
                        <h4 class="py-3 ps-2">Platform : <span class="btn btn-info">${ele.platform}</span></h4>
                        <h4 class="py-3 ps-2">Status : <span class="btn btn-info">Live</span></h4>

                        <p class="py-3 ps-2">${ele.short_description}</p>


                        <a  href="${ele.game_url}" target="_blank" class="btn  btn-outline-warning">Show game</a>
                </div>
  
  `;

  if (document.getElementById("gameDetalise").innerHTML) {
    document.getElementById("gameDetalise").innerHTML = x;
  }
}

let close = document.querySelector(".fa-xmark");

if (location.pathname.includes("/gameDetalis.html")) {
  close.addEventListener("click", () => {
    setTimeout(() => {
      location.pathname = "/index.html";
    }, 500);
  });
}

// add clas active


let myLink = $("a.nav-link");

// تعيين الفئة "active" على الرابط المحفوظ في sessionStorage إذا كان موجوداً
$(document).ready(function () {
  let activeLink = sessionStorage.getItem("activeLink");
  if (activeLink) {
    myLink.removeClass("active");
    $(`a.nav-link[href="${activeLink}"]`).addClass("active");
  }
});

// إضافة الفئة "active" عند النقر وحفظ الرابط في sessionStorage
myLink.click(function (e) {
  myLink.removeClass("active");
  $(e.currentTarget).addClass("active");

  // حفظ الرابط في sessionStorage
  sessionStorage.setItem("activeLink", $(e.currentTarget).attr("href"));
  return true;
});

// loading screen

$(document).ready(function () {
  $(".spinner").animate({ top: "-150%" }, 1400, function () {
    $(".loading").animate({ left: "-120%" }, 1000, function () {
      $("body").css("overflow", "visible");
      $(".loading").remove();
    });
  });
});

const myBtn = document.querySelector(".scBtn");
// const myBtn = $(".scBtn");

$(window).scroll(function () {
  if ($(window).scrollTop() > 250) {
    myBtn.classList.replace("d-none", "d-flex");
  } else {
    myBtn.classList.replace("d-flex", "d-none");
  }
});

myBtn.addEventListener("click",() => {
  window.scrollTo(0,0)
});

