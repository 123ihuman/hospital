// ==========================================
// THE OFFLINE DOCTOR ENGINE (Rule of 5)
// ==========================================

// 1. THE MASSIVE CONDITION PROTOCOLS DATABASE
// This maps real-world diagnoses to exact medicine combinations.
const CONDITION_PROTOCOLS = [
  {
    id: "viral_fever",
    name: "Viral Fever & Body Pain",
    keywords: ["fever", "bukhar", "body pain", "weakness", "chills", "thand lagna", "temperature"],
    // The "Rule of 5" Prescription
    prescription: [
      { medId: "paracetamol_500", role: "Primary: Reduces fever and body pain." },
      { medId: "cetirizine_10", role: "Secondary: Helps with body ache and induces restful sleep." },
      { medId: "pantoprazole_40", role: "Gastric Shield: Protects stomach from other medicines. Take empty stomach." },
      { medId: "zincovit_syrup", role: "Immunity: Fights weakness and boosts recovery." },
      { medId: "ors_powder", role: "Hydration: Prevents dehydration from fever." }
    ],
    lifestyle: "Complete bed rest. Drink 3-4 liters of warm water. Eat only moong dal khichdi and boiled vegetables. Avoid cold items completely.",
    warning: "If fever crosses 103°F or lasts more than 3 days, get a CBC and Dengue/Typhoid test immediately."
  },
  {
    id: "bacterial_throat",
    name: "Severe Throat Infection & Cough",
    keywords: ["throat pain", "gale mein dard", "swallowing pain", "severe cough", "tonsils"],
    prescription: [
      { medId: "amoxiclav_625", role: "Primary Antibiotic: Kills bacterial infection. Complete 5-day course." },
      { medId: "dextromethorphan_syrup", role: "Cough Suppressant: Stops dry cough. Take after food." },
      { medId: "pantoprazole_40", role: "Gastric Shield: Mandatory with antibiotics." },
      { medId: "becosules_capsule", role: "Healing: Vitamin B-complex heals throat ulcers and boosts immunity." },
      { medId: "betadine_solution", role: "Topical: Gargle with diluted Betadine water 3 times a day." }
    ],
    lifestyle: "Warm salt water gargles 4 times a day. Drink warm ginger-honey tea. Avoid talking too much. Eat soft, warm foods like soups.",
    warning: "If you see white patches on tonsils or cannot swallow saliva, visit an ENT doctor immediately."
  },
  {
    id: "allergic_cold",
    name: "Allergic Cold, Sneezing & Runny Nose",
    keywords: ["cold", "sardi", "sneezing", "chheenk", "runny nose", "behti naak", "nasal congestion"],
    prescription: [
      { medId: "levocetirizine_5", role: "Primary Antihistamine: Stops sneezing and runny nose. Take at night." },
      { medId: "xylometazoline_nasal", role: "Relief: Opens blocked nose instantly. Use max 3 days only." },
      { medId: "montelukast_10", role: "Preventer: Reduces allergic inflammation in airways." },
      { medId: "vitamin_c_tablet", role: "Immunity: Natural antihistamine and immunity booster." },
      { medId: "steam_inhaler", role: "Therapy: Steam inhalation morning and evening." }
    ],
    lifestyle: "Wear a mask in dust/pollution. Wash face and hands immediately after coming home. Drink warm tulsi tea.",
    warning: "If you experience wheezing or chest tightness, you may need an inhaler. Consult a doctor."
  },
  {
    id: "wet_cough_bronchitis",
    name: "Wet Cough, Chest Congestion & Phlegm",
    keywords: ["wet cough", "balgam", "chest congestion", "phlegm", "kaf"],
    prescription: [
      { medId: "ambroxol_syrup", role: "Mucolytic: Thins and clears phlegm from chest." },
      { medId: "levosalbutamol_neb", role: "Bronchodilator: Opens airways if breathing is heavy." },
      { medId: "azithromycin_500", role: "Antibiotic: Clears underlying chest infection. 3-day course." },
      { medId: "pantoprazole_40", role: "Gastric Shield: Protects stomach." },
      { medId: "honitus_syrup", role: "Ayurvedic Support: Soothes throat and helps expectoration." }
    ],
    lifestyle: "Steam inhalation is mandatory 3 times a day. Sleep with head slightly elevated. Drink warm water only.",
    warning: "If phlegm is green/bloody or you have high fever, get a Chest X-Ray immediately."
  },
  {
    id: "acidity_gas",
    name: "Acidity, Gas, Bloating & Heartburn",
    keywords: ["acidity", "gas", "heartburn", "bloating", "pet mein gas", "khatta dakaar"],
    prescription: [
      { medId: "pantoprazole_40", role: "Primary: Reduces stomach acid production. Take empty stomach." },
      { medId: "digene_gel", role: "Instant Relief: Neutralizes existing acid. Take after meals." },
      { medId: "domperidone_10", role: "Prokinetic: Stops bloating and nausea. Take before food." },
      { medId: "isabgol_husk", role: "Digestion: Clears bowels if constipated. Take at night." },
      { medId: "probiotic_capsule", role: "Gut Health: Restores good bacteria in stomach." }
    ],
    lifestyle: "Eat small, frequent meals. Avoid spicy, oily, and junk food. Do not lie down immediately after eating. Drink warm water.",
    warning: "If you have severe chest pain radiating to the left arm, it could be a heart issue. Go to ER."
  },
  {
    id: "stomach_infection",
    name: "Stomach Infection, Diarrhea & Vomiting",
    keywords: ["diarrhea", "dast", "loose motion", "vomiting", "ulti", "stomach infection", "food poisoning"],
    prescription: [
      { medId: "ors_powder", role: "CRITICAL: Prevents dehydration. Drink after every loose motion." },
      { medId: "metronidazole_400", role: "Antibiotic: Kills stomach bacteria/amoeba. 5-day course." },
      { medId: "ondansetron_4", role: "Anti-vomiting: Stops vomiting so you can keep fluids down." },
      { medId: "probiotic_capsule", role: "Gut Restore: Replaces good bacteria lost in diarrhea." },
      { medId: "zinc_tablet", role: "Recovery: WHO recommends Zinc to heal gut lining fast." }
    ],
    lifestyle: "Eat only BRAT diet (Banana, Rice, Applesauce, Toast) or Khichdi. Avoid milk, sugar, and outside food completely.",
    warning: "If there is blood in stool, high fever, or no urine for 6 hours, go to the hospital for IV fluids."
  },
  {
    id: "muscle_joint_pain",
    name: "Muscle Pain, Joint Pain & Sprain",
    keywords: ["muscle pain", "joint pain", "sprain", "body ache", "chot", "sprain", "back pain"],
    prescription: [
      { medId: "aceclofenac_100", role: "Primary Painkiller: Reduces severe pain and inflammation." },
      { medId: "diclofenac_gel", role: "Topical: Apply locally on pain area 3 times a day." },
      { medId: "pantoprazole_40", role: "Gastric Shield: Mandatory with strong painkillers." },
      { medId: "calcium_d3", role: "Support: Helps bone and muscle recovery." },
      { medId: "crepe_bandage", role: "Support: Compress the injured area to reduce swelling." }
    ],
    lifestyle: "Rest the affected joint. Use hot water bag for chronic pain, ice pack for fresh injury (first 48 hours).",
    warning: "If you cannot move the joint or there is severe swelling, get an X-Ray to rule out fracture."
  },
  {
    id: "wound_cut",
    name: "Cuts, Wounds & Minor Injuries",
    keywords: ["cut", "wound", "injury", "bleeding", "ghav", "chot", "scratch"],
    prescription: [
      { medId: "betadine_solution", role: "Cleaning: Wash wound with diluted Betadine water." },
      { medId: "mupirocin_cream", role: "Antibiotic Cream: Prevents infection. Apply thin layer." },
      { medId: "povidone_iodine", role: "Ointment: Alternative to Mupirocin for dressing." },
      { medId: "tetanus_toxoid", role: "Injection: Mandatory if wound is deep or caused by rust/dirt." },
      { medId: "crepe_bandage", role: "Dressing: Keep wound covered and clean." }
    ],
    lifestyle: "Keep wound dry. Change dressing daily. Eat protein-rich food (eggs, dal) for fast healing.",
    warning: "If bleeding doesn't stop in 10 mins, or wound is deep, go to ER for stitches immediately."
  },
  {
    id: "weakness_fatigue",
    name: "General Weakness, Fatigue & No Hunger",
    keywords: ["weakness", "thakan", "no hunger", "bhook nahi lagti", "fatigue", "low energy"],
    prescription: [
      { medId: "zincovit_syrup", role: "Multivitamin: Fills all nutritional gaps." },
      { medId: "livogen_syrup", role: "Iron: Treats hidden anemia causing weakness." },
      { medId: "aptivate_syrup", role: "Appetite: Naturally increases hunger." },
      { medId: "vitamin_d3_tablet", role: "Energy: Fixes Vitamin D deficiency (very common in India)." },
      { medId: "ensure_powder", role: "Nutrition: High calorie protein for instant energy." }
    ],
    lifestyle: "Eat 5 small meals a day. Include bananas, dates, almonds, and milk. Walk 20 mins in morning sunlight.",
    warning: "If weakness is sudden and severe, get a CBC, Thyroid (TSH), and Blood Sugar test."
  },
  {
    id: "skin_fungal",
    name: "Fungal Infection, Ringworm & Itching",
    keywords: ["fungal", "ringworm", "dad", "khujli", "itching", "red rash", "jock itch"],
    prescription: [
      { medId: "fluconazole_150", role: "Oral Antifungal: Kills fungus from inside. Single dose or weekly." },
      { medId: "terbinafine_cream", role: "Topical: Apply on rash twice daily for 2 weeks." },
      { medId: "candid_powder", role: "Hygiene: Keep area dry. Apply powder after cream dries." },
      { medId: "levocetirizine_5", role: "Anti-itch: Stops severe itching, especially at night." },
      { medId: "moisturizer_lotion", role: "Barrier: Use plain moisturizer if skin is very dry." }
    ],
    lifestyle: "Wear loose cotton clothes. Keep the area dry. Do not share towels. Wash clothes in hot water.",
    warning: "Do not use steroid creams (like Betnovate) on fungal infections. It will make it worse."
  },
    // --- ADD THESE TO THE END OF CONDITION_PROTOCOLS ARRAY ---
  {
    id: "migraine",
    name: "Migraine & Severe One-Sided Headache",
    keywords: ["migraine", "severe headache", "one sided headache", "throbbing pain", "light sensitivity", "nausea with headache"],
    prescription: [
      { medId: "sumatriptan_50", role: "Primary: Stops migraine attack. Take at first sign of pain." },
      { medId: "domperidone_10", role: "Anti-nausea: Prevents vomiting and helps painkiller absorb faster." },
      { medId: "flunarizine_10", role: "Preventer: Take at night to reduce frequency of future attacks." },
      { medId: "pantoprazole_40", role: "Gastric Shield: Protects stomach from strong painkillers." },
      { medId: "magnesium_supplement", role: "Support: Reduces nerve excitability and prevents future migraines." }
    ],
    lifestyle: "Rest in a dark, quiet room immediately. Apply a cold cloth to the forehead. Avoid strong smells, bright screens, and aged cheese. Sleep 8 hours regularly.",
    warning: "If headache is sudden and 'worst of your life', or accompanied by vision loss or weakness on one side, go to the Emergency Room immediately."
  },
  {
    id: "uti_infection",
    name: "Urinary Tract Infection (UTI) & Burning Urination",
    keywords: ["burning urination", "frequent urination", "uti", "urine infection", "pain while peeing", "cloudy urine"],
    prescription: [
      { medId: "nitrofurantoin_100", role: "Primary Antibiotic: Kills UTI bacteria. Complete 5-day course." },
      { medId: "sodium_bicarbonate_syrup", role: "Alkalizer: Reduces burning sensation. Mix in water and drink." },
      { medId: "flavoxate_100", role: "Antispasmodic: Relieves bladder spasms and urgency." },
      { medId: "probiotic_capsule", role: "Gut/Urinary Health: Restores good bacteria after antibiotics." },
      { medId: "cranberry_supplement", role: "Support: Prevents bacteria from sticking to bladder walls." }
    ],
    lifestyle: "Drink 3-4 liters of water daily to flush out bacteria. Urinate immediately after intercourse. Wipe front to back. Avoid holding urine for long periods.",
    warning: "If you develop high fever, back/flank pain, or blood in urine, the infection may have reached the kidneys. Visit a doctor immediately."
  },
  {
    id: "dengue_warning",
    name: "Suspected Dengue or Viral Fever with Body Aches",
    keywords: ["dengue", "high fever", "severe body pain", "eye pain", "bone pain", "rash", "low platelets"],
    prescription: [
      { medId: "paracetamol_500", role: "Primary: ONLY safe fever reducer. Max 3g/day." },
      { medId: "ors_powder", role: "Hydration: CRITICAL to maintain blood volume and platelets." },
      { medId: "papaya_leaf_extract", role: "Ayurvedic Support: Traditionally used to support platelet count." },
      { medId: "vitamin_c_tablet", role: "Immunity: Supports blood vessel strength and recovery." },
      { medId: "paracetamol_syrup", role: "Alternative: For children or those who cannot swallow tablets." }
    ],
    lifestyle: "COMPLETE bed rest. Drink ORS, coconut water, and fresh juices continuously. Eat soft, easily digestible food. Use a mosquito net.",
    warning: "🚨 DANGER: NEVER take Ibuprofen, Aspirin, or Combiflam for Dengue (causes bleeding). If you see bleeding gums, black stools, or extreme weakness, go to the hospital IMMEDIATELY for a CBC and Dengue NS1 test."
  },
  {
    id: "menstrual_cramps",
    name: "Severe Menstrual Cramps (Dysmenorrhea)",
    keywords: ["period cramps", "menstrual pain", "lower stomach pain periods", "dysmenorrhea", "period pain"],
    prescription: [
      { medId: "mefenamic_acid_500", role: "Primary Painkiller: Specifically targets menstrual prostaglandins." },
      { medId: "drotin_40", role: "Antispasmodic: Relaxes uterine muscles to stop cramping." },
      { medId: "pantoprazole_40", role: "Gastric Shield: Take empty stomach to prevent acidity from painkillers." },
      { medId: "iron_folic_acid", role: "Support: Replenishes iron lost during heavy bleeding." },
      { medId: "hot_water_bag", role: "Topical Therapy: Apply to lower abdomen for 20 mins to relax muscles." }
    ],
    lifestyle: "Apply a hot water bag to your lower stomach. Drink warm ginger or fennel (saunf) tea. Do light stretching or yoga. Avoid cold foods and caffeine.",
    warning: "If pain is so severe that you vomit or faint, or if bleeding soaks more than one pad per hour, consult a gynecologist to rule out PCOS or endometriosis."
  },
  {
    id: "hypertension",
    name: "High Blood Pressure (Hypertension) Management",
    keywords: ["high bp", "hypertension", "blood pressure", "dizziness", "headache with high bp"],
    prescription: [
      { medId: "telmisartan_40", role: "Primary: Relaxes blood vessels. Take at the same time daily." },
      { medId: "amlodipine_5", role: "Secondary: Calcium channel blocker for added BP control." },
      { medId: "aspirin_75", role: "Preventer: Low-dose blood thinner to prevent heart attacks (if prescribed)." },
      { medId: "atorvastatin_10", role: "Cholesterol: Protects heart arteries from plaque buildup." },
      { medId: "potassium_supplement", role: "Support: Helps balance sodium and lower BP naturally." }
    ],
    lifestyle: "Strictly reduce salt intake (no extra salt on food). Walk briskly for 30 mins daily. Avoid stress, smoking, and alcohol. Eat potassium-rich foods like bananas and spinach.",
    warning: "If BP exceeds 180/120 mmHg, or you experience chest pain, severe headache, or blurred vision, this is a Hypertensive Crisis. Go to the Emergency Room immediately."
  },
  {
    id: "type2_diabetes",
    name: "Type 2 Diabetes Management & High Sugar",
    keywords: ["diabetes", "high sugar", "frequent urination", "excessive thirst", "diabetic"],
    prescription: [
      { medId: "metformin_500", role: "Primary: Reduces liver glucose production. Take after dinner." },
      { medId: "glimepiride_1", role: "Secondary: Stimulates pancreas to release more insulin. Take before breakfast." },
      { medId: "methylcobalamin_1500", role: "Nerve Support: Prevents diabetic neuropathy (tingling in feet)." },
      { medId: "alpha_lipoic_acid", role: "Antioxidant: Protects nerves and improves insulin sensitivity." },
      { medId: "diabetic_multivitamin", role: "Support: Chromium and Zinc to help regulate blood sugar." }
    ],
    lifestyle: "Follow a strict low-carb, high-fiber diet (avoid white rice, maida, sugar). Walk 30-45 minutes after every meal. Check feet daily for cuts. Drink plenty of water.",
    warning: "If you feel shaky, sweaty, and confused, your sugar may be too LOW. Eat 2-3 glucose tablets or a glass of fruit juice immediately. If sugar is consistently >250, see your doctor."
  }
];

