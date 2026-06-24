import Link from "next/link";
import { Pin } from "lucide-react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { ItemRow } from "@/components/items/ItemRow";
import { mockCollections, mockItems } from "@/lib/mock-data";

const recentCollections = mockCollections.slice(0, 6);
const pinnedItems = mockItems.filter((item) => item.isPinned);
const recentItems = [...mockItems]
  .sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  .slice(0, 10);

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Your developer knowledge hub
          </p>
        </div>

        <StatsCards />

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Collections</h2>
            <Link
              href="/collections"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>

        {pinnedItems.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-1.5">
              <Pin className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Pinned</h2>
            </div>
            <div className="rounded-xl border">
              {pinnedItems.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-sm font-semibold">Recent Items</h2>
          <div className="rounded-xl border">
            {recentItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
