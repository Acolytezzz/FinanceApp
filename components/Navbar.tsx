"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavItems = () => (
    <>
      <Link href="/" className="text-primary text-white  hover:text-slate-300">
        Home
      </Link>
      <Link
        href="/spending"
        className="text-primary text-white  hover:text-slate-300"
      >
        Spending
      </Link>
      <Link
        href="/investments"
        className="text-primary text-white  hover:text-slate-300"
      >
        Investment
      </Link>
    </>
  );

  const NavItemsSidebar = () => (
    <>
      <Link
        href="/"
        className="text-primary hover:text-primary/80"
        onClick={toggleMenu}
      >
        Home
      </Link>
      <Link
        href="/spending"
        className="text-primary hover:text-primary/80"
        onClick={toggleMenu}
      >
        Spending
      </Link>
      <Link
        href="/investments"
        className="text-primary hover:text-primary/80"
        onClick={toggleMenu}
      >
        Investment
      </Link>
    </>
  );

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl text-white font-bold text-primary"
            >
              FinanceApp
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavItems />
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/login" passHref>
              <Button variant="ghost" className="text-primary text-white ">
                Login
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button
                variant="default"
                className="bg-white hover:bg-gray-300 text-black"
              >
                Sign up
              </Button>
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-white hover:text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-white"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center py-4">
                    <span className="text-2xl font-bold text-primary">
                      FinanceApp
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMenu}
                      className="text-primary"
                      aria-label="Close menu"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex flex-col space-y-4 mt-8">
                    <NavItemsSidebar />
                  </div>
                  <div className="mt-auto pb-8 flex flex-col space-y-4">
                    <Link href="/login" passHref>
                      <Button
                        variant="outline"
                        className="w-full text-primary"
                        onClick={toggleMenu}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" passHref>
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={toggleMenu}
                      >
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
