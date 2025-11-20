# 🚀 IAH Creations - Advanced Features Documentation

## Version 3.7.0 - Multi-Modal AI Platform

---

## 🎉 **NEW FEATURES ADDED**

### 1. **MediaHub** - Multi-Modal File Upload

### 2. **VoiceEngine** - Voice Recognition & Synthesis

### 3. **Gemini Live** - Real-time AI Conversations

### 4. **Brainstorming Assistant** - Creative Ideation

### 5. **Freemium Business Model** - Usage Limits & Tiers

---

## 📁 **MediaHub - File Upload System**

### **Supported Formats:**

**Video**: MP4, WebM, MOV, AVI  
**Audio**: MP3, WAV, OGG, M4A, AAC  
**Text**: TXT, PDF, DOC, DOCX, MD

### **File Size Limits:**

| Tier       | Max File Size |
| ---------- | ------------- |
| Free       | 10 MB         |
| Pro        | 100 MB        |
| Enterprise | 500 MB        |

### **Usage Examples:**

```javascript
// Upload a file
const file = document.getElementById("fileInput").files[0];

try {
  const result = await MediaHub.uploadFile(file, FreemiumModel.currentTier);
  console.log("File processed:", result);

  // For video files
  if (result.type === "video") {
    console.log("Duration:", result.duration, "seconds");
    console.log("Thumbnail:", result.thumbnail); // Base64 image
  }

  // For audio files
  if (result.type === "audio") {
    console.log("Duration:", result.duration, "seconds");
  }

  // For text files
  if (result.type === "text") {
    console.log("Word count:", result.wordCount);
    console.log("Content preview:", result.content.substring(0, 100));
  }
} catch (error) {
  console.error("Upload failed:", error.message);
  showToast(error.message, "error");
}
```

### **HTML Implementation:**

```html
<input
  type="file"
  id="fileInput"
  accept=".mp4,.webm,.mov,.mp3,.wav,.txt,.pdf"
/>
<button onclick="handleFileUpload()">Upload & Analyze</button>

<script>
  async function handleFileUpload() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      showToast("Please select a file", "error");
      return;
    }

    try {
      // Check freemium limit
      FreemiumModel.useFeature("fileUploads");

      // Upload file
      const result = await MediaHub.uploadFile(file, FreemiumModel.currentTier);

      showToast(`File processed: ${result.name}`, "success");

      // Send to AI for analysis
      const aiAnalysis = await AIHub.callGemini(
        `Analyze this ${result.type} file: ${result.name}`,
        { fileData: result }
      );

      console.log("AI Analysis:", aiAnalysis);
    } catch (error) {
      showToast(error.message, "error");
    }
  }
</script>
```

---

## 🎤 **VoiceEngine - Voice Recognition & Synthesis**

### **Features:**

- ✅ Real-time speech recognition
- ✅ Text-to-speech synthesis
- ✅ Multi-language support
- ✅ Adjustable voice parameters

### **Voice Recognition:**

```javascript
// Start listening
VoiceEngine.startListening(
  (transcript, isFinal) => {
    console.log("Heard:", transcript);

    if (isFinal) {
      // Process final transcript
      handleVoiceCommand(transcript);
    }
  },
  (error) => {
    console.error("Voice error:", error);
  }
);

// Stop listening
VoiceEngine.stopListening();
```

### **Text-to-Speech:**

```javascript
// Speak text
VoiceEngine.speak("Hello! I can help you with your design needs.");

// Speak with custom options
VoiceEngine.speak("Welcome to IAH Creations", {
  rate: 1.2, // Speed (0.1 - 10)
  pitch: 1.0, // Pitch (0 - 2)
  volume: 1.0, // Volume (0 - 1)
  lang: "en-US", // Language
});

// Stop speaking
VoiceEngine.stopSpeaking();
```

### **Voice Search Implementation:**

```html
<button id="voiceSearchBtn">🎤 Voice Search</button>

<script>
  document.getElementById("voiceSearchBtn").addEventListener("click", () => {
    VoiceEngine.startListening(
      async (transcript, isFinal) => {
        if (isFinal && transcript.trim()) {
          // Execute search
          const results = await QuantumQueryEngine.search(transcript);
          renderSearchResults(results);

          // Speak results
          VoiceEngine.speak(
            `Found ${results.length} templates for ${transcript}`
          );
        }
      },
      (error) => {
        showToast("Voice search failed", "error");
      }
    );
  });
</script>
```

---

## 💬 **Gemini Live - Real-time AI Conversations**

### **Features:**

- ✅ Contextual conversations
- ✅ Voice-activated mode
- ✅ Conversation history
- ✅ Real-time responses

### **Start Live Conversation:**

