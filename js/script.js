const loadFunction = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => getData(data.categories));
};

const loadVideo = (search = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then((res) => res.json())
    .then((data) => getVideo(data.videos));
};

const getTimeCount = (time) => {
  const hour = parseInt(time / 3600);
  const second = time % 3600;
  const minute = parseInt(second / 60);
  const reamingSecond = second % 60;
  return `${hour} hour ${minute} minute ${reamingSecond} second ago`;
};

const removeClass = () => {
  const delBtn = document.getElementsByClassName("btn-category");
  for (let btn of delBtn) {
    btn.classList.remove("btn-error", "text-white");
  }
};

const detailsButton = (disply) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${disply}`)
  .then(res => res.json())
  .then(data => showModal(data.video))
};

const showModal = (modal) => {
  const displyMoal = document.getElementById("modal-data");
  displyMoal.innerHTML = `
  <img src = ${modal.thumbnail} />
  <p>${modal.description}</p>
  `
  document.getElementById("my_modal_5").showModal();
}
const loadCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("btn-error", "text-white");
      getVideo(data.category);
    });
};

const getVideo = (videos) => {
  const container = document.getElementById("video-container");
  container.innerHTML = "";
  if (videos.length === 0) {
    container.classList.remove("grid");
    container.innerHTML = `
    <div class="flex justify-center items-center min-h-[300px] flex-col gap-8">
      <div>
       <img src="./assets/Icon.png" alt="">
      </div>
      <h2 class="font-bold text-center text-3xl"> No Content Available Now This Category
       </h2>
    </div>
    `;
    return;
  } else {
    container.classList.add("grid");
  }

  videos.forEach((video) => {
    const div = document.createElement("div");
    div.classList = " card card-compact bg-base-100  shadow-xl";
    div.innerHTML = `
    <figure class="h-[200px] relative text-white">
      <img
      src=${video.thumbnail}
      class="w-full h-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<span class="absolute right-2 text-xs bottom-2 bg-black p-2 rounded-md">${getTimeCount(
              video.others.posted_date
            )} </span>
`
      }
  </figure>
  <div class="py-4 flex gap-3">
            <img class="w-10 h-10 rounded-full object-cover" src=${
              video.authors[0].profile_picture
            }>
        <div>
          <h4 class="font-bold"> ${video.title} </h4>
           <div class="flex gap-2">
           <p>${video.authors[0].profile_name}</p>

           ${
             video.authors[0].verified === true
               ? `<img class="w-6" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`
               : ""
           }
           </div>
           <button id="details-btn" onclick="detailsButton('${video.video_id}')" class="btn btn-error btn-sm mt-2 text-white">details</button>
        </div>
    `;
    container.append(div);
  });
};

const getData = (category) => {
  const myId = document.getElementById("catagroy");
  category.forEach((item) => {
    const btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategory(${item.category_id})" class="btn btn-category">
    ${item.category}
    </button>
    `;
    myId.append(btnContainer);
  });
};

document.getElementById("input-container").addEventListener("keyup", (e)=> {
  loadVideo(e.target.value)
})
loadFunction();
loadVideo();
