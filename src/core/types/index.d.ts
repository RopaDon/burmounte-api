import { Request } from "express";

export interface ServiceHubRequest extends Request {
  user?: any; // Define the 'user' property with the desired type
}

export interface ActionResult {
  action: string;
  actionRequired?: boolean;
}
export interface Audit {
  tableName: string;
  recordId: number;
  action: string;
  timestamp: Date;
  adminId: number;
  oldValue?: string | null;
  newValue?: string | null;
}

export interface Country {
  name: string;
  code: string;
}

export interface Province {
  name: string;
  code: string;
  country: string;
}
