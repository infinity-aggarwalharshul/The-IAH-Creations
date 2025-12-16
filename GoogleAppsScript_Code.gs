/**
 * ============================================
 * THE IAH CREATIONS - GOOGLE FORMS AUTOMATION
 * ============================================
 * Version: 2.0.0 (Commercial Release)
 * Author: The IAH Creations Team
 * Email: theiahcreations@gmail.com
 * Location: Jaipur, Rajasthan, India
 *
 * This script creates and manages Google Forms
 * for client project requests and inquiries.
 *
 * IMPORTANT: Copy this code to Google Apps Script Editor
 * at: https://script.google.com/
 * ============================================
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  FORM_TITLE: "The IAH Creations - Project Request Form",
  FORM_DESCRIPTION:
    "Submit your project requirements and get a custom quote within 24 hours.",
  NOTIFICATION_EMAIL: "theiahcreations@gmail.com",
  SPREADSHEET_NAME: "IAH Creations - Form Responses",
  VERSION: "2.0.0",
};

// ============================================
// MAIN FUNCTION - Create IAH Form
// ============================================
function createIAHFormCorrected() {
  try {
    // Create the form
    const form = FormApp.create(CONFIG.FORM_TITLE);
    form.setDescription(CONFIG.FORM_DESCRIPTION);
    form.setConfirmationMessage(
      "Thank you for your submission! The IAH Creations team will contact you within 24 hours."
    );
    form.setAllowResponseEdits(false);
    form.setLimitOneResponsePerUser(false);
    form.setProgressBar(true);
    form.setPublishingSummary(false);

    // ========================================
    // SECTION 1: Contact Information
    // ========================================
    form
      .addSectionHeaderItem()
      .setTitle("📋 Contact Information")
      .setHelpText("Please provide your contact details");

    form
      .addTextItem()
      .setTitle("Full Name")
      .setRequired(true)
      .setHelpText("Your full name");

    form
      .addTextItem()
      .setTitle("Email Address")
      .setRequired(true)
      .setHelpText("We'll use this to send you updates");

    form
      .addTextItem()
      .setTitle("Phone Number")
      .setRequired(false)
      .setHelpText("Optional - for urgent communications");

    form
      .addTextItem()
      .setTitle("Company/Organization Name")
      .setRequired(false)
      .setHelpText("If applicable");

    // ========================================
    // SECTION 2: Project Type
    // ========================================
    form
      .addSectionHeaderItem()
      .setTitle("🚀 Project Type")
      .setHelpText("Tell us about your project");

    form
      .addMultipleChoiceItem()
      .setTitle("What type of project do you need?")
      .setRequired(true)
      .setChoiceValues([
        "📱 Mobile App (iOS/Android)",
        "💻 Web Application",
        "🌐 Website",
        "🎨 UI/UX Design",
        "🤖 AI/ML Integration",
        "🔧 Custom Software Solution",
        "📊 Dashboard/Analytics Tool",
        "🛒 E-commerce Platform",
        "🎮 Game Development",
        "⚙️ API Development",
        "Other",
      ]);

    form
      .addCheckboxItem()
      .setTitle("Select all technologies/features you're interested in:")
      .setRequired(false)
      .setChoiceValues([
        "React / React Native",
        "Vue.js / Nuxt.js",
        "Angular",
        "Node.js / Express",
        "Python / Django / Flask",
        "Firebase Integration",
        "AI/ML Features (Gemini, GPT)",
        "Blockchain / Web3",
        "Cloud Deployment (AWS/GCP/Azure)",
        "Real-time Features",
        "Payment Integration",
        "Multi-language Support",
        "Dark Mode Support",
      ]);

    // ========================================
    // SECTION 3: Project Details
    // ========================================
    form
      .addSectionHeaderItem()
      .setTitle("📝 Project Details")
      .setHelpText("Describe your project requirements");

    // CORRECTED: Using addParagraphTextItem() instead of addParagraphItem()
    form
      .addParagraphTextItem()
      .setTitle("Project Description")
      .setRequired(true)
      .setHelpText(
        "Describe your project idea in detail. What problem does it solve? Who is your target audience?"
      );

    // CORRECTED: Using addParagraphTextItem() instead of addParagraphItem()
    form
      .addParagraphTextItem()
      .setTitle("Key Features Required")
      .setRequired(true)
      .setHelpText("List the main features you want in your application");

    form
      .addMultipleChoiceItem()
      .setTitle("Do you have existing designs or wireframes?")
      .setRequired(true)
      .setChoiceValues([
        "Yes, complete designs ready",
        "Yes, rough wireframes/sketches",
        "No, I need design services",
        "I have a reference website/app",
      ]);

    // ========================================
    // SECTION 4: Timeline & Budget
    // ========================================
    form
      .addSectionHeaderItem()
      .setTitle("⏰ Timeline & Budget")
      .setHelpText("Help us understand your constraints");

    form
      .addMultipleChoiceItem()
      .setTitle("What is your expected timeline?")
      .setRequired(true)
      .setChoiceValues([
        "ASAP (Within 1 week)",
        "2-4 weeks",
        "1-2 months",
        "2-3 months",
        "Flexible / No rush",
      ]);

    form
      .addMultipleChoiceItem()
      .setTitle("What is your budget range?")
      .setRequired(true)
      .setChoiceValues([
        "₹5,000 - ₹15,000",
        "₹15,000 - ₹50,000",
        "₹50,000 - ₹1,00,000",
        "₹1,00,000 - ₹5,00,000",
        "₹5,00,000+",
        "Not sure - Please advise",
      ]);

    // ========================================
    // SECTION 5: Additional Information
    // ========================================
    form
      .addSectionHeaderItem()
      .setTitle("💡 Additional Information")
      .setHelpText("Any other details to share");

    // CORRECTED: Using addParagraphTextItem() instead of addParagraphItem()
    form
      .addParagraphTextItem()
      .setTitle("Additional Requirements or Notes")
      .setRequired(false)
      .setHelpText("Any specific features, integrations, or special requests");

    form
      .addMultipleChoiceItem()
      .setTitle("How did you hear about us?")
      .setRequired(false)
      .setChoiceValues([
        "Google Search",
        "Social Media",
        "Referral from friend/colleague",
        "GitHub",
        "Online Directory",
        "Other",
      ]);

    form
      .addCheckboxItem()
      .setTitle("I agree to:")
      .setRequired(true)
      .setChoiceValues([
        "Terms & Conditions of The IAH Creations",
        "Privacy Policy",
      ]);

    // ========================================
    // FORM SETTINGS
    // ========================================
    // Set up email notifications
    ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();

    // Log success
    Logger.log("✅ Form created successfully!");
    Logger.log("📝 Form URL: " + form.getPublishedUrl());
    Logger.log("✏️ Edit URL: " + form.getEditUrl());

    return {
      success: true,
      formUrl: form.getPublishedUrl(),
      editUrl: form.getEditUrl(),
      formId: form.getId(),
      version: CONFIG.VERSION,
    };
  } catch (error) {
    Logger.log("❌ Error creating form: " + error.message);
    throw new Error("Failed to create form: " + error.message);
  }
}

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
function onFormSubmit(e) {
  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();

    // Extract responses
    const formData = {};
    itemResponses.forEach(function (itemResponse) {
      formData[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
    });

    // Send email notification
    sendNotificationEmail(formData);

    // Log to console
    Logger.log("📧 Form submission processed successfully");
    Logger.log("📋 Data: " + JSON.stringify(formData));
  } catch (error) {
    Logger.log("❌ Error processing submission: " + error.message);
  }
}

// ============================================
// EMAIL NOTIFICATION
// ============================================
function sendNotificationEmail(formData) {
  const subject = "🚀 New Project Request - The IAH Creations";

  let body = "A new project request has been submitted!\n\n";
  body += "=".repeat(50) + "\n";

  for (const [key, value] of Object.entries(formData)) {
    if (value) {
      body += `📌 ${key}:\n${
        Array.isArray(value) ? value.join(", ") : value
      }\n\n`;
    }
  }

  body += "=".repeat(50) + "\n";
  body += "\nPlease respond within 24 hours.\n";
  body += "\n- The IAH Creations Automation System";
  body += "\n  Version: " + CONFIG.VERSION;

  MailApp.sendEmail({
    to: CONFIG.NOTIFICATION_EMAIL,
    subject: subject,
    body: body,
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Delete all triggers (for cleanup)
 */
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function (trigger) {
    ScriptApp.deleteTrigger(trigger);
  });
  Logger.log("🗑️ All triggers deleted");
}

