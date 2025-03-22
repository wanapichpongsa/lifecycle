"use client";

// make headings interface
// specific to Amazon?

import { useRouter } from 'next/navigation';

// this app can be applied to business manufacturing operations (recycling raw materials)
export default function Table() {
  const headings: string[] = ["Serial Number", "Name", "Supplier", "Manufacture Date", "Expected Lifespan"];
  const rows: string[][] = [
    ["00000001", "iPhone 11", "Apple", "2020-01-01", "1 month left"],
    ["00000002", "Macbook M2", "Apple", "2024-01-01", "4 years 10 months left"],
    ["00000003", "NVIDIA Blackwell GPU", "NVIDIA", "2025-01-01", "4 years left"],
    ["00000004", "Projector", "ClockoWe", "2022-01-01", "1 month left"]
  ];

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
                  index !== 1 && index !== 4 ? 'hidden sm:table-cell' : ''
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
              {row.map((cell, index) => (
                <td 
                  key={cell} 
                  className={`text-left px-2 sm:px-4 py-2 text-xs sm:text-base whitespace-nowrap ${
                    index !== 1 && index !== 4 ? 'hidden sm:table-cell' : ''
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
