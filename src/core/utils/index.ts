import fs from "fs";
import { prisma } from "../services/prisma-client";
import { derivAPI } from "../services/deriv-api-connection";

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
  const jsonFileName = "updated_data.json";
  const jsonString = fs.readFileSync(jsonFileName, "utf8");
  const jsonData = JSON.parse(jsonString);

  for (const item of jsonData) {
    await prisma.activeSymbol.create({
      data: item,
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

export async function updateJSONWithActiveSymbols(activeSymbols: any) {
  const filePath = "synthetic_symbols.json"; // Replace with your JSON file path

  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Modify the JSON data based on active symbols
    const updatedData = jsonData.map((jsonItem: any) => {
      const matchingSymbol = activeSymbols.find((activeSymbol: any) => activeSymbol.symbol === jsonItem.symbol);
      if (matchingSymbol) {
        // Convert numeric values to boolean
        const exchangeIsOpen = matchingSymbol.exchangeIsOpen === 1;
        const isTradingSuspended = matchingSymbol.isTradingSuspended === 1;
        const allowForwardStarting = matchingSymbol.allowForwardStarting === 1;

        // Create a modified JSON object with the desired fields
        return {
          id: jsonItem.id,
          allowForwardStarting: matchingSymbol.allowForwardStarting === 1 ? true : false,
          delayAmount: matchingSymbol.delayAmount,
          displayName: matchingSymbol.displayName,
          exchangeIsOpen: matchingSymbol.exchangeIsOpen === 1 ? true : false,
          exchangeName: matchingSymbol.exchangeName,
          intradayIntervalMinutes: matchingSymbol.intradayIntervalMinutes,
          isTradingSuspended: matchingSymbol.isTradingSuspended === 1 ? true : false,
          market: matchingSymbol.market,
          marketDisplayName: matchingSymbol.marketDisplayName,
          pip: matchingSymbol.pip,
          quotedCurrencySymbol: matchingSymbol.quotedCurrencySymbol,
          spot: matchingSymbol.spot,
          spotAge: matchingSymbol.spotAge,
          spotTime: matchingSymbol.spotTime,
          submarket: matchingSymbol.submarket,
          submarketDisplayName: matchingSymbol.submarketDisplayName,
          readableName: jsonItem.readableName,
          description: jsonItem.description,
          symbol: jsonItem.symbol,
          symbolType: matchingSymbol.symbolType,
        };
      }
      return jsonItem; // If no matching symbol found, keep the original JSON item
    });

    // Write the updated data back to the JSON file
    fs.writeFileSync("updated_data.json", JSON.stringify(updatedData, null, 2), "utf8");
    console.log("JSON data has been written to the file successfully.");
  } catch (error) {
    console.error("Error reading or writing JSON data:", error);
  }
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
