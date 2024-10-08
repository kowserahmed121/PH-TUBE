const loadFunction = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => getData(data.categories));
};

const getData = (category) => {
    const myId = document.getElementById("catagroy");
  category.forEach((item) => {
    const btn = document.createElement("button");
    btn.classList.add("btn")
    btn.innerText = item.category;
    myId.append(btn)
  });
};

loadFunction();
