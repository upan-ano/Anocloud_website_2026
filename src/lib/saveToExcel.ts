import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs/promises';

export async function saveToExcel(email: string, formData: FormData) {
  try {
    const firstName = formData.get('firstName') as string || '';
    const lastName = formData.get('lastName') as string || '';
    const phone = formData.get('phone') as string || '';
    const message = formData.get('message') as string || '';
    const services = formData.getAll('services').join(', ');
    const date = new Date().toLocaleString();

    const filePath = path.join(process.cwd(), 'contacts.xlsx');
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    try {
      await workbook.xlsx.readFile(filePath);
      worksheet = workbook.getWorksheet('Contacts') || workbook.worksheets[0];
    } catch (e) {
      worksheet = workbook.addWorksheet('Contacts');
      worksheet.addRow(['Date', 'First Name', 'Last Name', 'Email', 'Phone', 'Services', 'Message']);
      worksheet.getRow(1).font = { bold: true };
    }
    
    if (!worksheet) {
      worksheet = workbook.addWorksheet('Contacts');
      worksheet.addRow(['Date', 'First Name', 'Last Name', 'Email', 'Phone', 'Services', 'Message']);
      worksheet.getRow(1).font = { bold: true };
    }

    worksheet.addRow([date, firstName, lastName, email, phone, services, message]);
    await workbook.xlsx.writeFile(filePath);
  } catch (excelError) {
    console.error('Failed to save to Excel:', excelError);
  }
}
