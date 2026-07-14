function updateProgress() {

    const total =
        document.querySelectorAll("#assignmentList li").length;

    const completed =
        document.querySelectorAll(".completed").length;

    let percentage = 0;

    if (total > 0) {
        percentage = (completed / total) * 100;
    }

    document.getElementById("progressBar").style.width =
        percentage + "%";

    document.getElementById("progressText").innerText =
        percentage.toFixed(0) + "%";

}
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("username").innerText = "Hello, " + user.fullName;
}

document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.href = "index.html";
});

function updateDateTime() {
    const now = new Date();

    document.getElementById("date").innerText = now.toLocaleDateString();
    document.getElementById("time").innerText = now.toLocaleTimeString();
}

updateDateTime();
setInterval(updateDateTime, 1000);

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", function () {

    const total = Number(document.getElementById("totalClasses").value);
    const attended = Number(document.getElementById("attendedClasses").value);

    if (total <= 0 || attended < 0 || attended > total) {
        alert("Please enter valid values.");
        return;
    }

    const percentage = (attended / total) * 100;

    if (percentage >= 75) {
        document.getElementById("attendanceResult").innerText =
            "Attendance : " + percentage.toFixed(2) + "% ✅ Good Attendance";
    } else {
        document.getElementById("attendanceResult").innerText =
            "Attendance : " + percentage.toFixed(2) + "% ⚠️ Low Attendance";
    }
});

let assignments = JSON.parse(localStorage.getItem("assignment")) || [];

const addAssignment = document.getElementById("addAssignment");

addAssignment.addEventListener("click", function () {

    const assignment = document.getElementById("assignmentInput").value.trim();

    if (assignment === "") {
        alert("Please enter an assignment");
        return;
    }

    assignments.push(assignment);
    localStorage.setItem("assignment", JSON.stringify(assignments));

    displayAssignment(assignment);
    updateProgress();
    updateDashboardStats();

    document.getElementById("assignmentInput").value = "";
});

