export interface Project {
  id: string;
  title: string;
  category: string;
  tech: string[];
  description: string;
  features: string[];
  githubUrl?: string;
  isUpcomingLink?: boolean;
  mockupType: 'hospital' | 'ecommerce';
  highlights: { label: string; value: string }[];
  architecture: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  scoreLabel: string;
  score: string;
  location?: string;
  highlights?: string[];
  current?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    iconName?: string;
  }[];
}

export interface JourneyMilestone {
  step: string;
  title: string;
  periodOrTag: string;
  description: string;
  iconName: string;
}

export const portfolioData = {
  personal: {
    name: "Harish R",
    shortName: "Harish",
    role: "Computer Science & Engineering Student | Java Full Stack Developer",
    headline: "Computer Science Engineer & Java Full Stack Developer",
    college: "Sri Sivasubramaniya Nadar College of Engineering (SSN), Chennai",
    shortCollege: "SSN College of Engineering",
    degree: "B.E. Computer Science & Engineering",
    graduation: "2028",
    cgpa: "6.3 / 10",
    email: "harishravi1006@gmail.com",
    phone: "+91 94944 72190",
    rawPhone: "+919494472190",
    location: "Chennai, Tamil Nadu, India",
    linkedin: "https://linkedin.com/in/harishravi10",
    github: "https://github.com/harishravi10",
    statusBadge: "Available for Internships & Entry-Level Roles",
    bio: "Computer Science undergraduate at SSN College of Engineering passionate about building scalable, database-driven applications and solving problems through Java, DSA, and software development.",
    aboutNarrative: "I am a Computer Science and Engineering undergraduate at SSN College of Engineering with a strong interest in Java Full Stack Development. I enjoy building database-driven applications, understanding how software systems work, and improving my problem-solving skills through Data Structures and Algorithms.",
    interests: [
      "Backend development",
      "Java",
      "Full Stack Development",
      "Databases",
      "Software Engineering",
      "Data Structures & Algorithms"
    ],
    currentlyLearning: [
      "Advanced Java",
      "Spring Boot",
      "Full Stack Development",
      "Data Structures & Algorithms",
      "System Design fundamentals"
    ]
  },

  skills: [
    {
      title: "Programming Languages",
      description: "Core languages used for problem solving & application logic",
      skills: [
        { name: "Java" },
        { name: "Python" }
      ]
    },
    {
      title: "Backend Development",
      description: "Server-side architecture, enterprise Java & frameworks",
      skills: [
        { name: "Java" },
        { name: "JDBC" },
        { name: "Servlets" },
        { name: "JSP" },
        { name: "Spring Boot" }
      ]
    },
    {
      title: "Databases & Storage",
      description: "Relational data modeling, querying and optimization",
      skills: [
        { name: "SQL" },
        { name: "MySQL" }
      ]
    },
    {
      title: "Web Technologies",
      description: "Frontend interface design and interactive experiences",
      skills: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "JavaScript" }
      ]
    },
    {
      title: "Tools & IDEs",
      description: "Developer environments and version control tooling",
      skills: [
        { name: "Eclipse" },
        { name: "VS Code" },
        { name: "Git" },
        { name: "GitHub" }
      ]
    },
    {
      title: "Core Computer Science Concepts",
      description: "Foundational software engineering principles",
      skills: [
        { name: "Object-Oriented Programming (OOP)" },
        { name: "Data Structures & Algorithms (DSA)" }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "hospital-management-system",
      title: "Hospital Management System",
      category: "Java & Database Application",
      tech: ["Java", "JDBC", "MySQL", "OOP"],
      description: "Designed and developed a Hospital Management System for patient registration, appointment scheduling, doctor management, and billing. Used a modular Java architecture and MySQL database to organize application data efficiently.",
      features: [
        "Patient registration and medical profile management",
        "Doctor profile management and specialization directory",
        "Appointment scheduling and slot coordination",
        "Automated billing generation and cost calculation",
        "Robust relational data persistence with MySQL",
        "Clean Java OOP architecture with separation of concerns",
        "Secure JDBC database connectivity and SQL statement execution"
      ],
      githubUrl: "https://github.com/harishravi10",
      isUpcomingLink: false,
      mockupType: "hospital",
      highlights: [
        { label: "Architecture", value: "Multi-tier Modular OOP" },
        { label: "Data Layer", value: "JDBC Connection Pool" },
        { label: "Database", value: "MySQL Relational Schema" },
        { label: "Core Modules", value: "Patients, Doctors, Billing" }
      ],
      architecture: [
        "Presentation Layer: Console/GUI interaction handlers",
        "Business Logic Layer: Services for Patients, Appointments & Billing",
        "Data Access Object (DAO) Pattern for clean SQL isolation",
        "Relational Database: Normalized MySQL tables with Foreign Keys"
      ]
    },
    {
      id: "ecommerce-website",
      title: "E-Commerce Website",
      category: "Full Stack Web Application",
      tech: ["HTML", "CSS", "JavaScript", "Java", "MySQL"],
      description: "Built a responsive e-commerce web application with product catalog, shopping cart, customer management, and order management functionality.",
      features: [
        "Dynamic product catalog with interactive category browsing",
        "Responsive shopping cart with dynamic price calculations",
        "Customer authentication and profile data management",
        "Order management lifecycle and summary checkout review",
        "Structured MySQL database schema integration",
        "Responsive, mobile-first user interface with smooth transitions"
      ],
      githubUrl: "https://github.com/harishravi10",
      isUpcomingLink: false,
      mockupType: "ecommerce",
      highlights: [
        { label: "Interface", value: "Responsive Web UI" },
        { label: "Client Logic", value: "Vanilla JavaScript" },
        { label: "Server-side", value: "Java Backend Services" },
        { label: "Persistence", value: "MySQL Order & Cart Data" }
      ],
      architecture: [
        "Client UI: Responsive HTML5/CSS3 with JavaScript DOM controllers",
        "API / Controller Layer: Java backend processing requests",
        "Data Model: Relational entities for Users, Products, Carts, Orders",
        "State Management: Client-side cart caching synced with database"
      ]
    }
  ] as Project[],

  education: [
    {
      institution: "SSN College of Engineering",
      degree: "B.E. Computer Science & Engineering",
      period: "2024 – Present",
      scoreLabel: "CGPA",
      score: "6.3 / 10",
      location: "Chennai, Tamil Nadu",
      current: true,
      highlights: [
        "Expected Graduation: 2028",
        "Focus on Java, Object-Oriented Design, Data Structures & Database Management"
      ]
    },
    {
      institution: "Sri Sai Vivekananda Junior College",
      degree: "Intermediate – MPC (Maths, Physics, Chemistry)",
      period: "2022 – 2024",
      scoreLabel: "Percentage",
      score: "98.2%",
      current: false,
      highlights: [
        "Top tier academic performance in Mathematics and Physical Sciences"
      ]
    },
    {
      institution: "Sri Saraswathi Vignana Mandir School",
      degree: "Secondary School Certificate (SSC)",
      period: "2021 – 2022",
      scoreLabel: "Percentage",
      score: "90%",
      current: false,
      highlights: [
        "Strong foundation in mathematics and analytical subjects"
      ]
    }
  ] as EducationItem[],

  certifications: [
    {
      title: "Udemy Certified Java Developer",
      issuer: "Udemy",
      badge: "Verified Certificate",
      topics: [
        "Core Java Fundamentals",
        "Object-Oriented Programming (OOP)",
        "Java Collections Framework",
        "Exception Handling",
        "Multithreading & Concurrency",
        "JDBC & Database Connectivity"
      ]
    }
  ],

  codingProfiles: {
    summary: "I regularly practice Data Structures and Algorithms problems on platforms such as LeetCode and GeeksforGeeks to strengthen my analytical thinking, coding ability, and problem-solving skills.",
    platforms: [
      {
        name: "LeetCode",
        focus: "DSA problem solving",
        url: "https://leetcode.com/u/harishravi10/",
        searchFallbackUrl: "https://leetcode.com/",
        tag: "Active Practice",
        description: "Practicing algorithms, array manipulations, linked lists, trees, and logic building."
      },
      {
        name: "GeeksforGeeks",
        focus: "DSA and programming practice",
        url: "https://www.geeksforgeeks.org/user/harishravi10/",
        searchFallbackUrl: "https://www.geeksforgeeks.org/",
        tag: "Core Concepts",
        description: "Strengthening core computer science concepts, Java fundamentals, and classic algorithmic questions."
      }
    ],
    dsaTopics: [
      "Arrays & Strings",
      "Linked Lists",
      "Stacks & Queues",
      "Binary Trees & Traversal",
      "Searching & Sorting",
      "Hashing & HashMaps",
      "Recursion Fundamentals",
      "Time & Space Complexity Analysis"
    ]
  },

  journey: [
    {
      step: "01",
      periodOrTag: "2024",
      title: "Started B.E. Computer Science at SSN",
      description: "Commenced undergraduate studies in Computer Science & Engineering at Sri Sivasubramaniya Nadar College of Engineering, Chennai.",
      iconName: "GraduationCap"
    },
    {
      step: "02",
      periodOrTag: "Core Foundation",
      title: "Java & OOP Mastery",
      description: "Built strong foundation in Java, Object-Oriented Programming, Collections framework, robust Exception Handling, and JDBC.",
      iconName: "Code"
    },
    {
      step: "03",
      periodOrTag: "Persistence",
      title: "Database Development",
      description: "Worked extensively with SQL and MySQL to design normalized schemas and build reliable database-driven applications.",
      iconName: "Database"
    },
    {
      step: "04",
      periodOrTag: "Client & Server",
      title: "Web Development",
      description: "Mastered HTML5, CSS3, JavaScript along with backend integration components like Servlets and JSP.",
      iconName: "Globe"
    },
    {
      step: "05",
      periodOrTag: "Current Focus",
      title: "Full Stack Focus & Scalable Systems",
      description: "Currently focusing on Java Full Stack Development (Spring Boot, advanced architecture) and building practical, portfolio-grade projects.",
      iconName: "Rocket"
    }
  ] as JourneyMilestone[]
};
