import { useCallback, useState } from "react";
import Navigation from "@/components/Navigation";
import Walker from "@/components/ikea/Walker";
import Unboxing from "@/components/ikea/Unboxing";
import ClickTwist from "@/components/ikea/ClickTwist";
import HuntComplete from "@/components/ikea/HuntComplete";
import { ScrewHuntProvider } from "@/components/ikea/ScrewHunt";
import Cover from "@/components/sections/Cover";
import BeforeYouStart from "@/components/sections/BeforeYouStart";
import PartsList from "@/components/sections/PartsList";
import ExplodedView from "@/components/sections/ExplodedView";
import AssemblySteps from "@/components/sections/AssemblySteps";
import Projects from "@/components/sections/Projects";
import Support from "@/components/sections/Support";
import BackCover from "@/components/sections/BackCover";
import { holdReady, markReady, shouldUnbox } from "@/lib/ready";

const Index = () => {
  const [unboxing, setUnboxing] = useState(() => {
    const show = shouldUnbox();
    if (show) holdReady();
    return show;
  });

  const done = useCallback(() => {
    setUnboxing(false);
    markReady();
  }, []);

  return (
    <ScrewHuntProvider>
      {unboxing ? <Unboxing onDone={done} /> : null}
      <a href="#main" className="skip-link">
        Hopp til innholdet
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Cover />
        <BeforeYouStart />
        <PartsList />
        <ExplodedView />
        <AssemblySteps />
        <Projects />
        <Support />
      </main>
      <BackCover />
      <Walker />
      <ClickTwist />
      <HuntComplete />
    </ScrewHuntProvider>
  );
};

export default Index;
