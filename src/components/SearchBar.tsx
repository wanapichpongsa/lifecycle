"use client";

import { Search } from 'lucide-react';

export default function SearchBar({ defaultValue }: { defaultValue: string }) {
  return (
    <div className="relative">
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder="Search refurbishers..."
        className="w-full h-12 px-4 bg-white text-sm text-zinc-900 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
    </div>
  );
} 