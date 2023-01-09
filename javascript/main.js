let rnd = Math.floor(Math.random() * 20) + 1;
let article;
let arr;
let counter = 0;
let errors = 0;
let container = document.querySelector(".article");
let errorsCounter = document.querySelector(".errors-counter");
let start;
let end;
let rate;
let durationCounter = document.querySelector(".duration-counter");
let timeElapse;
// let req = new XMLHttpRequest();
// req.open("Get", "https://archive.org/download/type_20221110/type.json");
// req.send();
// req.onreadystatechange = function () {
//   if (req.readyState == 4) {
//     article = JSON.parse(req.responseText).articles[rnd].description;
//     // article = "sam s sad asd asd asd";
//     arr = article.split("");
//     arr[0] = `<span class = 'current'>${arr[0]}</span>`;
//     container.innerHTML = arr.join("");
//   }
// };
fetch("https://archive.org/download/data_20230109/data.json")
  .then((result) => {
    return result.json();
  })
  .then((result) => {
    article = result.sources[Math.floor(Math.random() * 100)].description;
    arr = article.split("");
    arr[0] = `<span class = 'current'>${arr[0]}</span>`;
    document.querySelector("#loader").style.display = "none";
    container.innerHTML = container.innerHTML + arr.join("");
  });
document.onkeypress = function (event) {
  if (
    `<span class = 'current'>${event.key}</span>` === arr[counter] &&
    counter < arr.length
  ) {
    if (counter == 0) {
      start = new Date();
      let increament = 1;
      timeElapse = setInterval(() => {
        durationCounter.innerHTML = increament++;
      }, 1000);
    }
    next();
  } else {
    errors++;
    errorsCounter.innerHTML = errors;
  }
};
function next() {
  counter++;
  if (counter < arr.length) {
    arr = article.split("");
    arr[counter] = `<span class = 'current'>${arr[counter]}</span>`;
    container.innerHTML = arr.join("");
  } else if (counter === arr.length) {
    clearInterval(timeElapse);
    end = new Date();
    let duration = (end - start) / 1000 / 60;
    rate = article.split(" ").length / duration;
    console.log(rate.toFixed());
    Swal.fire(
      "Good job!",
      `Your typing speed is ${rate.toFixed()} wpm`,
      "success"
    );
  }
}
