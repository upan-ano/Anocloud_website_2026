import ContactForm from '@/components/ContactForm';
import RobotCircleGate from '@/components/RobotCircleGate';

export const metadata = {
  title: 'Contact Us | AnoCloud',
  description: 'Get in touch with the AnoCloud team for your IT and cloud needs.',
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section className="relative w-full pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-[#005241] rounded-b-[3rem] lg:rounded-b-[4rem] mb-8">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.4),_transparent_60%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.3),_transparent_50%)]"></div>
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="flex flex-col text-white z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-green-300 text-sm font-semibold mb-6 w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              24/7 Support Available
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 tracking-tight font-outfit leading-tight">
              Let&apos;s Build the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">Future</span> Together
            </h1>
            
            <p className="text-lg lg:text-xl text-green-50/80 font-medium max-w-lg mb-8 leading-relaxed">
              Whether you need elite software engineering, cloud modernization, or to chat with our AI agent—our team is ready.
            </p>
          </div>
          
          {/* Right Animation Content */}
          <div className="flex justify-center items-center py-8 lg:py-0 w-full max-w-[400px] lg:max-w-[500px] mx-auto">
             <RobotCircleGate />
          </div>
        </div>
      </section>

      {/* Main Form Content */}
      <div className="relative z-10 flex-grow">
        <ContactForm />
      </div>
    </div>
  );
}
