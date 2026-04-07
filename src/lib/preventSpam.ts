import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs/promises';

export async function checkIfExists(email: string, phone: string): Promise<boolean> {
  const filePath = path.join(process.cwd(), 'contacts.xlsx');
  
  try {
    await fs.access(filePath);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Contacts') || workbook.worksheets[0];
    
    if (!worksheet) return false;

    let exists = false;
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1 || exists) return; // Skip header or if already found
      
      const rowEmail = row.getCell(4).text?.toLowerCase().trim();
      const rowPhone = row.getCell(5).text?.trim();

      const normalizedEmail = email.toLowerCase().trim();
      const normalizedPhone = phone.trim();

      if (normalizedEmail && normalizedEmail === rowEmail) {
        exists = true;
      }
      
      if (normalizedPhone && normalizedPhone === rowPhone) {
        exists = true;
      }
    });

    return exists;
  } catch {
    return false; // If file doesn't exist or error reading, assume doesn't exist
  }
}
