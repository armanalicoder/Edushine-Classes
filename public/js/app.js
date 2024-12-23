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
