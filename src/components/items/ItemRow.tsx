import { Pin, Star } from "lucide-react";
import { ITEM_TYPE_ICONS } from "@/lib/constants/item-types";
import type { mockItems } from "@/lib/mock-data";

interface ItemRowProps {
  item: (typeof mockItems)[number];
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ItemRow({ item }: ItemRowProps) {
  const Icon = ITEM_TYPE_ICONS[item.itemType.name];

  return (
    <div className="flex items-start gap-3 border-b px-4 py-3 last:border-b-0 hover:bg-muted/40">
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${item.itemType.color}1a` }}
      >
        {Icon && (
          <Icon className="size-4" style={{ color: item.itemType.color }} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-medium">{item.title}</span>
          {item.isPinned && (
            <Pin className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          {item.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-current text-yellow-400" />
          )}
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {item.description}
        </p>
        {item.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatDate(item.createdAt)}
      </span>
    </div>
  );
}
