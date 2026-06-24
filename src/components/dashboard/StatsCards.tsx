import { Folder, Heart, Package, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockCollections, mockItems } from "@/lib/mock-data";

const stats = [
  {
    label: "Total Items",
    value: mockItems.length,
    icon: Package,
  },
  {
    label: "Collections",
    value: mockCollections.length,
    icon: Folder,
  },
  {
    label: "Favorite Items",
    value: mockItems.filter((item) => item.isFavorite).length,
    icon: Star,
  },
  {
    label: "Favorite Collections",
    value: mockCollections.filter((collection) => collection.isFavorite)
      .length,
    icon: Heart,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <stat.icon className="size-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
