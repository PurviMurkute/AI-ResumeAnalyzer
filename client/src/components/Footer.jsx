import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative border-t border-gray-200 shadow-sm bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-40 bg-cyan-50 rounded-full blur-3xl opacity-70"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-7">
        
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-2 rounded-2xl border border-gray-100 shadow-sm">
              <img
                src={logo}
                alt="logo"
                className="w-[38px] md:w-[42px]"
              />
            </div>

            <div className="text-left">
              <h2 className="text-[22px] font-bold tracking-tight text-gray-900">
                HireLens
              </h2>

              <p className="text-sm text-gray-500">
                AI-Powered Resume Analyzer
              </p>
            </div>
          </div>
          <div className="w-20 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full my-6"></div>

          <p className="text-sm text-gray-500 leading-7">
            © {new Date().getFullYear()} HireLens. Crafted to help you build
            stronger resumes and smarter careers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;