// typing animation  script
try{
let typed = new Typed(".auto-typing",{
    strings : ["AKTU Notes", "1st Year Notes", "2nd Year Notes", "3rd Year Notes", "4th Year Notes"],
    typeSpeed : 50,
    backSpeed : 80,
    loop : true
});
}
catch(errr){
    // console.log(errr);
}

//Open dynamically video from database logic
let videoID = document.querySelectorAll(".subjectTitle");
videoID.forEach((video)=>{
    video.addEventListener("click",()=>{
        let id = videoID;
        fetch("/send-id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Server Response:", data);
        })
        .catch((error) => console.error("Error:", error));
    });
})
// Disable right-click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    window.alert("Don't right click");
  });

  // Disable specific key combinations
  document.addEventListener("keydown", function (e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
      e.key === "F12" || 
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || 
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
      window.alert("Don't right click")
    }
  });

 //Dark Feature implement logic 
 const toggleButton = document.getElementById("darkModeToggle");
 let cards = document.querySelectorAll(".card");
 let navSection = document.querySelector(".navSection");
 let navLink = document.querySelectorAll(".nav-link");
 let navheadingColor = document.querySelector(".commoncolor");
 const darkModeIcon = document.getElementById("darkModeIcon");
 
 // Retrieve dark mode state from localStorage
 const isDarkMode = localStorage.getItem("darkMode") === "enabled";
 
 // Apply dark mode if it was enabled
 if (isDarkMode) {
   document.body.classList.add("dark-mode");
   cards.forEach(card => {
     card.classList.add("dark-mode");
   });
   darkModeIcon.classList.replace("fa-moon", "fa-sun");
   navSection.classList.add("bg-black");
   navSection.classList.remove("bg-white");
   navheadingColor.classList.add("text-white");
   darkModeIcon.classList.add("text-white");
   navLink.forEach(alllink => {
     alllink.classList.add("text-white");
     alllink.classList.remove("text-black");
   });
 }
 
 // Toggle dark mode on button click
 toggleButton.addEventListener("click", () => {
   const isDark = document.body.classList.toggle("dark-mode");
   cards.forEach(card => {
     card.classList.toggle("dark-mode");
   });
   if (isDark) {
     darkModeIcon.classList.replace("fa-moon", "fa-sun");
     navSection.classList.add("bg-black");
     navSection.classList.remove("bg-white");
     navheadingColor.classList.add("text-white");
     darkModeIcon.classList.add("text-white");
     navLink.forEach(alllink => {
       alllink.classList.add("text-white");
       alllink.classList.remove("text-black");
     });
     localStorage.setItem("darkMode", "enabled");
   } else {
     darkModeIcon.classList.replace("fa-sun", "fa-moon");
     cards.forEach(card => {
       card.classList.add("shadow");
     });
     navSection.classList.remove("bg-black");
     navSection.classList.add("bg-white");
     navheadingColor.classList.remove("text-white");
     navLink.forEach(alllink => {
       alllink.classList.add("text-black");
       alllink.classList.remove("text-white");
     });
     darkModeIcon.classList.remove("text-white");
     localStorage.setItem("darkMode", "disabled");
   }
 });
 