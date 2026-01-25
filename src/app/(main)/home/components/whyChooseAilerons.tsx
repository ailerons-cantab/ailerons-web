type Benefit = {
    title: string;
    description: string;
    icon: string;
};

const benefits: Benefit[] = [
    {
        title: "Zero commission",
        description:
            "Keep 100% of your booking revenue without platform commission fees.",
        icon: "%",
    },
    {
        title: "Qualified leads",
        description:
            "Connect with travellers actively looking for expert support.",
        icon: "👥",
    },
    {
        title: "Business growth",
        description:
            "Build a pipeline of repeat clients with less admin overhead.",
        icon: "📈",
    },
    {
        title: "Digital tools",
        description:
            "Manage requests, offers, and conversions in one place.",
        icon: "🛠️",
    },
];

export default function WhyChooseAileronsSection() {
    return (
        <section>
            <div className="max-w-6xl mx-auto px-8 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold">Why choose ailerons</h2>
                    <p className="text-gray-600 mt-2">
                        Designed for modern travel agencies
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="border border-gray-200 rounded-lg p-6"
                        >
                            <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center mb-4 font-semibold">
                                {benefit.icon}
                            </div>

                            <h3 className="font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}