// Healthcare Chatbot Service - Comprehensive medical knowledge base and analysis
export interface HealthcareCondition {
  condition: string;
  keywords: {
    english: string[];
    hindi: string[];
    hinglish: string[];
  };
  responses: {
    english: HealthcareResponse;
    hindi: HealthcareResponse;
    hinglish: HealthcareResponse;
  };
}

export interface HealthcareResponse {
  diagnosis: string;
  additional_symptoms: string;
  precautions: string;
}

export interface EmergencyResponse {
  isEmergency: boolean;
  condition: string;
  diagnosis: string;
  hospitals?: Hospital[];
  emergencyNumbers?: EmergencyContact[];
  language: Language;
}

export interface Hospital {
  name: string;
  address: string;
  phone: string;
  distance: string;
  time: string;
  specialties?: string;
}

export interface EmergencyContact {
  service: string;
  number: string;
  description: string;
}

export type Language = 'english' | 'hindi' | 'hinglish';

export interface AnalysisResult {
  condition: string;
  diagnosis: string;
  additionalSymptoms: string;
  precautions: string;
  language: Language;
  confidence: number;
  isEmergency?: boolean;
  hospitals?: Hospital[];
  emergencyNumbers?: EmergencyContact[];
}

export class HealthcareService {
  private healthcareDB: HealthcareCondition[] = [
    {
      condition: "dengue",
      keywords: {
        english: ["fever", "rash", "dengue", "red spots", "skin rash"],
        hindi: ["बुखार", "चकत्ते", "डेंगू", "लाल दाग", "त्वचा पर दाने"],
        hinglish: ["bukhar", "rash", "dengue", "dhabbe", "lal spots", "lal dhabbe"]
      },
      responses: {
        english: {
          diagnosis: "Based on your symptoms of fever and rash, you might have dengue fever.",
          additional_symptoms: "Other dengue symptoms include: severe headache, pain behind eyes, muscle and joint pain, nausea, vomiting, and extreme fatigue.",
          precautions: "Stay hydrated with ORS, take paracetamol for fever (avoid aspirin), get complete rest, monitor platelet count, and seek immediate medical attention if you experience severe abdominal pain or persistent vomiting."
        },
        hindi: {
          diagnosis: "बुखार और चकत्तों के आधार पर, आपको डेंगू बुखार हो सकता है।",
          additional_symptoms: "डेंगू के अन्य लक्षण हैं: तेज़ सिरदर्द, आंखों के पीछे दर्द, मांसपेशियों और जोड़ों में दर्द, मतली, उल्टी, और अत्यधिक थकान।",
          precautions: "ORS से हाइड्रेटेड रहें, बुखार के लिए पैरासिटामोल लें (एस्प्रिन से बचें), पूरा आराम करें, प्लेटलेट काउंट की जांच कराएं, और पेट में तेज़ दर्द या लगातार उल्टी होने पर तुरंत डॉक्टर से मिलें।"
        },
        hinglish: {
          diagnosis: "Bukhar aur rash ke basis pe, aapko dengue fever ho sakta hai.",
          additional_symptoms: "Dengue ke aur symptoms hain: severe headache, aankhon ke peeche pain, muscle aur joint pain, nausea, vomiting, aur bahut zyada weakness.",
          precautions: "ORS se hydrated rahiye, fever ke liye paracetamol lijiye (aspirin avoid kariye), complete rest lijiye, platelet count check karaiye, aur agar severe pet dard ya continuous vomiting ho toh turant doctor se miliye."
        }
      }
    },
    {
      condition: "malaria",
      keywords: {
        english: ["fever", "chills", "malaria", "shivering", "sweating"],
        hindi: ["बुखार", "कंपकंपी", "मलेरिया", "ठंड लगना", "पसीना"],
        hinglish: ["bukhar", "chills", "malaria", "kampkampi", "thand", "pasina"]
      },
      responses: {
        english: {
          diagnosis: "Your symptoms of fever with chills suggest possible malaria infection.",
          additional_symptoms: "Other malaria symptoms include: high fever with sweating, severe chills, headache, muscle pain, fatigue, and nausea.",
          precautions: "Get a malaria test immediately, take prescribed antimalarial medication, use mosquito nets, apply mosquito repellent, keep surroundings clean, and avoid water stagnation around your home."
        },
        hindi: {
          diagnosis: "बुखार के साथ कंपकंपी के लक्षण मलेरिया संक्रमण की संभावना दर्शाते हैं।",
          additional_symptoms: "मलेरिया के अन्य लक्षण हैं: पसीने के साथ तेज़ बुखार, तीव्र कंपकंपी, सिरदर्द, मांसपेशियों में दर्द, थकान, और मतली।",
          precautions: "तुरंत मलेरिया टेस्ट कराएं, निर्धारित एंटीमलेरियल दवा लें, मच्छरदानी का उपयोग करें, मच्छर भगाने वाली दवा लगाएं, आसपास सफाई रखें, और घर के आसपास पानी जमा न होने दें।"
        },
        hinglish: {
          diagnosis: "Bukhar ke saath chills ke symptoms malaria infection ki possibility show karte hain.",
          additional_symptoms: "Malaria ke aur symptoms hain: pasine ke saath high fever, severe chills, headache, muscle pain, fatigue, aur nausea.",
          precautions: "Turant malaria test karaiye, prescribed antimalarial medicine lijiye, mosquito net use kariye, mosquito repellent lagaiye, surroundings clean rakhiye, aur ghar ke paas paani jama na hone diye."
        }
      }
    },
    {
      condition: "migraine",
      keywords: {
        english: ["headache", "migraine", "head pain", "severe headache", "throbbing pain"],
        hindi: ["सिरदर्द", "माइग्रेन", "सिर में दर्द", "तेज़ सिरदर्द", "धड़कता दर्द"],
        hinglish: ["headache", "migraine", "sir dard", "sir mein dard", "tez headache"]
      },
      responses: {
        english: {
          diagnosis: "Your severe headache symptoms suggest you might be experiencing a migraine.",
          additional_symptoms: "Other migraine symptoms include: throbbing pain on one side, sensitivity to light and sound, nausea, vomiting, and visual disturbances.",
          precautions: "Rest in a dark, quiet room, apply cold compress, stay hydrated, avoid trigger foods, maintain regular sleep schedule, manage stress, and consult a neurologist if attacks are frequent."
        },
        hindi: {
          diagnosis: "आपके तेज़ सिरदर्द के लक्षण माइग्रेन की संभावना दर्शाते हैं।",
          additional_symptoms: "माइग्रेन के अन्य लक्षण हैं: एक तरफ धड़कता दर्द, रोशनी और आवाज़ के प्रति संवेदनशीलता, मतली, उल्टी, और दृष्टि संबंधी समस्याएं।",
          precautions: "अंधेरे, शांत कमरे में आराम करें, ठंडी सिकाई करें, हाइड्रेटेड रहें, ट्रिगर फूड्स से बचें, नियमित नींद का समय रखें, तनाव को नियंत्रित करें, और अगर अटैक बार-बार आते हैं तो न्यूरोलॉजिस्ट से सलाह लें।"
        },
        hinglish: {
          diagnosis: "Aapke severe headache ke symptoms migraine ki possibility show karte hain.",
          additional_symptoms: "Migraine ke aur symptoms hain: ek side mein throbbing pain, light aur sound sensitivity, nausea, vomiting, aur visual disturbances.",
          precautions: "Dark, quiet room mein rest kariye, cold compress lagaiye, hydrated rahiye, trigger foods avoid kariye, regular sleep schedule maintain kariye, stress manage kariye, aur agar frequent attacks aate hain toh neurologist se consult kariye."
        }
      }
    },
    {
      condition: "gastritis",
      keywords: {
        english: ["stomach pain", "acidity", "gastritis", "burning stomach", "indigestion"],
        hindi: ["पेट दर्द", "एसिडिटी", "गैस्ट्राइटिस", "पेट में जलन", "अपच"],
        hinglish: ["pet dard", "acidity", "gastritis", "pet mein jalan", "gas"]
      },
      responses: {
        english: {
          diagnosis: "Your stomach pain and acidity symptoms indicate possible gastritis or acid reflux.",
          additional_symptoms: "Other gastritis symptoms include: burning sensation in stomach, bloating, nausea, loss of appetite, and pain after eating.",
          precautions: "Eat small frequent meals, avoid spicy and oily foods, don't skip meals, drink plenty of water, avoid alcohol and smoking, take antacids as needed, and consult a gastroenterologist if symptoms persist."
        },
        hindi: {
          diagnosis: "आपके पेट दर्द और एसिडिटी के लक्षण गैस्ट्राइटिस या एसिड रिफ्लक्स की संभावना दर्शाते हैं।",
          additional_symptoms: "गैस्ट्राइटिस के अन्य लक्षण हैं: पेट में जलन की संवेदना, पेट फूलना, मतली, भूख न लगना, और खाने के बाद दर्द।",
          precautions: "थोड़ा-थोड़ा करके बार-बार खाएं, मसालेदार और तेलीय भोजन से बचें, खाना न छोड़ें, भरपूर पानी पिएं, शराब और धूम्रपान से बचें, जरूरत पड़ने पर एंटासिड लें, और अगर लक्षण बने रहते हैं तो गैस्ट्रोएंटेरोलॉजिस्ट से सलाह लें।"
        },
        hinglish: {
          diagnosis: "Aapke stomach pain aur acidity ke symptoms gastritis ya acid reflux ki possibility show karte hain.",
          additional_symptoms: "Gastritis ke aur symptoms hain: pet mein burning sensation, bloating, nausea, appetite loss, aur khane ke baad pain.",
          precautions: "Small frequent meals lijiye, spicy aur oily food avoid kariye, meals skip na kariye, plenty paani pijiye, alcohol aur smoking avoid kariye, antacids le sakte hain, aur agar symptoms persist karte hain toh gastroenterologist se consult kariye."
        }
      }
    },
    {
      condition: "diabetes",
      keywords: {
        english: ["diabetes", "high blood sugar", "frequent urination", "excessive thirst", "fatigue"],
        hindi: ["डायबिटीज़", "हाई ब्लड शुगर", "बार-बार पेशाब", "अधिक प्यास", "थकान"],
        hinglish: ["diabetes", "sugar", "baar baar peshab", "zyada pyaas", "thakaan"]
      },
      responses: {
        english: {
          diagnosis: "Your symptoms of frequent urination and excessive thirst may indicate diabetes or high blood sugar.",
          additional_symptoms: "Other diabetes symptoms include: unexplained weight loss, extreme fatigue, blurred vision, slow healing wounds, and increased hunger.",
          precautions: "Get blood sugar levels checked immediately, maintain a diabetic diet, exercise regularly, monitor blood glucose, take prescribed medications, maintain healthy weight, stay hydrated, and consult an endocrinologist for proper management."
        },
        hindi: {
          diagnosis: "बार-बार पेशाब आना और अधिक प्यास लगना डायबिटीज़ या हाई ब्लड शुगर की संभावना दर्शाता है।",
          additional_symptoms: "डायबिटीज़ के अन्य लक्षण हैं: अस्पष्ट वजन घटना, अत्यधिक थकान, धुंधला दिखना, घाव का धीरे-धीरे भरना, और बढ़ी हुई भूख।",
          precautions: "तुरंत ब्लड शुगर लेवल की जांच कराएं, डायबिटिक आहार लें, नियमित व्यायाम करें, ब्लड ग्लूकोज की निगरानी करें, निर्धारित दवाएं लें, स्वस्थ वजन बनाए रखें, हाइड्रेटेड रहें, और उचित प्रबंधन के लिए एंडोक्राइनोलॉजिस्ट से सलाह लें।"
        },
        hinglish: {
          diagnosis: "Frequent urination aur excessive thirst ke symptoms diabetes ya high blood sugar ki possibility show karte hain.",
          additional_symptoms: "Diabetes ke aur symptoms hain: unexplained weight loss, extreme fatigue, blurred vision, slow healing wounds, aur increased hunger.",
          precautions: "Blood sugar levels turant check karaiye, diabetic diet maintain kariye, regular exercise kariye, blood glucose monitor kariye, prescribed medicines lijiye, healthy weight maintain kariye, hydrated rahiye, aur proper management ke liye endocrinologist se consult kariye."
        }
      }
    },
    {
      condition: "asthma",
      keywords: {
        english: ["asthma", "breathing problem", "shortness of breath", "wheezing", "chest tightness"],
        hindi: ["दमा", "सांस की समस्या", "सांस लेने में तकलीफ", "घरघराहट", "छाती में जकड़न"],
        hinglish: ["asthma", "saans ki problem", "breathing problem", "wheeze", "chest tight"]
      },
      responses: {
        english: {
          diagnosis: "Your breathing difficulties and chest tightness may indicate asthma or respiratory issues.",
          additional_symptoms: "Other asthma symptoms include: persistent cough, wheezing sound while breathing, chest tightness, and difficulty in physical activities.",
          precautions: "Always carry your inhaler, avoid allergens and triggers, maintain clean environment, don't smoke, do breathing exercises, get pneumonia vaccination, monitor peak flow regularly, and consult a pulmonologist for proper management."
        },
        hindi: {
          diagnosis: "सांस लेने में कठिनाई और छाती में जकड़न दमा या श्वसन संबंधी समस्याओं की संभावना दर्शाता है।",
          additional_symptoms: "दमा के अन्य लक्षण हैं: लगातार खांसी, सांस लेते समय घरघराहट की आवाज़, छाती में जकड़न, और शारीरिक गतिविधियों में कठिनाई।",
          precautions: "हमेशा अपना इनहेलर साथ रखें, एलर्जी करने वाले तत्वों से बचें, साफ-सुथरा माहौल रखें, धूम्रपान न करें, सांस की एक्सरसाइज करें, निमोनिया का टीकाकरण कराएं, नियमित रूप से पीक फ्लो की जांच करें, और उचित प्रबंधन के लिए पल्मोनोलॉजिस्ट से सलाह लें।"
        },
        hinglish: {
          diagnosis: "Breathing difficulties aur chest tightness asthma ya respiratory issues ki possibility show kar sakte hain.",
          additional_symptoms: "Asthma ke aur symptoms hain: persistent cough, breathing karte time wheezing sound, chest tightness, aur physical activities mein difficulty.",
          precautions: "Hamesha apna inhaler saath rakhiye, allergens aur triggers avoid kariye, clean environment maintain kariye, smoking na kariye, breathing exercises kariye, pneumonia vaccination karaiye, peak flow regularly monitor kariye, aur proper management ke liye pulmonologist se consult kariye."
        }
      }
    }
  ];

