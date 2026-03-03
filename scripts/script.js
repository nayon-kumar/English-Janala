const loadLessons = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    displayLession(data.data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};
loadLessons();

const leveContainer = document.getElementById("leveContainer");
const displayLession = (lessions) => {
  leveContainer.innerHTML = "";
  for (let lession of lessions) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lession - ${lession.level_no}
    </button>
    `;
    leveContainer.appendChild(btnDiv);
  }
};
