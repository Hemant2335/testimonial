
const Footer = () => {
  return (
    <div className="w-full bg-[#121212]  mt-5 min-h-[10vh] shadow-5xl">
      <div className="w-full flex flex-col md:flex-row justify-between md:items-center py-5 px-5">
        {/* Logo or Company Name */}
        <div className="text-white text-sm mb-3 md:mb-0">
          <p className="text-lg font-bold">SLOTIN</p>
          <p>&copy; 2024 SLOTIN. All rights reserved.</p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
          <a href="/privacy-policy" className="text-white hover:text-gray-400">
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-white hover:text-gray-400"
          >
            Terms of Service
          </a>
          <a href="/contact" className="text-white hover:text-gray-400">
            Contact Us
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-facebook-f"></i>{" "}
            {/* Assuming you're using FontAwesome */}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
