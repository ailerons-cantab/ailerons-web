"use client";

import AgencyBenefits from "./components/agencyBenefits";
import HowItWorksSection from "./components/howItWorks";
import Intro from "./components/intro";
import WhyChooseAileronsSection from "./components/whyChooseAilerons";

export default function HomePage() {

    return (
        <main>
            <Intro />
            <HowItWorksSection />
            <WhyChooseAileronsSection />
            <AgencyBenefits />
        </main>
    );
}