function displayAssignment(assignment) {

    const li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox" class="checkBox">
        <span>${assignment}</span>
        <button class="deleteBtn">Delete</button>
    `;

    document.getElementById("assignmentList").appendChild(li);

    const checkBox = li.querySelector(".checkBox");

    checkBox.addEventListener("change", function () {

        if (checkBox.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }

        console.log(li.className);

        updateProgress();
    });

    const deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function () {

        li.remove();

        const index = assignments.indexOf(assignment);

        if (index > -1) {
            assignments.splice(index, 1);
            localStorage.setItem("assignment", JSON.stringify(assignments));
        }

        updateProgress();

        updateDashboardStats();

    });

}

function loadAssignments() {

    document.getElementById("assignmentList").innerHTML = "";

    assignments.forEach(function (assignment) {
        displayAssignment(assignment);
    });
    updateProgress();
}

loadAssignments();

const searchAssignment = document.getElementById("searchAssignment");

searchAssignment.addEventListener("input", function () {
    const searchValue = searchAssignment.value.toLowerCase();
    const assignments = document.querySelectorAll("#assignmentList li");

    assignments.forEach(function (item) {
        const text = item.innerText.toLowerCase();

        if (text.includes(searchValue)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";

        }
    });
});

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    const searchValue = document
        .getElementById("searchAssignment")
        .value
        .toLowerCase();

    const items = document.querySelectorAll("#assignmentList li");

    items.forEach(function (item) {

        const text = item.innerText.toLowerCase();

        if (text.includes(searchValue)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }

    });

});

const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", function () {

    const confirmClear = confirm("Are you sure you want to clear all assignments?");

    if (!confirmClear) {
        return;
    }

    assignments = [];

    localStorage.removeItem("assignment");

    document.getElementById("assignmentList").innerHTML = "";
    updateProgress();
});

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

});

let time = 1500;
let timerInterval = null;

const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimer() {

    let minutes = Math.floor(time / 60);

    let seconds = time % 60;

    timer.innerText =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

updateTimer();

startBtn.addEventListener("click", function () {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(function () {

        if (time > 0) {

            time--;
            updateTimer();

        } else {

            clearInterval(timerInterval);
            timerInterval = null;

        }

    }, 1000);

});
stopBtn.addEventListener("click", function () {

    clearInterval(timerInterval);
    timerInterval = null;

});

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    time = 1500;

    updateTimer();

});
const notes = document.getElementById("notes");
const saveNotes = document.getElementById("saveNotes");

// Page load hone par saved note show hoga
const savedNotes = localStorage.getItem("notes");

if (savedNotes) {
    notes.value = savedNotes;
}
saveNotes.addEventListener("click", function () {

    if (notes.value.trim() === "") {
        alert("Please write some notes.");
        return;
    }

    localStorage.setItem("notes", notes.value);

    alert("Notes Saved Successfully!");

});
const clearNotes = document.getElementById("clearNotes");

clearNotes.addEventListener("click", function () {

    const confirmClear = confirm("Are you sure you want to clear notes?");

    if (!confirmClear) {
        return;
    }
    notes.value = "";

    alert("Notes Cleared Successfully!");

});

const calculateMarks = document.getElementById("calculateMarks");

calculateMarks.addEventListener("click", function () {

    const sub1 = Number(document.getElementById("sub1").value);
    const sub2 = Number(document.getElementById("sub2").value);
    const sub3 = Number(document.getElementById("sub3").value);
    const sub4 = Number(document.getElementById("sub4").value);
    const sub5 = Number(document.getElementById("sub5").value);

    const total = sub1 + sub2 + sub3 + sub4 + sub5;

    const percentage = total / 5;

    let grade = "";
    let result = "";

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 40) {
        grade = "D";
    } else {
        grade = "F";
    }

    if (percentage >= 40) {
        result = "Pass ✅";
    } else {
        result = "Fail ❌";
    }

    document.getElementById("totalMarks").innerText =
        "Total Marks : " + total + " / 500";

    document.getElementById("percentageMarks").innerText =
        "Percentage : " + percentage.toFixed(2) + "%";

    document.getElementById("grade").innerText =
        "Grade : " + grade;

    document.getElementById("result").innerText =
        "Result : " + result;

});

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addExpense = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");

function updateExpenseTotal() {

    let total = 0;

    expenses.forEach(function (item) {
        total += item.amount;
    });

    totalExpense.innerText = "Total Expense : ₹" + total;

}

function displayExpense(item) {

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${item.name}</span>
        <span>₹${item.amount}</span>
    `;

    expenseList.appendChild(li);

}

addExpense.addEventListener("click", function () {

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || amount <= 0) {
        alert("Enter valid expense.");
        return;
    }

    const expense = {
        name: name,
        amount: amount
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpense(expense);

    updateExpenseTotal();

    updateDashboardStats();

    expenseName.value = "";
    expenseAmount.value = "";

});

function loadExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function (item) {
        displayExpense(item);
    });

    updateExpenseTotal();
    updateDashboardStats();



    loadExpenses();
}
const clearExpense = document.getElementById("clearExpense");

clearExpense.addEventListener("click", function () {
    alert("Button Clicked");

    const confirmClear = confirm("Are you sure you want to clear all expenses?");

    if (!confirmClear) {
        return;
    }

    expenses = [];

    localStorage.removeItem("expenses");

    expenseList.innerHTML = "";

    updateExpenseTotal();

    updateDashboardStats();

});
// clearExpense.addEventListener("click", function () {

//     alert("Button Clicked");

//     expenses = [];

//     localStorage.removeItem("expenses");

//     expenseList.innerHTML = "";

//     updateExpenseTotal();

//     updateDashboardStats();

// });
const checkExam = document.getElementById("checkExam");

let examTimer;
let alertShown = false;

