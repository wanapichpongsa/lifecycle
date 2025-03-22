"use client";

import { Refurbisher } from '@/types';

interface RefurbisherListProps {
  refurbishers: Refurbisher[];
  productName: string;
  manufacturer: string;
}

export default function RefurbisherList({ refurbishers, productName, manufacturer }: RefurbisherListProps) {
  const getQuote = async (refurbisher: string) => {
    const encodedRefurbisher = encodeURIComponent(refurbisher);
    const encodedProduct = encodeURIComponent(productName);
    const response = await fetch(`/api/quote?refurbisher=${encodedRefurbisher}&product=${encodedProduct}`);
    const data = await response.json();
    return data;
  }

  return (
    <div className="w-full max-w-5xl flex flex-col gap-4">
      {refurbishers
        .filter(refurbisher => 
          refurbisher.deals.some(deal => 
            deal.product.includes(productName) &&
            refurbisher.name !== manufacturer
          )
        )
        .map(refurbisher => (
          <div key={refurbisher.name} className="flex justify-between w-full p-4 bg-white rounded-lg shadow hover:bg-zinc-50 transition-colors">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">{refurbisher.name}</h2>
              <p>Matching deals:</p>
              {refurbisher.deals
                .filter(deal => deal.product.includes(productName))
                .map(deal => (
                  <div key={deal.product} className="ml-4">
                    - {deal.product}: £{deal.price}
                  </div>
                ))
              }
            </div>
            <button onClick={() => getQuote(refurbisher.name)} className="bg-blue-600 hover:bg-blue-700 text-zinc-100 px-4 py-1.5 my-auto rounded-lg">
              Get Quote
            </button>
          </div>
        ))
      }
    </div>
  );
} 