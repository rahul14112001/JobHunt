

import logo from "./path/logo.png";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <div className="mb-2">
            <img src={logo} alt="Company Logo" className="h-10" />
            <span className="font-bold text-blue-500">Job</span>
            <span className="font-bold text-red-500">Hunt</span>
          </div>
          <p className="text-gray-400">123 Main Street, AnyCity India</p>
          <p className="text-gray-400">Phone: (555) 123-4567</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-400">
        
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold text-blue-500">Job </span>
          
          <span className="font-bold text-red-500">Hunt</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

