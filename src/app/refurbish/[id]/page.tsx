import Image from "next/image";
import { refurbishers } from "@/types/data";
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";

// ideally would be database
const rows: string[][] = [
  ["00000001", "iPhone 11", "Apple", "2020-01-01", "1 month left", "iphone.jpg"],
  ["00000002", "Macbook M2", "Apple", "2024-01-01", "4 years 10 months left", "m2.jpg"],
  ["00000003", "NVIDIA Blackwell GPU", "NVIDIA", "2025-01-01", "4 years left"],
  ["00000004", "Projector", "ClockoWe", "2022-01-01", "1 month left", "projector.jpg"]
];

export default async function RefurbishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = getProduct(id);

  const refurbisherPrice = refurbishers.find(
    (refurbisher) => refurbisher.name === row?.[2]
  )?.deals.find(
    (deal) => deal.product === row?.[1]
  )?.price || "None";

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-900 py-4 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-zinc-600 hover:text-zinc-900 transition-colors text-sm sm:text-base mb-4">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Products
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Product Image */}
          <div className="relative h-[300px] sm:h-[400px]">
            <Image 
              src={`/${row?.[5] || ''}`} 
              alt={row?.[1] || "Product"} 
              fill
              className="object-contain p-4"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-xl sm:text-3xl font-bold text-zinc-900">{row?.[1]}</h1>
              <div className="space-y-2 text-sm sm:text-base text-zinc-700">
                <p className="flex justify-between">
                  <span className="font-semibold">Supplier:</span>
                  <span>{row?.[2]}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold">Manufacture Date:</span>
                  <span>{row?.[3]}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold">Expected Lifespan:</span>
                  <span>{row?.[4]}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full py-2 sm:py-3 px-4 bg-blue-600 text-zinc-100 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                Original Refurbisher: £{refurbisherPrice}
              </button>
              <Link 
                href={`/refurbishers/${encodeURIComponent(`${row?.[2]} ${row?.[1].replaceAll(' ', '-')} ${row?.[4]}`)}`}
                className="text-center block w-full py-2 sm:py-3 px-4 bg-green-600 text-zinc-100 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                Find Refurbisher
              </Link>
              <button className="w-full py-2 sm:py-3 px-4 bg-green-600 text-zinc-100 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
                Recycle
              </button>
              <button className="w-full py-2 sm:py-3 px-4 bg-green-600 text-zinc-100 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
                Sustainable Disposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function getProduct(id: string): string[] | undefined {
  return rows.find((row) => row[0] === id);
}