// Retrieve the most recent score from localStorage
const mostRecentScore = sessionStorage.getItem('mostRecentScore');
        
// Convert mostRecentScore to a number
const numericMostRecentScore = Number(mostRecentScore);

// Retrieve the current cumulative score from localStorage, defaulting to 0 if not found
let cumulativeScore = Number(sessionStorage.getItem('cumulativeScore')) || 0;

// Update the currentScore element with the cumulative score
const currentScore = document.getElementById('currentScore');
currentScore.innerText = "Points: " + cumulativeScore;

// Function to handle the upgrade button click
function handleUpgrade() {

    // Ensure the cumulative score doesn't go below 0
    if(cumulativeScore >= 50) {
        // Decrease the cumulative score by 10
        cumulativeScore -= 50;

        // Save the updated cumulative score back to localStorage
        sessionStorage.setItem('cumulativeScore', cumulativeScore);

        
        document.getElementById('currentScore').innerText = "Points: " + cumulativeScore;

        // Define an array of image URLs
        const images = ['images/room2.png', 'images/room3.png', 'images/room4.png', 'images/room5.png']; // Add your image URLs here

        let currentIndex = sessionStorage.getItem('currentIndex');

        if (currentIndex === null) {
            currentIndex = 0;
        } else {
            currentIndex = parseInt(currentIndex);
        }

        // Get a reference to the root element
        const root = document.documentElement;

        // Set the background image property
        root.style.backgroundImage = `url('${images[currentIndex]}')`;

        // Increment the index or loop back to 0 if it exceeds the array length
        currentIndex = (currentIndex + 1) % images.length;

        // Store the updated index in session storage
        sessionStorage.setItem('currentIndex', currentIndex);

    }      
 }

// Add event listener to the upgrade button
const upgradeButton = document.getElementById('upgradeButton');
upgradeButton.addEventListener('click', handleUpgrade);

const dragAndDropEventNamesArray = [
    "drag",
    "dragstart",
    "dragend",
    "dragover",
    "dragenter",
    "dragleave",
    "drop"
  ];
  
  const dragStartEventNamesArray = ["dragover", "dragenter"];
  
  const dragEndEventNamesArray = ["dragleave", "dragend", "drop"];
  
  const isAdvancedUpload = (function () {
    const div = document.createElement("div");
  
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();
  
  const dragFilesAreaRef = document.querySelector(".drag-and-drop-form");
  
  if (isAdvancedUpload) {
    dragAndDropEventNamesArray.forEach((eventName) =>
      dragFilesAreaRef.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      })
    );
  
    dragStartEventNamesArray.forEach((eventName) =>
      dragFilesAreaRef.addEventListener(eventName, () =>
        dragFilesAreaRef.classList.add("is-dragover")
      )
    );
    
    dragEndEventNamesArray.forEach((eventName) =>
      dragFilesAreaRef.addEventListener(eventName, () =>
        dragFilesAreaRef.classList.remove("is-dragover")
      )
    );
    
    dragFilesAreaRef.addEventListener("drop", (e) =>
      document.getElementById('#drag-and-drop-input').files = e.dataTransfer.files
    );
  }
  