// 2. THE DOCTOR ENGINE LOGIC
function runDoctorEngine(userSymptoms) {
  const input = userSymptoms.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  // Find the condition that matches the most keywords
  CONDITION_PROTOCOLS.forEach(protocol => {
    let score = 0;
    protocol.keywords.forEach(keyword => {
      if (input.includes(keyword)) score++;
    });
    if (score > highestScore) {
      highestScore = score;
      bestMatch = protocol;
    }
  });

  // If no specific condition matches, use a generic "General Illness" protocol
  if (!bestMatch || highestScore === 0) {
    bestMatch = {
      id: "general_illness",
      name: "General Illness & Symptomatic Relief",
      prescription: [
        { medId: "paracetamol_500", role: "Primary: For any mild fever or body pain." },
        { medId: "cetirizine_10", role: "Secondary: Helps with mild allergy and sleep." },
        { medId: "pantoprazole_40", role: "Gastric Shield: Protects stomach." },
        { medId: "zincovit_syrup", role: "Immunity: Boosts overall health." },
        { medId: "ors_powder", role: "Hydration: Keeps body hydrated." }
      ],
      lifestyle: "Take complete rest. Drink plenty of warm water. Eat light, home-cooked food like khichdi.",
      warning: "If symptoms persist for more than 3 days, please consult a doctor for a physical checkup."
    };
  }

  return bestMatch;
}
