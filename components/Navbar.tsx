'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signOutUser } from '@/lib/auth';

export default function Navbar() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-car.png"
                alt="AutoDealer Logo"
                width={180}
                height={60}
                className="h-12 w-auto sm:h-16"
                priority
              />
            </Link>
          </div>

          {/* Auth and Contact Buttons */}
          <div className="flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  // Authenticated user UI
                  <>
                    {/* Desktop authenticated buttons */}
                    <div className="hidden sm:flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        Welcome, {user.displayName || user.email}
                      </span>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={handleSignOut}
                        className="text-sm sm:text-base cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </>
                ) : (
                  // Unauthenticated user UI
                  <>
                    {/* Desktop Auth Buttons - Hidden on mobile */}
                    <Link href="/signin">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="hidden sm:flex text-sm sm:text-base cursor-pointer"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button 
                        variant="ghost" 
                        size="lg" 
                        className="hidden sm:flex text-sm sm:text-base cursor-pointer"
                      >
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
            
            {/* Call Button */}
            <Button size="lg" className="text-sm font-black sm:text-base cursor-pointer">
              Call to Inquire Now
            </Button>

            {/* Mobile Hamburger Menu - Visible only on mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="sm:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>
                    {user ? (
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Account
                      </div>
                    ) : (
                      "Account"
                    )}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {!loading && (
                    <>
                      {user ? (
                        // Authenticated mobile UI
                        <>
                          <div className="text-sm text-gray-600 text-center">
                            Welcome, {user.displayName || user.email}
                          </div>
                          <Button 
                            onClick={handleSignOut}
                            variant="outline"
                            size="lg" 
                            className="w-full"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        // Unauthenticated mobile UI
                        <>
                          <Link href="/signin" className="w-full">
                            <Button 
                              variant="outline" 
                              size="lg" 
                              className="w-full"
                            >
                              Sign In
                            </Button>
                          </Link>
                          <Link href="/register" className="w-full">
                            <Button 
                              size="lg" 
                              className="w-full"
                            >
                              Register
                            </Button>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
