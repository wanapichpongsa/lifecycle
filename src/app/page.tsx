"use client";

import { useState } from "react";
import Table from "@/components/Table";
import AddProductForm from "@/components/AddProductForm";
import { defaultHeadings, products as initialProducts } from "@/types/products";

export default function Home() {
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = (newProduct: string[]) => {
    setProducts([...products, newProduct]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-900 py-4 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6">Your Products</h1>
        <AddProductForm onAdd={handleAddProduct} />
        <Table headings={defaultHeadings} rows={products} />
      </div>
    </main>
  );
}