checkExam.addEventListener("click", function () {

    clearInterval(examTimer);

    alertShown = false;

    const examDateTime =
        document.getElementById("examDateTime").value;

    if (examDateTime === "") {
        alert("Please select exam date and time.");
        return;
    }

    const exam = new Date(examDateTime);

    examTimer = setInterval(function () {

        const now = new Date();

        const difference = exam - now;

        if (difference <= 0) {

            clearInterval(examTimer);

            document.getElementById("examResult").innerText =
                "🎯 Best of Luck! Your Exam Starts Now.";

            document.getElementById("countdown").innerText =
                "00 Days 00 Hours 00 Minutes 00 Seconds";

            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerText =
            `${days} Day ${hours} Hour ${minutes} Minute ${seconds} Second`;

        document.getElementById("examResult").innerText =
            "🎯 Best of Luck! Prepare Well.";

        if (difference <= 15 * 60 * 1000 && !alertShown) {

            alert("⚠️ Alert! Your exam will start in 15 minutes.");

            alertShown = true;

        }

    }, 1000);

});

const calculateCGPA = document.getElementById("calculateCGPA");

calculateCGPA.addEventListener("click", function () {

    const sem1 = Number(document.getElementById("sem1").value);
    const sem2 = Number(document.getElementById("sem2").value);
    const sem3 = Number(document.getElementById("sem3").value);
    const sem4 = Number(document.getElementById("sem4").value);

    const semesters = [sem1, sem2, sem3, sem4];

    let total = 0;
    let count = 0;

    semesters.forEach(function (sgpa) {

        if (sgpa > 0) {
            total += sgpa;
            count++;
        }

    });

    if (count === 0) {
        alert("Please enter at least one SGPA.");
        return;
    }

    const cgpa = total / count;
    const percentage = (cgpa - 0.75) * 10;

    let performance = "";

    if (cgpa >= 9) {
        performance = "🌟 Excellent";
    } else if (cgpa >= 8) {
        performance = "🎉 Very Good";
    } else if (cgpa >= 7) {
        performance = "👍 Good";
    } else if (cgpa >= 6) {
        performance = "🙂 Average";
    } else {
        performance = "📚 Needs Improvement";
    }

    document.getElementById("cgpaResult").innerText =
        "CGPA : " + cgpa.toFixed(2);

    document.getElementById("percentageResult").innerText =
        "Percentage : " + percentage.toFixed(2) + "%";

    document.getElementById("performanceResult").innerText =
        "Performance : " + performance;

});

const clearCGPA = document.getElementById("clearCGPA");

clearCGPA.addEventListener("click", function () {

    document.getElementById("sem1").value = "";
    document.getElementById("sem2").value = "";
    document.getElementById("sem3").value = "";
    document.getElementById("sem4").value = "";

    document.getElementById("cgpaResult").innerText = "";
    document.getElementById("percentageResult").innerText = "";
    document.getElementById("performanceResult").innerText = "";

});



const timetable = {
    Monday: [
        { subject: "HTML", start: "09:00", end: "10:00" },
        { subject: "CSS", start: "10:00", end: "11:00" },
        { subject: "JavaScript", start: "11:30", end: "01:00" },
        { subject: "React", start: "02:00", end: "03:00" }
    ],

    Tuesday: [
        { subject: "Python", start: "09:00", end: "10:00" },
        { subject: "DBMS", start: "10:30", end: "11:30" },
        { subject: "DSA", start: "12:00", end: "01:00" }
    ],

    Wednesday: [
        { subject: "Java", start: "09:00", end: "10:00" },
        { subject: "SQL", start: "10:30", end: "11:30" }
    ],

    Thursday: [
        { subject: "React", start: "09:00", end: "10:00" },
        { subject: "Git", start: "10:30", end: "11:30" }
    ],

    Friday: [
        { subject: "Project", start: "09:00", end: "11:00" },
        { subject: "Interview Prep", start: "11:30", end: "01:00" }
    ],

    Saturday: [
        { subject: "Revision", start: "10:00", end: "12:00" }
    ]
};

const subjectColors = {
    HTML: "#ff9800",
    CSS: "#2196F3",
    JavaScript: "#f7df1e",
    React: "#61dafb",
    Python: "#4CAF50",
    Java: "#f44336",
    DBMS: "#9c27b0",
    DSA: "#009688",
    SQL: "#795548",
    Git: "#ff5722",
    Project: "#673ab7",
    "Interview Prep": "#3f51b5",
    Revision: "#009688"
};

document
    .getElementById("showTimetable")
    .addEventListener("click", showTodayTimetable);




function showTodayTimetable() {

    const list = document.getElementById("timetableList");

    list.innerHTML = "";

    const today = new Date();

    const day = today.toLocaleDateString("en-US", {
        weekday: "long"
    });
    document.getElementById("todayHeading").innerText =
        `📅 ${day}'s Timetable`;
    const classes = timetable[day];

    if (!classes) {

        list.innerHTML = `
        <li>
            🎉 No Classes Today
            <br><br>
            Enjoy Your Holiday! 😊
        </li>
    `;

        document.getElementById("nextClass").innerText = "";

        return;

    }

    let nextClass = null;

    classes.forEach(function (item) {

        const li = document.createElement("li");

        li.innerHTML =
            `<strong>${item.start} - ${item.end}</strong><br>${item.subject}`;

        li.style.borderLeft =
            `8px solid ${subjectColors[item.subject]}`;

        const now = today.getHours() * 60 + today.getMinutes();

        const start =
            Number(item.start.split(":")[0]) * 60 +
            Number(item.start.split(":")[1]);

        const end =
            Number(item.end.split(":")[0]) * 60 +
            Number(item.end.split(":")[1]);

        if (now >= start && now <= end) {

            li.classList.add("current-class");

            li.innerHTML += "<br>🟢 Current Class";

        }

        else if (now < start && !nextClass) {

            nextClass = item;

        }

        list.appendChild(li);

    });

    const next = document.getElementById("nextClass");

    if (nextClass) {

        next.innerHTML =
            `⏰ Next Class : ${nextClass.subject} (${nextClass.start})`;

    }

    else {

        next.innerHTML =
            "✅ All Classes Completed";

    }

}


const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();

const examDates = [
    "2026-07-25",
    "2026-08-15"
];

const assignmentDates = [
    "2026-07-18",
    "2026-07-22",
    "2026-08-05"
];

function renderCalendar(date) {

    calendar.innerHTML = "";

    const month = date.getMonth();
    const year = date.getFullYear();

    monthYear.innerText =
        date.toLocaleString("default", {
            month: "long",
            year: "numeric"
        });

    const dayNames = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    dayNames.forEach(function (day) {

        const div = document.createElement("div");

        div.className = "day-name";

        div.innerText = day;

        calendar.appendChild(div);

    });

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");

        calendar.appendChild(empty);

    }

    const today = new Date();

    for (let day = 1; day <= totalDays; day++) {

        const cell = document.createElement("div");

        cell.className = "day";

        cell.innerText = day;

        const fullDate =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            cell.classList.add("today");

        }

        if (examDates.includes(fullDate)) {

            cell.classList.add("exam-day");

        }

        if (assignmentDates.includes(fullDate)) {

            cell.classList.add("assignment-day");

        }

        events.forEach(function (event) {

            if (event.date === fullDate) {

                cell.classList.add("event-day");
                cell.title = event.title;
            }
        });
        calendar.appendChild(cell);

    }
}
let events = JSON.parse(localStorage.getItem("events")) || [];
renderCalendar(currentDate);

