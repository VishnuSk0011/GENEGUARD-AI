import { jsPDF } from 'jspdf';
import { PatientProfile } from './mockData';

export const exportReportToPDF = (profile: PatientProfile) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors
  const darkBlue = [15, 23, 42]; // #0f172a
  const teal = [20, 184, 166]; // #14b8a6
  const clinicalBlue = [59, 130, 246]; // #3b82f6
  const lightGray = [241, 245, 249]; // #f1f5f9
  const textDark = [51, 65, 85]; // #334155
  
  let currentY = 15;

  // Helper for drawing horizontal lines
  const drawLine = (y: number, color = [226, 232, 240]) => {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.3);
    doc.line(15, y, pageWidth - 15, y);
  };

  // Header Banner
  doc.setFillColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // App Logo/Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text("GENEGUARD AI", 15, 18);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text("Advanced Genomic Risk Assessment System", 15, 24);

  // Report Title (Right-aligned)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('Helvetica', 'bold');
  doc.text("CLINICAL LABORATORY REPORT", pageWidth - 15, 20, { align: 'right' });
  
  doc.setFontSize(9);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(`ID: ${profile.id}`, pageWidth - 15, 26, { align: 'right' });
  doc.text(`Date: ${profile.timestamp}`, pageWidth - 15, 31, { align: 'right' });

  currentY = 48;

  // Patient Info Block
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(15, currentY, pageWidth - 30, 32, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  
  // Column 1
  doc.setFont('Helvetica', 'bold');
  doc.text("PATIENT INFORMATION", 20, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Name: ${profile.name}`, 20, currentY + 13);
  doc.text(`Date of Birth: ${profile.dob}`, 20, currentY + 19);
  doc.text(`Gender: ${profile.gender}`, 20, currentY + 25);

  // Column 2
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.setFont('Helvetica', 'bold');
  doc.text("GENOMIC DATA FILE", 110, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Filename: ${profile.fileName}`, 110, currentY + 13);
  doc.text(`File Size: ${profile.fileSize}`, 110, currentY + 19);
  doc.text(`Analyzed Markers: ${profile.markersCount.toLocaleString()} SNPs`, 110, currentY + 25);

  currentY += 38;

  // Overall Health Risk Score Summary
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.text("OVERALL GENOMIC HEALTH ASSESSMENT", 15, currentY);
  
  currentY += 4;
  drawLine(currentY);
  currentY += 6;

  // Draw overall score card
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(15, currentY, 60, 24, 'F');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(28);
  
  // Set risk score color
  if (profile.overallRiskLevel === 'High') {
    doc.setTextColor(239, 68, 68); // Red
  } else if (profile.overallRiskLevel === 'Moderate') {
    doc.setTextColor(249, 115, 22); // Orange
  } else {
    doc.setTextColor(34, 197, 94); // Green
  }
  doc.text(`${profile.overallScore}%`, 45, currentY + 15, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text("GENETIC RISK INDEX", 45, currentY + 21, { align: 'center' });

  // Description details next to the card
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Overall Risk Category: ${profile.overallRiskLevel.toUpperCase()}`, 82, currentY + 4);
  
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(9);
  const introText = profile.overallRiskLevel === 'High' 
    ? "Analysis indicates a high density of clinically significant genetic markers associated with potential disease development. Standard preventative actions, lifestyle adaptations, and specific monitoring are highly recommended to mitigate these risks."
    : profile.overallRiskLevel === 'Moderate'
    ? "Analysis indicates a moderate frequency of genetic risk variants. Certain lifestyle parameters (diet, aerobic activities) should be customized to offset hereditary disease trends."
    : "Analysis indicates a low density of critical risk variants and a presence of several protective alleles. General wellness maintenance is advised to maintain current healthy physiological metrics.";

  const splitIntro = doc.splitTextToSize(introText, pageWidth - 100);
  doc.text(splitIntro, 82, currentY + 10);

  currentY += 32;

  // Disease Risk Assessment Section
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.text("DISEASE PROBABILITY PREDICTIONS", 15, currentY);
  
  currentY += 4;
  drawLine(currentY);
  currentY += 6;

  // Draw Disease Prediction Headers
  doc.setFillColor(226, 232, 240);
  doc.rect(15, currentY, pageWidth - 30, 7, 'F');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.text("Disease Category", 18, currentY + 5);
  doc.text("Probability", 75, currentY + 5);
  doc.text("Risk Level", 105, currentY + 5);
  doc.text("Primary Associated Markers", 135, currentY + 5);

  currentY += 7;

  // List disease rows
  profile.predictions.forEach((pred) => {
    // Row background if needed, let's keep it clean
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(pred.name, 18, currentY + 5);
    doc.text(`${pred.probability}%`, 75, currentY + 5);
    
    // Risk level badge text
    doc.setFont('Helvetica', 'bold');
    if (pred.riskLevel === 'High') {
      doc.setTextColor(239, 68, 68);
    } else if (pred.riskLevel === 'Moderate') {
      doc.setTextColor(249, 115, 22);
    } else {
      doc.setTextColor(34, 197, 94);
    }
    doc.text(pred.riskLevel, 105, currentY + 5);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(pred.contributingMarkers.length > 0 ? pred.contributingMarkers.join(', ') : "None identified", 135, currentY + 5);
    
    currentY += 7;
    drawLine(currentY, [241, 245, 249]);
  });

  // Page Break for Marker Details and recommendations
  doc.addPage();
  currentY = 15;

  // New Page Header (Mini banner)
  doc.setFillColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.rect(0, 0, pageWidth, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`GeneGuard AI - Genomic Laboratory Report (Patient: ${profile.name})`, 15, 10);
  doc.text(`ID: ${profile.id}`, pageWidth - 15, 10, { align: 'right' });

  currentY = 25;

  // Analyzed Genetic Markers Detail
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.text("CRITICAL GENETIC MARKERS INVENTORIED", 15, currentY);

  currentY += 4;
  drawLine(currentY);
  currentY += 6;

  // Draw Marker Table Headers
  doc.setFillColor(226, 232, 240);
  doc.rect(15, currentY, pageWidth - 30, 7, 'F');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.text("RSID", 18, currentY + 5);
  doc.text("Gene", 42, currentY + 5);
  doc.text("Genotype", 66, currentY + 5);
  doc.text("Impact", 90, currentY + 5);
  doc.text("Clinical Description", 115, currentY + 5);

  currentY += 7;

  profile.markers.forEach((m) => {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    
    doc.text(m.rsid, 18, currentY + 5);
    doc.text(m.gene, 42, currentY + 5);
    doc.text(m.genotype, 66, currentY + 5);
    
    doc.setFont('Helvetica', 'bold');
    if (m.impact === 'High') doc.setTextColor(239, 68, 68);
    else if (m.impact === 'Moderate') doc.setTextColor(249, 115, 22);
    else if (m.impact === 'Protective') doc.setTextColor(34, 197, 94);
    else doc.setTextColor(59, 130, 246);

    doc.text(m.impact, 90, currentY + 5);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const splitDesc = doc.splitTextToSize(m.description, pageWidth - 132);
    
    // Calculate height needed for this row
    const linesCount = splitDesc.length;
    doc.text(splitDesc, 115, currentY + 5);
    
    currentY += 6 + (linesCount * 3.5);
    drawLine(currentY, [241, 245, 249]);
  });

  currentY += 10;

  // Recommendations section
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.text("CLINICAL RECOMMENDATIONS & LIFESTYLE GUIDELINES", 15, currentY);

  currentY += 4;
  drawLine(currentY);
  currentY += 6;

  // Gather top recommendations
  const allRecs: string[] = [];
  profile.predictions.forEach(p => {
    if (p.riskLevel === 'High' || p.riskLevel === 'Moderate') {
      p.recommendations.forEach(r => {
        if (!allRecs.includes(r)) {
          allRecs.push(`[${p.name}] ${r}`);
        }
      });
    }
  });

  // Fallback to low risk recommendations if none
  if (allRecs.length === 0) {
    profile.predictions.forEach(p => {
      p.recommendations.forEach(r => {
        if (!allRecs.includes(r)) {
          allRecs.push(r);
        }
      });
    });
  }

  // Display top 8 recommendations
  const displayedRecs = allRecs.slice(0, 7);
  doc.setFontSize(8.5);
  displayedRecs.forEach((r) => {
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(clinicalBlue[0], clinicalBlue[1], clinicalBlue[2]);
    doc.text(`•`, 17, currentY + 4);
    
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const splitRec = doc.splitTextToSize(r, pageWidth - 30);
    doc.text(splitRec, 22, currentY + 4);
    
    currentY += 4 + (splitRec.length * 3.8);
  });

  // Legal Disclaimer Box at page bottom
  const disclaimerY = pageHeight - 32;
  doc.setFillColor(254, 242, 242); // Light red box
  doc.rect(15, disclaimerY, pageWidth - 30, 20, 'F');
  
  doc.setDrawColor(248, 113, 113); // red border
  doc.rect(15, disclaimerY, pageWidth - 30, 20, 'D');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(185, 28, 28);
  doc.text("MEDICAL DISCLAIMER", 18, disclaimerY + 5);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(127, 29, 29);
  const disclaimerText = "Predictions are for educational and research purposes only. This laboratory report is not a medical diagnosis. Genetic predispositions do not dictate certain disease onset. Lifestyle and environment remain highly influential factors. Do not modify medication, diet, or treatment without consulting a physician or certified genetic counselor.";
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, pageWidth - 36);
  doc.text(splitDisclaimer, 18, disclaimerY + 9);

  // Save the PDF
  const cleanName = profile.name.toLowerCase().replace(/\s+/g, '_');
  doc.save(`GeneGuard_AI_${cleanName}_report.pdf`);
};
