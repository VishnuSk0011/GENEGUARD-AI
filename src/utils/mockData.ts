export interface GeneticMarker {
  rsid: string;
  gene: string;
  chromosome: string;
  position: number;
  genotype: string;
  riskAllele: string;
  impact: 'High' | 'Moderate' | 'Low' | 'Protective';
  frequency: number; // population frequency
  description: string;
}

export interface DiseasePrediction {
  id: string;
  name: string;
  probability: number; // percentage
  riskLevel: 'Low' | 'Moderate' | 'High';
  category: 'Cardiovascular' | 'Neurological' | 'Metabolic' | 'Oncology' | 'General';
  contributingMarkers: string[]; // RSIDs
  description: string;
  recommendations: string[];
}

export interface PatientProfile {
  id: string;
  name: string;
  dob: string;
  gender: string;
  bloodType: string;
  overallScore: number; // 0-100 overall wellness/risk index (higher = better or higher risk, let's say higher = higher risk score, e.g. 72% overall genetic risk profile)
  overallRiskLevel: 'Low' | 'Moderate' | 'High';
  fileName: string;
  fileSize: string;
  markersCount: number;
  markers: GeneticMarker[];
  predictions: DiseasePrediction[];
  timestamp: string;
}

// 1. Cardiovascular / Hypertension Profile (Profile A)
export const mockProfileA: PatientProfile = {
  id: "GG-2026-8809",
  name: "Marcus Vance",
  dob: "1984-11-12",
  gender: "Male",
  bloodType: "A+",
  overallScore: 68,
  overallRiskLevel: "High",
  fileName: "marcus_vance_23andme.txt",
  fileSize: "14.2 MB",
  markersCount: 612053,
  timestamp: "2026-06-23 14:32:00",
  markers: [
    { rsid: "rs10757278", gene: "9p21.3", chromosome: "9", position: 22090123, genotype: "GG", riskAllele: "G", impact: "High", frequency: 0.42, description: "Strongly associated with coronary artery disease and myocardial infarction. Double risk alleles indicate heightened risk of atherosclerosis." },
    { rsid: "rs5186", gene: "AGTR1", chromosome: "3", position: 148420956, genotype: "CC", riskAllele: "C", impact: "High", frequency: 0.28, description: "Associated with increased sensitivity to angiotensin II, leading to higher risk of essential hypertension and arterial stiffness." },
    { rsid: "rs1801282", gene: "PPARG", chromosome: "3", position: 12393122, genotype: "CG", riskAllele: "G", impact: "Moderate", frequency: 0.15, description: "Pro12Ala variant in PPAR-gamma. The G allele is linked to moderate predisposition to insulin resistance and type 2 diabetes if combined with high-fat diet." },
    { rsid: "rs1801133", gene: "MTHFR", chromosome: "1", position: 11796321, genotype: "CT", riskAllele: "T", impact: "Moderate", frequency: 0.38, description: "C677T variant. Moderate reduction in MTHFR enzyme activity, leading to mildly elevated homocysteine levels, impacting vascular health." },
    { rsid: "rs20455", gene: "KIF6", chromosome: "6", position: 4129532, genotype: "TT", riskAllele: "C", impact: "Low", frequency: 0.61, description: "Trp719Arg variant. T genotype represents the ancestral non-risk allele, indicating a standard baseline response to statins." },
    { rsid: "rs429358", gene: "APOE", chromosome: "19", position: 45411941, genotype: "TT", riskAllele: "C", impact: "Protective", frequency: 0.79, description: "Corresponds to APOE-e3/e3 neutral profile. Standard risk for Alzheimer's disease." },
  ],
  predictions: [
    {
      id: "heart_disease",
      name: "Coronary Heart Disease",
      probability: 79,
      riskLevel: "High",
      category: "Cardiovascular",
      contributingMarkers: ["rs10757278", "rs5186", "rs1801133"],
      description: "Genetic variants indicate elevated predisposition to coronary plaque buildup, arterial stiffness, and early coronary calcification.",
      recommendations: [
        "Incorporate a Mediterranean-style diet high in olive oil, nuts, and omega-3 fatty acids.",
        "Engage in at least 150 minutes of moderate-intensity aerobic exercise weekly.",
        "Monitor blood pressure and lipid panels bi-annually, targeting LDL cholesterol below 70 mg/dL.",
        "Discuss preventive low-dose aspirin therapy with your cardiologist based on clinical markers."
      ]
    },
    {
      id: "hypertension",
      name: "Essential Hypertension",
      probability: 82,
      riskLevel: "High",
      category: "Cardiovascular",
      contributingMarkers: ["rs5186", "rs1801133"],
      description: "High sensitivity to angiotensin pathway stimulation, coupled with vascular tone variations. Elevates likelihood of chronic high blood pressure.",
      recommendations: [
        "Restrict dietary sodium intake to under 1,500 mg per day.",
        "Ensure adequate potassium and magnesium intake through leafy greens, bananas, and avocados.",
        "Practice daily stress-reduction techniques (e.g., deep breathing, mindfulness, yoga).",
        "Monitor blood pressure at home regularly and keep a clinical log."
      ]
    },
    {
      id: "diabetes",
      name: "Type 2 Diabetes",
      probability: 48,
      riskLevel: "Moderate",
      category: "Metabolic",
      contributingMarkers: ["rs1801282"],
      description: "Moderate risk of insulin sensitivity reductions. Genetic predisposition triggers weight-dependent metabolic challenges.",
      recommendations: [
        "Focus on complex carbohydrates with a low glycemic index to manage glucose spikes.",
        "Perform strength training exercises twice a week to improve skeletal muscle insulin sensitivity.",
        "Monitor fasting glucose and HbA1c levels annually.",
        "Aim for a body mass index (BMI) between 18.5 and 24.9."
      ]
    },
    {
      id: "alzheimers",
      name: "Alzheimer's Disease",
      probability: 12,
      riskLevel: "Low",
      category: "Neurological",
      contributingMarkers: ["rs429358"],
      description: "APOE e3/e3 neutral genotype. Displays no elevated genetic risk relative to the general population.",
      recommendations: [
        "Maintain cognitive reserve through lifelong learning, puzzles, and social interaction.",
        "Ensure consistent high-quality sleep (7-8 hours per night) to aid neural clearance.",
        "Consume dietary antioxidants found in berries and green tea."
      ]
    },
    {
      id: "parkinsons",
      name: "Parkinson's Disease",
      probability: 8,
      riskLevel: "Low",
      category: "Neurological",
      contributingMarkers: [],
      description: "No significant risk alleles detected in LRRK2, SNCA, or GBA genes. Standard baseline risk.",
      recommendations: [
        "Include moderate coffee or green tea consumption, which has shown protective associations.",
        "Regular physical exercise protects neuro-circuitry and general motor skills."
      ]
    },
    {
      id: "cancers",
      name: "Certain Cancers (Genomic Screening)",
      probability: 18,
      riskLevel: "Low",
      category: "Oncology",
      contributingMarkers: [],
      description: "No high-risk mutations detected in BRCA1, BRCA2, or Lynch Syndrome MMR genes.",
      recommendations: [
        "Adhere to standard age-appropriate cancer screenings (colorectal, skin check-ups).",
        "Limit alcohol consumption and avoid smoking or exposure to environmental carcinogens.",
        "Ensure sufficient Vitamin D levels."
      ]
    }
  ]
};

