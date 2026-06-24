import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ITEM_TYPE_COLORS } from "@/lib/constants/item-types";
import type { mockCollections } from "@/lib/mock-data";

interface CollectionCardProps {
  collection: (typeof mockCollections)[number];
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const accentColor = ITEM_TYPE_COLORS[collection.defaultType];

  return (
    <Card
      className="border-l-4 transition-colors hover:bg-muted/40"
      style={{ borderLeftColor: accentColor }}
    >
      <CardContent className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-medium">
            {collection.name}
          </span>
          {collection.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-current text-yellow-400" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {collection.itemCount} items
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {collection.description}
        </p>
      </CardContent>
    </Card>
  );
}
