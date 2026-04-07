import Link from "next/link";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const footerLinks = {
  Solutions: [
    { name: "AI Transformation", href: "#services" },
    { name: "Cloud Modernization", href: "#services" },
    { name: "Cyber Security", href: "#services" },
    { name: "Data Engineering", href: "#services" },
  ],
  Industries: [
    { name: "Healthcare", href: "#industries" },
    { name: "BFS & Fintech", href: "#industries" },
    { name: "Manufacturing", href: "#industries" },
    { name: "Technology", href: "#industries" },
  ],
  Company: [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#" },
    { name: "Insights", href: "#insights" },
    { name: "Contact", href: "#contact" },
  ],
};

const socialLinks = [
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/anocloud" },
  { icon: TwitterIcon, href: "https://x.com/Anocloud_Tech" },
  { icon: InstagramIcon, href: "https://www.instagram.com/anocloud_tech/" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 pt-24 pb-12 border-t border-black/5 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <Image 
                src="/assets/logo.png" 
                alt="AnoCloud Logo" 
                width={480} 
                height={160} 
                className="h-32 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="max-w-xs text-sm text-text-body leading-relaxed">
              Engineering the future of enterprise technology through intelligent automation, secure cloud, and high-velocity digital products.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 glass flex items-center justify-center rounded-lg text-text-body hover:text-primary transition-all hover:border-primary/50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-text-body hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 space-y-4 md:space-y-0">
          <p className="text-xs text-text-body/60">
            © {new Date().getFullYear()} AnoCloud. Built for the Intelligent Era.
          </p>
          <div className="flex items-center space-x-8">
            <Link href="/privacy-policy" className="text-xs font-medium text-text-body hover:text-primary">
              Privacy Policy
            </Link>
            <div className="flex items-center space-x-2 px-3 py-1 glass rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">
                System Status: Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