prevMonth.addEventListener("click", function () {

    currentDate.setMonth(currentDate.getMonth() - 1);

    renderCalendar(currentDate);

});

nextMonth.addEventListener("click", function () {

    currentDate.setMonth(currentDate.getMonth() + 1);

    renderCalendar(currentDate);

});
showTodayTimetable();

const saveEvent = document.getElementById("saveEvent");

saveEvent.addEventListener("click", function () {
    // console.log("Button Clicked");
    alert("Button Working");

    const eventDate =
        document.getElementById("eventDate").value;

    const eventText =
        document.getElementById("eventText").value.trim();
    console.log(eventDate);
    console.log(eventText);

    if (eventDate === "" || eventText === "") {
        alert("Please fill all fields.");
        return;
    }

    events.push({
        date: eventDate,
        title: eventText
    });

    console.log(events);

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

    renderCalendar(currentDate);

    displayEvents();

    updateDashboardStats();

    document.getElementById("eventDate").value = "";
    document.getElementById("eventText").value = "";

    alert("Event Saved Successfully");
});



function displayEvents() {

    const eventList =
        document.getElementById("eventList");

    eventList.innerHTML = "";

    events.forEach(function (event, index) {

        const li = document.createElement("li");

        li.innerHTML = `
    <span class="event-date">📅 ${event.date}</span>

    <span class="event-title">${event.title}</span>

    <button class="deleteEvent">Delete</button>
`;

        li.querySelector(".deleteEvent")
            .addEventListener("click", function () {

                events.splice(index, 1);

                localStorage.setItem(
                    "events",
                    JSON.stringify(events)
                );

                renderCalendar(currentDate);

                displayEvents();

                updateDashboardStats();

            });

        eventList.appendChild(li);

    });

}

