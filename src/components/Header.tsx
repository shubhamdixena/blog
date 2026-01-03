
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { to: "/articles", label: "Articles" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/mentorship", label: "Mentorship" },
    { to: "/career-guidance", label: "Career Guidance" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between w-full">
        <div className="flex items-center ml-16">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-lg sm:text-xl text-gray-800">Shubham Dixena</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs uppercase font-semibold tracking-wider text-gray-800 hover:text-charity-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link
            to="#" // Assuming the "GIVE" button links to a donation page or section
            className="px-3 py-1 sm:px-4 sm:py-1.5 bg-charity-yellow text-charity-black text-xs font-bold rounded-full hover:bg-yellow-300 transition-colors"
          >
            GIVE
          </Link>
          
          <button 
            className="md:hidden p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 z-40" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-charity-blue hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
