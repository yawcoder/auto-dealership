'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Navbar() {
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

          {/* Contact Button */}
          <div className="flex items-center">
            <Button size="lg" className="text-sm sm:text-base">
              Call to Inquire Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