displayEvents();




const editProfile = document.getElementById("editProfile");
if (editProfile) {
    editProfile.addEventListener("click", function () {

        const name = prompt(
            "Enter Student Name",
            document.getElementById("studentName").innerText
        );

        if (!name) return;

        const course = prompt(
            "Enter Course",
            document.getElementById("studentCourse").innerText
        );

        if (!course) return;

        const roll = prompt(
            "Enter Roll Number",
            document.getElementById("studentRoll").innerText.replace("Roll No : ", "")
        );

        if (!roll) return;

        document.getElementById("studentName").innerText = name;
        document.getElementById("studentCourse").innerText = course;
        document.getElementById("studentRoll").innerText =
            "Roll No : " + roll;

        localStorage.setItem("studentName", name);
        localStorage.setItem("studentCourse", course);
        localStorage.setItem("studentRoll", roll);

    });
}

const savedName = localStorage.getItem("studentName");
const savedCourse = localStorage.getItem("studentCourse");
const savedRoll = localStorage.getItem("studentRoll");

if (savedName) {
    document.getElementById("studentName").innerText = savedName;
}

if (savedCourse) {
    document.getElementById("studentCourse").innerText = savedCourse;
}

if (savedRoll) {
    document.getElementById("studentRoll").innerText =
        "Roll No : " + savedRoll;
}


function updateDashboardStats() {

    document.getElementById("totalAssignments").innerText =
        assignments.length;


    document.getElementById("completedAssignments").innerText =
        document.querySelectorAll(".completed").length;

    document.getElementById("totalEvents").innerText =
        events.length;

    let total = 0;

    expenses.forEach(function (item) {
        total += Number(item.amount);
    });

    document.getElementById("dashboardExpense").innerText =
        "₹" + total;

}

updateDashboardStats();


const ctx = document.getElementById("analyticsChart");

new Chart(ctx, {

    type: "bar",

    data: {

        labels: [
            "Assignments",
            "Events",
            "Expenses"
        ],

        datasets: [{

            label: "Dashboard Statistics",

            data: [5, 3, 8],

            borderWidth: 1

        }]

    },

    options: {

        responsive: true

    }

});




let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

const subjectName = document.getElementById("subjectName");
const addSubject = document.getElementById("addSubject");
const attendanceTable = document.querySelector("#attendanceTable tbody");

