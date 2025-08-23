# 📄 Creating Dynamic PDFs with jsPDF and AutoTables in React

[![React](https://img.shields.io/badge/React-17.0-blue?logo=react)](https://reactjs.org/)
[![jsPDF](https://img.shields.io/badge/jsPDF-2.5.1-green)](https://github.com/parallax/jsPDF)
[![AutoTable](https://img.shields.io/badge/jsPDF--AutoTable-3.5.25-orange)](https://github.com/simonbengtsson/jsPDF-AutoTable)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

**Author:** Aalam Info Solutions LLP
**Reading Time:** 11 min · **Published:** Mar 5, 2024

---

## Table of Contents

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Project Setup](#project-setup)
* [Generating PDFs](#generating-pdfs)
* [Adding AutoTables](#adding-autotables)
* [Dynamic Page Numbers](#dynamic-page-numbers)
* [Saving and Previewing PDFs](#saving-and-previewing-pdfs)
* [Sample Code](#sample-code)
* [About Us](#about-us)
* [Contact & Social Links](#contact--social-links)

---

## Overview

This tutorial demonstrates how to **generate dynamic PDFs in a React application** using **jsPDF** and customize **AutoTables** for itemized data. You'll learn to implement dynamic page numbering, flexible page layouts, and include images and text dynamically.

**Key Features:**

* Dynamic PDF generation
* Custom AutoTable styling
* Dynamic page numbering
* Include images and formatted text
* Open or download PDFs directly in browser

---

## Prerequisites

Make sure you have **Node.js** and **npm** installed. Check with:

```bash
node -v
npm -v
```

---

## Installation

### 1️⃣ Setup React App

```bash
npx create-react-app pdf-generator
cd pdf-generator
```

### 2️⃣ Install Dependencies

```bash
npm install jspdf
npm install jspdf-autotable
npm install date-fns
```

---

## Project Setup

### Import Libraries in `App.js`

```javascript
import React from 'react';
import { Button, DownloadIcon } from 'lumina-ui';
import PdfGenerator from './pdfGenerator';
```

### Define the PDF Generation Function

```javascript
const generatePdf = () => {
  PdfGenerator();
}
```

### Render the Button

```jsx
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <div>
    <p>Click here to download the PDF file.</p>
    <Button onClick={generatePdf} icon={<DownloadIcon />} type="button" shape="rectangle" size="small" />
  </div>
</div>
```

---

## Generating PDFs

### Create `pdfGenerator.js`

```javascript
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

const PdfGenerator = () => {
  const vendorData = {
    vendorName: "Velavan B",
    vendorAddress: "14/203, Kallakulam, Seenapuram",
    vendorPinCode: "638057",
    contactPerson: "Santhosh D",
    contactPersonMobNo: "8993298712",
  };

  const itemsData = [
    { itemName: 'Water Tanks', quantity: "15", uom: "Liters", unitPrice: "1200", total: (15*1200).toString() },
    // ... add other items
  ];

  const pdf = new jsPDF();
  pdf.setProperties({ title: "Request For Quotation" });

  // Add image and header text
  pdf.addImage("/aalam.png", 'JPEG', 10, 5, 40, 12);
  pdf.setFont('custom', 'bold');
  pdf.text('REQUEST FOR QUOTATION', 150, 12);

  // Add AutoTable for items
  const itemDetailsRows = itemsData.map((item, index) => [
    (index + 1).toString(), item.itemName, item.quantity, item.uom, item.total
  ]);

  pdf.autoTable({
    head: [['S.No','Item Name','Quantity','UOM','Total']],
    body: itemDetailsRows,
    startY: 88,
    headStyles: { fillColor: [240,240,240], fontStyle: 'bold', fontSize: 10 },
    columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 90 }, 2: { cellWidth: 30 }, 3: { cellWidth: 30 }, 4: { cellWidth: 23 } },
  });

  // Dynamic page numbers
  const totalPages = pdf.internal.getNumberOfPages();
  for(let i=1;i<=totalPages;i++){
    pdf.setPage(i);
    pdf.text(`Page ${i} of ${totalPages}`, 185, pdf.internal.pageSize.getHeight()-5);
  }

  // Save PDF
  pdf.save('RFQ.pdf');

  // Preview in a new tab
  const pdfDataUri = pdf.output('datauristring');
  const newTab = window.open();
  newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
};

export default PdfGenerator;
```

---

## Saving and Previewing PDFs

* **Save:** `pdf.save('RFQ.pdf')` triggers download.
* **Preview:** Opens PDF in a new browser tab using `iframe`.

---

## Sample PDF

![Sample PDF Preview](./sample-pdf.png)
Click the button in the app to generate your RFQ PDF dynamically with all vendor and item details.

---

## About Us

**Aalam Info Solutions LLP** – Established in 2016, providing **custom software solutions** for dynamic business needs.
Our goal: Quality, end-to-end software services at an affordable price.

🌐 [Website](https://aalamsoft.com/)
🔗 [LinkedIn](https://www.linkedin.com/company/aalam-info-solution-llp)
📷 [Instagram](https://instagram.com/aalaminfo?igshid=YmMyMTA2M2Y=)
📘 [Facebook](https://www.facebook.com/Aalam-Info-Solutions-LLP-775574966147738/)

---

## Keywords / Tags

React, jsPDF, AutoTable, PDF Generation, Dynamic PDF, React Tutorial, Vendor RFQ, PDF Table, jsPDF Tutorial
