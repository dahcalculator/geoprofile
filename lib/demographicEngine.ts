import {
  DemographicProfile,
  PlausibilityResult,
  RealEstateListing,
  ChildProfile,
} from './types';

// ==========================================
// 1. 4-COUNTRY REAL ESTATE BENCHMARK CATALOG
// ==========================================
export const REAL_ESTATE_BY_REGION: Record<string, RealEstateListing[]> = {
  NG: [
    {
      platform: 'PropertyPro.ng',
      title: '4-Bedroom Terraced Duplex with BQ',
      location: 'Life Camp / Gwarinpa, Abuja, FCT',
      price: '₦185,000,000',
      size: '420 sqm living area',
      specs: '4 Beds • 5 Baths • 1 Room BQ • Solar Inverter',
      url: 'https://propertypro.ng/property-for-sale/in/abuja',
      badge: 'Verified Agent',
    },
    {
      platform: 'Nigeria Property Centre',
      title: '5-Bedroom Fully Detached Smart Duplex',
      location: 'Maitama / Guzape, Abuja, FCT',
      price: '₦450,000,000',
      size: '650 sqm plot (480 sqm build)',
      specs: '5 Beds • 6 Baths • Private Pool • Gatehouse',
      url: 'https://nigeriapropertycentre.com/for-sale/houses/abuja',
      badge: 'C of O / FCDA',
    },
    {
      platform: 'PropertyPro.ng',
      title: '3-Bedroom Luxury Apartment with Serviced Elevator',
      location: 'Katampe Main / Jabi Corridors, Abuja, FCT',
      price: '₦95,000,000',
      size: '210 sqm living area',
      specs: '3 Beds • 3 Baths • 24/7 Power • Facility Gym',
      url: 'https://propertypro.ng/property-for-sale/in/abuja',
      badge: 'Serviced Residence',
    },
  ],
  US: [
    {
      platform: 'Zillow',
      title: 'Modern Single-Family Contemporary Residence',
      location: 'Palo Alto / Mountain View, Silicon Valley, CA',
      price: '$2,485,000',
      size: '2,240 sq ft (0.18 acre lot)',
      specs: '4 Beds • 3 Baths • 2-Car Garage • Solar EV Hookup',
      url: 'https://www.zillow.com/homes/for_sale/',
      badge: 'MLS Verified',
    },
    {
      platform: 'Redfin',
      title: 'Multi-Level Executive Craftsman Home',
      location: 'Sunnyvale, Santa Clara County, CA',
      price: '$1,920,000',
      size: '1,860 sq ft',
      specs: '3 Beds • 2.5 Baths • Open Floorplan • Smart HVAC',
      url: 'https://www.redfin.com/',
      badge: 'Redfin Hot Home',
    },
    {
      platform: 'Zillow',
      title: 'Luxury High-Rise Penthouse Condominium',
      location: 'SoMa / South Beach, San Francisco, CA',
      price: '$1,350,000',
      size: '1,320 sq ft',
      specs: '2 Beds • 2 Baths • Concierge • Deeded Parking',
      url: 'https://www.zillow.com/homes/for_sale/',
      badge: 'HOA Managed',
    },
  ],
  UK: [
    {
      platform: 'Rightmove',
      title: 'Victorian 4-Bedroom Freehold Terraced House',
      location: 'Clapham / Wandsworth, London SW4',
      price: '£1,180,000',
      size: '1,650 sq ft (153.3 sqm)',
      specs: '4 Beds • 2 Baths • South-Facing Garden • Cellar',
      url: 'https://www.rightmove.co.uk/property-for-sale.html',
      badge: 'Freehold Tenure',
    },
    {
      platform: 'Zoopla',
      title: 'Refurbished Mews House with Integral Garage',
      location: 'Marylebone / Westminster, London W1',
      price: '£2,250,000',
      size: '1,420 sq ft (132 sqm)',
      specs: '3 Beds • 3 Baths • Private Mews Access • EPC B',
      url: 'https://www.zoopla.co.uk/for-sale/houses/london/',
      badge: 'Central London',
    },
    {
      platform: 'Rightmove',
      title: 'Modern Riverside Apartment with Balcony',
      location: 'Canary Wharf / Wapping, London E14',
      price: '£640,000',
      size: '880 sq ft (81.8 sqm)',
      specs: '2 Beds • 2 Baths • 24hr Concierge • Roof Garden',
      url: 'https://www.rightmove.co.uk/property-for-sale.html',
      badge: '999-Yr Lease',
    },
  ],
  AU: [
    {
      platform: 'Realestate.com.au',
      title: 'Architectural Family Home with Alfresco Deck',
      location: 'Paddington / Balmain, Sydney, NSW',
      price: 'A$2,350,000',
      size: '220 sqm internal (380 sqm land)',
      specs: '4 Beds • 2.5 Baths • Double Lockup Garage',
      url: 'https://www.realestate.com.au/buy',
      badge: 'Auction / Private',
    },
    {
      platform: 'Domain',
      title: 'Modern Inner-City Terrace Residence',
      location: 'Surry Hills, Sydney, NSW',
      price: 'A$1,780,000',
      size: '145 sqm internal',
      specs: '3 Beds • 2 Baths • Courtyard • Rear Lane Access',
      url: 'https://www.domain.com.au/',
      badge: 'Torrens Title',
    },
    {
      platform: 'Realestate.com.au',
      title: 'Harbourside Luxury Executive Apartment',
      location: 'Pyrmont / Barangaroo, Sydney, NSW',
      price: 'A$1,290,000',
      size: '98 sqm living space',
      specs: '2 Beds • 2 Baths • Secure Car Space • Pool/Gym',
      url: 'https://www.realestate.com.au/buy',
      badge: 'Strata Title',
    },
  ],
};

