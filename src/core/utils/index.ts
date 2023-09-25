import fs from "fs";
import { prisma } from "../services/prisma-client";

export function pascalToCamel<T>(object: any): T {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(pascalToCamel) as T;
  }

  return Object.entries(object).reduce((camelObject: any, [key, value]: any) => {
    const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
    camelObject[camelKey] = pascalToCamel(value);
    return camelObject;
  }, {}) as T;
}

export function snakeToCamel<T>(obj: any): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item)) as any;
  }

  return Object.keys(obj).reduce((acc: any, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()) as any;
    const value = obj[key];
    acc[camelKey] = snakeToCamel(value);
    return acc;
  }, {});
}

export async function populateSymbols() {
  const jsonFileName = "synthetic_symbols.json";
  const jsonString = fs.readFileSync(jsonFileName, "utf8");
  const jsonData = JSON.parse(jsonString);

  for (const item of jsonData) {
    await prisma.activeSymbols.create({
      data: {
        description: item.description,
        market: item.market,
        symbol: item.symbol,
        decimalValue: item.decimal,
        name: item.name,
        submarket: item.submarket,
        marketDisplayName: item.marketDisplayName,
        readableName: item.readableName,
      },
    });
  }
}

export function snakeToCamelCase(str: string): string {
  return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}

export function hasChanges(oldObj: any, newObj: any): boolean {
  for (const key in newObj) {
    if (oldObj[key] !== newObj[key]) {
      return true;
    }
  }
  return false;
}

export function getDateByTimeString(datePeriod: string) {
  let startDate: Date;
  let endDate: Date;
  const currentDate = new Date();

  switch (datePeriod) {
    case "Today":
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      break;
    case "7 Days":
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      endDate.setDate(endDate.getDate() + 1);
      break;
    case "12 Months":
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setDate(startDate.getDate() + 1);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      endDate.setDate(endDate.getDate() + 1);
      break;
    case "Last Month":
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      endDate.setDate(endDate.getDate() + 1);
      break;
    default:
      startDate = new Date();
      endDate = new Date();
      break;
  }

  return { startDate, endDate };
}
