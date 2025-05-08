interface Author {
  name: string;
  bio: string;
  avatar?: string;
  role: string;
  expertise: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export const authors: Record<string, Author> = {
  "Shaha": {
    name: "Shaha",
    role: "Senior Content Writer",
    bio: "Former international student with extensive experience in scholarship applications. Passionate about helping Bangladeshi students achieve their academic dreams abroad.",
    expertise: ["Scholarships", "Study Abroad", "Academic Writing"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    socials: {
      linkedin: "https://linkedin.com/in/sarah-rahman",
      twitter: "https://twitter.com/sarah_writes"
    }
  },
  "Kamal Hossain": {
    name: "Kamal Hossain",
    role: "Education Consultant",
    bio: "Education consultant with 5+ years of experience in international scholarship programs. Specializes in government scholarship applications.",
    expertise: ["Government Scholarships", "Education Consulting", "Career Guidance"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kamal",
    socials: {
      linkedin: "https://linkedin.com/in/kamal-hossain",
      website: "https://kamalhossain.com"
    }
  },
  "Zarin Ahmed": {
    name: "Zarin Ahmed",
    role: "Tech Career Specialist",
    bio: "Tech industry professional focusing on internship and job opportunities in leading tech companies. Helps students navigate the tech recruitment process.",
    expertise: ["Tech Internships", "Career Development", "Interview Preparation"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zarin",
    socials: {
      linkedin: "https://linkedin.com/in/zarin-ahmed",
      github: "https://github.com/zarinahmed"
    }
  },
  "Tasnim Rahman": {
    name: "Tasnim Rahman",
    role: "Research Fellowship Expert",
    bio: "PhD candidate with extensive experience in research fellowships and academic opportunities. Specializes in STEM research programs.",
    expertise: ["Research Fellowships", "Academic Research", "STEM Programs"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tasnim",
    socials: {
      linkedin: "https://linkedin.com/in/tasnim-rahman",
      twitter: "https://twitter.com/tasnim_research"
    }
  },
  "Raisa Khan": {
    name: "Raisa Khan",
    role: "Fellowship Coordinator",
    bio: "Academic coordinator specializing in international fellowships and exchange programs. Expert in application processes for prestigious fellowships.",
    expertise: ["Fellowships", "Exchange Programs", "Academic Advising"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raisa",
    socials: {
      linkedin: "https://linkedin.com/in/raisa-khan",
      website: "https://raisakhan.com"
    }
  },
  "Imran Ahmed": {
    name: "Imran Ahmed",
    role: "University Admissions Specialist",
    bio: "Former university admissions officer with deep knowledge of international university applications and scholarships.",
    expertise: ["University Admissions", "Scholarship Applications", "Personal Statements"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Imran",
    socials: {
      linkedin: "https://linkedin.com/in/imran-ahmed",
      twitter: "https://twitter.com/imran_edu"
    }
  },
  "Farah Rahman": {
    name: "Farah Rahman",
    role: "Graduate Studies Advisor",
    bio: "Specializes in graduate school applications and scholarships. Helps students navigate the complex process of applying to top universities.",
    expertise: ["Graduate Studies", "Scholarship Applications", "Academic Planning"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farah",
    socials: {
      linkedin: "https://linkedin.com/in/farah-rahman",
      website: "https://farahrahman.com"
    }
  },
  "Nadia Islam": {
    name: "Nadia Islam",
    role: "Research Opportunities Specialist",
    bio: "Research professional focusing on connecting students with international research opportunities and internships.",
    expertise: ["Research Opportunities", "Academic Internships", "Scientific Writing"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia",
    socials: {
      linkedin: "https://linkedin.com/in/nadia-islam",
      twitter: "https://twitter.com/nadia_research"
    }
  },
  "Sarah Rahman": {
    name: "Sarah Rahman",
    role: "Educational Content Writer",
    bio: "Experienced writer specializing in educational content and study guides for international students.",
    expertise: ["Content Writing", "Study Guides", "Test Preparation"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahR",
    socials: {
      linkedin: "https://linkedin.com/in/sarah-rahman-edu",
      twitter: "https://twitter.com/sarah_edu"
    }
  }
};