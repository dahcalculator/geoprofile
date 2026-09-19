export interface ChildProfile {
  order: number;
  age: number;
  birthYear: number;
  stage: string;
  dependent: boolean;
  color: string;
}

export interface IndustryProfile {
  rank: number;
  name: string;
  share: string;
  driver: string;
  growth: string;
  anchor: string;
}

export interface OccupationProfile {
  title: string;
  sector: string;
  share: string;
  tools: string;
}

export interface IspEntry {
  name: string;
  share: string;
  tech: string;
  tier: string;
  note: string;
}

export interface BroadcastStation {
  name: string;
  type?: string;
  genre?: string;
}

export interface DemographicProfile {
  geo: {
    ip: string;
    city: string;
    region: string;
    country_name: string;
    country_code: string;
    timezone: string;
    asn: string;
    latitude: number;
    longitude: number;
  };
  age: number;
  archetypeLabel: string;
  narrative: string;
  detectedIsp: string;
  detectedAsn: string;
  currencySymbol: string;
  currencyCode: string;
  grossIncome: number;
  netIncome: number;
  totalTax: number;
  effectiveTaxRatePercentage: number;
  careerStage: string;
  majorIndustries: IndustryProfile[];
  topOccupations: OccupationProfile[];
  education: {
    degreeTitle: string;
    badge: string;
    fieldOfStudy: string;
    institution: string;
    gradDisplay: string;
    cohortShare: string;
    cohortPercent: number;
    description: string;
  };
  childProfile: {
    count: number;
    livingAtHome: number;
    children: ChildProfile[];
    stageDescription: string;
    note: string;
  };
  householdSize: string;
  maritalStatus: string;
  homeOwnership: string;
  householdArchetype: string;
  cars: {
    category: string;
    models: string;
    evRate: string;
    commute: string;
    commuteTime: string;
    hasCar: boolean;
  };
  sports: string[];
  spectatorSport: string;
  fitnessRate: string;
  store: string;
  storeType: string;
  bank: string;
  bankType: string;
  insurance: {
    health: string;
    profLiability: string;
    autoProperty: string;
  };
  ispProfile: {
    connType: string;
    avgSpeed: string;
    latencyTier: string;
    householdCoverage: string;
    topIsps: IspEntry[];
  };
  entertainment: {
    dietTag: string;
    subCount: string;
    videoApps: string[];
    audioApps: string[];
    tvStations: BroadcastStation[];
    radioStations: BroadcastStation[];
  };
}

export interface PlausibilityAuditItem {
  pass: boolean;
  label: string;
  text: string;
}

export interface PlausibilityResult {
  score: number;
  status: string;
  mahalanobisDistance: string;
  audits: {
    bioSpacing: PlausibilityAuditItem;
    academicTimeline: PlausibilityAuditItem;
    econConcordance: PlausibilityAuditItem;
    householdAlign: PlausibilityAuditItem;
    policyAsset: PlausibilityAuditItem;
  };
}