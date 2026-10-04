export interface ServiceItem {
  id: number;
  title: string;
  displayOrder: number;
  active: boolean;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  displayOrder: number;
  active: boolean;
  items: ServiceItem[];
  expanded: boolean;
}

export interface ServiceCategory {
  id: number;
  title: string;
  description: string;
  displayOrder: number;
  active: boolean;
  services: Service[];
}

