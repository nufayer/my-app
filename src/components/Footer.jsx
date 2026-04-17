import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
  return (
    <footer className="bg-[#244D3F] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-semibold tracking-wide">
          KeenKeeper
        </h1>

        <p className="mt-4 text-sm text-white mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="mt-8">
          <p className="text-sm text-white/80 mb-4">Social Links</p>

          <div className="flex justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
              <span className="text-sm">
                <FontAwesomeIcon icon={faSquareInstagram} />
              </span>
            </div>

            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
              <span className="text-sm">
                <FontAwesomeIcon icon={faSquareFacebook} />
              </span>
            </div>

            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
              <span className="text-sm">
                <FontAwesomeIcon icon={faXTwitter} />
              </span>
            </div>
          </div>
        </div>

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
