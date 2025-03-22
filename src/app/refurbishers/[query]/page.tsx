import { refurbishers } from '@/types/refurbishers';
import SearchBar from '@/components/SearchBar';
import RefurbisherList from '@/components/RefurbisherList';

export default async function Refurbishers({params}: {params: Promise<{query: string}>}) {
  const {query} = await params;
  const decodedQuery = decodeURIComponent(query);
  const [manufacturer, product, ...lifespanParts] = decodedQuery.split(' ');
  const lifespan = lifespanParts.join(' ');
  const productName = product.replaceAll('-', ' ');

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-900 py-8 px-8 sm:py-12 sm:px-12">
      <div className="flex flex-col p-8 gap-8 items-center">
        <div className="w-full max-w-5xl">
          <SearchBar defaultValue={`${manufacturer}, ${product}, ${lifespan}`} />
        </div>
        <RefurbisherList 
          refurbishers={refurbishers}
          productName={productName}
          manufacturer={manufacturer}
        />
      </div>
    </main>
  );
}