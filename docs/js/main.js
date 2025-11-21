import { predictSales, getChurnProbability, getRecommendations } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("salesForm");
    const resultDiv = document.getElementById("salesResult");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            num_of_order: parseInt(document.getElementById("num_of_order").value),
            sales_lag_1: parseFloat(document.getElementById("sales_lag_1").value),
            sales_lag_2: parseFloat(document.getElementById("sales_lag_2").value),
            sales_lag_3: parseFloat(document.getElementById("sales_lag_3").value),
            sales_lag_4: parseFloat(document.getElementById("sales_lag_4").value),
            rolling_mean_4: parseFloat(document.getElementById("rolling_mean_4").value),
            rolling_std_4: parseFloat(document.getElementById("rolling_std_4").value),
            year: parseInt(document.getElementById("year").value),
            month: parseInt(document.getElementById("month").value),
            week_of_year: parseInt(document.getElementById("week_of_year").value)
        };

        resultDiv.textContent = "Predicting...";
        const response = await predictSales(data);

        if (response.error) {
            resultDiv.textContent = "Error: " + response.error;
        } else {
            resultDiv.textContent = `Predicted Sales: ₹${response.predicted_sales.toFixed(2)}`;
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {

    // -------------------
    // CHURN PREDICTION
    // -------------------
    const churnBtn = document.getElementById("churnBtn");
    const churnResult = document.getElementById("churnResult");

    churnBtn.addEventListener("click", async () => {
        const customer_id = document.getElementById("customer_id_input").value.trim();

        if (!customer_id) {
            churnResult.textContent = "Please enter a valid customer_id";
            return;
        }

        churnResult.textContent = "Checking...";

        const response = await getChurnProbability(customer_id);

        if (response.error) {
            churnResult.style.color = "red";
            churnResult.textContent = `Error: ${response.error}`;
        } else {
            const prob = parseFloat(response.probability.replace('%', ''));
            churnResult.style.color = prob > 70 ? "red" : prob > 40 ? "orange" : "green";
            churnResult.textContent =
                `Churn Probability: ${response.probability}`;
        }

    });

});
// --- Recommendations UI wiring ---
const recBtn = document.getElementById("recBtn");
const recResult = document.getElementById("recResult");
const productInput = document.getElementById("product_id_input");

recBtn.addEventListener("click", async () => {
    recResult.textContent = "";
    const product_id = productInput.value.trim();

    if (!product_id) {
        recResult.style.color = "red";
        recResult.textContent = "Please enter a valid product id.";
        return;
    }

    recResult.style.color = "";
    recResult.textContent = "Fetching recommendations...";

    const response = await getRecommendations(product_id);

    if (response.error) {
        recResult.style.color = "red";
        recResult.textContent = `Error: ${response.error}`;
        return;
    }

    const recs = response.recommendations;
    const scores = response.average_review_score;

    if (!Array.isArray(recs) || !Array.isArray(scores)) {
        recResult.style.color = "orange";
        recResult.textContent = "Unexpected response from server.";
        console.log("Recommendations response:", response);
        return;
    }

    // render list
    recResult.style.color = "";
    recResult.innerHTML = `
        <div>
            <strong>Recommended Product Id's:</strong>
            <ol id="rec_list"></ol>
        </div>
    `;

    const recList = document.getElementById("rec_list");

    // Helper: returns percentage width for stars-inner based on score (score/5*100)
    const starPercent = (n) => {
        if (n === null || n === undefined || isNaN(n)) return 0;
        const s = Math.max(0, Math.min(5, Number(n)));
        return (s / 5) * 100;
    };

    recs.forEach((pid, idx) => {
        const score = scores[idx];

        const li = document.createElement("li");

        // product id
        const codeEl = document.createElement("code");
        codeEl.textContent = pid;
        codeEl.style.marginRight = "0.6rem";

        // numeric score
        const scoreEl = document.createElement("span");
        scoreEl.textContent = (score !== undefined && score !== null && !isNaN(score)) ? `Reviews: ${score}` : "Avg: N/A";
        scoreEl.style.fontWeight = "600";
        scoreEl.style.marginRight = "0.6rem";

        // star container (outer) - must contain inner as a child
        const starsOuter = document.createElement("span");
        starsOuter.className = "stars-outer";
        // create inner and append into outer
        const starsInner = document.createElement("span");
        starsInner.className = "stars-inner";
        const pct = starPercent(score);
        starsInner.style.width = `${pct}%`;
        // set text content on both
        starsOuter.textContent = "★★★★★";
        starsInner.textContent = "★★★★★";
        // inner must be appended INSIDE outer so absolute positioning is relative
        starsOuter.appendChild(starsInner);

        // assemble
        li.appendChild(codeEl);
        li.appendChild(scoreEl);
        li.appendChild(starsOuter);

        recList.appendChild(li);
    });
});

import { analyzeSentiment } from "./api.js";

// --- Sentiment Analysis ---
const sentimentBtn = document.getElementById("sentimentBtn");
const sentimentInput = document.getElementById("sentiment_input");
const sentimentResult = document.getElementById("sentimentResult");
const sentimentTranslated = document.getElementById("sentimentTranslated");
const sentimentProb = document.getElementById("sentimentProb");

sentimentBtn.addEventListener("click", async () => {
    const reviewText = sentimentInput.value.trim();

    if (!reviewText) {
        sentimentResult.style.color = "red";
        sentimentResult.textContent = "Please enter a review.";
        return;
    }

    sentimentResult.style.color = "";
    sentimentResult.textContent = "Analyzing...";

    const response = await analyzeSentiment(reviewText);

    if (response.error) {
        sentimentResult.style.color = "red";
        sentimentResult.textContent = `Error: ${response.error}`;
        return;
    }

    sentimentResult.style.color = 
        response.prediction === "Positive" ? "#34d399" : "#ff6b6b";

    sentimentResult.textContent = `Prediction: ${response.prediction}`;

    sentimentTranslated.innerHTML = `
        <strong>Translated:</strong> ${response.translated}
    `;

    // probability visual
    const neg = parseFloat(response.probability.Negative);
    const pos = parseFloat(response.probability.Positive);

    sentimentProb.innerHTML = `
        <div class="score-pill">Negative: ${neg}%</div>
        <div class="score-pill">Positive: ${pos}%</div>
    `;
});
