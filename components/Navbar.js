"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryLinks, serviceGroups } from "../lib/navigation";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(serviceGroups[0]?.id);
  const [mobileGroups, setMobileGroups] = useState({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/services") return pathname.startsWith("/services");
    return pathname === href || pathname === `${href}.html`;
  };

  return (
    <nav className={`glass-nav fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="logo font-display">
            <Image src="/images/luminous-logo.png" width={186} height={50} alt="Luminous Engineering" priority />
          </Link>

          <div className="hidden md:flex space-x-8 desktop-nav items-center">
            {primaryLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  className="relative"
                  key={link.href}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className={`nav-link text-white hover:text-yellow-400 flex items-center focus:outline-none ${
                      isActive(link.href) ? "active text-yellow-400" : ""
                    }`}
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((open) => !open)}
                  >
                    Services
                    <svg
                      className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`absolute left-0 mt-2 flex transition-all duration-300 z-50 ${
                      servicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    <div className="w-64 bg-gray-900 rounded-l-md shadow-lg py-1 border border-gray-700 border-r-0">
                      {serviceGroups.map((group) => (
                        <Link
                          key={group.id}
                          href={group.href}
                          onMouseEnter={() => setActiveGroup(group.id)}
                          className={`service-parent-link flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-yellow-400 ${
                            activeGroup === group.id ? "bg-gray-800 text-yellow-400" : ""
                          }`}
                        >
                          {group.label}
                          <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                    <div className="w-64 bg-gray-900 rounded-r-md shadow-lg py-1 border border-gray-700 border-l-gray-800">
                      {serviceGroups
                        .filter((group) => group.id === activeGroup)
                        .map((group) => (
                          <div key={group.id} className="submenu-panel">
                            <div className="px-4 py-2 text-xs text-yellow-400 font-semibold uppercase tracking-wider border-b border-gray-700">
                              {group.label}
                            </div>
                            {group.items.map(([label, href]) => (
                              <Link
                                href={href}
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
                                key={`${href}-${label}`}
                              >
                                {label}
                              </Link>
                            ))}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`nav-link text-white hover:text-yellow-400 ${isActive(link.href) ? "active" : ""}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <Link href="/contact" className="btn-primary px-6 py-3 rounded-full text-sm font-semibold hidden md:block">
            Get Quote
          </Link>

          <button
            type="button"
            className={`mobile-menu-button ${mobileOpen ? "active" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? "active" : ""}`}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <button
          type="button"
          className="w-full flex items-center justify-between text-left text-white px-6 py-4 border-b border-yellow-400/10"
          onClick={() => setServicesOpen((open) => !open)}
        >
          Services
          <svg className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={servicesOpen ? "flex flex-col bg-black/20" : "hidden"}>
          {serviceGroups.map((group) => (
            <div key={group.id}>
              <button
                type="button"
                className="w-full flex items-center justify-between text-left text-gray-200 px-8 py-3 border-b border-yellow-400/10"
                onClick={() => setMobileGroups((state) => ({ ...state, [group.id]: !state[group.id] }))}
              >
                {group.label}
                <svg className={`w-4 h-4 transition-transform ${mobileGroups[group.id] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={mobileGroups[group.id] ? "flex flex-col bg-black/30" : "hidden"}>
                {group.items.map(([label, href]) => (
                  <Link href={href} className="pl-12 text-sm text-gray-300" key={`${href}-${label}`}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