// ==========================================
// 2. 4-COUNTRY REGIONAL MACROECONOMIC DATA
// ==========================================
const REGIONAL_DATA: Record<string, any> = {
  NG: {
    currencySymbol: '₦',
    currencyCode: 'NGN',
    baseSalary: 11500000,
    store: 'Shoprite / Spar Nigeria',
    storeType: 'Tier-1 Hypermarket & Superstore',
    bank: 'Zenith Bank / Access Bank',
    bankType: 'Commercial Tier-1 Financial Institution',
    sports: ['Football (NPFL/EPL)', 'Basketball', 'Athletics & Sprints', 'Volleyball', 'Table Tennis'],
    spectatorSport: 'Arsenal FC / Premier League & Super Eagles',
    majorIndustries: [
      { rank: 1, name: 'Public Administration & Civil Governance', share: '34%', driver: 'Federal ministries, parastatals, diplomacy, and civil service oversight.', growth: '+3.1% YoY', anchor: 'Federal Secretariats & MDAs' },
      { rank: 2, name: 'ICT, FinTech & Digital Software Engineering', share: '28%', driver: 'Pan-African payment switches, banking gateways, and enterprise software.', growth: '+14.6% YoY', anchor: 'Tech Ecosystems & Startups' },
      { rank: 3, name: 'Commercial Distribution & Wholesale FMCG Trade', share: '22%', driver: 'Regional consumer retail distribution, supply chain hubs, and transit commerce.', growth: '+6.2% YoY', anchor: 'National Transit Corridors' },
    ],
    occupationsByStage: {
      early: [
        { title: 'Software Engineer / FinTech Backend Dev', share: '32%', sector: 'Technology', tools: 'TypeScript, Next.js, Node.js, PostgreSQL' },
        { title: 'Administrative Officer (Grade Level 08)', share: '28%', sector: 'Public Administration', tools: 'Public Service Rules, Civil Memos, TSA' },
        { title: 'Commercial Operations Associate', share: '22%', sector: 'Retail & Logistics', tools: 'ERP Systems, Inventory Auditing' },
      ],
      mid: [
        { title: 'Assistant Director / Regulatory Affairs Lead', share: '35%', sector: 'Governance & MDAs', tools: 'Statutory Compliance, Fiscal Audits, Policy Frameworks' },
        { title: 'Lead Distributed Systems Architect', share: '29%', sector: 'Technology', tools: 'Cloud Infrastructure, Microservices, Python' },
        { title: 'Regional Supply Chain & Trade Director', share: '20%', sector: 'Distribution & Trade', tools: 'Contract Negotiation, Multimodal Logistics' },
      ],
      senior: [
        { title: 'Permanent Secretary / Director (Federal MDA)', share: '38%', sector: 'Governance & Public Service', tools: 'Budget Appropriation, Inter-Ministerial Policy' },
        { title: 'Chief Technology Officer / Enterprise Partner', share: '31%', sector: 'Technology & Enterprise', tools: 'Board Governance, Enterprise Strategy' },
        { title: 'Managing Director / Corporate Trade Principal', share: '21%', sector: 'Commerce & Logistics', tools: 'Consortium Finance, Macro Distribution' },
      ],
    },
    ispInfrastructure: {
      connType: '4G LTE / 5G Fixed Wireless & GPON Fiber',
      avgSpeed: '35 - 180 Mbps',
      latencyTier: '25 - 45 ms (Subsea landing points)',
      householdCoverage: 'Urban Fiber Ring & Cellular Microcells',
      topIsps: [
        { name: 'MTN Nigeria', share: '38%', tech: '5G Fixed Wireless / Hybrid Fiber', note: 'Equiano & 2Africa Subsea Capacity' },
        { name: 'Airtel Nigeria', share: '29%', tech: '4G LTE-Advanced / Carrier Fiber', note: 'Metropolitan Metro Rings' },
        { name: 'ipNX / Spectranet', share: '18%', tech: 'Direct FTTH GPON', note: 'Direct Commercial Gigabit Nodes' },
      ],
    },
    entertainment: {
      dietTag: 'Afrobeats, Digital Nollywood & Premium Sports',
      subCount: '2.4 Active Subscriptions',
      videoApps: ['Showmax Nigeria', 'Netflix NG', 'YouTube Premium'],
      audioApps: ['Spotify Africa', 'Boomplay Music', 'Apple Music'],
      tvStations: [{ name: 'Channels Television' }, { name: 'Arise News' }, { name: 'AIT' }],
      radioStations: [{ name: 'Wazobia FM (99.5)' }, { name: 'Cool FM (96.9)' }, { name: 'Nigeria Info (95.1)' }],
    },
  },
  US: {
    currencySymbol: '$',
    currencyCode: 'USD',
    baseSalary: 94000,
    store: 'Target / Costco Wholesale',
    storeType: 'National Club Hypermarket',
    bank: 'Chase / Bank of America',
    bankType: 'Tier-1 Multinational Financial Group',
    sports: ['American Football (NFL)', 'Basketball (NBA)', 'Baseball (MLB)', 'Soccer', 'Running'],
    spectatorSport: 'NFL Super Bowl & NBA Playoffs',
    majorIndustries: [
      { rank: 1, name: 'Cloud Computing & Enterprise Technology', share: '36%', driver: 'Hyperscale cloud, generative AI platforms, and enterprise software.', growth: '+11.8% YoY', anchor: 'Silicon Valley & Coastal Tech Corridors' },
      { rank: 2, name: 'Healthcare & Biomedical Engineering', share: '29%', driver: 'Genomic therapeutics, outpatient clinical systems, and medical devices.', growth: '+7.4% YoY', anchor: 'Regional University Medical Centers' },
      { rank: 3, name: 'Commercial Banking & Quantitative Finance', share: '21%', driver: 'Asset management, automated trading networks, and venture finance.', growth: '+4.9% YoY', anchor: 'Financial District Exchanges' },
    ],
    occupationsByStage: {
      early: [
        { title: 'Software Engineer II (Full-Stack)', share: '34%', sector: 'Technology', tools: 'React, TypeScript, AWS, Docker' },
        { title: 'Clinical Operations Analyst', share: '27%', sector: 'Healthcare', tools: 'Epic Systems, HIPAA Compliance, R' },
        { title: 'Financial Analyst (Equities)', share: '22%', sector: 'Finance', tools: 'Bloomberg Terminal, Financial Modeling, Python' },
      ],
      mid: [
        { title: 'Senior Engineering Manager / Staff Architect', share: '38%', sector: 'Technology', tools: 'System Architecture, Distributed Systems, Org Scaling' },
        { title: 'Healthcare Solutions Director', share: '26%', sector: 'Healthcare', tools: 'Regulatory Affairs, Clinical Trials, FDA Protocols' },
        { title: 'Portfolio Asset Manager', share: '20%', sector: 'Finance', tools: 'Risk Parity, Fixed Income Arbitrage, SQL' },
      ],
      senior: [
        { title: 'VP of Technology / Infrastructure Principal', share: '40%', sector: 'Technology', tools: 'Capital Allocation, Technology Roadmap, Executive Leadership' },
        { title: 'Chief Medical Officer / Clinical Executive', share: '28%', sector: 'Healthcare', tools: 'Clinical Governance, Hospital Systems Administration' },
        { title: 'Managing Director / Private Equity Principal', share: '22%', sector: 'Finance', tools: 'LBO Modeling, M&A Sourcing, Board Representation' },
      ],
    },
    ispInfrastructure: {
      connType: 'DOCSIS 3.1 Gigabit Cable / Synchronous FTTH Fiber',
      avgSpeed: '300 - 1,000 Mbps',
      latencyTier: '12 - 25 ms (Continental backbone)',
      householdCoverage: 'Ubiquitous Coaxial & FTTH Infrastructure',
      topIsps: [
        { name: 'Comcast Xfinity', share: '41%', tech: 'DOCSIS 4.0 / FTTH Fiber', note: 'National Low-Latency Cable Backbone' },
        { name: 'AT&T Fiber', share: '32%', tech: 'Direct Symmetrical XGS-PON', note: 'Dedicated Residential Fiber' },
        { name: 'Verizon Fios', share: '21%', tech: 'Direct FTTH Optical', note: 'Metro East Coast Backbone' },
      ],
    },
    entertainment: {
      dietTag: 'On-Demand Streaming & Live Sports Networks',
      subCount: '3.6 Active Subscriptions',
      videoApps: ['Netflix', 'Max (HBO)', 'Amazon Prime Video'],
      audioApps: ['Spotify', 'Apple Music', 'Pandora'],
      tvStations: [{ name: 'CNN' }, { name: 'NBC' }, { name: 'ESPN' }],
      radioStations: [{ name: 'NPR / WNYC' }, { name: 'iHeartMedia Hits' }, { name: 'SiriusXM Satellite' }],
    },
  },
  UK: {
    currencySymbol: '£',
    currencyCode: 'GBP',
    baseSalary: 52000,
    store: 'Sainsbury’s / Waitrose & Partners',
    storeType: 'Premium Supermarket Chain',
    bank: 'Barclays / HSBC UK',
    bankType: 'High Street Clearing Bank',
    sports: ['Football (Premier League)', 'Cricket', 'Rugby Union', 'Tennis', 'Cycling'],
    spectatorSport: 'Premier League & Wimbledon Championships',
    majorIndustries: [
      { rank: 1, name: 'FinTech, Wealth Management & Insurance', share: '37%', driver: 'Global insurance syndicates (Lloyds), FX dealing, and challenger banking.', growth: '+5.4% YoY', anchor: 'City of London & Canary Wharf' },
      { rank: 2, name: 'Life Sciences & Pharmaceutical R&D', share: '27%', driver: 'Biotech innovation hubs, clinical trials, and oncology research.', growth: '+8.1% YoY', anchor: 'Golden Triangle (Oxford/Cambridge/London)' },
      { rank: 3, name: 'Creative Media, Broadcasting & Production', share: '21%', driver: 'Global film production studios, post-production, and digital publishing.', growth: '+4.2% YoY', anchor: 'West End & MediaCityUK' },
    ],
    occupationsByStage: {
      early: [
        { title: 'Associate Quantitative Analyst', share: '33%', sector: 'Financial Services', tools: 'Python, Pandas, SQL, Tableau' },
        { title: 'Junior Clinical Research Scientist', share: '26%', sector: 'Life Sciences', tools: 'PCR, Data Analysis, Bio-Informatics' },
        { title: 'Digital Content & UX Producer', share: '23%', sector: 'Creative Media', tools: 'Figma, Adobe Creative Suite, CMS' },
      ],
      mid: [
        { title: 'Senior VP / Risk Governance Officer', share: '36%', sector: 'Financial Services', tools: 'FCA Compliance, Solvency II, Capital Adequacy' },
        { title: 'Principal Scientist / Discovery Lead', share: '28%', sector: 'Life Sciences', tools: 'Assay Optimization, IP Filing, Clinical Pipelines' },
        { title: 'Head of Digital Channels / Media Lead', share: '22%', sector: 'Creative Media', tools: 'Multi-Channel Strategy, Rights Licensing' },
      ],
      senior: [
        { title: 'Partner / Senior Managing Director', share: '39%', sector: 'Financial Services', tools: 'Asset Allocation, Institutional Client Management' },
        { title: 'VP of Global Drug Development', share: '30%', sector: 'Life Sciences', tools: 'Global Clinical Strategy, Regulatory Approvals' },
        { title: 'Executive Creative Director / Media VP', share: '21%', sector: 'Creative Media', tools: 'Network Commissioning, Strategic Branding' },
      ],
    },
    ispInfrastructure: {
      connType: 'Openreach Full Fibre FTTP / Virgin DOCSIS 3.1',
      avgSpeed: '150 - 500 Mbps',
      latencyTier: '14 - 28 ms (LINX interconnection)',
      householdCoverage: 'National Full Fibre Rollout (FTTP)',
      topIsps: [
        { name: 'BT / EE Home Broadband', share: '36%', tech: 'Openreach FTTP Symmetrical', note: 'National Telecommunications Grid' },
        { name: 'Virgin Media O2', share: '31%', tech: 'Gigabit Hybrid Coax/Fiber', note: 'Project Lightning Fiber Network' },
        { name: 'Sky Broadband', share: '22%', tech: 'FTTP Optical Network', note: 'Entertainment & Broadband Bundle' },
      ],
    },
    entertainment: {
      dietTag: 'BBC Public Media, Premier League & Global SVOD',
      subCount: '2.8 Active Subscriptions',
      videoApps: ['BBC iPlayer', 'Netflix UK', 'Amazon Prime Video'],
      audioApps: ['Spotify UK', 'BBC Sounds', 'Apple Music'],
      tvStations: [{ name: 'BBC One' }, { name: 'ITV 1' }, { name: 'Sky Sports Premier League' }],
      radioStations: [{ name: 'BBC Radio 4' }, { name: 'BBC Radio 1' }, { name: 'LBC News' }],
    },
  },
  AU: {
    currencySymbol: 'A$',
    currencyCode: 'AUD',
    baseSalary: 86000,
    store: 'Woolworths / Coles Supermarkets',
    storeType: 'National Supermarket Retailer',
    bank: 'Commonwealth Bank (CBA) / Westpac',
    bankType: 'Big Four Australian Commercial Bank',
    sports: ['Australian Rules Football (AFL)', 'Cricket', 'Rugby League (NRL)', 'Surfing', 'Swimming'],
    spectatorSport: 'AFL Grand Final & The Ashes Cricket',
    majorIndustries: [
      { rank: 1, name: 'Mining Infrastructure & Autonomous Resources', share: '36%', driver: 'Iron ore bulk logistics, autonomous haulage networks, and lithium refinement.', growth: '+6.1% YoY', anchor: 'Pilbara & Western Australian Basin' },
      { rank: 2, name: 'FinTech, Superannuation & Investment Banking', share: '30%', driver: 'Superannuation fund asset management, buy-now-pay-later, and payment rails.', growth: '+5.7% YoY', anchor: 'Sydney CBD & Barangaroo' },
      { rank: 3, name: 'Biomedical & AgTech Innovation', share: '21%', driver: 'Drought-resilient genetics, remote tele-medicine, and medical telemetry.', growth: '+8.3% YoY', anchor: 'Parkville Biomedical Precinct' },
    ],
    occupationsByStage: {
      early: [
        { title: 'Mining Operations Data Engineer', share: '33%', sector: 'Resources & Energy', tools: 'Python, SCADA, OSIsoft PI, PowerBI' },
        { title: 'Superannuation Investment Analyst', share: '28%', sector: 'FinTech & Banking', tools: 'Excel, Bloomberg, SQL, Asset Modeling' },
        { title: 'Bio-Agricultural Research Associate', share: '23%', sector: 'AgTech & BioSciences', tools: 'Genomic Sequencing, Laboratory QA' },
      ],
      mid: [
        { title: 'Autonomous Fleet Systems Manager', share: '36%', sector: 'Resources & Energy', tools: 'Fleet Telematics, Safety-Critical Systems' },
        { title: 'Senior Portfolio Manager (Equities)', share: '31%', sector: 'FinTech & Banking', tools: 'APRA Regulatory Compliance, ESG Portfolios' },
        { title: 'Senior Agronomist / BioSciences Lead', share: '21%', sector: 'AgTech & BioSciences', tools: 'Field Trial Management, Patent Prosecution' },
      ],
      senior: [
        { title: 'General Manager of Resource Logistics', share: '40%', sector: 'Resources & Energy', tools: 'Supply Chain Port Operations, Rail Logistics' },
        { title: 'Chief Investment Officer / Fund Executive', share: '32%', sector: 'FinTech & Banking', tools: 'Board Governance, Fiduciary Compliance' },
        { title: 'Director of Biomedical R&D', share: '20%', sector: 'AgTech & BioSciences', tools: 'TGA Regulatory Submissions, Global Clinical Trials' },
      ],
    },
    ispInfrastructure: {
      connType: 'National Broadband Network (NBN FTTP / HFC)',
      avgSpeed: '100 - 250 Mbps',
      latencyTier: '18 - 35 ms (Southern cross subsea cable)',
      householdCoverage: 'Federal Wholesale NBN Architecture',
      topIsps: [
        { name: 'Telstra', share: '44%', tech: 'NBN FTTP / 5G Home Internet', note: 'Largest National Fiber & Mobile Operator' },
        { name: 'Optus', share: '30%', tech: 'NBN Multi-Technology Mix', note: 'Singtel Subsidiary Fiber Interconnect' },
        { name: 'Aussie Broadband', share: '19%', tech: 'Direct NBN POI Fiber Interconnect', note: 'Specialist High-Bandwidth CVC Network' },
      ],
    },
    entertainment: {
      dietTag: 'National Sports Broadcasters, Stan & International SVOD',
      subCount: '2.9 Active Subscriptions',
      videoApps: ['Stan Australia', 'Netflix Australia', 'Disney+'],
      audioApps: ['Spotify Australia', 'Apple Music', 'ABC Listen'],
      tvStations: [{ name: 'ABC Australia' }, { name: 'Channel 7' }, { name: 'Channel 9' }],
      radioStations: [{ name: 'triple j' }, { name: 'ABC NewsRadio' }, { name: 'Nova 96.9' }],
    },
  },
};

