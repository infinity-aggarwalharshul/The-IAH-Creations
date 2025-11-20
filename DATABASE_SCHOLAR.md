# 🗄️ DatabaseHub & Google Scholar - Complete Documentation

## Google Cloud Database Integration + Academic Research

---

## 🎉 **Overview**

The platform now includes **comprehensive Google Cloud database support** from basic to enterprise level, plus **Google Scholar integration** for academic research (Pro/Enterprise only).

---

## 🗄️ **DATABASE HUB - Multi-Database System**

### **Tier-Based Database Access:**

| Database           | Free | Pro | Enterprise | Best For                        |
| ------------------ | ---- | --- | ---------- | ------------------------------- |
| **Firestore**      | ✅   | ✅  | ✅         | Real-time data, mobile apps     |
| **Cloud SQL**      | ❌   | ✅  | ✅         | Relational data, transactions   |
| **BigQuery**       | ❌   | ❌  | ✅         | Analytics, data warehouse       |
| **Cloud Spanner**  | ❌   | ❌  | ✅         | Global scale, high availability |
| **Cloud Bigtable** | ❌   | ❌  | ✅         | IoT, time-series, big data      |

---

## 📖 **Database Usage Examples**

### **1. FIRESTORE - Real-time NoSQL** (All Tiers)

```javascript
// Create document
const newUser = await DatabaseHub.firestore.create("users", {
  name: "John Doe",
  email: "john@example.com",
  role: "customer",
});
console.log("User created:", newUser.id);

// Read document
const user = await DatabaseHub.firestore.read("users", "userId123");
console.log("User data:", user);

// Query documents
const premiumUsers = await DatabaseHub.firestore.query("users", [
  { field: "plan", operator: "==", value: "pro" },
  { field: "active", operator: "==", value: true },
]);
console.log("Premium users:", premiumUsers);

// Real-time listener
const unsubscribe = DatabaseHub.firestore.listen("orders", (orders) => {
  console.log("Orders updated:", orders);
  renderOrders(orders);
});

// Stop listening
unsubscribe();
```

---

### **2. CLOUD SQL - Relational Database** (Pro/Enterprise)

```javascript
// Simple query
const results = await DatabaseHub.cloudSQL.query(
  "SELECT * FROM products WHERE category = ? AND price < ?",
  ["electronics", 1000]
);

// Transaction
const orders = await DatabaseHub.cloudSQL.transaction([
  {
    sql: "INSERT INTO orders (user_id, total) VALUES (?, ?)",
    params: [userId, 999],
  },
  {
    sql: "UPDATE inventory SET stock = stock - ? WHERE product_id = ?",
    params: [1, productId],
  },
  {
    sql: "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
    params: [orderId, productId, 1],
  },
]);

console.log("Transaction completed:", orders);
```

---

### **3. BIGQUERY - Data Warehouse** (Enterprise Only)

```javascript
// Run analytics query
const analytics = await DatabaseHub.bigQuery.runQuery(`
  SELECT 
    DATE(created_at) as date,
    COUNT(*) as orders,
    SUM(total) as revenue
  FROM orders
  WHERE created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  GROUP BY date
  ORDER BY date DESC
`);

console.log("30-day analytics:", analytics.rows);

// Run ML model
const predictions = await DatabaseHub.bigQuery.runMLModel(
  "churn_prediction_model",
  {
    user_id: 12345,
    last_purchase_days: 45,
    lifetime_value: 5000,
  }
);

console.log("Churn probability:", predictions.predictions[0]);
```

---

### **4. CLOUD SPANNER - Distributed SQL** (Enterprise Only)

```javascript
// Global transaction across regions
const result = await DatabaseHub.spanner.globalTransaction([
  {
    region: "us-central1",
    sql: "INSERT INTO users (id, name, region) VALUES (?, ?, ?)",
    params: [userId, "John", "US"],
  },
  {
    region: "asia-east1",
    sql: "INSERT INTO user_preferences (user_id, language) VALUES (?, ?)",
    params: [userId, "en"],
  },
]);

console.log("Global transaction success:", result.success);
console.log("Commit timestamp:", result.commitTimestamp);
```

---

### **5. CLOUD BIGTABLE - NoSQL Big Data** (Enterprise Only)

```javascript
// Write IoT sensor data
await DatabaseHub.bigtable.write("sensor_data", "sensor_123_20250120", {
  temperature: 23.5,
  humidity: 65,
  timestamp: Date.now(),
});

// Read specific data
const sensorData = await DatabaseHub.bigtable.read(
  "sensor_data",
  "sensor_123_20250120"
);

// Scan time range
const timeSeriesData = await DatabaseHub.bigtable.scan(
  "sensor_data",
  "sensor_123_20250101",
  "sensor_123_20250131",
  1000 // limit
);

console.log("Time series data:", timeSeriesData);
```

