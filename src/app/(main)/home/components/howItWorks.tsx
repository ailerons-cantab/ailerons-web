type Step = { title: string; description: string; icon: string };

const steps: Step[] = [
    { title: "Create your profile", description: "Set up and showcase your agency, specialities, and travel services so travellers can find you.", icon: "👤" },
    { title: "Browse travel requests", description: "Access a steady stream of qualified requests and filter by destination, budget, and preferences.", icon: "🔍" },
    { title: "Submit your offers", description: "Send personalised, competitive offers directly to clients without commission fees.", icon: "✈️" },
];

export default function HowItWorksSection() {
    return (
        <section className="border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-8 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold">How it works</h2>
                    <p className="text-gray-600 mt-2">Start winning new travel clients in three simple steps</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div key={step.title} className="border border-gray-200 rounded-lg p-6">
                            <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center mb-4 text-lg">{step.icon}</div>
                            <h3 className="font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}