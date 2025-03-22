"use client";

// make headings interface
// specific to Amazon?

import { useRouter } from 'next/navigation';
import { products } from '@/types/products';

interface TableProps {
  headings: string[];
  rows?: string[][];
  visibleColumns?: number[];
}

// this app can be applied to business manufacturing operations (recycling raw materials)
export default function Table({ headings, rows = products, visibleColumns = [1, 4] }: TableProps) {
  const router = useRouter();
  const handleClick = (serialNumber: string) => {
    router.push(`/refurbish/${serialNumber}`);
  }

  return (
    <div className="p-4 max-w-7xl mx-auto overflow-x-auto">
      <table 
        className="bg-amber-200 rounded-lg w-full border-collapse border-amber-300 divide-y"
      >
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th 
                key={heading} 
                className={`text-left px-2 sm:px-4 py-2 text-xs sm:text-base whitespace-nowrap ${
                  !visibleColumns.includes(index) ? 'hidden sm:table-cell' : ''
                }`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="hover:bg-amber-300 cursor-pointer" onClick={() => handleClick(row[0])}> 
              {row.slice(0, -1).map((cell, index) => (
                <td 
                  key={cell} 
                  className={`text-left px-2 sm:px-4 py-2 text-xs sm:text-base whitespace-nowrap ${
                    !visibleColumns.includes(index) ? 'hidden sm:table-cell' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
