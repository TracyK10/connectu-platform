import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Help', href: '/help' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="flex items-center justify-center w-8 h-8 text-white rounded-md bg-primary-600">
              <img
              src="/images/icons/Vector - 0.svg"
              alt="ConnectU Logo"
              className="w-6 h-6"
            />
            </div>
            <span className="text-lg font-bold text-primary-600">ConnectU</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            {footerLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 md:mt-0">
            © {currentYear} ConnectU. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
