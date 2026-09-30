// ============================================================
// ELECTROVERSE '26 — Central Configuration
// ============================================================
// Edit ALL symposium information here.
// No need to touch UI components to update content.
// ============================================================

export const siteConfig = {
  symposiumName: "ELECTROVERSE",
  year: "'26",
  fullName: "ELECTROVERSE'26",
  tagline: "INNOVATE · CONNECT · POWER",
  subtitle: "POWERING IDEAS ⚡ CONNECTING TOMORROW",
  type: "A NATIONAL LEVEL TECHNICAL SYMPOSIUM",
  departmentName: "Department of Electrical and Electronics Engineering",
  organization: "Society of Electrical and Electronics Engineers (SEEE)",
  collegeName: "Government College of Engineering, Tirunelveli",
  collegeLocation: "Tirunelveli - 627007",
  eventDate: "2026-10-13", // YYYY-MM-DD format for countdown
  eventDisplayDate: "October 13, 2026",
  eventTime: "9:00 AM — 5:00 PM",
  registrationLink: "#register",
  brochureLink: "/brochure.jpg",
  venue: {
    name: "Government College of Engineering, Tirunelveli",
    address: "Tirunelveli - 627007, Tamil Nadu, India",
    mapUrl: "https://maps.google.com/?q=Government+College+of+Engineering+Tirunelveli",
    parking: "Parking available at the main campus gate. Follow signs to the event parking area.",
    directions: "Located on the Tirunelveli–Coutrallam highway, easily accessible from Tirunelveli Junction.",
  },
  social: {
    instagram: "https://www.instagram.com/electroverse.26?stkn=MWRpZmV3bmRrYmlkbQ==",
    youtube: "https://youtube.com/@electroverse26",
    whatsapp: "https://wa.me/916385596246",
  },
  contactEmail: "electroverse26x@gmail.com",
  contactPhone: "+91 63855 96246",
};

export const aboutContent = {
  heading: "ABOUT ELECTROVERSE'26",
  description: `ELECTROVERSE'26 is a National Level Technical Symposium organized by the Society of Electrical and Electronics Engineers (SEEE), Department of EEE, Government College of Engineering, Tirunelveli.

This flagship event brings together the brightest minds to compete, collaborate, and innovate. From power systems to AI-driven automation, ELECTROVERSE'26 covers the full spectrum of modern electrical engineering.`,
  highlights: [
    "Electrical Engineering",
    "Electronics & Communication",
    "Power Systems & Grid Distribution",
    "Renewable Energy & Solar",
    "Electric Vehicle Technology",
    "Industrial Automation & IoT",
    "Embedded Systems & Microcontrollers",
    "AI & Power System Optimization",
    "Robotics & Control Systems",
    "Power Electronics Converters",
    "Emerging High-Voltage Tech",
  ],
};

export interface EventItem {
  id: string;
  name: string;
  category: "technical-1" | "tech-with-fun";
  icon: string;
  description: string;
  rules: string[];
  teamSize: string;
  fee: string;
  prize: string;
  date: string;
  time: string;
  venue: string;
  contact: { name: string; phone: string };
}

