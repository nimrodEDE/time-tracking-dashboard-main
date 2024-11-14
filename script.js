const weekly = document.querySelectorAll(".weekly");
const monthly = document.querySelectorAll(".monthly");
const daily = document.querySelectorAll(".daily");
const buttons = document.querySelectorAll(".period li");
const items = document.querySelectorAll(".item");
const periods = { daily, weekly, monthly };

const itemMap = {
  Work: 0,
  Play: 1,
  Study: 2,
  Exercise: 3,
  Social: 4,
  "Self Care": 5,
};

let jsonData; // Declare jsonData in a higher scope

fetch("/data.json")
  .then((request) => {
    if (!request.ok) {
      console.log("Oops! Something went wrong.");
      return null;
    }
    return request.json(); // Returns the parsed JSON data
  })
  .then((data) => {
    jsonData = data; // Assign the data to jsonData
    console.log(jsonData); // Log jsonData here, after the fetch has completed

    // Define a function to handle appending items for each timeframe
    const updateItems = (timeframe) => {
      Object.values(jsonData).forEach((activity) => {
        const index = itemMap[activity.title];
        if (index !== undefined) {
          appendItem(
            items[index],
            activity.timeframes[timeframe],
            activity.title
          );
        }
      });
    };
    // Ensure the JSON data is processed after it has been fetched
    updateItems("weekly");

    buttons.forEach((element) => {
      element.addEventListener("click", () => {
        // Remove "activeBtn" class from all buttons
        buttons.forEach((btn) => btn.classList.remove("activeBtn"));

        // Add "activeBtn" class to the clicked button
        element.classList.add("activeBtn");

        if (element.id == "dailyBtn") {
          updateItems("daily");
          element.classList.add("activeBtn");
        } else if (element.id == "weeklyBtn") {
          updateItems("weekly");
          element.classList.add("activeBtn");
        } else if (element.id == "monthlyBtn") {
          updateItems("monthly");
          element.classList.add("activeBtn");
        }
      });
    });
  });

function appendItem(item, timeframe, title) {
  item.innerHTML = "";

  item.innerHTML += `
        <div class="bottom">
          <div class="col-one">
            <p>${title}</p>
            <h1 class="active">${timeframe.current}hrs</h1>
          </div>
          <div class="col-two">
            <img src="./images/icon-ellipsis.svg" alt="" />
            <p class="active">Last Week - ${timeframe.previous}hrs</p>
          </div>
        </div>
    `;
}
