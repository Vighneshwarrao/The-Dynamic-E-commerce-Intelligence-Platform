// Use ONE base URL for your backend
const BASE_URL = "http://127.0.0.1:9835";

// -------------------------------
// SALES PREDICTION
// -------------------------------
export async function predictSales(data) {
    try {
        const res = await fetch(`${BASE_URL}/predict/sales`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const text = await res.text();
        console.log("Sales raw response:", text);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${text}`);
        }

        return JSON.parse(text);
    } catch (err) {
        console.error("Prediction error:", err);
        return { error: err.message };
    }
}

// -------------------------------
// CHURN PREDICTION
// -------------------------------
export async function getChurnProbability(customer_id) {
    try {
        const url = `${BASE_URL}/predict/churnprob?customer_id=${encodeURIComponent(customer_id)}`;
        const response = await fetch(url);

        const text = await response.text();
        console.log("Churn raw response:", text);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${text}`);
        }

        return JSON.parse(text);
    } catch (err) {
        console.error("Churn fetch error:", err);
        return { error: err.message };
    }
}

// -------------------------------
// PRODUCT RECOMMENDATIONS
// -------------------------------
export async function getRecommendations(product_id) {
    try {
        const url = `${BASE_URL}/recommend/products?product_id=${encodeURIComponent(product_id)}`;
        const res = await fetch(url);
        const text = await res.text();
        console.log("Recommendations raw response:", text);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return JSON.parse(text); // expects { recommendations: [...] }
    } catch (err) {
        console.error("Recommendations fetch error:", err);
        return { error: err.message };
    }
}


// -------------------------------
// SENTIMENT ANALYSIS
// -------------------------------
export async function analyzeSentiment(reviewText) {
    try {
        const res = await fetch(`${BASE_URL}/analyze/sentiment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review: reviewText })
        });

        const text = await res.text();
        console.log("Sentiment raw response:", text);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return JSON.parse(text);
    } catch (err) {
        console.error("Sentiment fetch error:", err);
        return { error: err.message };
    }
}
