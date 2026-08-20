export interface Education {
  degree: string;
  field: string;
  institution: string;
  institutionUrl?: string;
  startYear: string;
  endYear: string;
  location: string;
  status: string;
  description: string;
}

export interface Experience {
  role: string;
  organisation: string;
  startYear: string;
  endYear: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  certificateUrl?: string;
}

export interface ResearchArea {
  title: string;
  description: string;
}

export interface Publication {
  type: string;
  status: string;
  year: string;
  title: string;
  authors: string;
  container: string;
  publisher: string;
  summary: string;
  doi: string;
  url: string;
  linkText?: string;
  bookTitle?: string;
  bookUrl?: string;
  indexing: string;
  isbn?: string;
  category: 'Book Chapters' | 'Journals' | 'Conferences' | 'Other';
}

export interface Project {
  name: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  status: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  featured: boolean;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  file: string;
  issuerUrl?: string;
}

export const profile = {
  name: "Arnold Christopher A",
  designation: "CSE (AI & ML) Student · Student Researcher · AI Developer",
  department: "CSE with Specialisation in Artificial Intelligence and Machine Learning",
  institution: "KalaignarKarunanidhi Institute of Technology (KIT)",
  institutionWebsite: "https://kitcbe.com/",
  location: "Coimbatore, Tamil Nadu, India",
  aboutLocation: "Pappampatti Rd, Pallapalayam, Kannampalayam, Tamil Nadu 641402, India",
  degree: "Bachelor of Engineering (B.E)",
  email: "acakarnold77@gmail.com",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // professional placeholder
  aboutShort: "CSE (AI & ML) student, student researcher and AI developer focused on Artificial Intelligence, Machine Learning and practical technology-driven solutions.",
  cgpa: "9.0 / 10.0",
  
  metrics: {
    publications: "22",
    bookChapters: "22",
    projects: "[RESEARCH_PROJECT_COUNT]"
  },

  educationSubtitle: "[EDUCATION_SUBTITLE]",
  education: [
    {
      degree: "B.E.",
      field: "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
      institution: "KalaignarKarunanidhi Institute Of Technology",
      institutionUrl: "https://kitcbe.com/",
      startYear: "2025",
      endYear: "2029",
      location: "Pappampatti Rd, Pallapalayam, Kannampalayam, Tamil Nadu 641402",
      status: "Pursuing",
      description: "Bachelor of Engineering in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning. Currently pursuing.",
    },
    {
      degree: "HSC",
      field: "Computer Science with Mathematics",
      institution: "Carmel Garden Matriculation Higher Secondary School",
      institutionUrl: "https://www.carmel.ac.in/",
      startYear: "2023",
      endYear: "2025",
      location: "Puliakulam Rd, Ramasamy Nagar, Ramanathapuram, Coimbatore, Tamil Nadu 641045",
      status: "83.3%",
      description: "Higher Secondary Certificate with Computer Science and Mathematics.",
    },
    {
      degree: "SSLC",
      field: "General",
      institution: "Carmel Garden Matriculation Higher Secondary School",
      institutionUrl: "https://www.carmel.ac.in/",
      startYear: "",
      endYear: "2023",
      location: "Puliakulam Rd, Ramasamy Nagar, Ramanathapuram, Coimbatore, Tamil Nadu 641045",
      status: "84.4%",
      description: "Secondary School Leaving Certificate.",
    }
  ] as Education[],

  experience: [
    {
      role: "Full Stack Development Virtual Intern",
      organisation: "DecodeLabs",
      startYear: "May 15, 2026",
      endYear: "June 15, 2026",
      location: "Remote",
      type: "Internship",
      description: "Completed the DecodeLabs Virtual Internship Program in Full Stack development. Demonstrated dedication, consistency, and hands-on problem-solving skills across real-world projects and collaborative tasks.",
      responsibilities: [
        "Completed real-world full stack development projects.",
        "Applied hands-on problem-solving skills to collaborative tasks.",
        "Demonstrated dedication and consistency throughout the virtual internship program."
      ],
      technologies: [],
      certificateUrl: "/Certificate/DECODELABS INTERNSHIP/DecodeLabs Internship Certificate 2.pdf"
    }
  ] as Experience[],

  researchAreas: [
    {
      title: "Artificial Intelligence",
      description: "[AI_RESEARCH_DESCRIPTION]"
    },
    {
      title: "Machine Learning",
      description: "[ML_RESEARCH_DESCRIPTION]"
    },
    {
      title: "Generative AI",
      description: "[GENAI_RESEARCH_DESCRIPTION]"
    },
    {
      title: "Intelligent Systems",
      description: "[INTELLIGENT_SYSTEMS_DESCRIPTION]"
    }
  ] as ResearchArea[],

  publicationSubtitle: "[PUBLICATION_SUBTITLE]",
  publications: [
    {
      type: "Book Chapter",
      status: "Published",
      year: "2026",
      title: "Building Future-Ready Leaders Through Entrepreneurship and Innovation Education",
      authors: "",
      container: "Publisher: IGI Global • ISBN: Scopus Indexed",
      publisher: "IGI Global • ISBN: Scopus Indexed",
      summary: "",
      doi: "",
      url: "https://www.igi-global.com/chapter/building-future-ready-leaders-through-entrepreneurship-and-innovation-education/419736",
      linkText: "View Chapter",
      bookTitle: "Integrating Entrepreneurship and Innovation in Business Education",
      bookUrl: "https://www.igi-global.com/book/integrating-entrepreneurship-innovation-business-education/406058",
      indexing: "Scopus Indexed",
      category: "Book Chapters"
    },
    {
      type: "Book Chapter",
      status: "Published",
      year: "2026",
      title: "Adaptive Vibro-Physiological Fatigue Detection System for AI-Driven Transportation Safety",
      authors: "",
      container: "Publisher: IGI Global • ISBN: Scopus Indexed",
      publisher: "IGI Global • ISBN: Scopus Indexed",
      summary: "",
      doi: "",
      url: "https://www.igi-global.com/chapter/adaptive-vibro-physiological-fatigue-detection-system-for-ai-driven-transportation-safety/417735",
      linkText: "View Chapter",
      bookTitle: "Automatic Systems for Monitoring Drivers' Vibrations",
      bookUrl: "https://www.igi-global.com/book/automatic-systems-monitoring-drivers-vibrations/397628",
      indexing: "Scopus Indexed",
      category: "Book Chapters"
    }
  ] as Publication[],

  profiles: {
    linkedin: {
      url: "https://www.linkedin.com/in/arnold-christopher-a-30887737b/",
      description: "Professional profile, experience and career journey."
    },
    googleScholar: {
      url: "https://scholar.google.com/citations?user=Sb7ELFQAAAAJ&hl=en",
      description: "Research publications, citations and scholarly profile."
    },
    github: {
      url: "https://github.com/Arnold2122",
      description: "Projects, repositories and technical development work."
    },
    codechef: {
      url: "https://www.codechef.com/users/arnold_2122",
      description: "Competitive programming and problem-solving profile."
    },
    leetcode: {
      url: "https://leetcode.com/u/arnolddd_7777/",
      description: "Data structures, algorithms and coding practice."
    },
    codeforces: {
      url: "https://codeforces.com/profile/acakarnold777",
      description: "Competitive programming contests and problem solving."
    },
    scopus: {
      url: "https://www.scopus.com/authid/detail.uri?authorId=60769150700",
      authorId: "60769150700",
      description: "Scopus author profile and scholarly record."
    },
    igiGlobal: {
      url: "https://www.igi-global.com/affiliate/arnold-christophera/552877",
      description: "Academic publishing and scholarly contribution profile."
    },
    orcid: {
      url: "https://orcid.org/0009-0006-9795-7395",
      description: "ORCID researcher identifier."
    }
  },

  projects: [
    {
      name: "[PROJECT_NAME_01]",
      category: "AI / ML",
      description: "[PROJECT_DESCRIPTION]",
      problem: "[PROJECT_PROBLEM]",
      solution: "[PROJECT_SOLUTION]",
      technologies: ["[PROJECT_TECHNOLOGIES]"],
      status: "[PROJECT_STATUS]",
      githubUrl: "[PROJECT_GITHUB_URL]",
      liveUrl: "[PROJECT_LIVE_URL]",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      name: "[PROJECT_NAME_02]",
      category: "Generative AI",
      description: "[PROJECT_DESCRIPTION]",
      problem: "[PROJECT_PROBLEM]",
      solution: "[PROJECT_SOLUTION]",
      technologies: ["[PROJECT_TECHNOLOGIES]"],
      status: "[PROJECT_STATUS]",
      githubUrl: "[PROJECT_GITHUB_URL]",
      liveUrl: "[PROJECT_LIVE_URL]",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      name: "[PROJECT_NAME_03]",
      category: "Full Stack",
      description: "[PROJECT_DESCRIPTION]",
      problem: "[PROJECT_PROBLEM]",
      solution: "[PROJECT_SOLUTION]",
      technologies: ["[PROJECT_TECHNOLOGIES]"],
      status: "[PROJECT_STATUS]",
      githubUrl: "[PROJECT_GITHUB_URL]",
      liveUrl: "[PROJECT_LIVE_URL]",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ] as Project[],

  certificates: [
    {
      title: "Adaptive Vibro-Physiological Fatigue Detection System for AI-Driven Transportation Safety",
      issuer: "IGI Global Scientific Publishing",
      year: "2026",
      file: "/Certificate/IGI GLOBAL/Adaptive Vibro-Physiological Fatigue Detection System for AI-Driven Transportation Safety.pdf",
      issuerUrl: "https://www.igi-global.com/affiliate/arnold-christophera/552877"
    },
    {
      title: "Building Future-Ready Leaders Through Entrepreneurship and Innovation Education",
      issuer: "IGI Global Scientific Publishing",
      year: "2026",
      file: "/Certificate/IGI GLOBAL/Building Future-Ready Leaders Through Entrepreneurship and Innovation Education.pdf",
      issuerUrl: "https://www.igi-global.com/affiliate/arnold-christophera/552877"
    },
    {
      title: "Data Engineering on AWS - Foundations",
      issuer: "AWS Training & Certification",
      year: "2026",
      file: "/Certificate/AWS/83b72747-68b0-42ea-995b-456983dab363.pdf"
    },
    {
      title: "Data Analytics Essentials",
      issuer: "Cisco Networking Academy",
      year: "2026",
      file: "/Certificate/CISCO/Data_Analytics_Essentials_certificate_kit29-am05-gmail-com_e6120fd0-7cbc-4fda-82d1-1d97211cffb5.pdf"
    },
    {
      title: "Networking Essentials",
      issuer: "Cisco Networking Academy",
      year: "2026",
      file: "/Certificate/CISCO/Network_Technician_Career_Path_certificate_kit29-am05-gmail-com_58c620d2-f22b-4003-b227-1ce2c39cfb14.pdf"
    },
    {
      title: "Oracle Certified Foundations Associate",
      issuer: "Oracle Corporation",
      year: "2026",
      file: "/Certificate/ORACLE/eCertificate.pdf"
    },
    {
      title: "Machine Learning with Python",
      issuer: "IBM",
      year: "2025",
      file: "/Certificate/IBM/IBM ML0101EN Certificate _ IBM SkillsBuild.pdf"
    }
  ] as Certificate[]
};