/**
 * Get form statistics
 */
function getFormStats(formId) {
  try {
    const form = FormApp.openById(formId);
    const responses = form.getResponses();

    return {
      success: true,
      totalResponses: responses.length,
      formUrl: form.getPublishedUrl(),
      formTitle: form.getTitle(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Test the form creation
 */
function testFormCreation() {
  Logger.log("🧪 Starting form creation test...");
  const result = createIAHFormCorrected();
  Logger.log("✅ Test completed!");
  Logger.log("📋 Result: " + JSON.stringify(result, null, 2));
  return result;
}

/**
 * Export all form responses to a spreadsheet
 */
function exportResponsesToSheet(formId) {
  try {
    const form = FormApp.openById(formId);
    const responses = form.getResponses();

    // Create or open spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.create(
        CONFIG.SPREADSHEET_NAME + " - " + new Date().toISOString().split("T")[0]
      );
    } catch (e) {
      Logger.log("⚠️ Could not create spreadsheet: " + e.message);
      return;
    }

    const sheet = spreadsheet.getActiveSheet();

    // Get headers from first response
    if (responses.length > 0) {
      const headers = responses[0]
        .getItemResponses()
        .map((ir) => ir.getItem().getTitle());
      headers.unshift("Timestamp");
      sheet.appendRow(headers);

      // Add all responses
      responses.forEach((response) => {
        const row = [response.getTimestamp()];
        response.getItemResponses().forEach((ir) => {
          const val = ir.getResponse();
          row.push(Array.isArray(val) ? val.join(", ") : val);
        });
        sheet.appendRow(row);
      });
    }

    Logger.log("📊 Exported " + responses.length + " responses to spreadsheet");
    Logger.log("📎 Spreadsheet URL: " + spreadsheet.getUrl());

    return spreadsheet.getUrl();
  } catch (error) {
    Logger.log("❌ Export error: " + error.message);
    throw error;
  }
}

/**
 * Check script health
 */
function healthCheck() {
  Logger.log("🔍 Running health check...");

  const checks = {
    formApp: typeof FormApp !== "undefined",
    mailApp: typeof MailApp !== "undefined",
    scriptApp: typeof ScriptApp !== "undefined",
    spreadsheetApp: typeof SpreadsheetApp !== "undefined",
    config: CONFIG !== undefined,
    version: CONFIG.VERSION,
  };

  Logger.log("✅ Health Check Results:");
  for (const [key, value] of Object.entries(checks)) {
    Logger.log(`  - ${key}: ${value}`);
  }

  return checks;
}
