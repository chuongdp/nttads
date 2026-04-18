"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuContent = DropdownMenuPrimitive.Content;
const DropdownMenuItem = DropdownMenuPrimitive.Item;
const DropdownMenuLabel = DropdownMenuPrimitive.Label;
const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger;
const DropdownMenuSubContent = DropdownMenuPrimitive.SubContent;

const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;

function StyledDropdownMenuContent({
  className,
  sideOffset = 10,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      sideOffset={sideOffset}
      className={cn(
        "dropdown-menu-content z-50 min-w-[12rem] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-1.5 text-[var(--foreground)]",
        "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.14),0_0_0_1px_color-mix(in_srgb,var(--primary)_8%,transparent)]",
        "dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.65),0_0_0_1px_color-mix(in_srgb,var(--primary)_14%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}

const itemHighlight =
  "data-[highlighted]:bg-[color-mix(in_srgb,var(--primary)_14%,var(--surface-card))] data-[highlighted]:text-[var(--foreground)]";

function StyledDropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--foreground)] outline-none transition-colors duration-150",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        itemHighlight,
        className,
      )}
      {...props}
    />
  );
}

function StyledDropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuCheckboxItem>) {
  return (
    <DropdownMenuCheckboxItem
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl py-2.5 pr-3 pl-8 text-sm font-medium text-[var(--foreground)] outline-none transition-colors duration-150",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        itemHighlight,
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuCheckboxItem>
  );
}

function StyledDropdownMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger>) {
  return (
    <DropdownMenuSubTrigger
      className={cn(
        "flex cursor-pointer select-none items-center rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--foreground)] outline-none transition-colors duration-150",
        itemHighlight,
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuSubTrigger>
  );
}

function StyledDropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel>) {
  return (
    <DropdownMenuLabel
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  );
}

function StyledDropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      className={cn("my-1 h-px bg-[var(--border)]", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  StyledDropdownMenuContent as DropdownMenuContent,
  StyledDropdownMenuItem as DropdownMenuItem,
  StyledDropdownMenuCheckboxItem as DropdownMenuCheckboxItem,
  StyledDropdownMenuSubTrigger as DropdownMenuSubTrigger,
  StyledDropdownMenuLabel as DropdownMenuLabel,
  StyledDropdownMenuSeparator as DropdownMenuSeparator,
};