  // Emergency keywords that should trigger immediate medical attention warnings
  private emergencyKeywords = [
    // English
    'chest pain', 'heart attack', 'stroke', 'unconscious', 'seizure', 
    'difficulty breathing', 'severe bleeding', 'poisoning', 'cardiac arrest',
    'can\'t breathe', 'choking', 'overdose', 'suicide', 'heavy bleeding',
    'severe chest pain', 'heart failure', 'brain stroke', 'paralysis',
    
    // Hindi
    'दिल का दौरा', 'सांस लेने में तकलीफ', 'बेहोशी', 'दौरा', 'लकवा',
    'छाती में दर्द', 'हार्ट अटैक', 'स्ट्रोक', 'दम घुटना', 'तेज खून बहना',
    
    // Hinglish
    'heart attack', 'stroke', 'behoshi', 'seizure', 'chest pain',
    'saans nahi aa rahi', 'heart failure', 'cardiac arrest', 'paralysis',
    'khoon beh raha hai', 'overdose', 'poison'
  ];

  // Detect language from user input
  detectLanguage(message: string): Language {
    const hindiPattern = /[\u0900-\u097F]/; // Devanagari script
    const hinglishPatterns = ['hai', 'mujhe', 'aur', 'ka', 'ke', 'ki', 'mein', 'se', 'ho', 'kar', 'kya', 'toh'];
    
    if (hindiPattern.test(message)) {
      return 'hindi';
    }
    
    const messageWords = message.toLowerCase().split(/\s+/);
    const hasHinglish = hinglishPatterns.some(pattern => 
      messageWords.includes(pattern)
    );
    
    return hasHinglish ? 'hinglish' : 'english';
  }

