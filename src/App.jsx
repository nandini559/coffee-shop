import React, {useState} from "react";
import {ThemeProvider} from "./context/ThemeContext";
import {CartProvider} from "./context/CartContext";
import {AuthProvider} from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedSection from "./components/FeaturedSection";
import MenuSection from "./components/MenuSection";
import CustomCoffeeBuilder from "./components/CustomCoffeeBuilder";
import AboutSection from "./components/AboutSection";
import ReviewsSection from "./components/ReviewsSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";
// import Chatbot from './components/Chatbot';
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import ReservationModal from "./components/ReservationModal";
import AuthModal from "./components/AuthModal";
import ToastNotification from "./components/ToastNotification";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (<ThemeProvider>
    <CartProvider>
      <AuthProvider>
        <div className="min-h-screen relative flex flex-col font-sans">
          <Navbar onOpenReservation={() => setIsReservationOpen(true)}/>
          <main className="flex-grow">
            <Hero onOpenReservation={() => setIsReservationOpen(true)}/>
            <FeaturedSection/>
            <MenuSection/> {/* <CustomCoffeeBuilder /> */}
            <AboutSection/>
            <ReviewsSection/>
            <GallerySection/>
            <ContactSection onOpenReservation={() => setIsReservationOpen(true)}/>
          </main>
          <Footer onOpenReservation={() => setIsReservationOpen(true)}/>{" "}
          {/* Interactive Floating Chatbot */}
          {/* <Chatbot /> */}
          {/* Floating Action Buttons: Scroll to Top, WhatsApp & AI Chatbot */}
          <FloatingButtons onOpenReservation={() => setIsReservationOpen(true)}/> {/* Modals & Drawers */}
          <CartDrawer/>
          <CheckoutModal/>
          <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)}/>
          <AuthModal/> {/* Toast Notification System */}
          <ToastNotification/>
        </div>
      </AuthProvider>
    </CartProvider>
  </ThemeProvider>);
}
