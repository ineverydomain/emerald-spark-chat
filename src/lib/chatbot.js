// Healthcare Chatbot with MongoDB Integration
class HealthcareChatbot {
    constructor() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendBtn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.isTyping = false;
        
        // Healthcare knowledge base (embedded version of MongoDB data)
        this.healthcareDB = this.initializeHealthcareDB();
        
        this.init();
        this.showWelcomeMessage();
    }

    init() {
        // Event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Focus on input
        this.messageInput.focus();

        // Initialize comic bubble animations
        this.initializeComicBubbles();
    }

    // Initialize healthcare knowledge base
    initializeHealthcareDB() {
        return [
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
    }

    showWelcomeMessage() {
        setTimeout(() => {
            const language = 'english'; // Default language
            const welcomeMessages = {
                english: "Hello! I'm SwasthSaathi, your AI health assistant. I can help you understand symptoms and provide general health guidance in English, Hindi, or Hinglish. How can I assist you today?",
                hindi: "नमस्ते! मैं स्वास्थ साथी हूं, आपका AI स्वास्थ्य सहायक। मैं अंग्रेजी, हिंदी या हिंग्लिश में लक्षणों को समझने और सामान्य स्वास्थ्य मार्गदर्शन प्रदान करने में आपकी मदद कर सकता हूं।",
                hinglish: "Hello! Main SwasthSaathi hun, aapka AI health assistant. Main English, Hindi ya Hinglish mein symptoms samjhane aur general health guidance provide karne mein aapki help kar sakta hun. Kaise madad kar sakta hun?"
            };
            
            this.addBotMessage(
                welcomeMessages[language],
                "⚠️ *Please note: I provide general information only. For serious symptoms, always consult a healthcare professional.*"
            );
        }, 1000);
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message || this.isTyping) return;

        // Add user message
        this.addUserMessage(message);
        
        // Clear input and disable send button
        this.messageInput.value = '';
        this.sendButton.disabled = true;
        
        // Show typing indicator and process message
        this.showTypingIndicator();
        this.processHealthcareQuery(message);
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.textContent = message;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(response, disclaimer = null, isStructured = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        
        if (isStructured && typeof response === 'object') {
            // Emergency response handling
            if (response.isEmergency) {
                const emergencyDiv = document.createElement('div');
                emergencyDiv.className = 'emergency-alert';
                emergencyDiv.innerHTML = '🚨 EMERGENCY ALERT 🚨';
                messageDiv.appendChild(emergencyDiv);

                const diagnosisDiv = document.createElement('div');
                diagnosisDiv.className = 'diagnosis emergency-text';
                diagnosisDiv.textContent = response.diagnosis;
                messageDiv.appendChild(diagnosisDiv);

                // Emergency Numbers Section
                if (response.emergencyNumbers) {
                    const numbersSection = document.createElement('div');
                    numbersSection.className = 'emergency-section';
                    
                    const numbersTitle = document.createElement('div');
                    numbersTitle.className = 'emergency-title';
                    numbersTitle.innerHTML = '📞 EMERGENCY NUMBERS - CALL NOW!';
                    numbersSection.appendChild(numbersTitle);
                    
                    const numbersList = document.createElement('div');
                    numbersList.className = 'emergency-numbers';
                    
                    response.emergencyNumbers.forEach(emergency => {
                        const numberItem = document.createElement('div');
                        numberItem.className = 'emergency-number-item';
                        numberItem.innerHTML = `
                            <strong>${emergency.service}</strong><br>
                            📱 <a href="tel:${emergency.number}" class="emergency-link">${emergency.number}</a><br>
                            <small>${emergency.description}</small>
                        `;
                        numbersList.appendChild(numberItem);
                    });
                    
                    numbersSection.appendChild(numbersList);
                    messageDiv.appendChild(numbersSection);
                }

                // Nearest Hospitals Section
                if (response.hospitals && response.hospitals.length > 0) {
                    const hospitalsSection = document.createElement('div');
                    hospitalsSection.className = 'hospitals-section';
                    
                    const hospitalsTitle = document.createElement('div');
                    hospitalsTitle.className = 'hospitals-title';
                    hospitalsTitle.innerHTML = '🏥 NEAREST HOSPITALS';
                    hospitalsSection.appendChild(hospitalsTitle);
                    
                    const hospitalsList = document.createElement('div');
                    hospitalsList.className = 'hospitals-list';
                    
                    response.hospitals.forEach((hospital, index) => {
                        const hospitalItem = document.createElement('div');
                        hospitalItem.className = 'hospital-item';
                        hospitalItem.innerHTML = `
                            <div class="hospital-name">${index + 1}. ${hospital.name}</div>
                            <div class="hospital-details">
                                📍 ${hospital.address}<br>
                                📱 <a href="tel:${hospital.phone}" class="hospital-link">${hospital.phone}</a><br>
                                🚗 ${hospital.distance} | ⏱️ ${hospital.time}<br>
                                ${hospital.specialties ? `🏥 ${hospital.specialties}` : ''}
                            </div>
                        `;
                        hospitalsList.appendChild(hospitalItem);
                    });
                    
                    hospitalsSection.appendChild(hospitalsList);
                    messageDiv.appendChild(hospitalsSection);
                }

            } else {
                // Regular structured medical response (existing code)
                if (response.condition) {
                    const conditionTitle = document.createElement('div');
                    conditionTitle.className = 'condition-title';
                    conditionTitle.textContent = `Possible Condition: ${response.condition.charAt(0).toUpperCase() + response.condition.slice(1)}`;
                    messageDiv.appendChild(conditionTitle);
                }

                const diagnosisDiv = document.createElement('div');
                diagnosisDiv.className = 'diagnosis';
                diagnosisDiv.textContent = response.diagnosis;
                messageDiv.appendChild(diagnosisDiv);

                if (response.additionalSymptoms) {
                    const symptomsSection = document.createElement('div');
                    symptomsSection.className = 'symptoms-section';
                    
                    const symptomsTitle = document.createElement('div');
                    symptomsTitle.className = 'symptoms-title';
                    symptomsTitle.textContent = '🔍 Additional Symptoms to Watch For:';
                    symptomsSection.appendChild(symptomsTitle);
                    
                    const symptomsList = document.createElement('div');
                    symptomsList.className = 'symptoms-list';
                    symptomsList.textContent = response.additionalSymptoms;
                    symptomsSection.appendChild(symptomsList);
                    
                    messageDiv.appendChild(symptomsSection);
                }

                if (response.precautions) {
                    const precautionsSection = document.createElement('div');
                    precautionsSection.className = 'precautions-section';
                    
                    const precautionsTitle = document.createElement('div');
                    precautionsTitle.className = 'precautions-title';
                    precautionsTitle.textContent = '💡 Recommended Precautions:';
                    precautionsSection.appendChild(precautionsTitle);
                    
                    const precautionsList = document.createElement('div');
                    precautionsList.className = 'precautions-list';
                    precautionsList.textContent = response.precautions;
                    precautionsSection.appendChild(precautionsList);
                    
                    messageDiv.appendChild(precautionsSection);
                }

                if (response.confidence !== undefined) {
                    const confidenceDiv = document.createElement('div');
                    confidenceDiv.className = 'confidence-indicator';
                    confidenceDiv.textContent = `Confidence Level: ${response.confidence > 2 ? 'High' : response.confidence > 0 ? 'Medium' : 'Low'}`;
                    messageDiv.appendChild(confidenceDiv);
                }
            }
        } else {
            // Simple text response
            const mainText = document.createElement('div');
            mainText.textContent = typeof response === 'string' ? response : response.diagnosis || response;
            messageDiv.appendChild(mainText);
        }
        
        if (disclaimer) {
            const disclaimerDiv = document.createElement('div');
            disclaimerDiv.className = 'disclaimer';
            disclaimerDiv.textContent = disclaimer;
            messageDiv.appendChild(disclaimerDiv);
        }
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const dotsDiv = document.createElement('div');
        dotsDiv.className = 'typing-dots';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dotsDiv.appendChild(dot);
        }
        
        typingDiv.appendChild(dotsDiv);
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
        this.sendButton.disabled = false;
    }

    // Detect language from user input
    detectLanguage(message) {
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

    // Find matching conditions based on keywords
    findConditions(userMessage) {
        const language = this.detectLanguage(userMessage);
        const words = userMessage.toLowerCase()
            .replace(/[^\w\s\u0900-\u097F]/g, '') // Remove punctuation, keep Hindi chars
            .split(/\s+/)
            .filter(word => word.length > 2); // Filter out short words

        const results = [];

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

    // Process healthcare query and generate response
    async processHealthcareQuery(userMessage) {
        try {
            // Check for emergency keywords first
            if (HealthcareUtils.isEmergency(userMessage)) {
                const detectedLanguage = this.detectLanguage(userMessage);
                
                // Shorter delay for emergencies
                await new Promise(resolve => setTimeout(resolve, 800));
                this.hideTypingIndicator();
                
                const emergencyResponse = HealthcareUtils.getEmergencyResponse(detectedLanguage);
                const nearestHospitals = HealthcareUtils.getNearestHospitals(detectedLanguage);
                const emergencyNumbers = HealthcareUtils.getEmergencyNumbers(detectedLanguage);
                
                // Create emergency response structure
                const emergencyData = {
                    isEmergency: true,
                    condition: "EMERGENCY",
                    diagnosis: emergencyResponse.alert,
                    hospitals: nearestHospitals,
                    emergencyNumbers: emergencyNumbers,
                    language: detectedLanguage
                };
                
                this.addBotMessage(
                    emergencyData,
                    "🚨 This is an emergency alert. Please act immediately!",
                    true
                );
                return;
            }

            // Normal processing for non-emergency queries
            await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1500));
            
            this.hideTypingIndicator();
            
            const { results, detectedLanguage } = this.findConditions(userMessage);
            
            if (results.length === 0) {
                const defaultResponse = this.getDefaultResponse(detectedLanguage);
                this.addBotMessage(defaultResponse);
                return;
            }

            const bestMatch = results[0];
            const response = bestMatch.responses[detectedLanguage];
            
            const structuredResponse = {
                condition: bestMatch.condition,
                diagnosis: response.diagnosis,
                additionalSymptoms: response.additional_symptoms,
                precautions: response.precautions,
                language: detectedLanguage,
                confidence: bestMatch.matchCount
            };
            
            this.addBotMessage(
                structuredResponse,
                "⚠️ *This is general information. Please consult a healthcare professional for proper diagnosis and treatment.*",
                true
            );

        } catch (error) {
            console.error('Error processing healthcare query:', error);
            this.hideTypingIndicator();
            this.addBotMessage(
                this.getDefaultResponse('english'),
                "❌ Sorry, I encountered an error while processing your request. Please try again."
            );
        }
    }

    // Default responses for no matches
    getDefaultResponse(language) {
        const defaults = {
            english: {
                diagnosis: "I understand your concern. While I can provide general health information, it's important to consult with a healthcare professional for proper diagnosis and treatment. Could you please describe your symptoms in more detail? For example, mention specific symptoms like fever, pain location, duration, etc."
            },
            hindi: {
                diagnosis: "मैं आपकी चिंता समझ सकता हूं। जबकि मैं सामान्य स्वास्थ्य जानकारी प्रदान कर सकता हूं, उचित निदान और इलाज के लिए स्वास्थ्य पेशेवर से सलाह लेना महत्वपूर्ण है। कृपया अपने लक्षणों का विस्तार से वर्णन करें। जैसे कि बुखार, दर्द की जगह, कितने समय से, आदि।"
            },
            hinglish: {
                diagnosis: "Main aapki concern samajh sakta hun. Jabki main general health information provide kar sakta hun, proper diagnosis aur treatment ke liye healthcare professional se consult karna important hai. Please apne symptoms ko detail mein describe kariye, jaise ki fever, pain location, kitne time se, etc."
            }
        };
        
        return defaults[language] || defaults.english;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    // Initialize comic bubble animations
    initializeComicBubbles() {
        const bubbles = document.querySelectorAll('.comic-bubble');
        
        bubbles.forEach((bubble, index) => {
            // Stagger the animation start times
            bubble.style.animationDelay = `${index * 0.5}s`;
            
            // Add subtle hover effect
            bubble.addEventListener('mouseenter', () => {
                bubble.style.transform = `${bubble.style.transform} scale(1.02)`;
                bubble.style.transition = 'transform 0.2s ease';
            });
            
            bubble.addEventListener('mouseleave', () => {
                bubble.style.transform = bubble.style.transform.replace(' scale(1.02)', '');
            });
        });
    }
}

