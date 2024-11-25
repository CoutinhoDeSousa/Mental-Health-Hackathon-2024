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
        recommendationList.appendChild(li);
    });
});