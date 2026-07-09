import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import JogoSection from "@/components/JogoSection";
import RoletaSection from "@/components/RoletaSection";
import Rodape from "@/components/Rodape";
 
export default function Page() {
  return (
    <main>
      <Hero />
      <Ticker />
      <JogoSection />
      <Ticker invertido />
      <RoletaSection />
      <Rodape />
    </main>
  );
}