// 2. Alzheimer's and Cancer Profile (Profile B)
export const mockProfileB: PatientProfile = {
  id: "GG-2026-4412",
  name: "Dr. Elena Rostova",
  dob: "1978-04-22",
  gender: "Female",
  bloodType: "O-",
  overallScore: 78,
  overallRiskLevel: "High",
  fileName: "elena_rostova_ancestry.csv",
  fileSize: "18.1 MB",
  markersCount: 708210,
  timestamp: "2026-06-23 11:15:30",
  markers: [
    { rsid: "rs429358", gene: "APOE", chromosome: "19", position: 45411941, genotype: "CC", riskAllele: "C", impact: "High", frequency: 0.14, description: "APOE e4/e4 genotype. Associated with up to a 12-fold increase in lifetime risk of late-onset Alzheimer's disease and accelerated amyloid-beta plaque deposition." },
    { rsid: "rs1799971", gene: "BRCA1", chromosome: "17", position: 43045622, genotype: "AG", riskAllele: "G", impact: "High", frequency: 0.02, description: "Missense variant in BRCA1 gene. Elevates lifetime susceptibility to hereditary breast, ovarian, and related epithelial cancers due to compromised double-strand DNA repair." },
    { rsid: "rs351855", gene: "FGFR4", chromosome: "5", position: 176523910, genotype: "AA", riskAllele: "A", impact: "Moderate", frequency: 0.31, description: "Gly388Arg variant. The A allele is associated with increased cell motility and has been linked to accelerated progression in solid tumors." },
    { rsid: "rs4680", gene: "COMT", chromosome: "22", position: 19951234, genotype: "GG", riskAllele: "G", impact: "Moderate", frequency: 0.48, description: "Val158Met variant. GG genotype indicates high-activity Val/Val enzyme. Dopamine is cleared rapidly from the prefrontal cortex, impacting executive function under acute stress." },
    { rsid: "rs10757278", gene: "9p21.3", chromosome: "9", position: 22090123, genotype: "AA", riskAllele: "G", impact: "Protective", frequency: 0.28, description: "Absence of the 9p21 CAD risk allele. Standard protective vascular phenotype." },
    { rsid: "rs5186", gene: "AGTR1", chromosome: "3", position: 148420956, genotype: "AA", riskAllele: "C", impact: "Protective", frequency: 0.55, description: "Standard protective genotype. Lower baseline sensitivity to angiotensin-induced hypertension." },
  ],
  predictions: [
    {
      id: "alzheimers",
      name: "Alzheimer's Disease",
      probability: 86,
      riskLevel: "High",
      category: "Neurological",
      contributingMarkers: ["rs429358", "rs4680"],
      description: "APOE e4/e4 double risk alleles detected. Drastically accelerates baseline lifetime likelihood of neurodegenerative amyloid pathology.",
      recommendations: [
        "Adopt a ketogenic or low-carb Mediterranean diet ('MIND' diet) to support brain glucose metabolism.",
        "Focus on high-intensity interval training (HIIT) to boost brain-derived neurotrophic factor (BDNF).",
        "Monitor sleep quality via polysomnography; treat obstructive sleep apnea if present.",
        "Consider preventative supplementation with high-dose DHA, curcumin, and active folate under medical guidance."
      ]
    },
    {
      id: "cancers",
      name: "Certain Cancers (Genomic Screening)",
      probability: 72,
      riskLevel: "High",
      category: "Oncology",
      contributingMarkers: ["rs1799971", "rs351855"],
      description: "BRCA1 risk allele detected. Significantly increases predisposition to breast, ovarian, and endocrine tissue cellular abnormalities.",
      recommendations: [
        "Establish an early cancer screening regimen, including annual breast MRI and pelvic ultrasounds starting immediately.",
        "Consult with a licensed genetic counselor to explore medical and surgical risk-reduction strategies.",
        "Limit exposure to chemical carcinogens, endocrine disruptors, and radiation.",
        "Include cruciferous vegetables (broccoli, Brussels sprouts) containing DIM to promote estrogen metabolism."
      ]
    },
    {
      id: "parkinsons",
      name: "Parkinson's Disease",
      probability: 32,
      riskLevel: "Moderate",
      category: "Neurological",
      contributingMarkers: ["rs4680"],
      description: "COMT Val/Val genotype combined with other polygenic factors indicates a moderate susceptibility to dopamine-related neurotoxicity.",
      recommendations: [
        "Include plenty of dietary antioxidants (berries, walnuts, leafy greens) to combat oxidative stress.",
        "Avoid heavy metal exposures (e.g., lead, manganese, pesticides).",
        "Maintain high-cardio exercise routines to preserve motor-neuron durability."
      ]
    },
    {
      id: "diabetes",
      name: "Type 2 Diabetes",
      probability: 25,
      riskLevel: "Low",
      category: "Metabolic",
      contributingMarkers: [],
      description: "Standard metabolic profile. Balanced glucose regulation genes detected.",
      recommendations: [
        "Maintain current healthy eating habits.",
        "Continue general fitness routines."
      ]
    },
    {
      id: "heart_disease",
      name: "Coronary Heart Disease",
      probability: 18,
      riskLevel: "Low",
      category: "Cardiovascular",
      contributingMarkers: ["rs10757278"],
      description: "Non-risk alleles present at 9p21 locus. Exhibits low risk of premature coronary atherosclerosis.",
      recommendations: [
        "Maintain active lifestyle.",
        "Conduct baseline checkups every 3 years."
      ]
    },
    {
      id: "hypertension",
      name: "Essential Hypertension",
      probability: 21,
      riskLevel: "Low",
      category: "Cardiovascular",
      contributingMarkers: ["rs5186"],
      description: "Low genetic susceptibility to salt-sensitive hypertension. Standard vascular responses.",
      recommendations: [
        "Maintain standard sodium restriction guidelines (~2000mg/day).",
        "Participate in regular relaxation exercises."
      ]
    }
  ]
};

