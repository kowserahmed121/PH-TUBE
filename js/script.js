const loadFunction = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => getData(data.categories));
};

const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => getVideo(data.videos));
};

const getVideo = (videos) => {
  const container = document.getElementById("video-container");
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.classList = " card card-compact bg-base-100  shadow-xl";
    div.innerHTML = `
     <figure class="h-[200px]">
    <img
      src=${video.thumbnail}
      class="w-full h-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
    `;
    container.append(div);
  });
};

const getData = (category) => {
  const myId = document.getElementById("catagroy");
  category.forEach((item) => {
    const btn = document.createElement("button");
    // btn.classList.add("btn", "btn-warning" ,"text-white") // single class add
    btn.classList = "btn btn-warning text-white";
    btn.innerText = item.category;
    myId.append(btn);
  });
};

loadFunction();
loadVideo();
