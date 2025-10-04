

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Core Technologies",
  description: "Software with soul - and a deep respect for yours.",
};

import Nav from "./nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23] text-neutral-900 dark:text-neutral-100`}> 
  <Nav />
        <main className="min-h-[calc(100vh-64px)] flex flex-col items-center w-full">
          {children}
        </main>
        {/* Footer */}
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 py-12 px-6 text-sm text-neutral-700 dark:text-neutral-300 bg-white/90 dark:bg-neutral-950/90 mt-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <div className="font-bold text-xl mb-2 text-blue-700 dark:text-blue-400">Next Core Technologies</div>
              <p className="mb-4">Software with soul — and a deep respect for yours.</p>
              <div className="text-xs text-neutral-500 mb-2">Nairobi, Kenya</div>
              <div className="text-xs text-neutral-500">Business Hours: Mon - Fri, 8:00 - 17:00 EAT</div>
            </div>
            {/* Navigation */}
            <div>
              <div className="font-semibold mb-2">Company</div>
              <ul className="space-y-1">
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/services" className="hover:underline">Services</a></li>
                <li><a href="/products" className="hover:underline">Products</a></li>
                <li><a href="/insights" className="hover:underline">Insights</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            {/* Resources */}
            <div>
              <div className="font-semibold mb-2">Resources</div>
              <ul className="space-y-1">
                <li><a href="mailto:consult@Next Core Technologies.com" className="hover:underline">consult@Next Core Technologies.com</a></li>
                <li><a href="tel:+251911111111" className="hover:underline">tel:+251911111111</a></li>
                <li><a href="/privacy" className="hover:underline">Privacy</a></li>
                <li><a href="/terms" className="hover:underline">Terms</a></li>
              </ul>
            </div>
            {/* Social & CTA */}
            <div>
              <div className="font-semibold mb-2">Connect</div>
              <div className="flex gap-4 mb-4">
                <a href="https://www.linkedin.com/company/Next Core Technologies" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-blue-700"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M16.338 16.338h-2.667v-4.001c0-.954-.017-2.182-1.33-2.182-1.332 0-1.535 1.04-1.535 2.112v4.071H8.139V8.333h2.561v1.09h.036c.357-.677 1.23-1.39 2.532-1.39 2.708 0 3.209 1.783 3.209 4.099v4.206zM5.333 7.242a1.547 1.547 0 1 1 0-3.094 1.547 1.547 0 0 1 0 3.094zm1.334 9.096H4V8.333h2.667v8.005zM18 3.333A1.333 1.333 0 0 0 16.667 2H3.333A1.333 1.333 0 0 0 2 3.333v13.334A1.333 1.333 0 0 0 3.333 18h13.334A1.333 1.333 0 0 0 18 16.667V3.333z"/></svg></a>
                <a href="https://twitter.com/Next Core Technologies" target="_blank" rel="noopener" aria-label="Twitter" className="hover:text-blue-700"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M18 4.557a7.2 7.2 0 0 1-2.07.567A3.6 3.6 0 0 0 17.5 3.1a7.19 7.19 0 0 1-2.28.872A3.594 3.594 0 0 0 9.85 7.03a10.19 10.19 0 0 1-7.4-3.75a3.594 3.594 0 0 0 1.11 4.79A3.573 3.573 0 0 1 2 7.15v.045a3.594 3.594 0 0 0 2.883 3.523a3.6 3.6 0 0 1-1.588.06a3.594 3.594 0 0 0 3.354 2.494A7.21 7.21 0 0 1 2 15.542a10.18 10.18 0 0 0 5.507 1.613c6.606 0 10.22-5.47 10.22-10.22c0-.156-.004-.312-.011-.466A7.3 7.3 0 0 0 18 4.557z"/></svg></a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener" aria-label="YouTube" className="hover:text-blue-700"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.333c2.667 0 8 .167 8 2.5v8.334c0 2.333-5.333 2.5-8 2.5s-8-.167-8-2.5V5.833c0-2.333 5.333-2.5 8-2.5zm0 1.334c-2.667 0-6.667.167-6.667 1.5v8.334c0 1.333 4 1.5 6.667 1.5s6.667-.167 6.667-1.5V6.167c0-1.333-4-1.5-6.667-1.5zm-1.333 3.333l5.333 3.333-5.333 3.334V7.999z"/></svg></a>
                <a href="https://www.facebook.com/Next Core Technologiesltd" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-blue-700"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M17.5 2h-15A.5.5 0 0 0 2 2.5v15a.5.5 0 0 0 .5.5h7.5v-6.25H7.5V9.5h2.5V8.125c0-2.067 1.267-3.188 3.1-3.188c.883 0 1.8.158 1.8.158v2h-1.014c-1 0-1.236.492-1.236 1.214V9.5h2.1l-.336 2.25h-1.764V18h3.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5z"/></svg></a>
              </div>
              <a href="/contact" className="inline-block bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-800 hover:scale-105 transition-all duration-200">Book discovery</a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto text-center text-xs text-neutral-400 mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            © 2025 Next Core Technologies Limited. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