export const technicalEvents: EventItem[] = [
  // ─── PAPER PRESENTATION SECTION (5 events) ───
  {
    id: "paper-presentation",
    name: "PAPER PRESENTATION",
    category: "technical-1",
    icon: "📄",
    description:
      "⚡ Your Topic. Your Ideas. Your Stage.\nChoose any topic from the Electrical & Electronics domain, explore its concepts and innovations, and present it your way. Let your ideas spark the room!",
    rules: [
      "Team of 1-2 members",
      "Submit PPT via email to electroverse26x@gmail.com",
      "10-minute presentation + 5-minute Q&A",
      "IEEE format preferred",
      "Judged on content, clarity, and innovation",
    ],
    teamSize: "1-2",
    fee: "₹150",
    prize: "Trophy + Certificate",
    date: "October 13, 2026",
    time: "10:00 AM",
    venue: "C&I LAB, SEMINAR HALL",
    contact: { name: "Tariq", phone: "+91 89216 66671" },
  },
  {
    id: "circuit-debugging",
    name: "CIRCUIT DEBUGGING",
    category: "technical-1",
    icon: "🔧",
    description:
      "Observe. Analyse. Debug.\nTest your circuit knowledge, identify faults, and bring faulty circuits back to life. Challenge your troubleshooting skills, think logically, and prove your ability to find and fix the fault!",
    rules: [
      "Individual or team of 2",
      "Three rounds of increasing difficulty",
      "Scoring based on accuracy and speed",
      "No external references allowed",
    ],
    teamSize: "2 members",
    fee: "₹100",
    prize: "Star Debugger Award",
    date: "October 13, 2026",
    time: "11:45 AM",
    venue: "Electronics Lab",
    contact: { name: "Sivakandasamy", phone: "+91 78452 46771" },
  },
  {
    id: "tech-talk",
    name: "TECH TALK",
    category: "technical-1",
    icon: "🎤",
    description:
      "Pick a technical topic, uncover hidden concepts, and tackle real-world engineering problems. Showcase your technical knowledge, communication, quick thinking, and problem-solving skills!",
    rules: [
      "Individual participation",
      "On-spot topic is provided",
      "Judged on content, delivery, and audience engagement",
    ],
    teamSize: "1",
    fee: "₹100",
    prize: "Best Speaker Award",
    date: "October 13, 2026",
    time: "11:45 AM",
    venue: "2nd YEAR CLASS",
    contact: { name: "Pawan kumar S", phone: "+91 93614 85724" },
  },
  {
    id: "quiz",
    name: "QUIZ",
    category: "technical-1",
    icon: "🧠",
    description:
      "Explore the world of Electrical & Electronics through an exciting quiz that tests your technical knowledge, accuracy, and quick thinking. Get ready to face challenging questions, make smart decisions, and prove your skills!",
    rules: [
      "Team of 2 members",
      "No electronic devices allowed",
      "Top 6 teams qualify for finals",
    ],
    teamSize: "2 members",
    fee: "₹100",
    prize: "Quiz Champions Trophy",
    date: "October 13, 2026",
    time: "10:00 AM",
    venue: "Computer Lab",
    contact: { name: "S.M.R", phone: "+91 62742 42596" },
  },
  {
    id: "mini-project",
    name: "MINI PROJECT",
    category: "technical-1",
    icon: "🚀",
    description:
      "Turn your innovative ideas into a working prototype and solve real-world problems with creativity and technology. Let your innovation take center stage!",
    rules: [
      "Team of 1-2 members",
      "Working prototype or simulation required",
      "10-minute demo + 5-minute Q&A",
      "Judged on innovation, feasibility, and execution",
    ],
    teamSize: "1-2 members",
    fee: "₹200",
    prize: "Best Innovation Trophy",
    date: "October 13, 2026",
    time: "10:00 AM",
    venue: "AC Lab",
    contact: { name: "Maharaja K", phone: "+91 95246 69119" },
  },

  // ─── SPARK AND SOLVE SECTION (5 events) ───
  {
    id: "spark-and-solve",
    name: "SPARK AND SOLVE",
    category: "tech-with-fun",
    icon: "⚡",
    description:
      "Observe. Connect. Solve.\nTest your logical thinking through picture-based electrical and electronic challenges. Decode visual clues, connect concepts, identify components, and prove your observation, creativity, and problem-solving skills! ⚡🧩",
    rules: [
      "Team of 2 members",
      "Multiple timed rounds",
      "Problems increase in difficulty",
      "Scoring based on accuracy and speed",
      "Judges' decision is final",
    ],
    teamSize: "2 members",
    fee: "₹100",
    prize: "Spark Champion Trophy",
    date: "October 13, 2026",
    time: "02:00 PM",
    venue: "Computer Lab",
    contact: { name: "Ram Prasath", phone: "+91 63837 40150" },
  },
  {
    id: "blind-connect",
    name: "BLIND CONNECT",
    category: "tech-with-fun",
    icon: "🔗",
    description:
      "Connect circuits blindfolded based on verbal instructions from your partner. Test your teamwork, communication, and electrical wiring skills under pressure.",
    rules: [
      "Team of 2 members",
      "One member blindfolded, one gives instructions",
      "Evaluated on correct connections and time",
    ],
    teamSize: "2 members",
    fee: "₹100",
    prize: "Best Duo Award",
    date: "October 13, 2026",
    time: "02:00 PM",
    venue: "3rd Year Class",
    contact: { name: "Esakkiraj V", phone: "+91 82481 98708" },
  },
  {
    id: "component-hunt",
    name: "COMPONENT HUNT",
    category: "tech-with-fun",
    icon: "🔍",
    description:
      "Test your knowledge of electrical and electronic components through exciting clues, symbol challenges, and strategic bidding. Identify components, sharpen your memory, think quickly, and prove your EEE knowledge!",
    rules: [
      "Team of 2 members",
      "Mobile phones are not allowed",
    ],
    teamSize: "2 members",
    fee: "₹150",
    prize: "Hunter Champion Shield",
    date: "October 13, 2026",
    time: "03:00 PM",
    venue: "2nd Year Class",
    contact: { name: "Loghesh Kumar", phone: "+91 85259 40905" },
  },
  {
    id: "guess-watt",
    name: "GUESS WATT",
    category: "tech-with-fun",
    icon: "💡",
    description:
      "Observe. Decode. Guess.\nTest your EEE knowledge through pictures, tricky clues, balloons, and “Who Am I?” challenges. Think fast, work together, and guess the answer before time runs out! ⚡🧠💡",
    rules: [
      "Team of 2 members",
      "Mobile phones are not allowed",
    ],
    teamSize: "2 members",
    fee: "₹50",
    prize: "Watt Wizard Award",
    date: "October 13, 2026",
    time: "03:00 PM",
    venue: "Seminar Hall",
    contact: { name: "Kithiyon V", phone: "+91 97864 53982" },
  },

];