// 3. Healthy / Low Risk Profile (Profile C)
export const mockProfileC: PatientProfile = {
  id: "GG-2026-1029",
  name: "Sarah Jenkins",
  dob: "1995-07-02",
  gender: "Female",
  bloodType: "B+",
  overallScore: 22,
  overallRiskLevel: "Low",
  fileName: "sarah_jenkins_raw_dna.tsv",
  fileSize: "12.5 MB",
  markersCount: 542000,
  timestamp: "2026-06-23 16:05:12",
  markers: [
    { rsid: "rs429358", gene: "APOE", chromosome: "19", position: 45411941, genotype: "TT", riskAllele: "C", impact: "Protective", frequency: 0.79, description: "Neutral APOE-e3/e3 phenotype indicating standard Alzheimer's risk." },
    { rsid: "rs10757278", gene: "9p21.3", chromosome: "9", position: 22090123, genotype: "AA", riskAllele: "G", impact: "Protective", frequency: 0.28, description: "Double protective alleles. Dramatically reduces baseline vulnerability to coronary blockages." },
    { rsid: "rs5186", gene: "AGTR1", chromosome: "3", position: 148420956, genotype: "AA", riskAllele: "C", impact: "Protective", frequency: 0.55, description: "Standard protective genotype. Standard renin-angiotensin-aldosterone function." },
    { rsid: "rs1801133", gene: "MTHFR", chromosome: "1", position: 11796321, genotype: "CC", riskAllele: "T", impact: "Protective", frequency: 0.44, description: "Ancestral homozoygous CC genotype. Normal MTHFR enzyme activity, supporting optimal folate metabolism." },
    { rsid: "rs1801282", gene: "PPARG", chromosome: "3", position: 12393122, genotype: "CC", riskAllele: "G", impact: "Low", frequency: 0.81, description: "Pro/Pro phenotype. Represents a standard baseline risk for obesity and diabetes." },
  ],
  predictions: [
    {
      id: "heart_disease",
      name: "Coronary Heart Disease",
      probability: 14,
      riskLevel: "Low",
      category: "Cardiovascular",
      contributingMarkers: [],
      description: "Double protective alleles at 9p21 locus suggest strong vascular resilience and low risk of atherosclerotic complications.",
      recommendations: [
        "Maintain current heart-healthy balanced diet.",
        "Perform routine cardio checks every 5 years."
      ]
    },
    {
      id: "hypertension",
      name: "Essential Hypertension",
      probability: 16,
      riskLevel: "Low",
      category: "Cardiovascular",
      contributingMarkers: [],
      description: "Low genetic susceptibility to salt-induced vascular tension.",
      recommendations: [
        "Continue active lifestyle.",
        "Regular preventative physical checkups."
      ]
    },
    {
      id: "diabetes",
      name: "Type 2 Diabetes",
      probability: 19,
      riskLevel: "Low",
      category: "Metabolic",
      contributingMarkers: [],
      description: "Standard insulin receptors and metabolic markers indicate low baseline risk.",
      recommendations: [
        "Focus on dietary diversity with fresh whole foods.",
        "Maintain active lifestyle."
      ]
    },
    {
      id: "alzheimers",
      name: "Alzheimer's Disease",
      probability: 10,
      riskLevel: "Low",
      category: "Neurological",
      contributingMarkers: [],
      description: "No ApoE-e4 variants detected. Neutral genetic risk profile.",
      recommendations: [
        "Engage in lifelong cognitive and social activities.",
        "Maintain healthy cardiovascular health, as it heavily correlates with cognitive health."
      ]
    },
    {
      id: "parkinsons",
      name: "Parkinson's Disease",
      probability: 7,
      riskLevel: "Low",
      category: "Neurological",
      contributingMarkers: [],
      description: "Standard risk profiles, no pathogenic variants identified.",
      recommendations: [
        "Engage in regular aerobic exercise.",
        "Incorporate colorful organic produce in diet."
      ]
    },
    {
      id: "cancers",
      name: "Certain Cancers (Genomic Screening)",
      probability: 12,
      riskLevel: "Low",
      category: "Oncology",
      contributingMarkers: [],
      description: "Normal tumor-suppressor gene performance predicted based on standard locus testing.",
      recommendations: [
        "Standard healthcare screening measures corresponding to your age group.",
        "Use sunblock and avoid exposure to toxic chemical fumes."
      ]
    }
  ]
};

