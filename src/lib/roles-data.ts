export interface RoleData {
  id: string;
  name: string;
  emoji: string;
  category: 'Tech' | 'Data' | 'Design' | 'Management' | 'Marketing';
  demand: 'High' | 'Medium' | 'Low';
  salaryRange: string;
  suggestedWeeks: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  jobOpenings: string;
  sampleCurriculum: {
    week: number;
    theme: string;
    objectives: string[];
  }[];
}

export const ROLES_DATA: RoleData[] = [
  {
    id: 'full-stack-developer',
    name: 'Full Stack Developer',
    emoji: '🧑‍💻',
    category: 'Tech',
    demand: 'High',
    salaryRange: '₹4L - ₹15L',
    suggestedWeeks: 16,
    difficulty: 'Intermediate',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    jobOpenings: '12,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Internet & Web Fundamentals', objectives: ['Understand HTTP/DNS', 'HTML5 semantics', 'CSS Flexbox/Grid'] },
      { week: 2, theme: 'Advanced JavaScript', objectives: ['ES6+ features', 'Promises & Async/Await', 'DOM manipulation'] },
      { week: 3, theme: 'React.js Basics', objectives: ['Components & Props', 'State management with hooks', 'Routing'] },
    ]
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    emoji: '🎨',
    category: 'Tech',
    demand: 'High',
    salaryRange: '₹3.5L - ₹12L',
    suggestedWeeks: 12,
    difficulty: 'Beginner',
    skills: ['React/Next.js', 'Tailwind CSS', 'JavaScript', 'Figma'],
    jobOpenings: '15,000+',
    sampleCurriculum: [
      { week: 1, theme: 'UI Fundamentals', objectives: ['HTML/CSS basics', 'Responsive design principles', 'Accessibility (a11y)'] },
      { week: 2, theme: 'JavaScript for UI', objectives: ['Event listeners', 'API fetching', 'Local storage'] },
      { week: 3, theme: 'Modern Frameworks', objectives: ['React ecosystem', 'State management', 'Component libraries'] },
    ]
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    emoji: '⚙️',
    category: 'Tech',
    demand: 'High',
    salaryRange: '₹4.5L - ₹16L',
    suggestedWeeks: 14,
    difficulty: 'Intermediate',
    skills: ['Node.js/Python', 'SQL & NoSQL', 'REST/GraphQL APIs', 'Docker'],
    jobOpenings: '10,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Server Fundamentals', objectives: ['Server-client architecture', 'Building basic REST APIs', 'Authentication vs Authorization'] },
      { week: 2, theme: 'Database Design', objectives: ['SQL queries & joins', 'Normalization', 'Indexing & performance'] },
      { week: 3, theme: 'Advanced APIs', objectives: ['GraphQL basics', 'Rate limiting', 'Caching with Redis'] },
    ]
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    emoji: '🔬',
    category: 'Data',
    demand: 'High',
    salaryRange: '₹6L - ₹20L+',
    suggestedWeeks: 20,
    difficulty: 'Advanced',
    skills: ['Python', 'Machine Learning', 'Pandas/NumPy', 'Statistics'],
    jobOpenings: '8,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Math & Stats Primer', objectives: ['Linear algebra', 'Probability distributions', 'Hypothesis testing'] },
      { week: 2, theme: 'Data Wrangling', objectives: ['Pandas deep-dive', 'Data cleaning techniques', 'Feature engineering'] },
      { week: 3, theme: 'Intro to Machine Learning', objectives: ['Supervised vs Unsupervised', 'Scikit-learn', 'Model evaluation metrics'] },
    ]
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    emoji: '📊',
    category: 'Data',
    demand: 'High',
    salaryRange: '₹4L - ₹10L',
    suggestedWeeks: 10,
    difficulty: 'Beginner',
    skills: ['SQL', 'Excel', 'Tableau/PowerBI', 'Python'],
    jobOpenings: '14,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Data Manipulation', objectives: ['Advanced Excel formulas', 'Pivot tables', 'Data visualization principles'] },
      { week: 2, theme: 'SQL for Analysis', objectives: ['Complex aggregations', 'Window functions', 'CTEs'] },
      { week: 3, theme: 'BI Tools', objectives: ['Connecting data sources', 'Building interactive dashboards', 'Storytelling with data'] },
    ]
  },
  {
    id: 'ml-engineer',
    name: 'ML Engineer',
    emoji: '🤖',
    category: 'Data',
    demand: 'Medium',
    salaryRange: '₹8L - ₹25L',
    suggestedWeeks: 24,
    difficulty: 'Advanced',
    skills: ['PyTorch/TensorFlow', 'Model Deployment', 'Python', 'MLOps'],
    jobOpenings: '4,500+',
    sampleCurriculum: [
      { week: 1, theme: 'Deep Learning Basics', objectives: ['Neural network architecture', 'Backpropagation', 'Activation functions'] },
      { week: 2, theme: 'Computer Vision', objectives: ['CNNs', 'Image classification', 'Object detection'] },
      { week: 3, theme: 'Model Deployment', objectives: ['Serving models with FastAPI', 'Dockerizing ML apps', 'ONNX runtime'] },
    ]
  },
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    emoji: '✨',
    category: 'Design',
    demand: 'High',
    salaryRange: '₹3L - ₹12L',
    suggestedWeeks: 12,
    difficulty: 'Beginner',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
    jobOpenings: '8,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Design Principles', objectives: ['Color theory', 'Typography', 'Spacing & Layout'] },
      { week: 2, theme: 'User Experience (UX)', objectives: ['User personas', 'Journey mapping', 'Information architecture'] },
      { week: 3, theme: 'Figma Mastery', objectives: ['Auto-layout', 'Components & Variants', 'Interactive prototyping'] },
    ]
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    emoji: '🎯',
    category: 'Management',
    demand: 'High',
    salaryRange: '₹7L - ₹22L',
    suggestedWeeks: 14,
    difficulty: 'Intermediate',
    skills: ['Agile/Scrum', 'Data Analysis', 'User Stories', 'Roadmapping'],
    jobOpenings: '6,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Product Sense', objectives: ['Identifying user problems', 'Market research', 'Competitive analysis'] },
      { week: 2, theme: 'Execution & Agile', objectives: ['Writing PRDs', 'Sprint planning', 'Working with engineering teams'] },
      { week: 3, theme: 'Metrics & Analytics', objectives: ['Defining KPIs', 'A/B testing', 'Cohort analysis'] },
    ]
  },
  {
    id: 'devops-engineer',
    name: 'DevOps/Cloud Engineer',
    emoji: '🚀',
    category: 'Tech',
    demand: 'High',
    salaryRange: '₹6L - ₹18L',
    suggestedWeeks: 16,
    difficulty: 'Advanced',
    skills: ['AWS/Azure', 'Docker/Kubernetes', 'CI/CD (Actions)', 'Linux'],
    jobOpenings: '9,500+',
    sampleCurriculum: [
      { week: 1, theme: 'Linux & Scripting', objectives: ['Bash scripting', 'File permissions', 'Networking basics'] },
      { week: 2, theme: 'Containerization', objectives: ['Docker files', 'Docker compose', 'Image optimization'] },
      { week: 3, theme: 'CI/CD Pipelines', objectives: ['GitHub Actions', 'Automated testing workflows', 'Deployment strategies'] },
    ]
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    emoji: '🛡️',
    category: 'Tech',
    demand: 'Medium',
    salaryRange: '₹5L - ₹15L',
    suggestedWeeks: 18,
    difficulty: 'Intermediate',
    skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Cryptography'],
    jobOpenings: '5,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Security Fundamentals', objectives: ['CIA Triad', 'Common attack vectors', 'Network protocols'] },
      { week: 2, theme: 'Ethical Hacking Intro', objectives: ['Reconnaissance', 'Vulnerability scanning', 'Web app security (OWASP)'] },
      { week: 3, theme: 'Defense & Monitoring', objectives: ['Intrusion detection systems', 'Log analysis', 'Incident response'] },
    ]
  },
  {
    id: 'mobile-developer',
    name: 'Mobile Developer',
    emoji: '📱',
    category: 'Tech',
    demand: 'High',
    salaryRange: '₹4L - ₹14L',
    suggestedWeeks: 14,
    difficulty: 'Intermediate',
    skills: ['React Native/Flutter', 'iOS/Android', 'Mobile UI', 'API Integration'],
    jobOpenings: '11,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Mobile Fundamentals', objectives: ['Mobile OS architectures', 'Cross-platform vs Native', 'Setting up dev environment'] },
      { week: 2, theme: 'UI Development', objectives: ['Navigation paradigms', 'Responsive layouts', 'Touch handling'] },
      { week: 3, theme: 'Device Features', objectives: ['Camera access', 'Geolocation', 'Local storage & SQLite'] },
    ]
  },
  {
    id: 'qa-engineer',
    name: 'QA Engineer',
    emoji: '✅',
    category: 'Tech',
    demand: 'Medium',
    salaryRange: '₹3.5L - ₹10L',
    suggestedWeeks: 10,
    difficulty: 'Beginner',
    skills: ['Selenium/Cypress', 'Manual Testing', 'API Testing', 'JIRA'],
    jobOpenings: '8,500+',
    sampleCurriculum: [
      { week: 1, theme: 'Testing Fundamentals', objectives: ['Test cases & plans', 'Bug reporting lifecycle', 'Manual testing methodologies'] },
      { week: 2, theme: 'Automation Intro', objectives: ['Intro to Cypress', 'Writing basic assertions', 'DOM selection'] },
      { week: 3, theme: 'API & E2E Testing', objectives: ['Postman basics', 'Mocking API responses', 'Running test suites in CI'] },
    ]
  },
  {
    id: 'digital-marketer',
    name: 'Digital Marketer',
    emoji: '📈',
    category: 'Marketing',
    demand: 'High',
    salaryRange: '₹3L - ₹9L',
    suggestedWeeks: 8,
    difficulty: 'Beginner',
    skills: ['SEO/SEM', 'Social Media', 'Google Analytics', 'Content Strategy'],
    jobOpenings: '18,000+',
    sampleCurriculum: [
      { week: 1, theme: 'Marketing Fundamentals', objectives: ['Customer funnels', 'Inbound vs Outbound', 'Buyer personas'] },
      { week: 2, theme: 'SEO & Content', objectives: ['Keyword research', 'On-page optimization', 'Backlink strategies'] },
      { week: 3, theme: 'Paid Advertising', objectives: ['Google Ads setup', 'Facebook/Insta Ads', 'ROI tracking'] },
    ]
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    emoji: '💼',
    category: 'Management',
    demand: 'High',
    salaryRange: '₹5L - ₹12L',
    suggestedWeeks: 10,
    difficulty: 'Beginner',
    skills: ['Requirements Gathering', 'Process Modeling', 'SQL', 'Stakeholder Management'],
    jobOpenings: '10,500+',
    sampleCurriculum: [
      { week: 1, theme: 'Business Analysis Basics', objectives: ['Role of a BA', 'SDLC methodologies', 'Stakeholder mapping'] },
      { week: 2, theme: 'Requirements Engineering', objectives: ['Elicitation techniques', 'Writing BRDs & FRDs', 'Use cases'] },
      { week: 3, theme: 'Process & Data', objectives: ['BPMN diagrams', 'Basic SQL for reporting', 'UAT coordination'] },
    ]
  }
];
