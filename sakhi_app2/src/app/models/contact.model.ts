// export interface ContactPhone {
//   id: number;
//   phoneNumber: string;
//   displayOrder: number;
// }

// export interface ContactEmail {
//   id: number;
//   email: string;
//   displayOrder: number;
// }

// export interface OfficeHour {
//   id: number;
//   dayLabel: string;
//   timings: string | null;
//   closed: boolean;
//   displayOrder: number;
// }

// export interface ContactPage {
//   phones: ContactPhone[];
//   emails: ContactEmail[];
//   officeHours: OfficeHour[];
//   address: string;
//   whatsappEnquiryNumber: string;
// }

// // ============================================================
// // REQUEST MODELS
// // ============================================================

// export interface ContactPhoneRequest {
//   phoneNumber: string;
//   displayOrder: number;
// }

// export interface ContactEmailRequest {
//   email: string;
//   displayOrder: number;
// }

// export interface OfficeHourRequest {
//   dayLabel: string;
//   timings: string | null;
//   closed: boolean;
//   displayOrder: number;
// }

// export interface ContactInfoRequest {
//   address: string;
//   whatsappEnquiryNumber: string;
// }

export interface ContactPhone {
  id: number;
  phoneNumber: string;
  displayOrder: number;
}

export interface ContactEmail {
  id: number;
  email: string;
  displayOrder: number;
}

export interface OfficeHour {
  id: number;
  dayLabel: string;
  timings: string | null;
  closed: boolean;
  displayOrder: number;
}

export interface ContactPage {
  phones: ContactPhone[];
  emails: ContactEmail[];
  officeHours: OfficeHour[];
  address: string;
  whatsappEnquiryNumber: string;
}


// ===============================
// REQUEST MODELS
// ===============================

export interface ContactPhoneRequest {
  phoneNumber: string;
  displayOrder: number;
}

export interface ContactEmailRequest {
  email: string;
  displayOrder: number;
}

export interface OfficeHourRequest {
  dayLabel: string;
  timings: string | null;
  closed: boolean;
  displayOrder: number;
}

export interface ContactInfoRequest {
  address: string;
  whatsappEnquiryNumber: string;
}

export interface DashboardStats {
  activeServices: number;
  totalCategories: number;
}