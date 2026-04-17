export default function Footer() {
  return (
    <footer className="bg-[#244D3F] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Brand */}
        <h1 className="text-5xl font-semibold tracking-wide">
          KeenKeeper
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-sm text-white mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <div className="mt-8">
          <p className="text-sm text-white/80 mb-4">Social Links</p>

          <div className="flex justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
              {/* Instagram icon placeholder */}
              <span className="text-sm">📷</span>
            </div>

            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
              {/* Facebook */}
              <span className="text-sm">f</span>
            </div>

            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
              {/* X / Twitter */}
              <span className="text-sm">X</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/70">
          
          <p>© 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Cookies
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}