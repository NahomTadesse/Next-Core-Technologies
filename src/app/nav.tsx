"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur z-20 sticky top-0">
      <div className="flex items-center gap-2">
        <Link href="/" className="font-bold text-xl tracking-tight">Next Core Technologies</Link>
      </div>
      <ul className="flex gap-6 text-base font-medium">
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:text-blue-600 transition-colors ${pathname.startsWith(link.href) ? "text-blue-700 dark:text-blue-400 font-bold" : ""}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}