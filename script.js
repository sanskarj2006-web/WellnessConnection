// ============================================
// WELLNESS CONNECTION - DSA MINOR PROJECT
// ============================================

// --------------------------------------------
// 1. ARRAY / LIST
// Stores all wellness activities
// --------------------------------------------

let activities = [
    {
        id: 1,
        name: "Morning Walk",
        category: "Fitness",
        duration: 30,
        difficulty: "Easy",
        icon: "🚶",
        description: "A simple walk to improve physical fitness and mood.",
        score: 8
    },
    {
        id: 2,
        name: "Home Workout",
        category: "Fitness",
        duration: 40,
        difficulty: "Medium",
        icon: "🏋️",
        description: "A basic bodyweight workout for overall fitness.",
        score: 9
    },
    {
        id: 3,
        name: "Deep Breathing",
        category: "Mindfulness",
        duration: 10,
        difficulty: "Easy",
        icon: "🌬️",
        description: "Slow breathing exercises to relax your body and mind.",
        score: 9
    },
    {
        id: 4,
        name: "Meditation",
        category: "Mindfulness",
        duration: 15,
        difficulty: "Easy",
        icon: "🧘",
        description: "A short meditation session for mental relaxation.",
        score: 10
    },
    {
        id: 5,
        name: "Healthy Meal Planning",
        category: "Nutrition",
        duration: 20,
        difficulty: "Easy",
        icon: "🥗",
        description: "Plan balanced and nutritious meals for the day.",
        score: 8
    },
    {
        id: 6,
        name: "Fruit & Hydration",
        category: "Nutrition",
        duration: 10,
        difficulty: "Easy",
        icon: "🍎",
        description: "Improve daily nutrition and maintain proper hydration.",
        score: 7
    },
    {
        id: 7,
        name: "Sleep Routine",
        category: "Sleep",
        duration: 15,
        difficulty: "Easy",
        icon: "😴",
        description: "Create a consistent routine for better sleep.",
        score: 10
    },
    {
        id: 8,
        name: "Digital Detox",
        category: "Sleep",
        duration: 30,
        difficulty: "Medium",
        icon: "📵",
        description: "Take time away from screens before bedtime.",
        score: 8
    },
    {
        id: 9,
        name: "Yoga",
        category: "Fitness",
        duration: 30,
        difficulty: "Medium",
        icon: "🧘‍♂️",
        description: "Gentle yoga movements for flexibility and strength.",
        score: 9
    }
];


// --------------------------------------------
// 2. HASH MAP
// Stores user wellness preferences
// --------------------------------------------

let userPreferences = new Map([
    ["Fitness", 0],
    ["Mindfulness", 0],
    ["Nutrition", 0],
    ["Sleep", 0]
]);


// --------------------------------------------
// 3. SET
// Stores completed activity IDs
// Prevents duplicate entries
// --------------------------------------------

let completedActivities = new Set();


// --------------------------------------------
// Display activities when page loads
// --------------------------------------------