```javascript
// Start live session
await GeminiLive.startLive();
// AI speaks: "Hello! I'm your AI assistant. How can I help you today?"

// Send message (text)
const response = await GeminiLive.processMessage(
  "I need a modern e-commerce website",
  false // don't include voice
);
console.log("AI response:", response);

// Stop live session
GeminiLive.stopLive();
```

### **Voice-Activated Conversation:**

```javascript
// Start voice conversation
GeminiLive.startVoiceConversation();

// User speaks: "Show me portfolio templates"
// AI automatically responds with voice

// The system:
// 1. Listens to user
// 2. Processes with AI
// 3. Speaks response
// 4. Waits for next input
```

### **Conversation History:**

```javascript
// Get conversation history
console.log(GeminiLive.conversationHistory);

// Output:
// [
//   { role: 'user', content: 'Hello', timestamp: 1234567890 },
//   { role: 'assistant', content: 'Hi! How can I help?', timestamp: 1234567891 },
//   ...
// ]
```

---

## 💡 **Brainstorming Assistant**

### **Start Brainstorming Session:**

```javascript
// Start session
const ideas = await BrainstormingAssistant.startSession(
  "Modern UI/UX trends for 2025",
  { industry: "web design", target: "millennials" }
);

console.log("Initial ideas:", ideas);
// Returns 5 creative ideas

ideas.forEach((idea, index) => {
  console.log(`${index + 1}. ${idea.title}`);
  console.log(`   ${idea.description}`);
});
```

### **Generate More Ideas:**

```javascript
// Generate 3 more unique ideas
const newIdeas = await BrainstormingAssistant.generateMore(3);

console.log("New ideas:", newIdeas);
```

### **Expand on Idea:**

```javascript
// Expand idea #2
const expansion = await BrainstormingAssistant.expandIdea(1);

console.log("Expanded idea:", expansion);
// Returns detailed explanation, steps, and challenges
```

### **End Session:**

```javascript
// End and save session
const sessionData = BrainstormingAssistant.endSession();

console.log("Session summary:", sessionData);
// {
//   topic: '...',
//   startedAt: timestamp,
//   endedAt: timestamp,
//   totalIdeas: 8,
//   ideas: [...]
// }
```

---

## 💰 **Freemium Business Model**

### **Pricing Tiers:**

| Feature             | Free   | Pro (₹999/month) | Enterprise (₹4999/month) |
| ------------------- | ------ | ---------------- | ------------------------ |
| AI Queries          | 10/day | 1,000/day        | Unlimited                |
| File Uploads        | 3/day  | 100/day          | Unlimited                |
| Voice Minutes       | 5/day  | 60/day           | Unlimited                |
| Brainstorm Sessions | 1/day  | 20/day           | Unlimited                |
| Max File Size       | 10MB   | 100MB            | 500MB                    |
| Gemini Live         | ❌     | ✅               | ✅                       |
| API Access          | ❌     | ❌               | ✅                       |
| Priority Support    | ❌     | ✅               | ✅                       |

### **Check Feature Availability:**

```javascript
// Check if user can use voice feature
const check = FreemiumModel.canUseFeature("voiceMinutes");

if (check.allowed) {
  console.log(`You have ${check.remaining} voice minutes remaining`);
  // Use the feature
} else {
  console.log("Limit reached! Please upgrade to Pro.");
  showUpgradeModal();
}
```

### **Use Feature (with quota tracking):**

```javascript
try {
  // Attempt to use feature
  const result = FreemiumModel.useFeature("aiQueries");

  console.log(`Success! ${result.remaining} queries remaining today`);

  // Proceed with AI query
  const response = await AIHub.callGemini(prompt);
} catch (error) {
  // Limit reached
  console.error(error.message);
  showToast("Daily limit reached. Upgrade to continue!", "error");
  showUpgradeModal();
}
```

### **Upgrade User Tier:**

```javascript
// Upgrade to Pro
FreemiumModel.upgradeTier("pro");
// Toast: "Successfully upgraded to Pro!"

// Upgrade to Enterprise
FreemiumModel.upgradeTier("enterprise");
```

### **Get Current Usage:**

```javascript
console.log("Current usage:", FreemiumModel.usage);

// Output:
// {
//   aiQueries: 5,
//   fileUploads: 2,
//   voiceMinutes: 1,
//   brainstormSessions: 1,
//   lastReset: 1234567890
// }
```

### **Display Pricing:**

```javascript
const pricing = FreemiumModel.getPricing();

pricing.forEach((tier) => {
  console.log(`${tier.name}: ${tier.price ? "₹" + tier.price : "Free"}/month`);
  console.log("Features:", tier.limits.features);
});
```

---

## 🎯 **Complete Integration Example**

### **Voice-Activated Design Assistant:**

