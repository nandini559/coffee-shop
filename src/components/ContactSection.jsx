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

  return (<section id="contact" className="py-24 bg-gradient-to-b from-[#E8DCCF] via-[#F4ECE1] to-[#FFFDF9] dark:from-[#160F0B] dark:via-[#1D130E] dark:to-[#160F0B] text-[#2C1A14] dark:text-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        {/* <span className="text-xs font-black uppercase tracking-widest text-[#2C1A14] dark:text-[#F0C085] bg-white/80 dark:bg-amber-400/10 px-4 py-1.5 rounded-full border border-[#E5DCD3] dark:border-amber-400/30 shadow-sm">
            Visit & Connect
          </span> */
        }
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C1A14] dark:text-white">
          Find Us &{" "}
          <span className="text-[#C67C4E] dark:text-[#F0C085]">
            Get in Touch
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#5C4337] dark:text-coffee-200 font-medium">
          Drop by for a fresh espresso, book a table for your team, or send us a quick message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Quick Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Address Card */}
            <div className="glass-card p-6 rounded-3xl border border-[#E5DCD3] dark:border-coffee-800 space-y-3">
              <div className="p-3 rounded-2xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] w-fit shadow-sm">
                <MapPin className="w-5 h-5"/>
              </div>
              <h3 className="text-base font-serif font-bold text-[#2C1A14] dark:text-white">
                Cafe Address
              </h3>
              <p className="text-xs text-[#5C4337] dark:text-coffee-300 leading-relaxed font-medium">
                {CAFE_INFO.address}
              </p>
              <span className="text-[11px] text-[#C67C4E] dark:text-[#F0C085] font-extrabold block pt-1">
                🅿️ Free 2-hr Guest Parking Available
              </span>
            </div>

            {/* Hours Card */}
            <div className="glass-card p-6 rounded-3xl border border-[#E5DCD3] dark:border-coffee-800 space-y-3">
              <div className="p-3 rounded-2xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] w-fit shadow-sm">
                <Clock className="w-5 h-5"/>
              </div>
              <h3 className="text-base font-serif font-bold text-[#2C1A14] dark:text-white">
                Opening Hours
              </h3>
              <p className="text-xs text-[#5C4337] dark:text-coffee-300 font-medium leading-relaxed">
                Mon–Fri: {CAFE_INFO.hours.weekdays}
                <br/>
                Sat–Sun: {CAFE_INFO.hours.weekends}
              </p>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold block pt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"/>
                Currently Open (Seats Available)
              </span>
            </div>

            {/* Contact Direct Line */}
            <div className="glass-card p-6 rounded-3xl border border-[#E5DCD3] dark:border-coffee-800 space-y-3">
              <div className="p-3 rounded-2xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] w-fit shadow-sm">
                <Phone className="w-5 h-5"/>
              </div>
              <h3 className="text-base font-serif font-bold text-[#2C1A14] dark:text-white">
                Direct Support
              </h3>
              <p className="text-xs text-[#5C4337] dark:text-coffee-300 font-medium leading-relaxed">
                Phone: {CAFE_INFO.phone}
                <br/>
                Email: {CAFE_INFO.email}
              </p>
            </div>

            {/* Table Booking Banner */}
            <div className="glass-card p-6 rounded-3xl border border-[#E5DCD3] dark:border-amber-400/30 flex flex-col justify-between space-y-3 bg-gradient-to-br from-[#FDFBF7] to-[#F5EFE6] dark:from-coffee-900 dark:to-[#160F0B]">
              <div className="p-3 rounded-2xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] w-fit shadow-sm">
                <Calendar className="w-5 h-5"/>
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#2C1A14] dark:text-white">
                  Reserve a Table
                </h3>
                <p className="text-xs text-[#5C4337] dark:text-coffee-300 mt-1 font-medium">
                  Book your table for work, study, or coffee dates.
                </p>
              </div>
              <button onClick={onOpenReservation} className="w-full py-2.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm transition">
                Book Table Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-[#E5DCD3] dark:border-coffee-800 space-y-6 shadow-xl">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C67C4E] dark:text-[#F0C085] block">
              Direct Contact
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#2C1A14] dark:text-white mt-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-[#5C4337] dark:text-coffee-300 mt-1 font-medium">
              Have questions, feedback, or party catering requests?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-1">
                Your Full Name
              </label>
              <input type="text" required="required" placeholder="e.g. Alex Morgan" value={formData.name} onChange={e => setFormData(prev => ({
                  ...prev,
                  name: e.target.value
                }))
} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs font-medium focus:border-[#C67C4E] focus:outline-none"/>
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-1">
                Email Address
              </label>
              <input type="email" required="required" placeholder="e.g. alex@example.com" value={formData.email} onChange={e => setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))
} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs font-medium focus:border-[#C67C4E] focus:outline-none"/>
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-1">
                Message
              </label>
              <textarea rows={4} required="required" placeholder="How can we assist you today?" value={formData.message} onChange={e => setFormData(prev => ({
                  ...prev,
                  message: e.target.value
                }))
} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs font-medium focus:border-[#C67C4E] focus:outline-none"/>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2">
              <Send className="w-4 h-4"/>
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* REAL EMBEDDED GOOGLE MAP */}
      <div className="glass-card rounded-3xl overflow-hidden border mt-10 border-[#E5DCD3] dark:border-coffee-800 p-3 space-y-3 shadow-xl">
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
        <div className="relative h-80 rounded-2xl overflow-hidden border border-[#E5DCD3] dark:border-coffee-800 shadow-inner">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.9537363153167!3d-37.81627977975171!2m2!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sCoffee%20Shop!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen="" loading="lazy" title="Oak & Bean Coffee Shop Google Map Location" className="w-full h-full rounded-2xl filter contrast-105 dark:brightness-90 dark:contrast-125"></iframe>
        </div>
      </div>
    </div>
  </section>);
}
