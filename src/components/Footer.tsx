
import { Link } from "react-router-dom";
import { Twitter, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const navigation = {
    "explore": [
      { name: "articles", href: "/articles" },
      { name: "journal", href: "/journal" },
      { name: "categories", href: "/categories" },
      { name: "archive", href: "/archive" },
    ],
    "services": [
      { name: "mentorship", href: "/mentorship" },
      { name: "career guidance", href: "/career-guidance" },
      { name: "consulting", href: "/consulting" },
      { name: "speaking", href: "/speaking" },
    ],
    "about": [
      { name: "my story", href: "/about" },
      { name: "projects", href: "/projects" },
      { name: "experience", href: "/experience" },
      { name: "reading list", href: "/reading" },
    ],
    "connect": [
      { name: "contact", href: "/contact" },
      { name: "newsletter", href: "/newsletter" },
      { name: "twitter", href: "#" },
      { name: "linkedin", href: "#" },
    ],
  };

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="container mx-auto px-4 pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-10 md:mb-12">
          {Object.entries(navigation).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-medium text-gray-600 mb-4 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-600 hover:text-gray-900 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t border-gray-200">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
          
          <div>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
              privacy policy
            </a>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-4 text-center md:text-left">
          <p className="mb-2">
            Personal blog and portfolio of Shubham Dixena.
          </p>
          <p className="mb-2 font-bold text-gray-700">
            Sharing insights on technology, career growth, and personal development.
          </p>
          <p>
            © {new Date().getFullYear()} Shubham Dixena. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
