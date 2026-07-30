import React, {useState} from "react";
import {motion} from "framer-motion";
import {CAFE_INFO} from "../data/faqData";
import {useCart} from "../context/CartContext";
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Send,
  Compass,
  ExternalLink
} from "lucide-react";

export default function ContactSection({onOpenReservation}) {
  const {addToast} = useCart();
  const [formData, setFormData] = useState({name: "", email: "", message: ""});

  const handleSubmit = e => {
    e.preventDefault();
    addToast("Thank you! Your message was sent to Oak & Bean support team. ☕", "success");
    setFormData({name: "", email: "", message: ""});
  };

  return (<section id="contact" className="py-12 sm:py-16 bg-transparent text-[#2C1A14] dark:text-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-1.5">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2C1A14] dark:text-white">
          Find Us &{" "}
          <span className="bg-gradient-to-r from-[#C67C4E] via-[#A35D31] to-[#855E4C] dark:from-[#F0C085] dark:to-[#C67C4E] bg-clip-text text-transparent">
            Get in Touch
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-[#5C4337] dark:text-coffee-200 font-medium">
          Drop by for a fresh espresso, book a table for your team, or send us a quick message.
        </p>
      </div>

      {/* 100% Symmetrical 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
        {/* Left Column: 4 Individual Compact Symmetrical Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-1 sm:grid-rows-2 gap-3.5 sm:gap-4 h-full">
          {/* Opening Hours Card */}
          <div className="glass-card h-full p-4 sm:p-5 rounded-2xl border border-[#E5DCD3] dark:border-coffee-800 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] w-fit shadow-sm">
                <Clock className="w-4 h-4"/>
              </div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#2C1A14] dark:text-white">
                Opening Hours
              </h4>
              <p className="text-xs text-[#5C4337] dark:text-coffee-300 font-medium leading-relaxed">
                Mon–Fri: {CAFE_INFO.hours.weekdays}
                <br/>
                Sat–Sun: {CAFE_INFO.hours.weekends}
              </p>
            </div>
          </div>

          {/* Direct Support Card */}
          <div className="glass-card h-full p-4 sm:p-5 rounded-2xl border border-[#E5DCD3] dark:border-coffee-800 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] w-fit shadow-sm">
                <Phone className="w-4 h-4"/>
              </div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#2C1A14] dark:text-white">
                Direct Support
              </h4>
              <p className="text-xs text-[#5C4337] dark:text-coffee-300 font-medium leading-relaxed">
                Phone: {CAFE_INFO.phone}
                <br/>
                Email: {CAFE_INFO.email}
              </p>
            </div>
          </div>

          {/* Address Card */}
          <div className="glass-card h-full p-4 sm:p-5 rounded-2xl border border-[#E5DCD3] dark:border-coffee-800 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] w-fit shadow-sm">
                <MapPin className="w-4 h-4"/>
              </div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#2C1A14] dark:text-white">
                Cafe Address
              </h4>
              <p className="text-xs text-[#5C4337] dark:text-coffee-300 leading-relaxed font-medium">
                {CAFE_INFO.address}
              </p>
            </div>
          </div>

          {/* Table Reservations Card */}
          <div className="glass-card h-full p-4 sm:p-5 rounded-2xl border border-[#E5DCD3] dark:border-coffee-800 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] w-fit shadow-sm">
                <Calendar className="w-4 h-4"/>
              </div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#2C1A14] dark:text-white">
                Table Reservations
              </h4>
              <p className="text-xs text-[#5C4337] dark:text-coffee-300 font-medium leading-relaxed">
                Book a table online for coffee dates, work, or team meetings.
              </p>
            </div>

            <button onClick={onOpenReservation} className="w-full py-2 rounded-lg bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-extrabold text-[11px] uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition mt-3">
              <Calendar className="w-3.5 h-3.5"/>
              Book Table
            </button>
          </div>
        </div>

        {/* Right Column Card */}
        <div className="h-full">
          <div className="glass-card h-full p-4 sm:p-5 rounded-2xl border border-[#E5DCD3] dark:border-coffee-800 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1A14] dark:text-white mb-3">
                Send Us a Message
              </h3>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="text-[11px] font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-0.5">
                    Your Full Name
                  </label>
                  <input type="text" required="required" placeholder="e.g. Alex Morgan" value={formData.name} onChange={e => setFormData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))
} className="w-full px-3.5 py-2 rounded-lg bg-white/90 dark:bg-[#160F0B]/90 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs font-medium focus:border-[#C67C4E] focus:outline-none"/>
                </div>

                <div>
                  <label className="text-[11px] font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-0.5">
                    Email Address
                  </label>
                  <input type="email" required="required" placeholder="e.g. alex@example.com" value={formData.email} onChange={e => setFormData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))
} className="w-full px-3.5 py-2 rounded-lg bg-white/90 dark:bg-[#160F0B]/90 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs font-medium focus:border-[#C67C4E] focus:outline-none"/>
                </div>

                <div>
                  <label className="text-[11px] font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-0.5">
                    Message
                  </label>
                  <textarea rows={2} required="required" placeholder="How can we assist you today?" value={formData.message} onChange={e => setFormData(prev => ({
                      ...prev,
                      message: e.target.value
                    }))
} className="w-full px-3.5 py-2 rounded-lg bg-white/90 dark:bg-[#160F0B]/90 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs font-medium focus:border-[#C67C4E] focus:outline-none resize-none"/>
                </div>
              </form>
            </div>

            <button type="submit" form="contact-form" className="w-full py-2.5 rounded-lg bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition mt-3">
              <Send className="w-3.5 h-3.5"/>
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* REAL EMBEDDED GOOGLE MAP */}
      <div className="glass-card rounded-3xl overflow-hidden border mt-8 border-[#E5DCD3] dark:border-coffee-800 p-3 space-y-2.5 shadow-xl">
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B]">
              <Compass className="w-4 h-4"/>
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-[#2C1A14] dark:text-white">
                Oak & Bean Store Location
              </h4>
              <span className="text-[11px] text-[#5C4337] dark:text-coffee-300 font-medium block">
                742 Crema Boulevard • 3 Mins from Central Station
              </span>
            </div>
          </div>

          <a href={`https://maps.google.com/?q=${encodeURIComponent(CAFE_INFO.address)}`} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl bg-[#2C1A14]/10 dark:bg-amber-400/10 text-[#2C1A14] dark:text-[#F0C085] text-xs font-bold flex items-center gap-1 border border-[#2C1A14]/20 hover:border-[#C67C4E] transition">
            <span>Open Maps</span>
            <ExternalLink className="w-3.5 h-3.5"/>
          </a>
        </div>

        {/* Embedded Google Map iframe */}
        <div className="relative h-60 sm:h-64 lg:h-72 rounded-2xl overflow-hidden border border-[#E5DCD3] dark:border-coffee-800 shadow-inner">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.9537363153167!3d-37.81627977975171!2m2!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sCoffee%20Shop!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen="" loading="lazy" title="Oak & Bean Coffee Shop Google Map Location" className="w-full h-full rounded-2xl filter contrast-105 dark:brightness-90 dark:contrast-125"></iframe>
        </div>
      </div>
    </div>
  </section>);
}
