import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export function FAB() {
  return (
    <Link
      to="/bills/new"
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2 z-50
        w-14 h-14 rounded-full
        bg-primary text-primary-foreground
        flex items-center justify-center
        shadow-elevated
        transition-smooth
        hover:scale-110 hover:shadow-[0_8px_24px_0_oklch(var(--primary)/0.45)]
        active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
      "
      aria-label="Create new invoice"
      data-ocid="fab.create_invoice_button"
    >
      <Plus size={26} strokeWidth={2.5} />
    </Link>
  );
}