// Generates a deterministic simulated analysis based on uploaded file content / filename
export const generateProfileFromUploadedFile = (fileName: string, fileSizeStr: string, textContent?: string): PatientProfile => {
  // Let's create a seed based on the filename or content
  let seed = 0;
  const hashString = fileName + (textContent || "") + fileSizeStr;
  for (let i = 0; i < hashString.length; i++) {
    seed = (seed + hashString.charCodeAt(i) * i) % 100;
  }

  // Determine overall score based on the seed
  // Distribute it between 25 and 85
  const overallScore = Math.floor(25 + (seed % 61));
  let overallRiskLevel: 'Low' | 'Moderate' | 'High' = 'Low';
  if (overallScore > 65) overallRiskLevel = 'High';
  else if (overallScore > 40) overallRiskLevel = 'Moderate';

  // Seed-based probabilities
  const heartProb = Math.floor(15 + (seed * 7) % 70);
  const diabetesProb = Math.floor(10 + (seed * 11) % 75);
  const alzProb = Math.floor(5 + (seed * 13) % 85);
  const parkProb = Math.floor(5 + (seed * 3) % 60);
  const hyperProb = Math.floor(15 + (seed * 19) % 70);
  const cancerProb = Math.floor(10 + (seed * 17) % 75);

  const getRiskLevel = (p: number): 'Low' | 'Moderate' | 'High' => {
    if (p > 65) return 'High';
    if (p > 35) return 'Moderate';
    return 'Low';
  };

  const markers: GeneticMarker[] = [
    {
      rsid: "rs10757278",
      gene: "9p21.3",
      chromosome: "9",
      position: 22090123,
      genotype: heartProb > 50 ? "GG" : (heartProb > 25 ? "AG" : "AA"),
      riskAllele: "G",
      impact: heartProb > 50 ? "High" : (heartProb > 25 ? "Moderate" : "Protective"),
      frequency: 0.42,
      description: "Locus on chromosome 9, a prominent marker associated with cardiovascular disease development risk."
    },
    {
      rsid: "rs5186",
      gene: "AGTR1",
      chromosome: "3",
      position: 148420956,
      genotype: hyperProb > 50 ? "CC" : (hyperProb > 25 ? "AC" : "AA"),
      riskAllele: "C",
      impact: hyperProb > 50 ? "High" : (hyperProb > 25 ? "Moderate" : "Protective"),
      frequency: 0.28,
      description: "Angiotensin II receptor type 1 variant, strongly correlated with salt sensitivity and vascular pressure controls."
    },
    {
      rsid: "rs429358",
      gene: "APOE",
      chromosome: "19",
      position: 45411941,
      genotype: alzProb > 70 ? "CC" : (alzProb > 30 ? "CT" : "TT"),
      riskAllele: "C",
      impact: alzProb > 70 ? "High" : (alzProb > 30 ? "Moderate" : "Protective"),
      frequency: 0.15,
      description: "Apolipoprotein E isoform variant, responsible for lipid clearance and highly influential in neurological plaque deposition."
    },
    {
      rsid: "rs1801133",
      gene: "MTHFR",
      chromosome: "1",
      position: 11796321,
      genotype: heartProb > 40 ? "TT" : (heartProb > 20 ? "CT" : "CC"),
      riskAllele: "T",
      impact: heartProb > 40 ? "Moderate" : "Protective",
      frequency: 0.35,
      description: "Methylenetetrahydrofolate reductase gene, key for cellular methylation, vascular health, and blood compound filtration."
    },
    {
      rsid: "rs1799971",
      gene: "BRCA1",
      chromosome: "17",
      position: 43045622,
      genotype: cancerProb > 60 ? "AG" : "AA",
      riskAllele: "G",
      impact: cancerProb > 60 ? "High" : "Protective",
      frequency: 0.02,
      description: "Tumor suppressor gene coding for DNA double-strand break correction mechanisms. Variant indicates potential vulnerability to cell anomalies."
    }
  ];

  return {
    id: `GG-2026-${1000 + (seed * 89) % 9000}`,
    name: "Analyzed Patient Profile",
    dob: "1990-01-15",
    gender: "Unspecified",
    bloodType: "O+",
    overallScore,
    overallRiskLevel,
    fileName,
    fileSize: fileSizeStr,
    markersCount: 450000 + (seed * 3421) % 250000,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    markers: markers.filter(m => m.impact !== 'Protective' || seed % 2 === 0), // filter somewhat to make it look unique
    predictions: [
      {
        id: "heart_disease",
        name: "Coronary Heart Disease",
        probability: heartProb,
        riskLevel: getRiskLevel(heartProb),
        category: "Cardiovascular",
        contributingMarkers: heartProb > 25 ? ["rs10757278"] : [],
        description: "Evaluated cardiovascular risk profile based on chromosome 9 variants and vascular indicators.",
        recommendations: heartProb > 35 ? [
          "Follow a cardiovascular-friendly diet restricting saturated fats.",
          "Perform regular aerobic physical activities 4 times a week.",
          "Establish checkups to track your LDL cholesterol levels regularly."
        ] : ["Continue baseline fitness activities.", "Conduct regular heart checkups."]
      },
      {
        id: "hypertension",
        name: "Essential Hypertension",
        probability: hyperProb,
        riskLevel: getRiskLevel(hyperProb),
        category: "Cardiovascular",
        contributingMarkers: hyperProb > 25 ? ["rs5186"] : [],
        description: "Renin-angiotensin pathway genotype evaluation for blood flow resistance levels.",
        recommendations: hyperProb > 35 ? [
          "Reduce total salt consumption to less than 2g per day.",
          "Integrate dietary potassium, calcium, and magnesium sources.",
          "Incorporate routine blood pressure checkups at home."
        ] : ["Consume standard low-sodium diet.", "Maintain healthy lifestyle behaviors."]
      },
      {
        id: "diabetes",
        name: "Type 2 Diabetes",
        probability: diabetesProb,
        riskLevel: getRiskLevel(diabetesProb),
        category: "Metabolic",
        contributingMarkers: [],
        description: "Genomic factors dictating pancreatic islet function and insulin absorption responses.",
        recommendations: diabetesProb > 35 ? [
          "Perform regular muscle building exercise to optimize metabolic insulin sensitivity.",
          "Restrict processed sugars and high glycemic carbohydrates.",
          "Keep tabs on fasting blood sugar and HbA1c metrics yearly."
        ] : ["Adopt general dietary discipline.", "Participate in routine active fitness."]
      },
      {
        id: "alzheimers",
        name: "Alzheimer's Disease",
        probability: alzProb,
        riskLevel: getRiskLevel(alzProb),
        category: "Neurological",
        contributingMarkers: alzProb > 30 ? ["rs429358"] : [],
        description: "ApoE isoform testing mapping for neurovascular and plaque-deposition risks.",
        recommendations: alzProb > 35 ? [
          "Consume a high-antioxidant diet rich in berries, spinach, and deep-sea fish.",
          "Complete regular cognitive exercise (problem solving, foreign languages, logic).",
          "Ensure healthy, deep REM sleep cycles to enhance brain metabolite clearing."
        ] : ["Maintain social connections and hobbies.", "Keep active in daily mental exercise."]
      },
      {
        id: "parkinsons",
        name: "Parkinson's Disease",
        probability: parkProb,
        riskLevel: getRiskLevel(parkProb),
        category: "Neurological",
        contributingMarkers: [],
        description: "Standard risk analysis examining potential variations in neuro-protective pathways.",
        recommendations: parkProb > 35 ? [
          "Avoid exposure to harsh organic compounds or pesticide sprays.",
          "Consume green tea, which is historically correlated with neuroprotection.",
          "Remain physically active with tasks demanding coordinated movement."
        ] : ["Engage in full-body mobility exercises.", "Eat balanced nutritious diets."]
      },
      {
        id: "cancers",
        name: "Certain Cancers (Genomic Screening)",
        probability: cancerProb,
        riskLevel: getRiskLevel(cancerProb),
        category: "Oncology",
        contributingMarkers: cancerProb > 50 ? ["rs1799971"] : [],
        description: "BRCA and mismatch repair pathway evaluation mapping.",
        recommendations: cancerProb > 35 ? [
          "Consult with clinicians to arrange standard annual preventative scans.",
          "Avoid direct toxic radiation or carcinogenic chemical exposure.",
          "Eat organic cruciferous greens containing natural cellular protection."
        ] : ["Review standard checkups recommended for your age.", "Avoid chronic toxic habits like smoking."]
      }
    ]
  };
};

