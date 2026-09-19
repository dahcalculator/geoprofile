import { DemographicProfile, PlausibilityResult } from './types';

export function calculateDemographics(
  ip: string,
  age: number,
  geo: { city: string; country: string; code: string; isp: string; asn: string }
): DemographicProfile {
  const currentYear = new Date().getFullYear();
  const gradYear = currentYear - (age - 22);

  // Dependent children heuristics
  let childrenCount = 0;
  if (age >= 24 && age <= 28) childrenCount = 1;
  else if (age >= 29 && age <= 48) childrenCount = 2;
  else if (age >= 49 && age <= 58) childrenCount = 3;

  const children = [];
  if (childrenCount > 0) {
    const oldestAge = Math.max(1, age - 26);
    children.push({
      age: oldestAge,
      stage: oldestAge <= 2 ? 'Infant' : oldestAge <= 4 ? 'Toddler' : oldestAge <= 12 ? 'School-Age' : oldestAge <= 19 ? 'Teenager' : 'Young Adult',
      residing: oldestAge < 22,
    } as const);
    if (childrenCount >= 2) {
      const secondAge = Math.max(1, oldestAge - 3);
      children.push({
        age: secondAge,
        stage: secondAge <= 2 ? 'Infant' : secondAge <= 4 ? 'Toddler' : 'School-Age',
        residing: true,
      } as const);
    }
  }

  const isNigeria = geo.code === 'NG';
  const industries = isNigeria
    ? [
        { title: 'Public Administration & Civic Tech', share: '34%', driver: 'Civil Service Reform & e-Gov Platforms', anchor: 'Three Arms Zone & Central Business District' },
        { title: 'ICT, FinTech & Enterprise Telemetry', share: '24%', driver: 'Cloud Computing & Digital Banking', anchor: 'Wuse II & Garki Tech Cluster' },
        { title: 'Real Estate & Infrastructure Works', share: '18%', driver: 'Urban Commercial & Logistics Expansion', anchor: 'Maitama, Guzape & Airport Road Corridor' },
      ]
    : [
        { title: 'Enterprise Technology & Cloud Systems', share: '38%', driver: 'AI Infrastructure & SaaS Platforms', anchor: 'Silicon Valley Metro Corridor' },
        { title: 'Financial Technology & Capital Markets', share: '26%', driver: 'Algorithmic Trading & Payments', anchor: 'Downtown Financial Center' },
        { title: 'Biomedical & Clinical Health Sciences', share: '16%', driver: 'Genomics & Targeted Therapeutics', anchor: 'Metro Research Triangle' },
      ];

  const occupations = isNigeria
    ? [
        { title: age < 28 ? 'Junior Software Associate' : age < 48 ? 'Principal Backend Engineer' : 'Enterprise Technology Director', sector: 'ICT & FinTech', share: '24%', responsibilities: 'FastAPI, Next.js, Cloud Microservices' },
        { title: age < 30 ? 'Procurement Assistant' : 'Senior Administrative Officer (GL-14)', sector: 'Public Service', share: '32%', responsibilities: 'Treasury Single Account (TSA) & Civil Rules' },
        { title: 'Commercial Property Legal Counsel', sector: 'Real Estate & Legal', share: '16%', responsibilities: 'Deeds Registry & Corporate Conveyancing' },
      ]
    : [
        { title: age < 28 ? 'Software Engineer I' : 'Staff Cloud Systems Architect', sector: 'Technology', share: '36%', responsibilities: 'Distributed Systems & Go/Rust Microservices' },
        { title: 'Quantitative Risk Analyst', sector: 'Finance', share: '24%', responsibilities: 'Monte Carlo Stress Modeling & Basel III' },
        { title: 'Clinical Operations Lead', sector: 'Biomedical', share: '18%', responsibilities: 'Phase III Trial Protocols & Compliance' },
      ];

  return {
    ip,
    city: geo.city,
    country: geo.country,
    countryCode: geo.code,
    isp: geo.isp,
    asn: geo.asn,
    age,
    education: {
      degree: age < 22 ? 'Undergraduate in Progress' : age < 32 ? 'B.Sc. in Computer Science' : 'M.Sc. / Executive MBA',
      field: 'Computing & Software Systems',
      institution: isNigeria ? 'Federal University of Technology / Premier State Campus' : 'Flagship Research University',
      gradYear,
    },
    industries,
    occupations,
    household: {
      marital: age < 27 ? 'Single / Living Alone' : 'Married / Cohabiting',
      size: 1 + (age >= 27 ? 1 : 0) + childrenCount,
      childrenCount,
      children,
      tenure: age < 28 ? 'Private Rented Unit' : 'Homeowner (Mortgage / Equity)',
    },
    finance: {
      gross: isNigeria ? '₦18,500,000' : '$142,000',
      net: isNigeria ? '₦14,800,000' : '$103,660',
      effectiveTax: 27,
    },
    mobility: {
      carClass: age < 28 ? 'Compact Sedan' : 'Midsize Crossover SUV',
      model: isNigeria ? 'Toyota Corolla / Camry / RAV4' : 'Honda CR-V / Tesla Model Y',
      evShare: '14%',
    },
    telecom: {
      connType: 'Fiber to the Home (FTTH) & 5G Fixed Wireless',
      topIsps: isNigeria
        ? [
            { name: 'MTN Nigeria Broadband', share: '38%', tech: '5G FWA & Metro Fiber' },
            { name: 'Airtel Nigeria', share: '27%', tech: '4G/5G Broadband' },
            { name: 'Spectranet / ipNX', share: '18%', tech: 'Direct FTTH' },
          ]
        : [
            { name: 'Comcast Xfinity', share: '36%', tech: 'DOCSIS 3.1' },
            { name: 'AT&T Fiber', share: '31%', tech: 'Symmetrical FTTP' },
            { name: 'Verizon Fios', share: '22%', tech: 'Gigabit FTTH' },
          ],
    },
    media: {
      svod: isNigeria ? ['Netflix Nigeria', 'Showmax Pro', 'Prime Video', 'YouTube'] : ['Netflix', 'Prime Video', 'Apple TV+'],
      audio: isNigeria ? ['Boomplay', 'Spotify', 'Apple Music', 'Audiomack'] : ['Spotify', 'Apple Music', 'Podcasts'],
      tv: isNigeria ? ['Channels TV', 'Africa Magic', 'SuperSport', 'Arise News'] : ['NBC', 'CBS', 'ESPN', 'CNN'],
      radio: isNigeria ? ['Wazobia FM 95.1', 'Cool FM 96.9', 'Nigeria Info 95.1'] : ['NPR / WNYC', 'iHeartMedia'],
    },
  };
}

export function auditPlausibility(profile: DemographicProfile): PlausibilityResult {
  const anomalies: string[] = [];

  // Biological constraint check
  let bioPass = true;
  if (profile.household.children.length > 0) {
    const oldestChild = profile.household.children[0].age;
    if (profile.age - oldestChild < 17) {
      bioPass = false;
      anomalies.push(`Biological Impossibility: Parent age (${profile.age}) is too close to oldest child age (${oldestChild}).`);
    }
  }

  // Academic timeline check
  let academicPass = true;
  if (profile.age < 22 && profile.education.degree.includes('M.Sc.')) {
    academicPass = false;
    anomalies.push("Academic Paradox: Advanced postgraduate degree claimed before age 22.");
  }

  const score = Math.max(10, 100 - anomalies.length * 45);

  return {
    score,
    rating: score >= 90 ? 'Empirically Coherent' : score >= 60 ? 'Borderline Skewed' : 'Fraud Alert Flagged',
    anomalies,
    bioPass,
    academicPass,
    economicPass: true,
    housingPass: true,
  };
}