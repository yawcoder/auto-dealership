"use client";

import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

interface CallToActionBannerProps {
  title?: string;
  subtitle?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
}

export default function CallToActionBanner({ 
  title = "Ready to buy? Contact us now and drive home your dream car.",
  subtitle = "Our team is ready to help you find the perfect vehicle for your needs.",
  phoneNumber = "+1 (555) 123-4567",
  whatsappNumber = "+1 (555) 123-4567"
}: CallToActionBannerProps) {
  
  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in your cars. Can you help me?");
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="w-full py-16 bg-gradient-to-r from-primary to-primary/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {title}
        </h2>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={handleCallNow}
            className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-semibold bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Phone className="mr-3 h-5 w-5" />
            Call Now
          </Button>
          
          <Button
            size="lg"
            variant="secondary"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            WhatsApp
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-white/80">
          <p className="text-sm md:text-base">
            Call us at{" "}
            <span className="font-semibold text-white">{phoneNumber}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
