import React, {useState} from "react";
import {useCart} from "../context/CartContext";
import {
  Coffee,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Heart,
  ArrowUp
} from "lucide-react";

export default function Footer() {
  const {addToast} = useCart();
  const [email, setEmail] = useState("");

  const handleSubscribe = e => {
    e.preventDefault();
    if (email) {
      addToast("Subscribed! You will receive exclusive coffee offers and AI recipe updates. ☕", "success");
      setEmail("");
    }
  };

  return (<footer className="bg-[#F5EFE6] dark:bg-[#160F0B] text-[#5C4337] dark:text-coffee-300 border-t border-[#E5DCD3] dark:border-coffee-800/80 pt-16 pb-8 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="lg:col-span-2 space-y-4">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2C1A14] via-[#5C4337] to-[#C67C4E] flex items-center justify-center shadow-sm">
              <Coffee className="w-5 h-5 text-white"/>
            </div>
            <span className="text-2xl font-serif font-black tracking-tight text-[#2C1A14] dark:text-white">
              OAK{" "}
              <span className="text-[#C67C4E] dark:text-[#F0C085] font-sans font-light">
                & BEAN
              </span>
            </span>
          </a>
          <p className="text-xs text-[#5C4337] dark:text-coffee-300 leading-relaxed max-w-sm font-medium">
            Artisanal coffee craft elevated by artificial intelligence. Ethically harvested direct-trade single origin beans, micro-foams, and custom flavor profiling.
          </p>

          <div className="flex gap-3 pt-2">
            <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-coffee-900 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-[#F0C085] hover:scale-110 transition shadow-sm">
              <Instagram className="w-4 h-4"/>
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-coffee-900 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-[#F0C085] hover:scale-110 transition shadow-sm">
              <Facebook className="w-4 h-4"/>
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-coffee-900 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-[#F0C085] hover:scale-110 transition shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.901 2H21.99l-6.75 7.714L23.5 22h-6.46l-5.06-6.63L6.18 22H3.09l7.22-8.25L.5 2h6.62l4.57 6.02L18.9 2zM17.8 20h1.79L6.22 3.9H4.3L17.8 20z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-extrabold text-[#2C1A14] dark:text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <a href="#" className="hover:text-[#C67C4E] dark:hover:text-[#F0C085] transition">
                Home
              </a>
            </li>
            <li>
              <a href="#menu" className="hover:text-[#C67C4E] dark:hover:text-[#F0C085] transition">
                Handcrafted Menu
              </a>
            </li>
            {/* <li>
              <a href="#custom-builder" className="hover:text-[#C67C4E] dark:hover:text-[#F0C085] transition">
                AI Coffee Builder
              </a>
            </li> */
            }
            <li>
              <a href="#about" className="hover:text-[#C67C4E] dark:hover:text-[#F0C085] transition">
                Our Story & Craft
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-[#C67C4E] dark:hover:text-[#F0C085] transition">
                Customer Reviews
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold text-[#2C1A14] dark:text-white uppercase tracking-wider mb-4">
            Hours & Info
          </h4>
          <ul className="space-y-2 text-xs text-[#5C4337] dark:text-coffee-300 font-medium">
            <li>
              <strong className="text-[#2C1A14] dark:text-white font-bold">
                Weekdays:
              </strong>{" "}
              6:30 AM – 9:00 PM
            </li>
            <li>
              <strong className="text-[#2C1A14] dark:text-white font-bold">
                Weekends:
              </strong>{" "}
              7:00 AM – 10:00 PM
            </li>
            <li className="pt-2 text-[#2C1A14] dark:text-[#F0C085] font-extrabold">
              📍 742 Crema Blvd, CA
            </li>
            <li>📞 +1 (800) 555-OAKBEAN</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold text-[#2C1A14] dark:text-white uppercase tracking-wider mb-4">
            Join Coffee Club
          </h4>
          <p className="text-xs text-[#5C4337] dark:text-coffee-300 mb-3 font-medium">
            Get 15% off your first order plus secret AI drink recipes.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#855E4C] dark:text-coffee-400"/>
              <input type="email" required="required" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-coffee-900 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs placeholder-coffee-400 focus:border-[#C67C4E] focus:outline-none"/>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="pt-8 border-t border-[#E5DCD3] dark:border-coffee-900 text-center text-xs text-[#855E4C] dark:text-coffee-400 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
        <p>
          © {new Date().getFullYear()}
          Oak & Bean Inc. All rights reserved.
        </p>

        {/* <button onClick={() => window.scrollTo({top: 0, behavior: "smooth"})} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:opacity-90 text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm transition">
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5"/>
        </button> */
        }

        <p className="flex items-center gap-1">
          Crafted with{" "}
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500"/>& AI Precision for Coffee Enthusiasts.
        </p>
      </div>
    </div>
  </footer>);
}
