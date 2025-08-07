export interface User {
  id: string;
  password: string;
  role: 'cms' | 'mptb_nodal' | 'sports_nodal' | 'participant';
  name: string;
}

export interface ContentData {
  // Header Section
  tourismBoardTitle: string;
  tourismBoardSubtitle: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  
  // Vision Section
  visionTitle: string;
  visionText: string;
  
  // Event Highlights
  highlightsTitle: string;
  highlight1: string;
  highlight2: string;
  highlight3: string;
  highlight4: string;
  
  // Requirements Section
  requirementsTitle: string;
  requirement1Title: string;
  requirement1Text: string;
  requirement2Title: string;
  requirement2Text: string;
  requirement3Title: string;
  requirement3Text: string;
  
  // Commitment Section
  commitmentTitle: string;
  commitment1Title: string;
  commitment1Text: string;
  commitment2Title: string;
  commitment2Text: string;
  commitment3Title: string;
  commitment3Text: string;
  
  // Call to Action
  ctaTitle: string;
  ctaText: string;
  ctaButton1: string;
  ctaButton2: string;
  
  // Footer Quote
  quote: string;
  quoteAuthor: string;
}

export interface ParticipantData {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  experience: string;
  boatType: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MPTBTaskData {
  id: string;
  task: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedDate: string;
  completedDate?: string;
  notes: string;
}

export interface SportsTaskData {
  id: string;
  task: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedDate: string;
  completedDate?: string;
  notes: string;
  boatsAllocated?: number;
  participantsAssigned?: number;
}

const USERS: User[] = [
  {
    id: 'cms_hgt',
    password: 'cms_hgt',
    role: 'cms',
    name: 'CMS Admin'
  },
  {
    id: 'mptb_nodal',
    password: 'mptb_2025',
    role: 'mptb_nodal',
    name: 'MPTB Nodal Officer'
  },
  {
    id: 'sports_nodal',
    password: 'sports_2025',
    role: 'sports_nodal',
    name: 'Sports Nodal Officer'
  },
  {
    id: 'participant',
    password: 'participant_2025',
    role: 'participant',
    name: 'Participant'
  }
];

export const authenticate = (id: string, password: string): User | null => {
  const user = USERS.find(u => u.id === id && u.password === password);
  return user || null;
};

export const getDefaultContent = (): ContentData => ({
  // Header Section
  tourismBoardTitle: "मध्यप्रदेश पर्यटन बोर्ड",
  tourismBoardSubtitle: "हृदय से हृदय तक",
  
  // Hero Section
  heroTitle: "तिरंगा बोट रैली",
  heroSubtitle: "जल में लहराएगा तिरंगा, दिलों में जगेगी देशभक्ति की लहर",
  eventDate: "14 अगस्त 2025",
  eventTime: "शाम 5:00 - 6:30",
  eventLocation: "छोटा तालाब, भोपाल",
  
  // Vision Section
  visionTitle: "हमारा संकल्प",
  visionText: "स्वतंत्रता दिवस के पावन अवसर पर, हम जल की लहरों के साथ तिरंगे की गरिमा को मिलाकर एक अनूठा आयोजन प्रस्तुत कर रहे हैं। यह केवल एक कार्यक्रम नहीं, बल्कि युवाओं के दिलों में देशप्रेम की अमिट छाप छोड़ने का माध्यम है।",
  
  // Event Highlights
  highlightsTitle: "कार्यक्रम की विशेषताएं",
  highlight1: "50 नावों में तिरंगा लहराते हुए भव्य रैली",
  highlight2: "युवाओं की सक्रिय भागीदारी और उत्साह",
  highlight3: "जल क्रीड़ा और पर्यटन का संयुक्त प्रदर्शन",
  highlight4: "राष्ट्रीय एकता का संदेश",
  
  // Requirements Section
  requirementsTitle: "आवश्यक सहयोग",
  requirement1Title: "नावों की व्यवस्था",
  requirement1Text: "50 कायक/रोइंग बोट्स जल क्रीड़ा अकादमी से",
  requirement2Title: "प्रशिक्षित टीम",
  requirement2Text: "नाव संचालन हेतु कुशल प्रतिभागी",
  requirement3Title: "समन्वय अधिकारी",
  requirement3Text: "विभागीय नोडल अधिकारी की नियुक्ति",
  
  // Commitment Section
  commitmentTitle: "🎯 पर्यटन बोर्ड की प्रतिबद्धता",
  commitment1Title: "तिरंगा झंडे",
  commitment1Text: "सभी नावों के लिए हाथ में रखने योग्य तिरंगा",
  commitment2Title: "रिफ्रेशमेंट",
  commitment2Text: "प्रतिभागियों के लिए पेयजल और नाश्ते की व्यवस्था",
  commitment3Title: "प्रचार-प्रसार",
  commitment3Text: "मीडिया कवरेज और सोशल मीडिया प्रमोशन",
  
  // Call to Action
  ctaTitle: "आइए मिलकर बनाएं यह कार्यक्रम यादगार! 🚣‍♂️",
  ctaText: "जल की लहरों के साथ तिरंगे का सम्मान करते हुए, हम सभी मिलकर इस अनूठे आयोजन को सफल बनाने के लिए प्रतिबद्ध हैं।",
  ctaButton1: "🤝 सहयोग करें",
  ctaButton2: "📞 संपर्क करें",
  
  // Footer Quote
  quote: "सरफरोशी की तमन्ना अब हमारे दिल में है, देखना है जोर कितना बाजु-ए-कातिल में है!",
  quoteAuthor: "रामप्रसाद बिस्मिल"
});

export const getDefaultMPTBTasks = (): MPTBTaskData[] => [
  {
    id: '1',
    task: 'तिरंगा झंडे की व्यवस्था',
    description: 'सभी 50 नावों के लिए हाथ में रखने योग्य तिरंगा झंडे प्रदान करना',
    status: 'pending',
    assignedDate: new Date().toISOString().split('T')[0],
    notes: ''
  },
  {
    id: '2',
    task: 'रिफ्रेशमेंट व्यवस्था',
    description: 'प्रतिभागियों एवं सहयोगी स्टाफ के लिए पेयजल और नाश्ते की व्यवस्था',
    status: 'pending',
    assignedDate: new Date().toISOString().split('T')[0],
    notes: ''
  },
  {
    id: '3',
    task: 'मीडिया कवरेज',
    description: 'आयोजन के प्रचार-प्रसार, मीडिया कवरेज व सोशल मीडिया प्रस्तुतीकरण',
    status: 'pending',
    assignedDate: new Date().toISOString().split('T')[0],
    notes: ''
  }
];

export const getDefaultSportsTasks = (): SportsTaskData[] => [
  {
    id: '1',
    task: 'नावों की उपलब्धता',
    description: '50 नावें (कायक / रोइंग बोट्स) जल क्रीड़ा अकादमी से उपलब्ध कराना',
    status: 'pending',
    assignedDate: new Date().toISOString().split('T')[0],
    notes: '',
    boatsAllocated: 0
  },
  {
    id: '2',
    task: 'प्रशिक्षित प्रतिभागी',
    description: 'नाव संचालन हेतु प्रशिक्षित प्रतिभागियों की उपलब्धता सुनिश्चित करना',
    status: 'pending',
    assignedDate: new Date().toISOString().split('T')[0],
    notes: '',
    participantsAssigned: 0
  },
  {
    id: '3',
    task: 'नोडल अधिकारी नियुक्ति',
    description: 'आयोजन समन्वय हेतु विभाग की ओर से नोडल अधिकारी नामांकित करना',
    status: 'pending',
    assignedDate: new Date().toISOString().split('T')[0],
    notes: ''
  }
];