// Initialize the chatbot and dark mode functionality when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HealthcareChatbot();

    // --- DARK MODE LOGIC ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Function to apply the saved or current theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️'; // Sun icon for switching to light
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.textContent = '🌙'; // Moon icon for switching to dark
        }
    };

    // Check localStorage for a saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Event listener for the toggle button
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
});

// Add some utility functions for potential future enhancements
const HealthcareUtils = {
    // Emergency keywords that should trigger immediate medical attention warnings
    emergencyKeywords: [
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
    ],
    
    // Check if message contains emergency keywords
    isEmergency: function(message) {
        const lowerMessage = message.toLowerCase();
        return this.emergencyKeywords.some(keyword => 
            lowerMessage.includes(keyword.toLowerCase())
        );
    },
    
    // Get emergency response with alert message
    getEmergencyResponse: function(language = 'english') {
        const responses = {
            english: {
                alert: "IMMEDIATE MEDICAL ATTENTION REQUIRED! Based on your symptoms, this could be a life-threatening emergency. Do not wait - call emergency services NOW or go to the nearest hospital immediately!"
            },
            hindi: {
                alert: "तत्काल चिकित्सा सहायता की आवश्यकता! आपके लक्षणों के आधार पर यह जानलेवा आपातकाल हो सकता है। प्रतीक्षा न करें - अभी आपातकालीन सेवाओं को कॉल करें या तुरंत निकटतम अस्पताल जाएं!"
            },
            hinglish: {
                alert: "TURANT MEDICAL ATTENTION CHAHIYE! Aapke symptoms ke basis pe yeh life-threatening emergency ho sakti hai. Wait mat kariye - ABHI emergency services ko call kariye ya nearest hospital jaiye!"
            }
        };
        return responses[language] || responses.english;
    },
    
    // Get emergency contact numbers based on location (India focused)
    getEmergencyNumbers: function(language = 'english') {
        const numbers = [
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
                service: language === 'hindi' ? 'फायर ब्रिगेड' : language === 'hinglish' ? 'Fire Brigade' : 'Fire Department',
                number: '101',
                description: language === 'hindi' ? 'आग और बचाव सेवा' : language === 'hinglish' ? 'Fire aur rescue service' : 'Fire and rescue service'
            },
            {
                service: language === 'hindi' ? 'डॉक्टर ऑन कॉल' : language === 'hinglish' ? 'Doctor on Call' : 'Doctor on Call',
                number: '1066',
                description: language === 'hindi' ? 'चिकित्सा सलाह हॉटलाइन' : language === 'hinglish' ? 'Medical advice hotline' : 'Medical advice hotline'
            }
        ];
        
        return numbers;
    },
    
    // Get nearest hospitals (simulated data - in real app, would use geolocation API)
    getNearestHospitals: function(language = 'english') {
        const hospitals = [
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
            },
            {
                name: 'Max Super Speciality Hospital',
                address: 'Press Enclave Road, Saket - 110017',
                phone: '011-26515050',
                distance: '5.8 km',
                time: '18 mins',
                specialties: language === 'hindi' ? 'सुपर स्पेशियलिटी सेवाएं' : language === 'hinglish' ? 'Super specialty services' : 'Super Specialty Services'
            },
            {
                name: 'Fortis Hospital',
                address: 'Sector B, Pocket 1, Aruna Asaf Ali Marg - 110070',
                phone: '011-42776222',
                distance: '6.5 km',
                time: '22 mins',
                specialties: language === 'hindi' ? 'आपातकालीन चिकित्सा सेवा' : language === 'hinglish' ? 'Emergency medical services' : 'Emergency Medical Services'
            }
        ];
        
        return hospitals;
    }
};

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HealthcareChatbot, HealthcareUtils };
}

// Scroll to Chat Box
function scrollToChat() {
  document.getElementById("chat-box").scrollIntoView({ behavior: "smooth" });
}

// Insert Quick Symptom into Input
function insertSymptom(symptom) {
  document.getElementById("messageInput").value = symptom;
  document.getElementById("messageInput").focus();
}