export const faqs = [
  {
    q: "How does GeneGuard AI predict disease risks?",
    a: "We scan raw genetic testing data (such as SNP data in 23andMe or Ancestry formats) for specific genetic variants (Single Nucleotide Polymorphisms or SNPs) associated with disease vulnerability in large-scale clinical studies (GWAS databases). These are calculated alongside polygenic risk structures to output disease risk probabilities."
  },
  {
    q: "What types of files are supported for upload?",
    a: "We support standard TSV, CSV, TXT, and Excel formats containing columns such as 'RSID', 'Genotype', 'Chromosome', or raw DNA database exports directly downloaded from 23andMe, AncestryDNA, MyHeritage, or similar providers."
  },
  {
    q: "Is my medical data secure and private?",
    a: "Absolutely. GeneGuard AI runs local analysis directly in the browser sandboxing when possible, and enforces strict SSL encryption. We do not store or sell your genetic information, adhering strictly to HIPAA guidelines and data privacy principles."
  },
  {
    q: "What do the risk levels (Low, Moderate, High) mean?",
    a: "A 'Low' risk indicates your genetic variants match general population levels or express protective traits. 'Moderate' signifies a slight elevation in polygenic risk, while 'High' suggests that major clinical risk alleles are present. These indicate genetic predisposition, not a diagnosis."
  },
  {
    q: "Should I make medical changes based on these results?",
    a: "No. The predictions generated by GeneGuard AI are for educational and research purposes only. They are not clinical diagnoses. Always consult a healthcare professional or genetic counselor before initiating any treatment, diet, or lifestyle modifications."
  }
];