  // Check if message contains emergency keywords
  isEmergency(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return this.emergencyKeywords.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );
  }

  // Get emergency response with alert message
  getEmergencyResponse(language: Language = 'english'): EmergencyResponse {
    const responses = {
      english: "🚨 IMMEDIATE MEDICAL ATTENTION REQUIRED! Based on your symptoms, this could be a life-threatening emergency. Do not wait - call emergency services NOW or go to the nearest hospital immediately!",
      hindi: "🚨 तत्काल चिकित्सा सहायता की आवश्यकता! आपके लक्षणों के आधार पर यह जानलेवा आपातकाल हो सकता है। प्रतीक्षा न करें - अभी आपातकालीन सेवाओं को कॉल करें या तुरंत निकटतम अस्पताल जाएं!",
      hinglish: "🚨 TURANT MEDICAL ATTENTION CHAHIYE! Aapke symptoms ke basis pe yeh life-threatening emergency ho sakti hai. Wait mat kariye - ABHI emergency services ko call kariye ya nearest hospital jaiye!"
    };

    return {
      isEmergency: true,
      condition: "EMERGENCY",
      diagnosis: responses[language] || responses.english,
      hospitals: this.getNearestHospitals(language),
      emergencyNumbers: this.getEmergencyNumbers(language),
      language
    };
  }

  // Get emergency contact numbers based on location (India focused)
  getEmergencyNumbers(language: Language = 'english'): EmergencyContact[] {
    return [
      {
        service: language === 'hindi' ? 'राष्ट्रीय आपातकालीन नंबर' : language === 'hinglish' ? 'National Emergency Number' : 'National Emergency Helpline',
        number: '112',
        description: language === 'hindi' ? 'सभी आपातकालीन सेवाएं' : language === 'hinglish' ? 'Sabhi emergency services' : 'All emergency services'
      },
      {
        service: language === 'hindi' ? 'एम्बुलेंस सेवा' : language === 'hinglish' ? 'Ambulance Service' : 'Ambulance Service',
        number: '108',
        description: language === 'hindi' ? 'मुफ्त एम्बुलेंस सेवा' : language === 'hinglish' ? 'Free ambulance service' : 'Free ambulance service'
      },
      {
        service: language === 'hindi' ? 'पुलिस सहायता' : language === 'hinglish' ? 'Police Help' : 'Police Assistance',
        number: '100',
        description: language === 'hindi' ? 'पुलिस आपातकाल' : language === 'hinglish' ? 'Police emergency' : 'Police emergency'
      },
      {
        service: language === 'hindi' ? 'डॉक्टर ऑन कॉल' : language === 'hinglish' ? 'Doctor on Call' : 'Doctor on Call',
        number: '1066',
        description: language === 'hindi' ? 'चिकित्सा सलाह हॉटलाइन' : language === 'hinglish' ? 'Medical advice hotline' : 'Medical advice hotline'
      }
    ];
  }

  // Get nearest hospitals (simulated data - in real app, would use geolocation API)
  getNearestHospitals(language: Language = 'english'): Hospital[] {
    return [
      {
        name: 'AIIMS Delhi',
        address: 'Ansari Nagar, New Delhi - 110029',
        phone: '011-26588500',
        distance: '2.5 km',
        time: '8 mins',
        specialties: language === 'hindi' ? 'सभी विशेषताएं उपलब्ध' : language === 'hinglish' ? 'Sabhi specialties available' : 'All specialties available'
      },
      {
        name: 'Safdarjung Hospital',
        address: 'Ring Road, New Delhi - 110029',
        phone: '011-26165060',
        distance: '3.2 km',
        time: '12 mins',
        specialties: language === 'hindi' ? 'आपातकालीन और ट्रामा केंद्र' : language === 'hinglish' ? 'Emergency aur trauma center' : 'Emergency & Trauma Center'
      },
      {
        name: 'Apollo Hospital',
        address: 'Mathura Road, New Delhi - 110076',
        phone: '011-71791000',
        distance: '4.1 km',
        time: '15 mins',
        specialties: language === 'hindi' ? 'हृदय और न्यूरो विशेषज्ञता' : language === 'hinglish' ? 'Heart aur neuro specialty' : 'Cardiology & Neurology'
      }
    ];
  }

  // Find matching conditions based on keywords
  findConditions(userMessage: string): { results: any[], detectedLanguage: Language } {
    const language = this.detectLanguage(userMessage);
    const words = userMessage.toLowerCase()
      .replace(/[^\w\s\u0900-\u097F]/g, '') // Remove punctuation, keep Hindi chars
      .split(/\s+/)
      .filter(word => word.length > 2); // Filter out short words

    const results: any[] = [];

    this.healthcareDB.forEach(condition => {
      let matchCount = 0;
      
      // Check matches in all languages
      const allKeywords = [
        ...condition.keywords.english,
        ...condition.keywords.hindi,
        ...condition.keywords.hinglish
      ];

      words.forEach(word => {
        allKeywords.forEach(keyword => {
          if (keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())) {
            matchCount++;
          }
        });
      });

      if (matchCount > 0) {
        results.push({
          ...condition,
          matchCount,
          detectedLanguage: language
        });
      }
    });

    // Sort by relevance (number of matching keywords)
    results.sort((a, b) => b.matchCount - a.matchCount);
    
    return { results, detectedLanguage: language };
  }

  // Default responses for no matches
  getDefaultResponse(language: Language): AnalysisResult {
    const defaults = {
      english: "I understand your concern. While I can provide general health information, it's important to consult with a healthcare professional for proper diagnosis and treatment. Could you please describe your symptoms in more detail? For example, mention specific symptoms like fever, pain location, duration, etc.",
      hindi: "मैं आपकी चिंता समझ सकता हूं। जबकि मैं सामान्य स्वास्थ्य जानकारी प्रदान कर सकता हूं, उचित निदान और इलाज के लिए स्वास्थ्य पेशेवर से सलाह लेना महत्वपूर्ण है। कृपया अपने लक्षणों का विस्तार से वर्णन करें। जैसे कि बुखार, दर्द की जगह, कितने समय से, आदि।",
      hinglish: "Main aapki concern samajh sakta hun. Jabki main general health information provide kar sakta hun, proper diagnosis aur treatment ke liye healthcare professional se consult karna important hai. Please apne symptoms ko detail mein describe kariye, jaise ki fever, pain location, kitne time se, etc."
    };

    return {
      condition: "general_inquiry",
      diagnosis: defaults[language] || defaults.english,
      additionalSymptoms: "",
      precautions: "🆘 **For emergencies, please:** Call emergency services immediately (108/102 in India), Visit the nearest hospital, Contact your doctor",
      language,
      confidence: 0
    };
  }

  // Main analysis method
  analyzeSymptoms(userMessage: string): AnalysisResult {
    const language = this.detectLanguage(userMessage);
    
    // Check for emergency first
    if (this.isEmergency(userMessage)) {
      const emergencyResponse = this.getEmergencyResponse(language);
      return {
        condition: "EMERGENCY",
        diagnosis: emergencyResponse.diagnosis,
        additionalSymptoms: "Emergency symptoms include: severe chest pain, difficulty breathing, severe bleeding, loss of consciousness, or severe allergic reactions.",
        precautions: "🚨 SEEK IMMEDIATE MEDICAL ATTENTION: Call emergency services (108/102 in India, 911 in US), go to the nearest hospital emergency room, or contact your doctor immediately. Do not delay medical care for emergencies.",
        language,
        confidence: 5,
        isEmergency: true,
        hospitals: emergencyResponse.hospitals,
        emergencyNumbers: emergencyResponse.emergencyNumbers
      };
    }

    // Normal condition matching
    const { results } = this.findConditions(userMessage);
    
    if (results.length === 0) {
      return this.getDefaultResponse(language);
    }

    const bestMatch = results[0];
    const response = bestMatch.responses[language];
    
    return {
      condition: bestMatch.condition,
      diagnosis: response.diagnosis,
      additionalSymptoms: response.additional_symptoms,
      precautions: response.precautions,
      language,
      confidence: bestMatch.matchCount
    };
  }

  // Get welcome message
  getWelcomeMessage(language: Language = 'english'): string {
    const welcomeMessages = {
      english: "🌿 Welcome to SwasthSaathi! I'm your AI health assistant. I can help you understand symptoms and provide general health guidance in English, Hindi, or Hinglish. Please describe your symptoms, and I'll provide guidance. Remember, this is for informational purposes only - consult a doctor for serious concerns.",
      hindi: "🌿 स्वास्थ साथी में आपका स्वागत है! मैं आपका AI स्वास्थ्य सहायक हूं। मैं अंग्रेजी, हिंदी या हिंग्लिश में लक्षणों को समझने और सामान्य स्वास्थ्य मार्गदर्शन प्रदान करने में आपकी मदद कर सकता हूं। कृपया अपने लक्षणों का वर्णन करें, और मैं मार्गदर्शन प्रदान करूंगा। याद रखें, यह केवल जानकारी के लिए है - गंभीर चिंताओं के लिए डॉक्टर से सलाह लें।",
      hinglish: "🌿 SwasthSaathi mein aapka swagat hai! Main aapka AI health assistant hun. Main English, Hindi ya Hinglish mein symptoms samjhane aur general health guidance provide karne mein aapki help kar sakta hun. Please apne symptoms describe kariye, aur main guidance provide karunga. Yaad rakhiye, yeh sirf informational purpose ke liye hai - serious concerns ke liye doctor se consult kariye."
    };
    
    return welcomeMessages[language] || welcomeMessages.english;
  }
}

// Create singleton instance
export const healthcareService = new HealthcareService();