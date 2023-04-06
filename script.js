var container = document.querySelector(".container");
var currentDay = document.querySelector("#currentDay");

// Display current day at the top of the page
currentDay.textContent = dayjs().format("dddd, MMMM D, YYYY");

// Generate timeblocks for each hour of the workday
for (var hour = 9; hour <= 17; hour++) {
  // Create timeblock element
  var timeBlockEl = document.createElement("div");
  timeBlockEl.classList.add("time-block");

  // Create hour element
  var hourEl = document.createElement("div");
  hourEl.classList.add("hour");
  hourEl.textContent = dayjs(`${hour}:00`, "H").format("h A");

  // Create event input element
  var eventEl = document.createElement("input");
  eventEl.classList.add("event");

  // Check current time and color-code timeblock accordingly
  if (dayjs().hour() === hour) {
    timeBlockEl.classList.add("present");
  } else if (dayjs().hour() > hour) {
    timeBlockEl.classList.add("past");
  } else {
    timeBlockEl.classList.add("future");
  }

  // Create save button element
  var saveButtonEl = document.createElement("button");
  saveButtonEl.classList.add("save-button");
  saveButtonEl.textContent = "Save";

  // Load event for this timeblock from local storage, if it exists
  var savedEvent = localStorage.getItem(`event-${hour}`);
  if (savedEvent) {
    eventEl.value = savedEvent;
  }

  // Add event listener to save button
  saveButtonEl.addEventListener("click", () => {
    localStorage.setItem(`event-${hour}`, eventEl.value);
    alert("Event saved!");
  });

  // Add elements to timeblock
  timeBlockEl.appendChild(hourEl);
  timeBlockEl.appendChild(eventEl);
  timeBlockEl.appendChild(saveButtonEl);

  // Add timeblock to container
  container.appendChild(timeBlockEl);
}