// No non-technical events — all events are technical
export const nonTechnicalEvents: EventItem[] = [];


export const speakers = [
  {
    id: "speaker-1",
    name: "[Speaker Name]",
    designation: "Chief Technology Officer",
    organization: "[Company Name]",
    topic: "The Future of Smart Grids & Renewable Integration",
    image: "",
  },
  {
    id: "speaker-2",
    name: "[Speaker Name]",
    designation: "Senior Research Scientist",
    organization: "[Research Institute]",
    topic: "AI-Driven Power System Optimization",
    image: "",
  },
  {
    id: "speaker-3",
    name: "[Speaker Name]",
    designation: "Head of Engineering",
    organization: "[Industry Leader]",
    topic: "Electric Vehicle Revolution: Challenges & Opportunities",
    image: "",
  },
  {
    id: "speaker-4",
    name: "[Speaker Name]",
    designation: "Professor & Department Head",
    organization: "[University Name]",
    topic: "Next-Generation Power Electronics",
    image: "",
  },
];

export const timeline = [
  { time: "08:30 AM", event: "Registration & Check-in", icon: "📝", category: "ceremony", venue: "Main Entrance", description: "Collect your ID badges and official symposium kits" },
  { time: "09:30 AM", event: "Inauguration Ceremony", icon: "🎪", category: "ceremony", venue: "Main Auditorium", description: "Lighting the lamp & opening address by SEEE GCE Tirunelveli" },
  { time: "10:00 AM", event: "TECHNICAL EVENTS Section Begins", icon: "📄", category: "technical", venue: "Seminar Halls & Labs", description: "Paper Presentation, Circuit Debugging, Tech Talk, Quiz & Mini Project" },
  { time: "12:30 PM", event: "Networking Lunch Break", icon: "🍽️", category: "break", venue: "Campus Food Court", description: "Lunch break and networking with peers & mentors" },
  { time: "02:00 PM", event: "TECH WITH FUN Section Begins", icon: "⚡", category: "technical", venue: "Electronics Labs & Campus", description: "Spark & Solve, Blind Connect, Component Hunt & Guess Watt" },
  { time: "04:00 PM", event: "Grand Finals & Evaluation", icon: "🏆", category: "technical", venue: "Auditorium & Labs", description: "Final judging round for top qualifying teams" },
  { time: "04:30 PM", event: "Results Announcement", icon: "📢", category: "ceremony", venue: "Main Auditorium", description: "Official announcement of winners for all 9 technical events" },
  { time: "05:00 PM", event: "Valedictory & Prize Distribution", icon: "🎓", category: "ceremony", venue: "Main Auditorium", description: "Trophy distribution, certificates & vote of thanks" },
];

