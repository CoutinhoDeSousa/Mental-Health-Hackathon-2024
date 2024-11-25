document.getElementById("submit-btn").addEventListener("click", async () => {
    const mood = document.getElementById("mood-select").value;

    // API Request senden
    const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood })
    });
    const data = await response.json();

    // Empfehlungen anzeigen
    const recommendationList = document.getElementById("recommendation-list");
    recommendationList.innerHTML = "";
    data.recommendation.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        li.classList.add("list-group-item");
        recommendationList.appendChild(li);
    });
});

// Button für alle Angebote
document.getElementById("fetch-offers-btn").addEventListener("click", async () => {
    // API-Request an den /offers-Endpoint
    const response = await fetch("http://localhost:3000/api/offers");
    const data = await response.json();

    // Angebote in der Liste anzeigen
    const offerList = document.getElementById("offer-list");
    offerList.innerHTML = ""; // Liste leeren
    data.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = item.name; // Name des Angebots
        offerList.appendChild(li);
    });
});
