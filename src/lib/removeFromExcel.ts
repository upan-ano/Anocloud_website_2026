import ExcelJS from 'exceljs';
import path from 'path';

export async function removeFromExcel(email: string, date: string) {
  try {
    const filePath = path.join(process.cwd(), 'contacts.xlsx');
    const workbook = new ExcelJS.Workbook();
    
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Contacts') || workbook.worksheets[0];
    
    if (!worksheet) return;

    let rowToDelete = -1;
    worksheet.eachRow((row, rowNumber) => {
      const rowDate = row.getCell(1).value?.toString();
      const rowEmail = row.getCell(4).value?.toString();
      
      if (rowDate === date && rowEmail === email) {
        rowToDelete = rowNumber;
      }
    });

    if (rowToDelete !== -1) {
      worksheet.spliceRows(rowToDelete, 1);
      await workbook.xlsx.writeFile(filePath);
      console.log(`Successfully removed entry for ${email} from Excel.`);
    }
  } catch (error) {
    console.error('Failed to remove from Excel:', error);
  }
}
