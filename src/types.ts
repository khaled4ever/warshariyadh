export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'diagnostics' | 'mechanics' | 'electric' | 'chassis';
  details: string[];
}

export interface Symptom {
  id: string;
  text: string;
  possibleCauses: string[];
  recommendedServiceId: string;
}

export interface RiyadhRegion {
  id: string;
  name: string;
  neighborhoods: string[];
  arrivalTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  car: string;
  rating: number;
  review: string;
  region: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
