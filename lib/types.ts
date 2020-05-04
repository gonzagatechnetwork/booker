export interface OfficeHoursRequest {
  author: string;
  body: string;
  email: string;
  id: string;
  claimedBy?: string;
}

export interface Claim {
  author: string;
  email: string;
  requestID: string;
}

export interface FaunaResponse<T> {
  ref: any;
  ts: number;
  data?: T;
}
