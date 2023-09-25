import { Request } from "express";

export interface ServiceHubRequest extends Request {
  user?: any; // Define the 'user' property with the desired type
}
export type ActiveSymbolRequestType = "forex" | "derived" | "cryptocurrencies";

export interface ActiveSymbolMetadata {
  id: number;
  name?: string;
  decimal: number;
  symbol: string;
  description?: string;
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

export interface NewsArticle {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  imageUrl: string;
  language: string;
  publishedAt: string;
  source: string;
  categories: string[];
  relevanceScore: number;
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

// User interface
export interface DerivUser {
  authorize?: string;
  account_list?: Account[];
  balance?: number;
  country?: string;
  currency?: string;
  email?: string;
  full_name?: string;
  is_virtual?: number;
  landing_company_full_name?: string;
  landing_company_name?: string;
  linked_to?: string[];
  local_currencies?: { [key: string]: LocalCurrency };
  loginid?: string;
  preferred_language?: string;
  scopes?: string[];
  upgradeable_landing_companies?: string[];
  user_id?: number;
}

// Account interface
interface Account {
  account_category?: string;
  account_type?: string;
  created_at?: number;
  currency?: string;
  is_disabled?: number;
  is_virtual?: number;
  landing_company_name?: string;
  linked_to?: string[];
  loginid?: string;
}

// LocalCurrency interface
interface LocalCurrency {
  fractional_digits?: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
