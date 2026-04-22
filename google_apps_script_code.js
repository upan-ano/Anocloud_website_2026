function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const payload = data.data;
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Sheet not found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === "save") {
      // Check if email already exists
      const values = sheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) { // Skip header
        if (values[i][3] === payload.email) { // Assuming email is column 4 (D)
          return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: "Email already exists" }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      // Append new row
      sheet.appendRow([
        payload.date,
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.phone,
        payload.services,
        payload.message
      ]);
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else if (action === "check") {
      const values = sheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (values[i][3] === payload.email || values[i][4] === payload.phone) {
          return ContentService
            .createTextOutput(JSON.stringify({ success: true, exists: true }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, exists: false }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else if (action === "remove") {
      const values = sheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (values[i][3] === payload.email && values[i][0] === payload.date) {
          sheet.deleteRow(i + 1); // +1 because rows are 1-indexed
          return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Entry not found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: "Invalid action" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}