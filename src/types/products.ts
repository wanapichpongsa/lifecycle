export const products = [
  ["00000001", "iPhone 11", "Apple", "2020-01-01", "1 month left", "iphone.jpg"],
  ["00000002", "Macbook M2", "Apple", "2024-01-01", "4 years 10 months left", "m2.jpg"],
  ["00000003", "NVIDIA Blackwell GPU", "NVIDIA", "2025-01-01", "4 years left", "None"],
  ["00000004", "Projector", "ClockoWe", "2022-01-01", "1 month left", "projector.jpg"]
];

export const defaultHeadings = ["Serial Number", "Name", "Supplier", "Manufacture Date", "Expected Lifespan"];

export function getProduct(id: string): string[] | undefined {
  return products.find((row) => row[0] === id);
} 