---

## 🎓 **GOOGLE SCHOLAR HUB** (Pro/Enterprise Only)

### **Academic Research Features:**

```javascript
// Check access
if (GoogleScholarHub.hasAccess()) {
  console.log("Scholar access granted!");
}

// Search papers
const research = await GoogleScholarHub.searchPapers("machine learning", {
  limit: 20,
  yearFrom: 2020,
  yearTo: 2024,
  sortBy: "relevance", // or 'date'
});

console.log("Found papers:", research.results);
// [
//   {
//     title: '...',
//     authors: ['Smith, J.', 'Doe, A.'],
//     year: 2024,
//     citations: 156,
//     link: 'https://...',
//     snippet: '...',
//     source: 'Journal Name',
//     pdfLink: 'https://...'
//   },
//   ...
// ]
```

---

### **Research Analysis:**

```javascript
// Analyze research topic with AI
const analysis = await GoogleScholarHub.analyzeResearchTopic(
  "quantum computing"
);

console.log("Topic:", analysis.topic);
console.log("Total papers found:", analysis.paperCount); // 1250
console.log("Top 5 papers:", analysis.topPapers);
console.log("AI Analysis:", analysis.aiAnalysis);
console.log("Publication trends:", analysis.trends);
console.log("Key authors:", analysis.keyAuthors);

// Output:
// {
//   topic: 'quantum computing',
//   paperCount: 1250,
//   topPapers: [...],
//   aiAnalysis: "Quantum computing research has seen exponential growth...",
//   trends: {
//     publicationTrend: { 2024: 45, 2023: 62, 2022: 43 },
//     trending: true
//   },
//   keyAuthors: [
//     { name: 'Smith, J.', papers: 5, totalCitations: 500 },
//     ...
//   ]
// }
```

---

### **Bibliography Generation:**

```javascript
// Search papers
const papers = await GoogleScholarHub.searchPapers("web development trends", {
  limit: 5,
});

// Generate APA bibliography
const apaBibliography = await GoogleScholarHub.generateBibliography(
  papers.results,
  "apa"
);

console.log(apaBibliography);
// Smith, J., Johnson, A. (2024). Advances in AI and Machine Learning for Web Development. Journal of Web Technologies.
//
// Williams, R., Brown, M. (2023). Cloud-Native Application Design Patterns. IEEE Cloud Computing.

// Generate MLA bibliography
const mlaBibliography = await GoogleScholarHub.generateBibliography(
  papers.results,
  "mla"
);

// Generate Chicago style
const chicagoBibliography = await GoogleScholarHub.generateBibliography(
  papers.results,
  "chicago"
);
```

---

### **Export Research Data:**

```javascript
// Export as JSON
const jsonData = GoogleScholarHub.exportResearch(papers.results, "json");

// Export as CSV
const csvData = GoogleScholarHub.exportResearch(papers.results, "csv");

// Export as BibTeX
const bibtexData = GoogleScholarHub.exportResearch(papers.results, "bibtex");

console.log(bibtexData);
// @article{paper1,
//   title={Advances in AI and Machine Learning for Web Development},
//   author={Smith, J. and Johnson, A.},
//   year={2024},
//   journal={Journal of Web Technologies}
// }

// Download as file
const blob = new Blob([bibtexData], { type: "text/plain" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "research.bib";
a.click();
```

---

### **Citation Analysis:**

```javascript
// Get citation information
const citations = await GoogleScholarHub.getCitations("paper_id_123");

console.log("Total citations:", citations.totalCitations); // 150
console.log("Citations by year:", citations.citationsByYear);
// { '2024': 45, '2023': 62, '2022': 43 }
```

---

## 🎯 **Complete Integration Example**

### **Research-Powered Content Creation:**

```javascript
async function createResearchArticle(topic) {
  try {
    // 1. Check Pro/Enterprise access
    if (!GoogleScholarHub.hasAccess()) {
      showToast("Upgrade to Pro for Scholar access", "error");
      return;
    }

    // 2. Search academic papers
    const papers = await GoogleScholarHub.searchPapers(topic, {
      limit: 10,
      yearFrom: 2020,
      sortBy: "relevance",
    });

    // 3. Analyze with AI
    const analysis = await GoogleScholarHub.analyzeResearchTopic(topic);

    // 4. Generate article outline using AI
    const outline = await AIHub.callGemini(
      `Create a comprehensive article outline on "${topic}" based on these research papers: ${JSON.stringify(
        analysis.topPapers
      )}`,
      { mode: "writing" }
    );

    // 5. Store in database
    const article = await DatabaseHub.firestore.create("articles", {
      topic: topic,
      outline: outline,
      papers: papers.results,
      analysis: analysis.aiAnalysis,
      status: "draft",
      author: state.user.name,
    });

    // 6. Generate bibliography
    const bibliography = await GoogleScholarHub.generateBibliography(
      papers.results,
      "apa"
    );

    // 7. Complete article data
    await DatabaseHub.firestore.create("bibliographies", {
      articleId: article.id,
      content: bibliography,
      format: "apa",
    });

    showToast("Research article created!", "success");
    return article;
  } catch (error) {
    console.error("Error:", error);
    showToast(error.message, "error");
  }
}

// Usage
createResearchArticle("Cloud Computing Security");
```

