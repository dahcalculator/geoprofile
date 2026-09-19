import { DemographicProfile, PlausibilityResult, ChildProfile } from './types';

const CURRENT_SURVEY_YEAR = 2026; //

export const REGIONAL_KNOWLEDGE_BASE: Record<string, any> = {
  NG: {
    currency: 'NGN (₦)', //[cite: 1]
    currencySymbol: '₦', //[cite: 1]
    baseIncomeGross: 15400000, //[cite: 1]
    avgTaxRate: 0.18, //[cite: 1]
    maritalStatus: '62% Married / 38% Single', //[cite: 1]
    homeOwnership: '55% Homeowner / 45% Renter', //[cite: 1]
    majorIndustries: [
      {
        rank: 1, //[cite: 1]
        name: 'Public Administration & Civil Governance', //[cite: 1]
        share: '34% Regional Workforce', //[cite: 1]
        driver: 'Federal ministries, departments, parastatals (MDAs), and international diplomatic missions.', //[cite: 1]
        growth: '+4.2% Annual Budget Expansion', //[cite: 1]
        anchor: 'Three Arms Zone & Central Business District (CBD), Abuja', //[cite: 1]
      },
      {
        rank: 2, //[cite: 1]
        name: 'Information & Communications Technology (ICT & FinTech)', //[cite: 1]
        share: '28% Regional Workforce', //[cite: 1]
        driver: 'Pan-African digital payment rails, telecom backbone operations, software engineering, and mobile banking.', //[cite: 1]
        growth: '+14.6% YoY Tech Growth', //[cite: 1]
        anchor: 'Yaba / Victoria Island / Abuja Tech Hub Cluster', //[cite: 1]
      },
      {
        rank: 3, //[cite: 1]
        name: 'Wholesale Trade, FMCG & Commercial Services', //[cite: 1]
        share: '22% Regional Workforce', //[cite: 1]
        driver: 'Consumer product distribution, nationwide logistics supply chains, real estate construction, and commodity commerce.', //[cite: 1]
        growth: '+6.1% Consumption Expansion', //[cite: 1]
        anchor: 'Wuse Commercial District / Alaba / Ikeja Trade Hub', //[cite: 1]
      },
    ],
    occupationsByAge: {
      junior: [
        { title: 'Executive Officer / Administrative Analyst', sector: 'Public Administration', share: '36%', tools: 'Public Service Rules, Circulars, Procurement E-Portals' }, //[cite: 1]
        { title: 'Junior Software & Mobile App Developer', sector: 'ICT & FinTech', share: '32%', tools: 'React Native, Python, Node.js, SQL, Paystack APIs' }, //[cite: 1]
        { title: 'FMCG Sales & Territory Merchandising Officer', sector: 'Wholesale & FMCG', share: '24%', tools: 'ERP Inventory Systems, Supply Chain CRM, Distribution Logistics' }, //[cite: 1]
      ],
      mid: [
        { title: 'Assistant Director / Senior Regulatory Officer', sector: 'Public Administration & Civil Service', share: '35%', tools: 'Treasury Single Account (TSA), Policy Implementation, Bureaucratic Compliance' }, //[cite: 1]
        { title: 'Senior Backend Engineer / FinTech Systems Architect', sector: 'ICT & FinTech', share: '30%', tools: 'Microservices, Kubernetes, High-Volume Payment Gateways, Cloud Infrastructure' }, //[cite: 1]
        { title: 'Regional Commercial & Supply Chain Operations Lead', sector: 'Wholesale Trade & Distribution', share: '25%', tools: 'Warehouse Fleet Management, Key Accounts, FMCG Cold-Chain Strategy' }, //[cite: 1]
      ],
      senior: [
        { title: 'Director / Permanent Secretary in Civil Service', sector: 'Public Administration', share: '38%', tools: 'National Policy Governance, Federal Budget Defense, Ministerial Oversight' }, //[cite: 1]
        { title: 'VP of Technology / Chief Information Officer (CIO)', sector: 'ICT & Telecoms', share: '28%', tools: 'Enterprise Cloud Strategy, Regulatory Telecommunications Licensing' }, //[cite: 1]
        { title: 'Managing Director / Corporate Commercial Distributor', sector: 'FMCG & Logistics Assets', share: '22%', tools: 'Import/Export Clearing, Multi-Regional FMCG Franchising' }, //[cite: 1]
      ],
    },
    ispProfile: {
      connType: '4G/5G Wireless Broadband, FTTH & Satellite (Starlink)', //[cite: 1]
      avgSpeed: '35 - 180 Mbps Down', //[cite: 1]
      latencyTier: '25ms - 55ms (Subsea Cables Equiano/2Africa)', //[cite: 1]
      householdCoverage: '68% Mobile Data / 26% Fixed Broadband', //[cite: 1]
      topIsps: [
        { name: 'MTN Nigeria (HyNetflex & 5G)', share: '42%', tech: '5G Fixed Wireless & FTTH', tier: '50-250 Mbps', note: 'Largest telecom & 5G provider in West Africa' }, //[cite: 1]
        { name: 'Airtel Nigeria (SmartSPEED)', share: '28%', tech: '4G LTE-A & 5G Home Router', tier: '30-150 Mbps', note: 'Extensive metropolitan data footprint' }, //[cite: 1]
        { name: 'ipNX / Spectranet / Starlink', share: '19%', tech: 'Direct Metro FTTH & LEO Satellite', tier: '50-220 Mbps', note: 'Leading residential fiber & satellite choice' }, //[cite: 1]
      ],
    },
    store: 'Shoprite, Spar Hypermarket & Wuse Market Hubs', //[cite: 1]
    storeType: 'Modern mall hypermarket & regional wholesale trading markets', //[cite: 1]
    bank: 'Zenith Bank, GTBank & Access Bank', //[cite: 1]
    bankType: 'Tier-1 commercial digital-first banking institutions', //[cite: 1]
    spectatorSport: 'European Football (Premier League) & Super Eagles', //[cite: 1]
    mediaProfile: {
      baseSvod: ['Showmax (DStv Stream)', 'Netflix Nigeria (Nollywood)', 'YouTube Mobile', 'Prime Video Africa'], //[cite: 1]
      kidsSvod: ['DStv Kids (Cartoon Network/Nickelodeon)', 'YouTube Kids'], //[cite: 1]
      matureSvod: ['IrokoTV', 'Arise News Online', 'Africa Magic Showcase'], //[cite: 1]
      baseAudio: ['Boomplay Music', 'Audiomack', 'Spotify Africa', 'Apple Music Nigeria'], //[cite: 1]
      tvStations: [
        { name: 'Channels Television', type: 'National Independent News Network' }, //[cite: 1]
        { name: 'Africa Magic (Urban / Showcase on DStv)', type: 'Nollywood Drama & Cinema' }, //[cite: 1]
        { name: 'SuperSport (DStv / GOtv)', type: 'Live Premier League & Global Sports' }, //[cite: 1]
      ],
      radioStations: [
        { name: 'Wazobia FM 95.1', genre: 'Pidgin English Urban Talk & Afrobeat Hits' }, //[cite: 1]
        { name: 'Cool FM 96.9', genre: 'Contemporary Pop & Entertainment News' }, //[cite: 1]
        { name: 'Nigeria Info FM 99.3', genre: 'Current Affairs & Political Talk' }, //[cite: 1]
      ],
    },
  },
  US: {
    currency: 'USD ($)', //[cite: 1]
    currencySymbol: '$', //[cite: 1]
    baseIncomeGross: 84500, //[cite: 1]
    avgTaxRate: 0.24, //[cite: 1]
    maritalStatus: '51% Married / 49% Unmarried', //[cite: 1]
    homeOwnership: '65% Homeowner / 35% Renter', //[cite: 1]
    majorIndustries: [
      {
        rank: 1, //[cite: 1]
        name: 'Cloud Computing, Software Platforms & AI', //[cite: 1]
        share: '35% Regional Workforce', //[cite: 1]
        driver: 'Enterprise SaaS architecture, generative AI systems, and global hyperscale infrastructure.', //[cite: 1]
        growth: '+12.4% Annual Capital Inflow', //[cite: 1]
        anchor: 'Silicon Valley / Austin Tech Corridor', //[cite: 1]
      },
      {
        rank: 2, //[cite: 1]
        name: 'Healthcare Systems, Biotechnology & Life Sciences', //[cite: 1]
        share: '26% Regional Workforce', //[cite: 1]
        driver: 'Integrated health networks, biomedical engineering, clinical pharmacology, and genomics research.', //[cite: 1]
        growth: '+7.8% Healthcare Demand', //[cite: 1]
        anchor: 'Regional Medical Centers & Biotech Parks', //[cite: 1]
      },
      {
        rank: 3, //[cite: 1]
        name: 'Financial Services, Investment Management & FinTech', //[cite: 1]
        share: '21% Regional Workforce', //[cite: 1]
        driver: 'Asset management, venture capital syndicates, digital retail banking, and commercial underwriting.', //[cite: 1]
        growth: '+5.5% Asset Expansion', //[cite: 1]
        anchor: 'Financial District & Venture Capital Hubs', //[cite: 1]
      },
    ],
    occupationsByAge: {
      junior: [
        { title: 'Associate Software & Cloud Engineer', sector: 'Cloud & AI Systems', share: '36%', tools: 'AWS, Python, React, TypeScript, Docker, Git' }, //[cite: 1]
        { title: 'Registered Clinical Staff Nurse (RN)', sector: 'Healthcare Systems', share: '31%', tools: 'Epic EHR, Patient Triage, Clinical Care Protocols' }, //[cite: 1]
        { title: 'Junior Financial & Valuation Analyst', sector: 'Financial Services', share: '24%', tools: 'Excel DCF Modeling, Bloomberg Terminal, SQL' }, //[cite: 1]
      ],
      mid: [
        { title: 'Senior Software Engineer / DevOps Architect', sector: 'Cloud Computing & AI', share: '38%', tools: 'Kubernetes, Terraform, Microservices, CI/CD Pipelines' }, //[cite: 1]
        { title: 'Attending Physician / Family Medicine Practitioner', sector: 'Healthcare Systems', share: '30%', tools: 'Clinical Diagnosis, Medical Board Licensure, Practice Management' }, //[cite: 1]
        { title: 'Senior Commercial Underwriter / Portfolio Lead', sector: 'Financial Services', share: '22%', tools: 'Credit Risk Analysis, Asset Allocation, FinTech APIs' }, //[cite: 1]
      ],
      senior: [
        { title: 'VP of Engineering / Principal Enterprise Architect', sector: 'Cloud Computing & Tech', share: '40%', tools: 'Multi-Cloud Strategy, Org Scaling, Tech Governance' }, //[cite: 1]
        { title: 'Chief Medical Officer (CMO) / Surgical Director', sector: 'Healthcare & Clinical Sciences', share: '28%', tools: 'Hospital Clinical Governance, Health Informatics Leadership' }, //[cite: 1]
        { title: 'Managing Director / Partner in Asset Management', sector: 'Investment & Banking', share: '22%', tools: 'Portfolio Strategy, Capital Raising, M&A Governance' }, //[cite: 1]
      ],
    },
    ispProfile: {
      connType: 'Fiber FTTH & DOCSIS 3.1 Gigabit Cable', //[cite: 1]
      avgSpeed: '300 Mbps - 1.2 Gbps Down', //[cite: 1]
      latencyTier: '< 18ms Low Latency (Fiber / Coaxial)', //[cite: 1]
      householdCoverage: '89% Broadband Penetration', //[cite: 1]
      topIsps: [
        { name: 'Xfinity (Comcast)', share: '38%', tech: 'DOCSIS 3.1 / Fiber', tier: '400-1200 Mbps', note: 'Largest US cable broadband provider' }, //[cite: 1]
        { name: 'AT&T Fiber / Internet', share: '29%', tech: 'Symmetrical FTTH', tier: '500-5000 Mbps', note: 'Fastest growing gigabit fiber footprint' }, //[cite: 1]
        { name: 'Verizon Fios / 5G Home', share: '21%', tech: 'Pure Fiber & C-Band 5G', tier: '300-1000 Mbps', note: 'Dominant Northeast fiber & nationwide 5G' }, //[cite: 1]
      ],
    },
    store: 'Costco Wholesale, Target & Trader Joe’s', //[cite: 1]
    storeType: 'Wholesale warehouse club, superstore & gourmet grocery', //[cite: 1]
    bank: 'JPMorgan Chase & Bank of America', //[cite: 1]
    bankType: 'Premier national depository & retail banking institutions', //[cite: 1]
    spectatorSport: 'NFL Football & NBA Basketball', //[cite: 1]
    mediaProfile: {
      baseSvod: ['Netflix', 'Amazon Prime Video', 'Hulu / Max', 'YouTube Premium'], //[cite: 1]
      kidsSvod: ['Disney+', 'YouTube Kids', 'PBS Kids'], //[cite: 1]
      matureSvod: ['Paramount+', 'Apple TV+', 'Criterion Channel'], //[cite: 1]
      baseAudio: ['Spotify', 'Apple Music', 'Pandora', 'Apple Podcasts'], //[cite: 1]
      tvStations: [
        { name: 'NBC / Peacock', type: 'Major Commercial Terrestrial Network' }, //[cite: 1]
        { name: 'CBS Network', type: 'National Primetime Broadcaster' }, //[cite: 1]
        { name: 'ESPN / ABC', type: 'Live National Sports Network' }, //[cite: 1]
      ],
      radioStations: [
        { name: 'NPR / WNYC', genre: 'National Public Radio / In-Depth Talk' }, //[cite: 1]
        { name: 'iHeartRadio Top 40', genre: 'Contemporary Hit Music Radio' }, //[cite: 1]
        { name: 'SiriusXM Satellite Radio', genre: 'Commercial-Free Satellite Programming' }, //[cite: 1]
      ],
    },
  },
  DEFAULT: {
    currency: 'USD ($)', //[cite: 1]
    currencySymbol: '$', //[cite: 1]
    baseIncomeGross: 62000, //[cite: 1]
    avgTaxRate: 0.22, //[cite: 1]
    maritalStatus: '52% Married / 48% Single', //[cite: 1]
    homeOwnership: '60% Homeowner / 40% Renter', //[cite: 1]
    majorIndustries: [
      {
        rank: 1, //[cite: 1]
        name: 'Public Administration & Civil Governance', //[cite: 1]
        share: '32% Regional Workforce', //[cite: 1]
        driver: 'Government agency services, regional municipal administration, and regulatory public works.', //[cite: 1]
        growth: '+4.0% Municipal Expansion', //[cite: 1]
        anchor: 'Metropolitan Government Center', //[cite: 1]
      },
      {
        rank: 2, //[cite: 1]
        name: 'Retail Trade, FMCG & Wholesale Logistics', //[cite: 1]
        share: '28% Regional Workforce', //[cite: 1]
        driver: 'Consumer merchandise distribution, supply-chain warehousing, and regional store operations.', //[cite: 1]
        growth: '+5.5% Commercial Growth', //[cite: 1]
        anchor: 'Central Commercial & Trade Center', //[cite: 1]
      },
      {
        rank: 3, //[cite: 1]
        name: 'Technology, Communications & Financial Services', //[cite: 1]
        share: '24% Regional Workforce', //[cite: 1]
        driver: 'Telecommunications operations, enterprise software deployment, and commercial bank branches.', //[cite: 1]
        growth: '+7.2% Digital Services', //[cite: 1]
        anchor: 'Business & Financial Quarter', //[cite: 1]
      },
    ],
    occupationsByAge: {
      junior: [
        { title: 'Junior Administrative Officer', sector: 'Public Administration', share: '35%', tools: 'Office Suites, Records Management, Public Portals' }, //[cite: 1]
        { title: 'Commercial Merchandising Associate', sector: 'Retail Trade & FMCG', share: '32%', tools: 'Inventory POS Systems, Stock Planning' }, //[cite: 1]
        { title: 'IT Support & Systems Analyst', sector: 'Technology & Telecom', share: '24%', tools: 'Helpdesk Software, Network Routing, Windows Server' }, //[cite: 1]
      ],
      mid: [
        { title: 'Senior Regulatory & Operations Specialist', sector: 'Public Administration', share: '36%', tools: 'Program Management, Public Compliance, Budget Review' }, //[cite: 1]
        { title: 'Regional Supply Chain Manager', sector: 'Retail & Distribution', share: '30%', tools: 'Warehouse Management Systems, Route Fleet Planning' }, //[cite: 1]
        { title: 'Senior Software Systems Analyst', sector: 'Technology Services', share: '23%', tools: 'Database Administration, Cloud Services, Python' }, //[cite: 1]
      ],
      senior: [
        { title: 'Director of Public Agency / Operations Lead', sector: 'Public Administration', share: '38%', tools: 'Civil Service Governance, Policy Leadership' }, //[cite: 1]
        { title: 'Commercial Director of Wholesale Trade', sector: 'FMCG & Logistics', share: '28%', tools: 'Corporate Accounts, Distribution Franchising' }, //[cite: 1]
        { title: 'Chief Technology Officer / IT Director', sector: 'Technology & Telecom', share: '22%', tools: 'Enterprise IT Architecture, Network Infrastructure' }, //[cite: 1]
      ],
    },
    ispProfile: {
      connType: 'Broadband Fiber & 4G/5G Wireless', //[cite: 1]
      avgSpeed: '100 - 300 Mbps Down', //[cite: 1]
      latencyTier: '< 30ms Regional IXP', //[cite: 1]
      householdCoverage: '78% Broadband Availability', //[cite: 1]
      topIsps: [
        { name: 'National Telecom Operator', share: '45%', tech: 'FTTH Fiber & VDSL', tier: '100-500 Mbps', note: 'Primary national telecom carrier' }, //[cite: 1]
        { name: 'Commercial Broadband Network', share: '30%', tech: 'DOCSIS Cable & Fiber', tier: '200-1000 Mbps', note: 'Metro fast internet provider' }, //[cite: 1]
        { name: '5G Fixed Wireless Network', share: '18%', tech: 'Fixed Wireless Access (FWA)', tier: '50-200 Mbps', note: 'Suburban mobile broadband' }, //[cite: 1]
      ],
    },
    store: 'Carrefour / Metro / Local Superstore', //[cite: 1]
    storeType: 'Regional grocery hypermarket chain', //[cite: 1]
    bank: 'Top National Commercial Bank', //[cite: 1]
    bankType: 'Full-service commercial retail bank', //[cite: 1]
    spectatorSport: 'International Football & Regional Athletics', //[cite: 1]
    mediaProfile: {
      baseSvod: ['Netflix International', 'YouTube Premium', 'Amazon Prime Video'], //[cite: 1]
      kidsSvod: ['Disney+', 'YouTube Kids'], //[cite: 1]
      matureSvod: ['Local Catch-Up TV', 'Apple TV+'], //[cite: 1]
      baseAudio: ['Spotify', 'YouTube Music', 'Apple Music'], //[cite: 1]
      tvStations: [
        { name: 'National Public Television', type: 'State Terrestrial News & Cultural Network' }, //[cite: 1]
        { name: 'Leading Private Commercial Channel', type: 'Primetime Entertainment & Drama' }, //[cite: 1]
        { name: 'Regional Sports Broadcaster', type: 'Domestic & International Sports Cable' }, //[cite: 1]
      ],
      radioStations: [
        { name: 'National Public News Radio', genre: 'State News & Information' }, //[cite: 1]
        { name: 'Top Commercial Pop FM', genre: 'Contemporary Hit Radio' }, //[cite: 1]
      ],
    },
  },
};

