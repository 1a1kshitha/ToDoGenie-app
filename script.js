const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const voiceBtn = document.getElementById("voiceBtn");
const taskList = document.getElementById("taskList");

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}
function addTask(text) {
    if (text.trim() === "") return;


    const li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", () => {
        li.classList.toggle("done");
    });
    taskList.appendChild(li);
    taskInput.value = "";
    speak = "Task added!";
}
addTaskBtn.addEventListener("click", () => {
    addTask(taskInput.value);
});

voiceBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
        const spokenText = event.results[0][0].transcript;
        addTask(spokenText);
    };

    recognition.onerror = function (event) {
        alert("Speech recognition error: " + event.error);
    };
});