---

## 💰 **Freemium Access Matrix**

### **Database Access:**

| Feature             | Free     | Pro      | Enterprise |
| ------------------- | -------- | -------- | ---------- |
| Firestore Reads     | 1000/day | 100K/day | Unlimited  |
| Firestore Writes    | 100/day  | 10K/day  | Unlimited  |
| Cloud SQL Queries   | ❌       | 1000/day | Unlimited  |
| BigQuery Queries    | ❌       | ❌       | 1000/month |
| Spanner Queries     | ❌       | ❌       | 10K/day    |
| Bigtable Operations | ❌       | ❌       | Unlimited  |

### **Scholar Access:**

| Feature              | Free | Pro    | Enterprise |
| -------------------- | ---- | ------ | ---------- |
| Paper Search         | ❌   | 50/day | 500/day    |
| Citation Analysis    | ❌   | 25/day | Unlimited  |
| Bibliography Gen     | ❌   | 50/day | Unlimited  |
| AI Research Analysis | ❌   | 10/day | 100/day    |
| Export Formats       | ❌   | All    | All        |

---

## 🚀 **Production Setup**

### **Google Cloud Database Setup:**

```bash
# 1. Enable APIs
gcloud services enable firestore.googleapis.com
gcloud services enable sql-component.googleapis.com
gcloud services enable bigquery.googleapis.com
gcloud services enable spanner.googleapis.com
gcloud services enable bigtable.googleapis.com

# 2. Create Firestore database
gcloud firestore databases create --region=us-central1

# 3. Create Cloud SQL instance
gcloud sql instances create iah-creations-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=us-central1

# 4. Create BigQuery dataset
bq mk --dataset --location=US iah_analytics

# 5. Create Spanner instance
gcloud spanner instances create iah-spanner \
  --config=regional-us-central1 \
  --description="IAH Creations DB" \
  --nodes=1

# 6. Create Bigtable instance
gcloud bigtable instances create iah-bigtable \
  --cluster=iah-cluster \
  --cluster-zone=us-central1-a \
  --display-name="IAH Bigtable"
```

### **Google Scholar API Setup:**

```javascript
// Use SerpAPI for Google Scholar
// Sign up at: https://serpapi.com/

const GoogleScholarHub = {
  apiKey: "YOUR_SERPAPI_KEY",

  async searchPapers(query, options) {
    const response = await fetch(
      `https://serpapi.com/search?engine=google_scholar&q=${encodeURIComponent(
        query
      )}&api_key=${this.apiKey}&num=${options.limit}`
    );

    const data = await response.json();
    return {
      results: data.organic_results,
      totalResults: data.search_information.total_results,
    };
  },
};
```

---

## 📊 **Usage Monitoring:**

```javascript
// Monitor database usage
function renderDatabaseStats() {
  return `
    <div class="db-stats">
      <h3>Database Usage</h3>
      
      <div class="stat">
        <label>Firestore Reads</label>
        <progress value="500" max="1000"></progress>
        <span>500 / 1000 today</span>
      </div>
      
      <div class="stat">
        <label>Scholar Searches</label>
        <progress value="25" max="50"></progress>
        <span>25 / 50 today</span>
      </div>
      
      ${
        FreemiumModel.currentTier === "free"
          ? `
        <button onclick="showUpgradeModal()">
          Upgrade for More Access
        </button>
      `
          : ""
      }
    </div>
  `;
}
```

---

## 🎓 **Best Practices**

1. **Use appropriate database for workload**

   - Real-time → Firestore
   - Relational → Cloud SQL
   - Analytics → BigQuery
   - Global scale → Spanner
   - Big data → Bigtable

2. **Cache Scholar results** to save API calls

3. **Batch operations** when possible

4. **Monitor quotas** to avoid overage charges

5. **Use transactions** for data consistency

---

## 📞 **Support**

- **Database Issues**: Check Google Cloud Console
- **Scholar Access**: Verify tier and quotas
- **API Errors**: Check console logs

---

**Built with ❤️ by IAH Creations**  
_Powered by Google Cloud Platform & Google Scholar_  
_Enterprise-Grade Database Infrastructure_ 🗄️

---

## 🎉 **Version 3.9.0 - Database & Research Ready!**