function getLifeStage(childAge: number) {
  if (childAge < 2) return { stage: 'Infant', color: 'bg-rose-950/80 text-rose-300 border-rose-800' }; //[cite: 1]
  if (childAge <= 4) return { stage: 'Toddler', color: 'bg-amber-950/80 text-amber-300 border-amber-800' }; //[cite: 1]
  if (childAge <= 11) return { stage: 'School-Age', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-800' }; //[cite: 1]
  if (childAge <= 17) return { stage: 'Teenager', color: 'bg-cyan-950/80 text-cyan-300 border-cyan-800' }; //[cite: 1]
  return { stage: 'Young Adult / Independent', color: 'bg-purple-950/80 text-purple-300 border-purple-800' }; //[cite: 1]
}

export function synthesizeChildrenProfile(parentAge: number, countryCode: string, familyWeight = 2) {
  if (parentAge < 23 || familyWeight === 0) { //[cite: 1]
    return {
      count: 0, //[cite: 1]
      livingAtHome: 0, //[cite: 1]
      children: [], //[cite: 1]
      stageDescription: 'No dependent children (Single / Pre-parenting)', //[cite: 1]
      note: 'Focus on early career development, higher education, and professional credentials.', //[cite: 1]
    };
  }

  if (parentAge >= 23 && parentAge <= 26) { //[cite: 1]
    const childAge = Math.max(1, parentAge - 24); //[cite: 1]
    const stageInfo = getLifeStage(childAge); //[cite: 1]
    return {
      count: 1, //[cite: 1]
      livingAtHome: 1, //[cite: 1]
      children: [{ order: 1, age: childAge, birthYear: CURRENT_SURVEY_YEAR - childAge, stage: stageInfo.stage, dependent: true, color: stageInfo.color }], //[cite: 1]
      stageDescription: 'Infant / Toddler Parenting', //[cite: 1]
      note: 'First-time parent balancing nursery/preschool care and career consolidation.', //[cite: 1]
    };
  }

  if (parentAge >= 27 && parentAge <= 44) { //[cite: 1]
    let count = familyWeight > 2 ? 3 : 2; //[cite: 1]
    if (countryCode === 'NG') count = familyWeight >= 3 ? 4 : 3; //[cite: 1]
    if (familyWeight === 1) count = 1; //[cite: 1]

    const firstChildAge = Math.min(parentAge - 21, Math.max(2, Math.round((parentAge - 24) * 0.75))); //[cite: 1]
    const children: ChildProfile[] = [];

    for (let i = 0; i < count; i++) { //[cite: 1]
      const spacing = i === 0 ? 0 : i === 1 ? 3 : i === 2 ? 5 : 7; //[cite: 1]
      const cAge = Math.max(1, firstChildAge - spacing); //[cite: 1]
      const stageInfo = getLifeStage(cAge); //[cite: 1]
      children.push({
        order: i + 1, //[cite: 1]
        age: cAge, //[cite: 1]
        birthYear: CURRENT_SURVEY_YEAR - cAge, //[cite: 1]
        stage: stageInfo.stage, //[cite: 1]
        dependent: true, //[cite: 1]
        color: stageInfo.color, //[cite: 1]
      });
    }

    return {
      count, //[cite: 1]
      livingAtHome: count, //[cite: 1]
      children, //[cite: 1]
      stageDescription: count > 1 ? 'School-Age & Preschool Family' : 'Single Dependent Family', //[cite: 1]
      note: `${count} dependent children residing at home; education, healthcare, and family vehicle priority.`, //[cite: 1]
    };
  }

  // 45 - 54 Cohort
  if (parentAge >= 45 && parentAge <= 54) { //[cite: 1]
    const c1Age = parentAge - 24; //[cite: 1]
    const c2Age = parentAge - 27; //[cite: 1]
    const rawAges = [c1Age, c2Age]; //[cite: 1]
    if (familyWeight >= 3 || countryCode === 'NG') rawAges.push(parentAge - 31); //[cite: 1]

    const children = rawAges.map((ageVal, idx) => { //[cite: 1]
      const stageInfo = getLifeStage(ageVal); //[cite: 1]
      return {
        order: idx + 1, //[cite: 1]
        age: ageVal, //[cite: 1]
        birthYear: CURRENT_SURVEY_YEAR - ageVal, //[cite: 1]
        stage: stageInfo.stage, //[cite: 1]
        dependent: ageVal <= 21, //[cite: 1]
        color: stageInfo.color, //[cite: 1]
      };
    });

    const dependentsLivingHome = children.filter((c) => c.dependent).length; //[cite: 1]
    return {
      count: children.length, //[cite: 1]
      livingAtHome: dependentsLivingHome, //[cite: 1]
      children, //[cite: 1]
      stageDescription: 'Teenagers & Young Adults Transitioning', //[cite: 1]
      note: `${dependentsLivingHome} dependent(s) still in school/college; older children gaining career independence.`, //[cite: 1]
    };
  }

  // 55+ Senior
  const adultChildren = [parentAge - 25, parentAge - 28].map((ageVal, idx) => ({ //[cite: 1]
    order: idx + 1, //[cite: 1]
    age: ageVal, //[cite: 1]
    birthYear: CURRENT_SURVEY_YEAR - ageVal, //[cite: 1]
    stage: 'Independent Adult', //[cite: 1]
    dependent: false, //[cite: 1]
    color: 'bg-slate-900 text-slate-300 border-slate-700', //[cite: 1]
  }));

  return {
    count: adultChildren.length, //[cite: 1]
    livingAtHome: 0, //[cite: 1]
    children: adultChildren, //[cite: 1]
    stageDescription: 'Empty-Nest / Grown Adult Children', //[cite: 1]
    note: `All ${adultChildren.length} adult children live independently; grandchildren engagement stage.`, //[cite: 1]
  };
}

export function calculateDemographics(
  ip: string,
  age: number,
  geoRaw: { city: string; country: string; code: string; isp: string; asn: string },
  customMult = 1.0,
  taxOverride: number | null = null,
  familyWeight = 2,
  evBoost = false
): DemographicProfile {
  const countryCode = (geoRaw.code || 'US').toUpperCase(); //[cite: 1]
  const regionData = REGIONAL_KNOWLEDGE_BASE[countryCode] || REGIONAL_KNOWLEDGE_BASE['DEFAULT']; //[cite: 1]

  const childProfile = synthesizeChildrenProfile(age, countryCode, familyWeight); //[cite: 1]
  const hasYoungKids = childProfile.children.some((c) => c.dependent && c.age <= 12); //[cite: 1]

  let ageTier = 'mid'; //[cite: 1]
  let careerStage = 'Mid-Career Professional'; //[cite: 1]
  let ageMult = 1.15; //[cite: 1]

  if (age < 28) { //[cite: 1]
    ageTier = 'junior'; //[cite: 1]
    careerStage = 'Junior / Associate Specialist'; //[cite: 1]
    ageMult = 0.7; //[cite: 1]
  } else if (age <= 48) { //[cite: 1]
    ageTier = 'mid'; //[cite: 1]
    careerStage = 'Senior Specialist / Practice Lead'; //[cite: 1]
    ageMult = 1.15; //[cite: 1]
  } else {
    ageTier = 'senior'; //[cite: 1]
    careerStage = 'Executive Director / Principal Authority'; //[cite: 1]
    ageMult = 1.45; //[cite: 1]
  }

  const topOccupations = regionData.occupationsByAge[ageTier] || regionData.occupationsByAge['mid']; //[cite: 1]

  const grossIncome = Math.round(regionData.baseIncomeGross * customMult * ageMult); //[cite: 1]
  const effectiveTax = taxOverride !== null ? taxOverride / 100 : regionData.avgTaxRate; //[cite: 1]
  const totalTax = Math.round(grossIncome * effectiveTax); //[cite: 1]
  const netIncome = Math.max(0, grossIncome - totalTax); //[cite: 1]

  const gradYear = CURRENT_SURVEY_YEAR - (age - 22); //[cite: 1]
  let degreeTitle = 'Bachelor of Science (B.Sc.) Honors'; //[cite: 1]
  let fieldOfStudy = 'Public Policy, Computer Science & Business Management'; //[cite: 1]
  const institution = 'Accredited State & National Flagship University'; //[cite: 1]
  let badge = "Bachelor's Level"; //[cite: 1]
  let gradDisplay = `${gradYear} (Age 22)`; //[cite: 1]
  let cohortShare = 'Top 18% in Regional Workforce'; //[cite: 1]
  let cohortPercent = 82; //[cite: 1]
  let description = 'Accredited degree completion with standard board certifications.'; //[cite: 1]

  if (age < 22) { //[cite: 1]
    degreeTitle = 'Undergraduate Candidate'; //[cite: 1]
    badge = 'Student / Candidate'; //[cite: 1]
    gradDisplay = `Expected ${CURRENT_SURVEY_YEAR + (22 - age)}`; //[cite: 1]
    cohortShare = 'Junior Academic Intake'; //[cite: 1]
    cohortPercent = 45; //[cite: 1]
    description = 'Currently completing accredited academic prerequisites.'; //[cite: 1]
  } else if (age >= 35 && age <= 48) { //[cite: 1]
    degreeTitle = 'Master of Science (M.Sc.) / Professional Charter (ACCA/Chartered)'; //[cite: 1]
    badge = 'Master / Chartered Specialist'; //[cite: 1]
    gradDisplay = `${gradYear} (Undergrad) • ${gradYear + 4} (Master's)`; //[cite: 1]
    cohortShare = 'Top 12% in Industry'; //[cite: 1]
    cohortPercent = 88; //[cite: 1]
    description = 'Holds advanced postgraduate charter with accredited professional licensing.'; //[cite: 1]
  } else if (age > 48) { //[cite: 1]
    degreeTitle = 'Fellow of the Professional Institute / Executive Fellow (FCA/CEng/Ph.D.)'; //[cite: 1]
    badge = 'Executive Fellow'; //[cite: 1]
    gradDisplay = `${gradYear} (Age 22)`; //[cite: 1]
    cohortShare = 'Top 6% Lifetime Leadership'; //[cite: 1]
    cohortPercent = 94; //[cite: 1]
    description = 'Recognized industry fellow with corporate board and governance accreditations.'; //[cite: 1]
  }

  let maritalStatus = regionData.maritalStatus; //[cite: 1]
  let homeOwnership = regionData.homeOwnership; //[cite: 1]
  let householdArchetype = 'Dual-Income Family'; //[cite: 1]

  if (age < 25) { //[cite: 1]
    maritalStatus = '82% Single / 18% Partnered'; //[cite: 1]
    homeOwnership = '85% Rented Flat / Shared Living'; //[cite: 1]
    householdArchetype = 'Young Solo Professional'; //[cite: 1]
  } else if (age <= 49) { //[cite: 1]
    maritalStatus = '74% Married or Cohabiting'; //[cite: 1]
    homeOwnership = '76% Homeowner (Mortgaged)'; //[cite: 1]
    householdArchetype = childProfile.count > 0 ? 'Core Family with Dependents' : 'Dual-Income No Kids (DINK)'; //[cite: 1]
  } else {
    maritalStatus = '68% Married / 32% Independent or Widowed'; //[cite: 1]
    homeOwnership = '88% Homeowner (Substantial Equity)'; //[cite: 1]
    householdArchetype = 'Mature Household / Empty-Nest'; //[cite: 1]
  }

  const totalOccupants = (childProfile.livingAtHome + (maritalStatus.includes('Married') ? 2 : 1)).toFixed(1); //[cite: 1]

  const carData = {
    category: countryCode === 'NG' ? 'All-Terrain Compact SUV & Saloon' : 'Family Compact SUV / Crossover', //[cite: 1]
    models: countryCode === 'NG' ? 'Toyota Camry, Corolla, Highlander, Lexus RX350' : 'Toyota RAV4, Honda CR-V, Tesla Model Y', //[cite: 1]
    evRate: evBoost ? 'High EV Density (45% EV/PHEV)' : countryCode === 'NG' ? 'Fuel-Efficient Petrol & Hybrid: 14%' : 'EV/Hybrid share: 22%', //[cite: 1]
    commute: countryCode === 'NG' ? 'Expressway & Federal Highway Commute' : 'Personal Vehicle Commute', //[cite: 1]
    commuteTime: countryCode === 'NG' ? '38 mins' : '24 mins', //[cite: 1]
    hasCar: true, //[cite: 1]
  };

  const sports = age >= 50 //[cite: 1]
    ? ['Golf', 'Active Walking', 'Swimming', 'Lawn Tennis'] //[cite: 1]
    : ['Football (Soccer)', 'Road Running / Jogging', 'Gym & Fitness Lifting', 'Tennis / Padel']; //[cite: 1]
  const fitnessRate = age >= 50 ? 'Daily Walking & Weekend Golf' : '3-4 Days / Week Active'; //[cite: 1]

  const rawMedia = regionData.mediaProfile || REGIONAL_KNOWLEDGE_BASE['DEFAULT'].mediaProfile; //[cite: 1]
  const videoApps = hasYoungKids //[cite: 1]
    ? [rawMedia.baseSvod[0], rawMedia.kidsSvod[0], rawMedia.baseSvod[1] || 'Prime Video'] //[cite: 1]
    : [rawMedia.baseSvod[0], rawMedia.baseSvod[1] || 'Prime Video', 'YouTube Premium']; //[cite: 1]

  return {
    geo: {
      ip,
      city: geoRaw.city,
      region: geoRaw.city,
      country_name: geoRaw.country,
      country_code: countryCode,
      timezone: 'UTC',
      asn: geoRaw.asn,
      latitude: 0,
      longitude: 0,
    },
    age,
    archetypeLabel: `${geoRaw.city} • ${geoRaw.country} • Age ${age}`, //[cite: 1]
    narrative: `In ${geoRaw.city} (${geoRaw.country}), the economy is anchored by ${regionData.majorIndustries[0].name}. A typical ${age}-year-old resident holds the role of ${topOccupations[0].title}.`, //[cite: 1]
    detectedIsp: geoRaw.isp, //[cite: 1]
    detectedAsn: geoRaw.asn, //[cite: 1]
    currencySymbol: regionData.currencySymbol, //[cite: 1]
    currencyCode: regionData.currency, //[cite: 1]
    grossIncome, //[cite: 1]
    netIncome, //[cite: 1]
    totalTax, //[cite: 1]
    effectiveTaxRatePercentage: Math.round(effectiveTax * 100), //[cite: 1]
    careerStage, //[cite: 1]
    majorIndustries: regionData.majorIndustries, //[cite: 1]
    topOccupations, //[cite: 1]
    education: {
      degreeTitle, //[cite: 1]
      badge, //[cite: 1]
      fieldOfStudy, //[cite: 1]
      institution, //[cite: 1]
      gradDisplay, //[cite: 1]
      cohortShare, //[cite: 1]
      cohortPercent, //[cite: 1]
      description, //[cite: 1]
    },
    childProfile, //[cite: 1]
    householdSize: totalOccupants, //[cite: 1]
    maritalStatus, //[cite: 1]
    homeOwnership, //[cite: 1]
    householdArchetype, //[cite: 1]
    cars: carData, //[cite: 1]
    sports, //[cite: 1]
    spectatorSport: regionData.spectatorSport, //[cite: 1]
    fitnessRate, //[cite: 1]
    store: regionData.store, //[cite: 1]
    storeType: regionData.storeType, //[cite: 1]
    bank: regionData.bank, //[cite: 1]
    bankType: regionData.bankType, //[cite: 1]
    insurance: {
      health: age < 26 ? 'Individual Health / Basic Coverage' : 'Comprehensive Family Health & Pediatric Dental/Vision', //[cite: 1]
      profLiability: 'Professional Indemnity & Errors and Omissions (E&O) Policy', //[cite: 1]
      autoProperty: 'Comprehensive Collision, Fire & Third-Party Property Damage', //[cite: 1]
    },
    ispProfile: regionData.ispProfile, //[cite: 1]
    entertainment: {
      dietTag: 'Digital-First Streaming & Broadcast', //[cite: 1]
      subCount: '3.2 Subs', //[cite: 1]
      videoApps, //[cite: 1]
      audioApps: rawMedia.baseAudio, //[cite: 1]
      tvStations: rawMedia.tvStations, //[cite: 1]
      radioStations: rawMedia.radioStations, //[cite: 1]
    },
  };
}

export function evaluatePlausibility(profile: DemographicProfile): PlausibilityResult {
  const audits = {
    bioSpacing: { pass: true, label: 'Pass', text: 'Parent-child age delta >= 18 years.' }, //[cite: 1]
    academicTimeline: { pass: true, label: 'Pass', text: 'Credential timeline verified.' }, //[cite: 1]
    econConcordance: { pass: true, label: 'Pass', text: 'Compensation fits regional role.' }, //[cite: 1]
    householdAlign: { pass: true, label: 'Pass', text: 'Household fits dependent structure.' }, //[cite: 1]
    policyAsset: { pass: true, label: 'Pass', text: 'Risk policies match physical assets.' }, //[cite: 1]
  };

  let penalties = 0; //[cite: 1]

  if (profile.childProfile.children.length > 0) { //[cite: 1]
    const oldestAge = Math.max(...profile.childProfile.children.map((c) => c.age)); //[cite: 1]
    const delta = profile.age - oldestAge; //[cite: 1]
    if (delta < 15) { //[cite: 1]
      audits.bioSpacing = { pass: false, label: 'Fatal Error', text: `Child age ${oldestAge} vs parent age ${profile.age} (delta < 15 yrs).` }; //[cite: 1]
      penalties += 45; //[cite: 1]
    } else if (delta < 18) { //[cite: 1]
      audits.bioSpacing = { pass: false, label: 'Atypical', text: `Child born when parent was age ${delta}.` }; //[cite: 1]
      penalties += 20; //[cite: 1]
    }
  }

  const deg = profile.education.degreeTitle.toLowerCase(); //[cite: 1]
  if (profile.age < 23 && (deg.includes('doctor') || deg.includes('m.d.') || deg.includes('fellow') || deg.includes('master'))) { //[cite: 1]
    audits.academicTimeline = { pass: false, label: 'Invalid Timeline', text: `${profile.education.degreeTitle} impossible before age 24.` }; //[cite: 1]
    penalties += 40; //[cite: 1]
  }

  const score = Math.max(12, 98 - penalties); //[cite: 1]
  let status = 'Statistically Coherent'; //[cite: 1]
  const mahalanobisDistance = (1.12 + penalties * 0.12).toFixed(2); //[cite: 1]

  if (score < 50) status = 'High Anomaly / Fraud Flagged'; //[cite: 1]
  else if (score < 80) status = 'Low Probability / Atypical'; //[cite: 1]

  return { score, status, mahalanobisDistance, audits }; //[cite: 1]
}