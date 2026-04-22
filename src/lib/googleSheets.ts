export async function saveToGoogleSheets(email: string, formData: FormData): Promise<string | null> {
  try {
    const firstName = formData.get('firstName') as string || '';
    const lastName = formData.get('lastName') as string || '';
    const phone = formData.get('phone') as string || '';
    const message = formData.get('message') as string || '';
    const services = formData.getAll('services').join(', ');
    const date = new Date().toLocaleString();

    const SCRIPT_URL = process.env.GOOGLE_APP_SCRIPT_URL;
    if (!SCRIPT_URL) {
      console.error('GOOGLE_APP_SCRIPT_URL environment variable is missing.');
      return null;
    }

    const body = {
      action: 'save',
      data: { date, firstName, lastName, email, phone, services, message }
    };

    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await res.json();
    if (!result.success) {
      console.error('Google Apps Script responded with error:', result.error);
      return null;
    }

    return date;
  } catch (error) {
    console.error('Failed to save to Google Sheets:', error);
    return null;
  }
}

export async function removeFromGoogleSheets(email: string, date: string) {
  try {
    const SCRIPT_URL = process.env.GOOGLE_APP_SCRIPT_URL;
    if (!SCRIPT_URL) return;

    const body = {
      action: 'remove',
      data: { email, date }
    };

    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await res.json();
    if (result.success) {
      console.log(`Successfully removed entry for ${email} from Google Sheets.`);
    } else {
      console.error('Google Apps Script failed to remove:', result.error);
    }
  } catch (error) {
    console.error('Failed to remove from Google Sheets:', error);
  }
}

export async function checkIfExistsInGoogleSheets(email: string, phone: string): Promise<boolean> {
  try {
    const SCRIPT_URL = process.env.GOOGLE_APP_SCRIPT_URL;
    if (!SCRIPT_URL) return false;

    const body = {
      action: 'check',
      data: { email, phone }
    };

    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await res.json();
    if (result.success && result.exists) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to check if exists in Google Sheets:', error);
    return false; // If error, assume it doesn't exist
  }
}