export const chatbotKnowledge = [
  {
    keywords: ["hi", "hello", "hey", "greetings"],
    response: "Hello! I am your GeneGuard AI Genetic Assistant. I can answer questions about your genetic test results, specific DNA markers like APOE or MTHFR, or general information about disease risks and recommendations. How can I assist you today?"
  },
  {
    keywords: ["apoe", "alzheimer", "dementia", "rs429358"],
    response: "The APOE gene (Apolipoprotein E) is crucial for clearing lipids in the brain. Variants like APOE-ε4 (associated with rs429358) significantly increase the risk of late-onset Alzheimer's. A single ε4 allele increases risk by 3-fold, while double ε4 alleles (APOE e4/e4) can increase risk by up to 12-fold. Recommendations for e4 carriers include the 'MIND' diet, cardiovascular exercise, and maintaining strict sleep quality."
  },
  {
    keywords: ["mthfr", "homocysteine", "folate", "rs1801133"],
    response: "The MTHFR gene regulates folate metabolism, which is essential for DNA methylation and converting homocysteine to methionine. The C677T variant (rs1801133) can reduce enzyme activity. A 'CT' genotype shows moderate reduction, while 'TT' shows high reduction, which can cause elevated homocysteine (impacting heart and vascular health). Supplementing with methylfolate (rather than synthetic folic acid) and active B-vitamins often helps."
  },
  {
    keywords: ["heart", "cardio", "coronary", "rs10757278"],
    response: "Cardiovascular health is strongly influenced by the 9p21.3 locus (rs10757278), often dubbed the 'heart disease gene'. Carrying the risk alleles (GG) indicates a higher likelihood of arterial plaque build-up. We recommend a Mediterranean diet, routine aerobic cardio work, maintaining an LDL cholesterol score under 70 mg/dL, and tracking vascular health metrics closely."
  },
  {
    keywords: ["privacy", "hipaa", "safe", "secure", "data"],
    response: "GeneGuard AI takes safety seriously. We implement strict HIPAA-standard security compliance. All uploaded file parsing occurs locally in your browser memory, meaning your raw DNA is not saved or transmitted to third-party databases. Results are decrypted temporarily in memory and destroyed once you close the application session."
  },
  {
    keywords: ["brca", "cancer", "tumor", "rs1799971"],
    response: "BRCA1 and BRCA2 genes are tumor suppressor genes that play a vital role in repairing damaged DNA. Variants such as rs1799971 can compromise this repair mechanism, leading to heightened risks for breast, ovarian, and prostate cancers. If a high-risk variant is detected, it is highly recommended to seek professional genetic counseling and discuss specialized oncology screenings."
  },
  {
    keywords: ["diabetes", "sugar", "insulin", "rs1801282"],
    response: "Type 2 Diabetes risk is modulated by genes like PPARG (rs1801282), which controls fat cell development and insulin response. Carrying certain variants predisposes you to insulin resistance. To offset this, we recommend weight management, focusing on low glycemic index foods, and conducting regular strength training, which naturally boosts cellular insulin sensitivity."
  },
  {
    keywords: ["hypertension", "blood pressure", "salt", "rs5186"],
    response: "The AGTR1 gene (rs5186) plays a critical role in blood pressure regulation through the renin-angiotensin system. Specific variants cause the body to be highly reactive to angiotensin II, leading to salt-sensitive hypertension. Managing this genetic trait involves keeping sodium levels low (<1500mg/day), increasing dietary potassium/magnesium, and using relaxation techniques."
  }
];

export const getChatbotResponse = (message: string): string => {
  const cleanMsg = message.toLowerCase();
  for (const item of chatbotKnowledge) {
    if (item.keywords.some(keyword => cleanMsg.includes(keyword))) {
      return item.response;
    }
  }
  return "I understand you have a question. GeneGuard AI analyzes markers like APOE, MTHFR, 9p21 (Heart Disease), AGTR1 (Hypertension), and BRCA (Oncology). Could you specify which marker, disease, or privacy aspect you would like to know more about?";
};