export const contacts = [
  {
    name: "Kiran Jothi J",
    role: "OVERALL Coordinator",
    phone: "+91 63748 42921",
  },
  {
    name: "Ram Prasath A",
    role: "OVERALL Coordinator",
    phone: "+91 63837 40150",
  },
  {
    name: "Pavithran M",
    role: "REGISTRATION TEAM",
    phone: "+91 86105 33136",
  },
  {
    name: "Kavin Adithya C R",
    role: "REGISTRATION TEAM",
    phone: "+91 63855 96246",
  },
];

export const faqItems = [
  {
    question: "Who can participate in ELECTROVERSE '26?",
    answer:
      "ELECTROVERSE '26 is open to all undergraduate and postgraduate engineering students from any recognized college or university across India. Some events may have specific eligibility criteria mentioned in their rules.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "Yes, each event has its own registration fee ranging from ₹50 to ₹300. Workshop fees include materials and certification. Check individual event details for exact pricing.",
  },
  {
    question: "Can students from other colleges participate?",
    answer:
      "Absolutely! ELECTROVERSE '26 is a National Level Symposium. We welcome participants from all colleges and universities. Inter-college teams are also allowed for most events.",
  },
  {
    question: "Can we participate in multiple events?",
    answer:
      "Yes, you can register for multiple events as long as the timings don't conflict. We recommend checking the schedule carefully before registering for overlapping events.",
  },
  {
    question: "What should participants bring?",
    answer:
      "Bring your college ID, registration confirmation, and any specific materials mentioned in the event rules. For workshops, bring a laptop. Stationery will be provided for written events.",
  },
  {
    question: "Is accommodation available?",
    answer:
      "Limited accommodation is available for outstation participants on a first-come, first-served basis. Contact the registration team at least one week before the event to request accommodation.",
  },
  {
    question: "How do I register?",
    answer:
      "Click the 'Register Now' button on this website to fill out the registration form. You can also register on-spot on the event day, subject to seat availability.",
  },
  {
    question: "What are the general rules?",
    answer:
      "Maintain discipline and decorum. Follow event-specific rules. No malpractice or use of unfair means. Judges' and organizers' decisions are final. ID proof is mandatory.",
  },
];

export const eventHighlights = [
  {
    icon: "⚡",
    title: "Technical Events",
    description: "8 challenging competitions testing core EEE skills",
  },
  {
    icon: "🏆",
    title: "Competitions",
    description: "Compete for top honors and certificates of excellence",
  },
  {
    icon: "💡",
    title: "Project Expo",
    description: "Showcase your innovation to industry experts",
  },
  {
    icon: "🤖",
    title: "Robotics",
    description: "Build, program, and compete with autonomous systems",
  },
  {
    icon: "🎤",
    title: "Guest Sessions",
    description: "Learn from industry leaders and research pioneers",
  },
  {
    icon: "🧠",
    title: "Workshops",
    description: "Hands-on learning in IoT, EV Tech, and Solar Energy",
  },
  {
    icon: "🎮",
    title: "Fun Events",
    description: "Gaming, quizzes, treasure hunts, and more!",
  },
  {
    icon: "🚀",
    title: "Innovation Showcase",
    description: "Experience cutting-edge EEE technology demonstrations",
  },
];

export const sponsors = [
  { name: "Sponsor 01", tier: "platinum" as const },
  { name: "Sponsor 02", tier: "platinum" as const },
  { name: "Sponsor 03", tier: "gold" as const },
  { name: "Sponsor 04", tier: "gold" as const },
  { name: "Sponsor 05", tier: "silver" as const },
  { name: "Sponsor 06", tier: "silver" as const },
  { name: "Sponsor 07", tier: "silver" as const },
  { name: "Sponsor 08", tier: "silver" as const },
];
