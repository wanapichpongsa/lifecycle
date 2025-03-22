"use client";

import Table from "@/components/Table";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-amber-100 text-zinc-900 gap-4">
      <h1 className="text-4xl font-bold">Your Products</h1>

      <div className="">
        <Table />
      </div>
      
    </main>
  );
}
