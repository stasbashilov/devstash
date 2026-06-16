"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Folder, Layers, Star, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockCollections,
  mockItems,
  mockItemTypes,
  mockUser,
} from "@/lib/mock-data";
import { ITEM_TYPE_ICONS } from "@/lib/constants/item-types";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
// Mock data has no timestamps for collections yet, so "recent" is
// approximated by list order until real usage tracking exists.
const recentCollections = mockCollections
  .filter((c) => !c.isFavorite)
  .slice(0, 5);

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Sidebar({ collapsed, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200",
          "md:relative md:translate-x-0",
          collapsed ? "md:w-16" : "md:w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div
          className={cn(
            "flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-4",
            collapsed && "md:justify-center md:px-0"
          )}
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white">
            <Layers className="size-4" />
          </div>
          <span className={cn("text-sm font-semibold", collapsed && "md:hidden")}>
            DevStash
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <CollapsibleSection title="Types" collapsed={collapsed}>
            {mockItemTypes.map((type) => {
              const Icon = ITEM_TYPE_ICONS[type.name];
              const plural = `${type.name}s`;
              const href = `/items/${plural}`;
              const active = pathname === href;
              const count = mockItems.filter(
                (item) => item.itemType.id === type.id
              ).length;

              return (
                <Link
                  key={type.id}
                  href={href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm capitalize hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    collapsed && "md:justify-center",
                    active && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  {Icon && (
                    <Icon
                      className="size-4 shrink-0"
                      style={{ color: type.color }}
                    />
                  )}
                  <span className={cn("flex-1 truncate", collapsed && "md:hidden")}>
                    {plural}
                  </span>
                  <span
                    className={cn(
                      "text-xs text-muted-foreground",
                      collapsed && "md:hidden"
                    )}
                  >
                    {count}
                  </span>
                </Link>
              );
            })}
          </CollapsibleSection>

          <CollapsibleSection title="Collections" collapsed={collapsed}>
            <div className="flex flex-col gap-4">
              <div>
                <SectionLabel collapsed={collapsed}>Favorites</SectionLabel>
                <div className="flex flex-col gap-0.5">
                  {favoriteCollections.map((collection) => (
                    <CollectionRow
                      key={collection.id}
                      collection={collection}
                      collapsed={collapsed}
                      showFavoriteIcon
                    />
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel collapsed={collapsed}>Recent</SectionLabel>
                <div className="flex flex-col gap-0.5">
                  {recentCollections.map((collection) => (
                    <CollectionRow
                      key={collection.id}
                      collection={collection}
                      collapsed={collapsed}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </nav>

        <div
          className={cn(
            "flex items-center gap-2 border-t border-sidebar-border p-3",
            collapsed && "md:justify-center"
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium">
            {getInitials(mockUser.name)}
          </div>
          <div className={cn("min-w-0 flex-1", collapsed && "md:hidden")}>
            <p className="truncate text-sm font-medium">{mockUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {mockUser.email}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function SectionLabel({
  collapsed,
  icon: Icon,
  children,
}: {
  collapsed: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-1.5 flex items-center gap-1.5 px-2 text-[11px] font-medium text-muted-foreground/70",
        collapsed && "md:hidden"
      )}
    >
      {Icon && <Icon className="size-3" />}
      {children}
    </div>
  );
}

function CollapsibleSection({
  title,
  collapsed,
  defaultOpen = true,
  children,
}: {
  title: string;
  collapsed: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="mb-1 flex w-full items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase hover:text-sidebar-accent-foreground"
      >
        <ChevronRight
          className={cn(
            "size-3 shrink-0 transition-transform",
            open && "rotate-90"
          )}
        />
        <span className={cn(collapsed && "md:hidden")}>{title}</span>
      </button>

      {open && <div className="flex flex-col gap-0.5">{children}</div>}
    </div>
  );
}

function CollectionRow({
  collection,
  collapsed,
  showFavoriteIcon,
}: {
  collection: (typeof mockCollections)[number];
  collapsed: boolean;
  showFavoriteIcon?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "md:justify-center"
      )}
    >
      <Folder className="size-4 shrink-0 text-muted-foreground" />
      <span className={cn("flex-1 truncate", collapsed && "md:hidden")}>
        {collection.name}
      </span>
      <span
        className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground",
          collapsed && "md:hidden"
        )}
      >
        {collection.itemCount}
        {showFavoriteIcon && (
          <Star className="size-3 fill-current text-yellow-400" />
        )}
      </span>
    </div>
  );
}
