export interface ChildProfile {
  age: number;
  stage: 'Infant' | 'Toddler' | 'School-Age' | 'Teenager' | 'Young Adult';
  residing: boolean;
}

export interface IndustryProfile {
  title: string;
  share: string;
  driver: string;
  anchor: string;
}

export interface OccupationProfile {
  title: string;
  sector: string;
  share: string;
  responsibilities: string;
}

export interface DemographicProfile {
  ip: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  asn: string;
  age: number;
  education: {
    degree: string;
    field: string;
    institution: string;
    gradYear: number;
  };
  industries: IndustryProfile[];
  occupations: OccupationProfile[];
  household: {
    marital: string;
    size: number;
    childrenCount: number;
    children: ChildProfile[];
    tenure: string;
  };
  finance: {
    gross: string;
    net: string;
    effectiveTax: number;
  };
  mobility: {
    carClass: string;
    model: string;
    evShare: string;
  };
  telecom: {
    connType: string;
    topIsps: Array<{ name: string; share: string; tech: string }>;
  };
  media: {
    svod: string[];
    audio: string[];
    tv: string[];
    radio: string[];
  };
}

export interface PlausibilityResult {
  score: number;
  rating: string;
  anomalies: string[];
  bioPass: boolean;
  academicPass: boolean;
  economicPass: boolean;
  housingPass: boolean;
}