function displaySubjects() {

    attendanceTable.innerHTML = "";

    subjects.forEach(function (subject, index) {

        const percentage =
            subject.present + subject.absent === 0
                ? 0
                : ((subject.present /
                    (subject.present + subject.absent)) * 100).toFixed(0);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${subject.name}</td>

            <td>${subject.present}</td>

            <td>${subject.absent}</td>

            <td>${percentage}%</td>

           <td>
    <button class="presentBtn">✅</button>

    <button class="absentBtn">❌</button>

    <button class="deleteSubject">🗑️</button>
</td>
        `;
        const presentBtn = row.querySelector(".presentBtn");

        presentBtn.addEventListener("click", function () {

            subjects[index].present++;

            localStorage.setItem(
                "subjects",
                JSON.stringify(subjects)
            );

            displaySubjects();

        });
        const absentBtn = row.querySelector(".absentBtn");

        absentBtn.addEventListener("click", function () {

            subjects[index].absent++;

            localStorage.setItem(
                "subjects",
                JSON.stringify(subjects)
            );

            displaySubjects();

        });
        const deleteBtn = row.querySelector(".deleteSubject");

        deleteBtn.addEventListener("click", function () {

            if (confirm("Delete this subject?")) {

                subjects.splice(index, 1);

                localStorage.setItem(
                    "subjects",
                    JSON.stringify(subjects)
                );

                displaySubjects();

            }

        });
        attendanceTable.appendChild(row);

    });

    let totalPresent = 0;
    let totalAbsent = 0;

    subjects.forEach(function (subject) {

        totalPresent += subject.present;
        totalAbsent += subject.absent;

    });

    let overall = 0;

    if (totalPresent + totalAbsent > 0) {

        overall =
            (totalPresent / (totalPresent + totalAbsent)) * 100;

    }

    document.getElementById("overallAttendance").innerText =
        "Overall Attendance : " + overall.toFixed(1) + "%";

    const status =
        document.getElementById("attendanceStatus");

    if (overall >= 75) {

        status.innerText =
            "🟢 Excellent Attendance";

        status.style.color = "green";

    }
    else if (overall >= 60) {

        status.innerText =
            "🟡 Warning! Improve Attendance";

        status.style.color = "orange";

    }
    else {

        status.innerText =
            "🔴 Critical! Attendance Below 60%";

        status.style.color = "red";

    }

}


addSubject.addEventListener("click", function () {

    const name = subjectName.value.trim();

    if (name === "") {
        alert("Enter Subject Name");
        return;
    }

    subjects.push({
        name: name,
        present: 0,
        absent: 0
    });

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    displaySubjects();

    subjectName.value = "";

});

displaySubjects();




const studyGoal = document.getElementById("studyGoal");
const saveGoal = document.getElementById("saveGoal");
const goalResult = document.getElementById("goalResult");

studyGoal.value = localStorage.getItem("studyGoal") || "";

if (studyGoal.value !== "") {
    showGoalMessage(Number(studyGoal.value));
}

saveGoal.addEventListener("click", function () {

    const goal = Number(studyGoal.value);

    if (goal <= 0) {
        alert("Please enter a valid study goal.");
        return;
    }

    localStorage.setItem("studyGoal", goal);

    showGoalMessage(goal);

});

function showGoalMessage(goal) {

    if (goal >= 10) {

        goalResult.innerHTML =
            "🏆 Goal : " + goal +
            " Hours / Day<br>🌟 Excellent! Keep it up.";

        goalResult.style.color = "green";

    }

    else if (goal >= 8) {

        goalResult.innerHTML =
            "🎯 Goal : " + goal +
            " Hours / Day<br>💯 Very Good! Stay Consistent.";

        goalResult.style.color = "#2196F3";

    }

    else if (goal >= 6) {

        goalResult.innerHTML =
            "📚 Goal : " + goal +
            " Hours / Day<br>👍 Good! Keep Studying.";

        goalResult.style.color = "orange";

    }

    else {

        goalResult.innerHTML =
            "❌ Goal : " + goal +
            " Hours / Day<br>😔 Poor! Increase your study time.";

        goalResult.style.color = "red";
    }
    const badge = document.getElementById("badge");

    if (goal >= 10) {

        badge.innerText = "🥇 Gold Learner";
        badge.style.color = "gold";

    }
    else if (goal >= 8) {

        badge.innerText = "🥈 Silver Learner";
        badge.style.color = "#757575";

    }
    else if (goal >= 6) {

        badge.innerText = "🥉 Bronze Learner";
        badge.style.color = "#cd7f32";

    }
    else {

        badge.innerText = "📖 Beginner";
        badge.style.color = "red";

    }

}


const clearGoal = document.getElementById("clearGoal");

clearGoal.addEventListener("click", function () {

    const confirmClear = confirm(
        "Are you sure you want to clear your study goal?"
    );

    if (!confirmClear) {
        return;
    }

    localStorage.removeItem("studyGoal");

    studyGoal.value = "";

    goalResult.innerText = "No Goal Set";
    goalResult.style.color = "black";

    const badge = document.getElementById("badge");

    badge.innerText = "No Badge";
    badge.style.color = "black";

});

