import ClientLayoutShell from "@/components/ClientLayoutShell";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientLayoutShell />
      <main className="pt-36 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
