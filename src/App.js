// src/App.js

import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

function App() {
  
  // The core PDF generation logic
  const generatePdf = () => {
    // 1. Initialize jsPDF
    const doc = new jsPDF();

    // 2. Define document properties
    doc.setProperties({
      title: "Request For Quotation",
    });

    try {
      // 3. Add document header
      const logo = '/aalam.png'; // Path to your logo in the public folder
      doc.addImage(logo, 'PNG', 10, 5, 40, 12);
    } catch (error) {
      console.warn('Logo not found, continuing without logo');
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text('REQUEST FOR QUOTATION', 140, 15);
    doc.line(10, 20, 200, 20); // Horizontal line

    // 4. Add vendor and item data
    const vendorData = {
      name: "Velavan B",
      address: "14/203, Kallakulam, Seenapuram",
      pinCode: "638057",
      contactPerson: "Santhosh D",
      mobile: "8993298712",
    };

    const itemsData = [
      { name: 'Water Tanks', quantity: 15, uom: "Liters", unitPrice: 1200, total: 18000 },
      { name: 'PVC Pipes', quantity: 50, uom: "Meters", unitPrice: 150, total: 7500 },
      { name: 'Gate Valves', quantity: 10, uom: "Pieces", unitPrice: 500, total: 5000 },
      { name: 'Cement Bags', quantity: 100, uom: "Bags", unitPrice: 350, total: 35000 },
      { name: 'Steel Rods', quantity: 25, uom: "Tons", unitPrice: 45000, total: 1125000 },
      { name: 'Electrical Cables', quantity: 200, uom: "Meters", unitPrice: 120, total: 24000 },
      { name: 'Light Fixtures', quantity: 30, uom: "Pieces", unitPrice: 2500, total: 75000 },
      { name: 'Paint Buckets', quantity: 20, uom: "Buckets", unitPrice: 800, total: 16000 },
      { name: 'Door Frames', quantity: 12, uom: "Pieces", unitPrice: 3500, total: 42000 },
      { name: 'Window Glass', quantity: 15, uom: "Sq.Ft", unitPrice: 450, total: 6750 },
      { name: 'Tiles', quantity: 500, uom: "Sq.Ft", unitPrice: 180, total: 90000 },
      { name: 'Bathroom Fittings', quantity: 8, uom: "Sets", unitPrice: 15000, total: 120000 },
      { name: 'Kitchen Cabinets', quantity: 6, uom: "Units", unitPrice: 25000, total: 150000 },
      { name: 'Roofing Sheets', quantity: 80, uom: "Sheets", unitPrice: 1200, total: 96000 },
      { name: 'Insulation Material', quantity: 100, uom: "Sq.Meters", unitPrice: 300, total: 30000 },
      { name: 'Screws & Bolts', quantity: 50, uom: "Kg", unitPrice: 200, total: 10000 },
      { name: 'Wooden Planks', quantity: 40, uom: "Pieces", unitPrice: 800, total: 32000 },
      { name: 'Concrete Mixer', quantity: 2, uom: "Units", unitPrice: 75000, total: 150000 },
      { name: 'Safety Equipment', quantity: 10, uom: "Sets", unitPrice: 5000, total: 50000 },
      { name: 'Tools & Hardware', quantity: 1, uom: "Lot", unitPrice: 25000, total: 25000 },
    ];

    // 5. Add vendor details to the PDF
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Vendor: ${vendorData.name}`, 10, 30);
    doc.text(`Address: ${vendorData.address}`, 10, 35);
    doc.text(`Contact: ${vendorData.contactPerson} (${vendorData.mobile})`, 10, 40);
    doc.text(`Date: ${format(new Date(), 'dd-MM-yyyy')}`, 150, 40);

    // 6. Define table columns and rows
    const tableColumns = ['S.No', 'Item Name', 'Quantity', 'UOM', 'Total'];
    const tableRows = itemsData.map((item, index) => [
      index + 1,
      item.name,
      item.quantity,
      item.uom,
      item.total.toFixed(2), // Format total to 2 decimal places
    ]);

    // 7. Add the table using jspdf-autotable
    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 50, // Y-position to start the table
      headStyles: {
        fillColor: [22, 160, 133], // Header background color
        textColor: [255, 255, 255], // Header text color
        fontStyle: 'bold',
      },
      theme: 'grid', // 'striped', 'grid', or 'plain'
    });

    // 8. Add dynamic page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 30, // x-coordinate
        doc.internal.pageSize.getHeight() - 10  // y-coordinate
      );
    }

    // 9. Choose how to output the PDF
    // Option A: Trigger a download
    // doc.save('RFQ.pdf');

    // Option B: Open in a new browser tab for preview
    const pdfDataUri = doc.output('datauristring');
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
    }
  };

  // Inline styles for the component
  const styles = {
    app: {
      textAlign: 'center',
    },
    appHeader: {
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
    button: {
      backgroundColor: '#61dafb',
      border: 'none',
      borderRadius: '8px',
      color: '#282c34',
      padding: '12px 24px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        <h1>PDF Generator</h1>
        <p>Click the button below to generate and preview a dynamic PDF.</p>
        <button onClick={generatePdf} style={styles.button}>
          Generate RFQ PDF
        </button>
      </header>
    </div>
  );
}

export default App;