function displayActivities(list = activities) {

    const container = document.getElementById("activityContainer");

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML =
            '<p class="empty-message">No activities found.</p>';
        return;
    }

    list.forEach(activity => {

        const isCompleted = completedActivities.has(activity.id);

        const card = document.createElement("div");

        card.className = "activity-card";

        card.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>

            <h3>${activity.name}</h3>

            <span class="badge">${activity.category}</span>

            <p>${activity.description}</p>

            <div class="activity-info">
                <span>⏱ ${activity.duration} min</span>
                <span>📊 ${activity.difficulty}</span>
            </div>

            <button
                class="complete-btn ${isCompleted ? "completed" : ""}"
                onclick="completeActivity(${activity.id})">

                ${isCompleted ? "↩ Unmark" : "Mark as Complete"}

            </button>
        `;

        container.appendChild(card);
    });

    updateProgress();
}


// --------------------------------------------
// 4. LINEAR SEARCH
// Searches activity names
// --------------------------------------------

function searchActivities() {

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const selectedCategory =
        document.getElementById("categoryFilter").value;

    let results = [];

    // Linear Search
    for (let i = 0; i < activities.length; i++) {

        const activity = activities[i];

        const matchesName =
            activity.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            activity.category === selectedCategory;

        if (matchesName && matchesCategory) {
            results.push(activity);
        }
    }

    displayActivities(results);
}


// --------------------------------------------
// Category filter
// --------------------------------------------

function filterActivities() {

    searchActivities();
}


// --------------------------------------------
// 5. SORTING ALGORITHM
// Sort activities by duration
// --------------------------------------------

function sortActivities() {

    let sortedActivities = [...activities];

    // Bubble Sort
    for (let i = 0; i < sortedActivities.length - 1; i++) {

        for (let j = 0; j < sortedActivities.length - i - 1; j++) {

            if (
                sortedActivities[j].duration >
                sortedActivities[j + 1].duration
            ) {

                let temp = sortedActivities[j];

                sortedActivities[j] =
                    sortedActivities[j + 1];

                sortedActivities[j + 1] = temp;
            }
        }
    }

    displayActivities(sortedActivities);
}


// --------------------------------------------
// 6. PRIORITY QUEUE
// Recommendation algorithm
// --------------------------------------------

function recommend(category) {

    // Filter activities by category
    let recommendations = activities.filter(
        activity => activity.category === category
    );

    // Priority Queue simulation
    // Higher score = higher priority

    recommendations.sort(
        (a, b) => b.score - a.score
    );

    const container =
        document.getElementById("recommendationContainer");

    container.innerHTML = "";

    recommendations.forEach((activity, index) => {

        const card =
            document.createElement("div");

        card.className = "activity-card";

        card.innerHTML = `
            <div class="activity-icon">
                ${activity.icon}
            </div>

            <h3>${activity.name}</h3>

            <span class="badge">
                Priority #${index + 1}
            </span>

            <p>${activity.description}</p>

            <div class="activity-info">
                <span>⏱ ${activity.duration} min</span>
                <span>⭐ Score: ${activity.score}</span>
            </div>
        `;

        container.appendChild(card);
    });
}


// --------------------------------------------
// 7. ACTIVITY COMPLETION
// Uses SET to avoid duplicate completion
// --------------------------------------------

function completeActivity(id) {

    if (completedActivities.has(id)) {

        completedActivities.delete(id);

    } else {

        completedActivities.add(id);

        alert("Activity completed! 🌱 Keep going!");
    }

        updateProgress();
    displayActivities();
}

// --------------------------------------------
// 8. PROGRESS CALCULATION
// --------------------------------------------

function updateProgress() {

    const completed =
        completedActivities.size;

    const total =
        activities.length;

    const percentage =
        Math.round((completed / total) * 100);

    document.getElementById("completedCount")
        .textContent = completed;

    document.getElementById("totalCount")
        .textContent = total;

    document.getElementById("progressPercent")
        .textContent = percentage + "%";

    document.getElementById("progressFill")
        .style.width = percentage + "%";


}


// --------------------------------------------
// Scroll to activities
// --------------------------------------------

function scrollToActivities() {

    document.getElementById("activities")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// --------------------------------------------
// Start application
// --------------------------------------------

displayActivities();

// --------------------------------------------
// USER PROFILE
// --------------------------------------------

function saveProfile() {

    const name =
        document.getElementById("userName").value.trim();

    const goal =
        document.getElementById("wellnessGoal").value;

    const message =
        document.getElementById("profileMessage");

    if (name === "") {

        message.textContent =
            "Please enter your name first.";

        return;
    }

    message.textContent =
        `Welcome, ${name}! Your wellness goal is ${goal}. 🌱`;

    userPreferences.set(goal, 1);
}

// --------------------------------------------
// ACTIVITY HISTORY
// --------------------------------------------

function updateHistory() {

    const container =
        document.getElementById("historyContainer");

    if (!container) return;

    container.innerHTML = "";

    if (completedActivities.size === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No activities completed yet.
                Start your wellness journey! 🌱
            </p>
        `;

        return;
    }

    completedActivities.forEach(id => {

        const activity =
            activities.find(item => item.id === id);

        if (!activity) return;

        const historyItem =
            document.createElement("div");

        historyItem.className = "history-item";

        historyItem.innerHTML = `
            <div class="history-item-left">

                <div class="history-item-icon">
                    ${activity.icon}
                </div>

                <div>
                    <h3>${activity.name}</h3>
                    <p>${activity.category} • ${activity.duration} minutes</p>
                </div>

            </div>

            <span class="completed-label">
                ✓ Completed
            </span>
        `;

        container.appendChild(historyItem);
    });
}