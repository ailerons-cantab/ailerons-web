import AgencyBenefits from "../home/components/agencyBenefits";
import HowItWorksSection from "../home/components/howItWorks";
import Intro from "../home/components/intro";
import WhyChooseAileronsSection from "../home/components/whyChooseAilerons";

export default function Information() {

    return (
        <main>
            <Intro />
            <HowItWorksSection />
            <WhyChooseAileronsSection />
            <AgencyBenefits />
        </main>
    );
}