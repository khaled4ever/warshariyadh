import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import Troubleshooter from './components/Troubleshooter';
import CoverageMap from './components/CoverageMap';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const handleSelectService = (serviceTitle: string) => {
    // Construct WhatsApp message
    const phoneNumber = '966561241984'; // Riyadh phone number
    const text = `مرحباً فني صيانة الرشود بالرياض،
أود طلب خدمة صيانة متنقلة فورية لسيارتي لخدمة: *${serviceTitle}*

الرجاء التواصل معي لتأكيد الموعد وتفاصيل الخدمة.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Also populate the form in case they return/fail to open WhatsApp
    setSelectedService(serviceTitle);
    setAdditionalNotes(`أرغب في حجز موعد فحص وإصلاح لخدمة: ${serviceTitle}`);
    
    // Smooth scroll to booking form as fallback
    const bookingSection = document.getElementById('booking-form-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookFromDiagnostics = (serviceTitle: string, notes: string) => {
    setSelectedService(serviceTitle);
    setAdditionalNotes(notes);

    // Smooth scroll to booking form
    const bookingSection = document.getElementById('booking-form-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans" id="app-root">
      
      {/* Navigation Header */}
      <Header />

      {/* Hero Header Presentation */}
      <Hero />

      {/* 12 Core Services Section */}
      <ServicesGrid onSelectService={handleSelectService} />

      {/* Diagnostic Symptom Selector */}
      <Troubleshooter onBookService={handleBookFromDiagnostics} />

      {/* Geographic Neighborhood Coverage list */}
      <CoverageMap />

      {/* Dynamic validated service request form */}
      <BookingForm selectedService={selectedService} additionalNotes={additionalNotes} />

      {/* Local Customer Testimonials */}
      <Testimonials />

      {/* FAQs Collapsible list */}
      <FAQ />

      {/* Full info footer */}
      <Footer />

      {/* Constant Floating Direct Call & WhatsApp Widget */}
      <FloatingActions />

    </div>
  );
}