```javascript
async function startDesignAssistant() {
  // Check freemium limits
  const voiceCheck = FreemiumModel.canUseFeature("voiceMinutes");
  if (!voiceCheck.allowed) {
    showToast("Voice limit reached. Upgrade to Pro!", "error");
    return;
  }

  // Start Gemini Live
  await GeminiLive.startLive();

  // Use voice
  FreemiumModel.useFeature("voiceMinutes");

  // Start voice conversation
  GeminiLive.startVoiceConversation();

  // The flow:
  // 1. User speaks: "I need a landing page for my startup"
  // 2. Voice recognition captures it
  // 3. Gemini processes request
  // 4. AI responds: "I can help you! What's your startup about?"
  // 5. User speaks: "It's a  food delivery app"
  // 6. AI: "Great! I suggest a clean, modern design with..."
  // ... continues conversation
}

// HTML Button
<button onclick="startDesignAssistant()">
  🎤 Start Voice Design Assistant
</button>;
```

### **File Upload with AI Analysis:**

```javascript
async function uploadAndAnalyze(file) {
  try {
    // Check upload limit
    FreemiumModel.useFeature("fileUploads");

    // Upload file
    showToast("Processing file...", "info");
    const fileData = await MediaHub.uploadFile(file, FreemiumModel.currentTier);

    // Check AI query limit
    FreemiumModel.useFeature("aiQueries");

    // Analyze with AI
    const analysis = await AIHub.callGemini(
      `Analyze this ${fileData.type} and suggest design improvements`,
      { fileType: fileData.type, fileName: fileData.name }
    );

    // Display results
    displayAnalysis(analysis);

    // Speak results
    VoiceEngine.speak(analysis.substring(0, 200));
  } catch (error) {
    if (error.message.includes("limit")) {
      showUpgradeModal();
    } else {
      showToast(error.message, "error");
    }
  }
}
```

---

## 📊 **Usage Monitoring Dashboard:**

```javascript
function renderUsageDashboard() {
  const tier = FreemiumModel.tiers[FreemiumModel.currentTier];
  const usage = FreemiumModel.usage;

  return `
    <div class="usage-dashboard">
      <h3>Current Plan: ${tier.name}</h3>
      
      <div class="usage-stats">
        ${Object.keys(usage)
          .map((key) => {
            if (key === "lastReset") return "";

            const limit = tier.limits[key];
            const used = usage[key];
            const percentage = limit === -1 ? 0 : (used / limit) * 100;

            return `
            <div class="stat">
              <label>${key}</label>
              <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%"></div>
              </div>
              <span>${used} / ${limit === -1 ? "∞" : limit}</span>
            </div>
          `;
          })
          .join("")}
      </div>
      
      ${
        FreemiumModel.currentTier === "free"
          ? `
        <button onclick="showUpgradeModal()">
          Upgrade to Pro - ₹999/month
        </button>
      `
          : ""
      }
    </div>
  `;
}
```

---

## 🔒 **Security & Privacy**

### **Data Protection:**

- ✅ Files processed locally (no server upload in demo)
- ✅ Usage data stored in localStorage
- ✅ Voice data not recorded
- ✅ Conversation history cleared on logout

### **Best Practices:**

```javascript
// Sanitize file names
function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}

// Validate file type
function isAllowedFileType(file) {
  const allowedTypes = [
    "video/mp4",
    "video/webm",
    "audio/mp3",
    "audio/wav",
    "text/plain",
    "application/pdf",
  ];
  return allowedTypes.includes(file.type);
}

// Example usage
if (!isAllowedFileType(file)) {
  throw new Error("File type not allowed");
}
```

---

## 📱 **Mobile Optimization**

All features are fully optimized for mobile:

- ✅ Touch-friendly file upload
- ✅ Mobile voice recognition
- ✅ Responsive UI for all views
- ✅ Optimized for slow connections
- ✅ Progressive enhancement

---

## 🚀 **Deployment Checklist**

Before going live:

- [ ] Configure Gemini API key
- [ ] Set up payment gateway for upgrades
- [ ] Configure file storage (Firebase Storage)
- [ ] Set up usage analytics
- [ ] Test voice features on all browsers
- [ ] Verify freemium limits
- [ ] Add upgrade payment flow
- [ ] Test file upload limits
- [ ] Configure email notifications
- [ ] Set up customer support chat

---

## 📞 **Support**

For advanced features support:

- **Email**: premium@iahcreations.com
- **Pro Support**: Available 24/7 for Pro+ users
- **Documentation**: Check console logs for debugging

---

**Built with ❤️ by IAH Creations**  
_Powered by Gemini 2.0 Flash, MediaHub, VoiceEngine, and BrainstormingAI_  
_Jaipur, Rajasthan, India 🇮🇳_

---

## 🎉 **Version 3.7.0 - Ready for Commercial Launch!**
