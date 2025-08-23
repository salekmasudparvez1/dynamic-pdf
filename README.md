
---

# 📄 Creating Dynamic PDFs with jsPDF and AutoTable in React (Single-File Version)

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![jsPDF](https://img.shields.io/badge/jsPDF-2.5.1-green)](https://github.com/parallax/jsPDF)
[![jsPDF-AutoTable](https://img.shields.io/badge/jsPDF--AutoTable-3.8.2-orange)](https://github.com/simonbengtsson/jsPDF-AutoTable)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

**Author:** Mis-Tech · **Published:** Aug 24, 2025 · **Reading Time:** 8 min

A comprehensive, single-file guide to generating dynamic PDFs in a React application using `jsPDF` and `jspdf-autotable`. Learn to add custom headers, dynamic tables, and automatic page numbers.

---

## Table of Contents

1.  [Overview](#overview)
2.  [Prerequisites](#prerequisites)
3.  [Step 1: Project Setup](#step-1-project-setup)
4.  [Step 2: Add Your Logo](#step-2-add-your-logo)
5.  [Step 3: The Complete `App.js` Code](#step-3-the-complete-appjs-code)
6.  [Step 4: Create the `LICENSE` File](#step-4-create-the-license-file)
7.  [Step 5: Run the Application](#step-5-run-the-application)
8.  [Final Result](#final-result)
9.  [About Us](#about-us)

---

## Overview

This tutorial demonstrates how to **generate dynamic PDF documents in a React application** using a single component. We will use the powerful `jsPDF` library for core PDF creation and `jspdf-autotable` to seamlessly add complex data tables. This guide covers everything from initial setup to implementing advanced features like dynamic page numbering, custom layouts, and embedding images.

---

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine. You can verify the installation by running:

```bash
node -v
npm -v
```

---

## Step 1: Project Setup

First, create a new React application and install the necessary dependencies.

### 1. Create a New React App

Open your terminal and run the following command:

```bash
npx create-react-app pdf-generator
cd pdf-generator
```

### 2. Install Dependencies

Next, install `jspdf`, `jspdf-autotable`, and `date-fns`:

```bash
npm install jspdf jspdf-autotable date-fns
```

---

## Step 2: Add Your Logo

Place your company logo (e.g., `aalam.png`) inside the **`public`** folder. The code is already configured to look for it there.

Your project structure should look like this:

```
pdf-generator/
├── public/
│   ├── logo.png   <-- Place your logo here
│   └── index.html
├── src/
│   ├── App.js      <-- We will replace this file's content
│   └── index.js
└── package.json
```

---

## Step 3: The Complete `App.js` Code

Replace the entire content of **`src/App.js`** with the code below. This single file contains all the logic and styling needed.

```javascript
// src/App.js

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

    // 3. Add document header
    const logo = '/aalam.png'; // Path to your logo in the public folder
    doc.addImage(logo, 'PNG', 10, 5, 40, 12);
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
      // ...add up to 20-30 items here to test multi-page functionality
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
    doc.autoTable({
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
```

## Step 4: Run the Application

In your terminal, at the root of the `pdf-generator` directory, run:

```bash
npm start
```

Your application will open in your browser at `http://localhost:3000`.

---

## Final Result

When you click the "Generate RFQ PDF" button, a new browser tab will open, displaying your dynamically generated PDF. It will include your logo, custom text, a styled table that spans multiple pages if needed, and accurate page numbers in the footer.

![Sample PDF Preview](./sample-pdf.png)

---

## About Us

**Aalam Info Solutions LLP** was established in 2016 to provide custom software solutions that meet dynamic business needs. Our goal is to deliver high-quality, end-to-end software services at an affordable price.

🌐 [Website](https://mis-tech.net) | 🔗 [LinkedIn](https://www.linkedin.com/in/salek-masud-parvez) | 📷 [Instagram](https://instagram.com/salekmasudparvez) | 📘 [Facebook](https://www.facebook.com/salekmasudparvez)

---

### Tags

`React` `jsPDF` `jspdf-autotable` `PDF Generation` `Dynamic PDF` `React Tutorial` `JavaScript`
```
