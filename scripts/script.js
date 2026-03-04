const createElements = (arr) => {
  htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageLoading = (status) => {
  if (status) {
    document.getElementById("myLoading").classList.remove("hidden");
    document.getElementById("wordContainer").classList.add("hidden");
  } else {
    document.getElementById("myLoading").classList.add("hidden");
    document.getElementById("wordContainer").classList.remove("hidden");
  }
};

const loadLessons = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }
    const data = await res.json();
    displayLession(data.data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};
loadLessons();

const removeActive = () => {
  const lessionBtn = document.querySelectorAll(".lessionBtn");
  lessionBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const leveContainer = document.getElementById("leveContainer");
const displayLession = (lessions) => {
  leveContainer.innerHTML = "";
  for (let lession of lessions) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lessionBtn${lession.level_no}" onclick="loadWord(${lession.level_no})" class="lessionBtn btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lession - ${lession.level_no}
    </button>
    `;
    leveContainer.appendChild(btnDiv);
  }
};

const loadWord = async (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  try {
    manageLoading(true);
    const lessionBtn = document.getElementById(`lessionBtn${id}`);
    removeActive();
    lessionBtn.classList.add("active");
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }
    const data = await res.json();
    displayWord(data.data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

const wordContainer = document.getElementById("wordContainer");

const displayWord = (words) => {
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div
            class="text-center col-span-full py-10 px-5 space-y-6"
          >
            <img class="mx-auto" src="./assets/alert-error.png">
            <p class="text-lg fontBangla text-gray-500">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bold fontBangla text-xl md:text-2xl">
              নেক্সট Lesson এ যান
            </h2>
          </div>
    `;
    manageLoading(false);
    return;
  }

  for (let word of words) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
            class="bg-white rounded-xl shadow-sm text-center py-15 px-5 space-y-4"
          >
            <h2 class="font-bold text-xl md:text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium text-xl md:text-2xl fontBangla">
              "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}"
            </div>
            <div class="flex justify-between items-center">
              <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF]/15 hover:bg-[#1A91FF]/50">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button class="btn bg-[#1A91FF]/15 hover:bg-[#1A91FF]/50">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
    `;
    wordContainer.appendChild(card);
  }
  manageLoading(false);
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayWordDetails(data.data);
  } catch (error) {
    console.error("Error : ", error.message);
  }
};

const detailsContainer = document.getElementById("detailsContainer");
const displayWordDetails = (details) => {
  detailsContainer.innerHTML = `
  <div>
            <h2 class="text-2xl font-bold">
              ${details.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation})
            </h2>
          </div>
          <div class="space-y-2">
            <h2 class="font-bold">Meaning</h2>
            <p>${details.meaning}</p>
          </div>
          <div class="space-y-2">
            <h2 class="font-bold">Example</h2>
            <p>${details.sentence}</p>
          </div>
          <div>
            <h2 class="font-bold mb-2">সমার্থক শব্দ গুলো</h2>
            <div>
              ${createElements(details.synonyms)}
            </div>
          </div>
  `;
  document.getElementById("my_modal_5").showModal();
};