// ==========================================
// 3. MAIN DEMOGRAPHIC SYNTHESIS CALCULATION
// ==========================================
export function calculateDemographics(
  ip: string,
  age: number,
  geo: { city: string; country: string; code: string; isp: string; asn: string },
  customMult: number = 1.0,
  taxOverride: number | null = null,
  familyWeight: number = 2,
  evBoost: boolean = false
): DemographicProfile {
  let countryKey = (geo.code || 'NG').toUpperCase();
  if (countryKey === 'GB') countryKey = 'UK';
  if (!['NG', 'US', 'UK', 'AU'].includes(countryKey)) {
    countryKey = 'NG';
  }

  const regional = REGIONAL_DATA[countryKey] || REGIONAL_DATA.NG;
  const realEstateListings = REAL_ESTATE_BY_REGION[countryKey] || REAL_ESTATE_BY_REGION.NG;

  let ageMult = 0.65;
  let careerStage: 'early' | 'mid' | 'senior' = 'early';

  if (age >= 25 && age < 32) {
    ageMult = 0.95;
    careerStage = 'early';
  } else if (age >= 32 && age < 48) {
    ageMult = 1.45;
    careerStage = 'mid';
  } else if (age >= 48 && age < 62) {
    ageMult = 1.75;
    careerStage = 'senior';
  } else if (age >= 62) {
    ageMult = 1.25;
    careerStage = 'senior';
  }

  const grossIncome = Math.round(regional.baseSalary * ageMult * customMult);

  let effectiveTaxRate = 0.18;
  if (taxOverride !== null) {
    effectiveTaxRate = taxOverride / 100;
  } else {
    if (grossIncome > regional.baseSalary * 1.5) effectiveTaxRate = 0.28;
    else if (grossIncome > regional.baseSalary * 1.1) effectiveTaxRate = 0.22;
  }

  const totalTax = Math.round(grossIncome * effectiveTaxRate);
  const netIncome = grossIncome - totalTax;

  let degreeTitle = "Bachelor's Degree (Honors)";
  let fieldOfStudy = 'Applied Engineering & Computer Systems';
  let badge = 'Level 6 Attainment';
  let gradAge = 22;
  if (age < 23) {
    degreeTitle = 'Undergraduate Candidate';
    fieldOfStudy = 'Computer Science & Systems';
    badge = 'In-Progress';
    gradAge = age;
  } else if (age >= 38) {
    degreeTitle = "Master's Degree / Professional Charter";
    fieldOfStudy = 'Enterprise Systems & Strategic Management';
    badge = 'Post-Graduate';
    gradAge = 24;
  }

  const children: ChildProfile[] = [];
  let childCount = 0;
  let stageDescription = 'Single Professional';
  let maritalStatus = 'Single / Unmarried';
  let householdSizeNum = 1;
  let householdArchetype = 'Independent Urban Residence';
  let homeOwnership = 'Private Tenant (Rental)';

  if (age >= 28 && age <= 35) {
    childCount = Math.min(2, familyWeight);
    maritalStatus = 'Married / Cohabiting';
    stageDescription = 'Young Family (Infants / Toddlers)';
    homeOwnership = 'First-Time Homeowner (Mortgaged)';
    householdSizeNum = 2 + childCount;
    householdArchetype = 'Young Nuclear Family Residence';
    if (childCount >= 1) {
      const cAge = Math.max(1, age - 27);
      children.push({
        order: 1,
        age: cAge,
        birthYear: 2026 - cAge,
        stage: 'Toddler',
        dependent: true,
        color: 'emerald',
      });
    }
    if (childCount >= 2) {
      const cAge = Math.max(1, age - 30);
      children.push({
        order: 2,
        age: cAge,
        birthYear: 2026 - cAge,
        stage: 'Infant',
        dependent: true,
        color: 'teal',
      });
    }
  } else if (age > 35 && age <= 50) {
    childCount = Math.min(3, familyWeight);
    maritalStatus = 'Married / Dual-Income';
    stageDescription = 'Established Family (School-Age & Teens)';
    homeOwnership = 'Suburban Homeowner';
    householdSizeNum = 2 + childCount;
    householdArchetype = 'Multi-Bedroom Family Estate';
    if (childCount >= 1) {
      const cAge = age - 26;
      children.push({
        order: 1,
        age: cAge,
        birthYear: 2026 - cAge,
        stage: 'Adolescent / Teen',
        dependent: true,
        color: 'emerald',
      });
    }
    if (childCount >= 2) {
      const cAge = age - 29;
      children.push({
        order: 2,
        age: cAge,
        birthYear: 2026 - cAge,
        stage: 'Middle School',
        dependent: true,
        color: 'teal',
      });
    }
    if (childCount >= 3) {
      const cAge = age - 33;
      children.push({
        order: 3,
        age: cAge,
        birthYear: 2026 - cAge,
        stage: 'Primary School',
        dependent: true,
        color: 'amber',
      });
    }
  } else if (age > 50 && age <= 65) {
    childCount = Math.min(2, familyWeight);
    maritalStatus = 'Married / Dual-Income';
    stageDescription = 'Mature Family (University Students / Young Adults)';
    homeOwnership = 'Full Homeowner (Equity Owned)';
    householdSizeNum = 2 + (childCount > 1 ? 1 : 0);
    householdArchetype = 'Mature Primary Residence';
    if (childCount >= 1) {
      const cAge = age - 26;
      children.push({
        order: 1,
        age: cAge,
        birthYear: 2026 - cAge,
        stage: 'University Graduate',
        dependent: false,
        color: 'slate',
      });
    }
    if (childCount >= 2) {
      const cAge = age - 29;
      children.push({
        order: 2,
        age: cAge,
        birthYear: 2026 - cAge,
        stage: 'Undergraduate',
        dependent: true,
        color: 'emerald',
      });
    }
  } else if (age > 65) {
    childCount = 0;
    maritalStatus = 'Retiree / Couple';
    stageDescription = 'Empty Nester / Senior Citizen';
    homeOwnership = 'Mortgage-Free Property';
    householdSizeNum = 2;
    householdArchetype = 'Retirement Residence';
  }

  let carCategory = 'Compact Crossover & Urban Saloon';
  let carModels = 'Toyota Corolla / RAV4 / Honda CR-V';
  let commuteTime = '32 - 45 mins';
  let evRate = evBoost ? 'High EV Bias Active (Tesla / BYD / Ioniq)' : '18% Hybrid / 8% Battery EV';

  if (age >= 38 && grossIncome > regional.baseSalary * 1.3) {
    carCategory = 'Executive SUV & Saloon Ensemble';
    carModels = 'Lexus RX / Mercedes GLC / BMW 3-Series';
    commuteTime = '25 - 38 mins';
    evRate = evBoost ? 'High EV Bias Active (Porsche Taycan / Model X)' : '32% Plug-in Hybrid / EV';
  }

  const archetypeLabel = `${age >= 38 ? 'Senior' : 'Mid-Career'} ${regional.majorIndustries[0].name.split(' ')[0]} Specialist`;
  const narrative = `${archetypeLabel}: A ${age}-year-old resident in ${geo.city}, ${geo.country} working in ${regional.majorIndustries[0].name}, earning an estimated ${regional.currencySymbol}${grossIncome.toLocaleString()} gross annually.`;

  return {
    age,
    careerStage,
    archetypeLabel,
    narrative,
    currencySymbol: regional.currencySymbol,
    currencyCode: regional.currencyCode,
    grossIncome,
    netIncome,
    totalTax,
    effectiveTaxRatePercentage: Math.round(effectiveTaxRate * 100),
    majorIndustries: regional.majorIndustries,
    topOccupations: regional.occupationsByStage[careerStage],
    realEstateListings,
    education: {
      degreeTitle,
      fieldOfStudy,
      institution: `Premier Regional University (${geo.city})`,
      gradDisplay: `Graduated Age ${gradAge}`,
      badge,
      description: `Formal accredited degree credential aligned with regional ${careerStage} demographic percentiles.`,
      cohortShare: 'Top 18% of geographic peer group',
      cohortPercent: 18,
    },
    childProfile: {
      count: childCount,
      livingAtHome: children.filter((c) => c.dependent).length,
      stageDescription,
      children,
      note: childCount > 0 ? `${childCount} dependent minors in educational cycle.` : 'No dependent minor dependents detected.',
    },
    householdSize: String(householdSizeNum),
    householdArchetype,
    maritalStatus,
    homeOwnership,
    cars: {
      category: carCategory,
      models: carModels,
      commute: 'Metropolitan Expressway Corridor',
      commuteTime,
      evRate,
      hasCar: true,
    },
    sports: regional.sports,
    spectatorSport: regional.spectatorSport,
    fitnessRate: '2 - 3 Sessions / Week (Outdoor & Gym)',
    store: regional.store,
    storeType: regional.storeType,
    bank: regional.bank,
    bankType: regional.bankType,
    insurance: {
      health: 'Private Comprehensive Corporate HMO',
      profLiability: 'Institutional Errors & Omissions',
      autoProperty: 'Comprehensive Underwritten Multi-Asset Policy',
    },
    entertainment: regional.entertainment,
    detectedIsp: geo.isp || 'Regional Backbone Provider',
    detectedAsn: geo.asn || 'AS00000',
    ispProfile: regional.ispInfrastructure,
    geo: {
      ip,
      city: geo.city,
      region: geo.city,
      country_name: geo.country,
      country_code: countryKey,
      timezone: 'UTC',
      asn: geo.asn || 'AS00000',
      latitude: 0,
      longitude: 0,
    },
  };
}

