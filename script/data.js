// Portfolio Data Configuration
const portfolioData = {
  // Personal Information
  personal: {
    name: "Sukhendu Midya",
    title: "B.Tech CSE Student specialization in Cybersecurity",
    roles: [
      "B.Tech CSE Student",
      "Cybersecurity Enthusiast",
      "Aspiring Developer",
      "Problem Solver"
    ],
    description: "A second-year B.Tech CSE student at Brainware University, specializing in Cybersecurity. Passionate about technology and skilled in C, Data Structures, Figma, and Power BI.",
    email: "sukhendumidya6@gmail.com",
    phone: "9339379824", // You can add your phone number here
    location: "Barasat, Kolkata-700125, India",
    profileImage: "images/Profile_image_SM.jpg",
    aboutImage: "images/vecteezy_a-man-in-a-business-suit-with-a-laptop-sits-in-a-cafe-back_34040345.jpg",
    resume: "./assets/resume.pdf" // Add your resume file here
  },

  // Navigation & Branding
  branding: {
    logo: "Sukhendu",
    tagline: "Building a foundation in technology and security.",
    footerText: "A dedicated student on a journey of learning and creation.",
    copyright: "© 2025 Sukhendu Midya. All rights reserved."
  },

  // About Section
  about: {
    intro: "I am a dedicated and curious second-year B.Tech Computer Science student with a specialization in Cybersecurity at Brainware University. I am passionate about building a strong foundation in technology and problem-solving.",
    details: [
      "Currently in the 2nd year of B.Tech CSE.",
      "Specializing in Cybersecurity.",
      "Proficient in C and Data Structures & Algorithms.",
      "Skilled in design with Figma and data visualization with Power BI.",
      "Eager to learn and apply new technologies."
    ],
    stats: {
      projects: 3,
      experience: 1, // Represents years of learning
      clients: 0
    }
  },

  // Skills Section
  skills: {
    categories: [
      {
        name: "Programming & DSA",
        icon: "fas fa-code",
        skills: [
          { name: "C Programming", level: "Advanced", percentage: 85 },
          { name: "Data Structures & Algorithms", level: "Intermediate", percentage: 75 }
        ]
      },
      {
        name: "Design & Visualization", 
        icon: "fas fa-paint-brush",
        skills: [
          { name: "Figma", level: "Advanced", percentage: 80 },
          { name: "Power BI", level: "Intermediate", percentage: 70 }
        ]
      }
    ]
  },

  // Projects Section
  projects: [
    {
      id: 1,
      title: "Password generator",
      description: "A simple password generator that suggests strong password options and evaluates their strength as simple, moderate, or complex.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      category: "other",
      technologies: ["C", "Javascript"],
      //githubUrl: "https://github.com/your-username/student-management-system", // Replace with your link
      featured: true
    },
    {
      id: 2,
      title: "Sales Data Analysis Dashboard",
      description: "An interactive dashboard created with Power BI to visualize and analyze sales data. It helps in identifying trends, top-selling products, and regional performance.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      category: "other",
      technologies: ["Power BI", "Data Visualization", "Data Analysis"],
      featured: true
    },
    {
      id: 3,
      title: "Mobile App UI/UX Design",
      description: "A complete UI/UX prototype for a conceptual mobile application designed in Figma. The project focuses on user-centric design principles and creating an intuitive user flow.",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop",
      category: "mobile",
      technologies: ["Figma", "UI/UX Design", "Prototyping"],
      liveUrl: "#", // Add Behance or Dribbble link here
      featured: true
    }
  ],

  // Experience Section
  experience: {
    work: [
        {
            title: "Exploring Opportunities",
            company: "Open to Internships",
            location: "Remote or Kolkata",
            date: "Present",
            description: "As a second-year student, I am actively seeking internship opportunities in Cybersecurity, Software Development, or related fields to apply my skills and gain hands-on industry experience.",
            achievements: [
              "Eager to contribute to real-world projects.",
              "A fast learner with strong foundational knowledge.",
              "Ready to collaborate with experienced professionals."
            ]
          }
    ],
    education: [
      {
        title: "Bachelor of Technology in CSE (Cybersecurity)",
        institution: "Brainware University",
        location: "Kolkata, India",
        date: "2024 - 2028",
        description: "Pursuing a comprehensive curriculum focused on computer science fundamentals and specialized knowledge in cybersecurity, algorithms, and system design.",
        achievements: [
          "CGPA: (Add your CGPA here)",
          "Actively participating in coding clubs and workshops."
        ]
      }
    ],
    certifications: [
      // Add any certifications you have here
    ]
  },

  // Services Section
  services: [
    {
      icon: "fas fa-laptop-code",
      title: "C Programming",
      description: "Developing efficient command-line applications and implementing complex algorithms using the C programming language."
    },
    {
      icon: "fas fa-paint-brush",
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing interface designs and prototypes for web and mobile applications using Figma."
    },
    {
      icon: "fas fa-chart-bar",
      title: "Data Visualization",
      description: "Building interactive dashboards and reports with Power BI to transform raw data into meaningful insights."
    }
  ],

  // Testimonials Section
  testimonials: [
    // As a student, you can remove this section or add testimonials from professors or project partners later.
  ],

  // Blog Section
  blog: [
    // Add links to your blog posts here if you have any.
  ],

  // Social Media Links
  social: [
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      url: "https://linkedin.com/in/your-username", // Replace with your LinkedIn profile
      color: "#0077b5"
    },
    {
      name: "GitHub", 
      icon: "fab fa-github",
      url: "https://github.com/your-username", // Replace with your GitHub profile
      color: "#333"
    }
  ],

  // Contact Information
  contact: {
    title: "Let's Connect",
    description: "I'm currently a student exploring opportunities to learn and grow. Feel free to reach out for collaborations or just to connect!",
    formMessages: {
      success: "Thank you for your message! I'll get back to you soon.",
      error: "Oops! Something went wrong. Please try again or contact me directly via email.",
      sending: "Sending your message..."
    }
  },

  // SEO and Meta Information
  seo: {
    title: "Sukhendu Midya - B.Tech CSE Student",
    description: "Portfolio of Sukhendu Midya, a B.Tech CSE student at Brainware University specializing in Cybersecurity. Skilled in C, DSA, Figma, and Power BI.",
    keywords: "Sukhendu Midya, B.Tech Student, CSE, Cybersecurity, Brainware University, C, DSA, Figma, Power BI, Kolkata",
    author: "Sukhendu Midya",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face"
  },

  // Configuration Settings
  config: {
    animations: {
      typingSpeed: 100,
      typingDelay: 2000,
      particleCount: 50,
      scrollAnimationOffset: 100
    },
    theme: {
      defaultTheme: "dark", // "light" or "dark"
      enableThemeToggle: true
    },
    form: {
      endpoint: "https://formspree.io/f/YOUR_FORM_ID", // Replace with your formspree.io form ID
      enableRecaptcha: false,
      recaptchaSiteKey: "YOUR_RECAPTCHA_SITE_KEY"
    },
    performance: {
      lazyLoadImages: true,
      enableImageOptimization: true,
      preloadCriticalImages: true
    },
    features: {
      enableBlog: true,
      enableTestimonials: true,
      enableServices: true,
      enableParticles: true,
      enableLoadingScreen: true,
      enableBackToTop: true
    }
  }
};

// Export the data for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
} else if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
}