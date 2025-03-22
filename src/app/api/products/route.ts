import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    const filePath = join(process.cwd(), "src", "types", "products.ts");
    
    // Read current file content
    const content = await readFile(filePath, 'utf-8');
    
    // Find the products array and insert new product
    const productsMatch = content.match(/export const products = \[([\s\S]*?)\];/);
    if (!productsMatch) {
      throw new Error("Could not find products array");
    }

    const currentProducts = productsMatch[1];
    const newProduct = `\n  ${JSON.stringify(product)},${currentProducts}`;
    
    // Replace the products array with updated content
    const updatedContent = content.replace(
      /export const products = \[([\s\S]*?)\];/,
      `export const products = [${newProduct}];`
    );

    // Write back to file
    await writeFile(filePath, updatedContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: "Error adding product" },
      { status: 500 }
    );
  }
} 