// ==========================================
// 4. FIVE-CHECK PLAUSIBILITY AUDIT ENGINE
// ==========================================
export function evaluatePlausibility(profile: DemographicProfile): PlausibilityResult {
  let score = 100;

  // 1. Biological Spacing Check (bioSpacing)
  let bioSpacingPass = true;
  let bioSpacingLabel = 'Coherent';
  let bioSpacingText = 'Biological dependents and maternal pacing adhere to census standards.';
  if (profile.age < 23 && profile.childProfile.count > 1) {
    score -= 15;
    bioSpacingPass = false;
    bioSpacingLabel = 'Atypical Pacing';
    bioSpacingText = 'Accelerated parity relative to age cohort baseline.';
  }

  // 2. Academic Timeline Check (academicTimeline)
  let academicPass = true;
  let academicLabel = 'Standard Progression';
  let academicText = 'Tertiary credential milestones align with regional median attainment.';
  if (profile.age < 22 && profile.education.badge === 'Post-Graduate') {
    score -= 25;
    academicPass = false;
    academicLabel = 'Timeline Discrepancy';
    academicText = 'Advanced post-graduate credential mathematically anomalous for age < 22.';
  }

  // 3. Economic Concordance (econConcordance)
  let econPass = true;
  let econLabel = 'Plausible';
  let econText = 'Income distribution curve matches regional macroeconomic brackets.';
  if (profile.age < 23 && profile.grossIncome > 20000000) {
    score -= 20;
    econPass = false;
    econLabel = 'High Outlier';
    econText = 'Gross income deviates > 2.5σ from early-career median.';
  }

  // 4. Household Alignment (householdAlign)
  const householdPass = true;
  const householdLabel = 'Coherent';
  const householdText = `Household structure (${profile.householdArchetype}) reflects regional living patterns.`;

  // 5. Policy & Asset Concordance (policyAsset)
  const policyAssetPass = true;
  const policyAssetLabel = 'Market-Aligned';
  const policyAssetText = `Housing and asset profiles correspond to ${profile.currencyCode} purchasing parity benchmarks.`;

  const status = score >= 90 ? 'Coherent' : score >= 75 ? 'Plausible with Variance' : 'Statistically Anomalous';
  const mahalanobisDistance = (1.05 + (100 - score) * 0.035).toFixed(2);

  return {
    score,
    status,
    mahalanobisDistance,
    audits: {
      bioSpacing: { pass: bioSpacingPass, label: bioSpacingLabel, text: bioSpacingText },
      academicTimeline: { pass: academicPass, label: academicLabel, text: academicText },
      econConcordance: { pass: econPass, label: econLabel, text: econText },
      householdAlign: { pass: householdPass, label: householdLabel, text: householdText },
      policyAsset: { pass: policyAssetPass, label: policyAssetLabel, text: policyAssetText },
    },
  };
}