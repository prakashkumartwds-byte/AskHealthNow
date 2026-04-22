import React, { useEffect } from "react";
import { Check, X } from "lucide-react";

const plans = [
  {
    id: 1,
    title: "Basic",
    price: "19",
    period: "per month",
    color: "bg-sky-500",
    features: [
      { text: "Sample Text Here", included: true },
      { text: "Text Space Goes Here", included: false },
      { text: "Description Space", included: false },
      { text: "Sample Text Here", included: false },
    ],
    buttonText: "Buy Now",
  },
  {
    id: 2,
    title: "Standard",
    price: "29",
    period: "per month",
    color: "bg-cyan-500",
    features: [
      { text: "Sample Text Here", included: true },
      { text: "Text Space Goes Here", included: true },
      { text: "Description Space", included: false },
      { text: "Sample Text Here", included: false },
    ],
    buttonText: "Buy Now",
    featured: true,
  },
  {
    id: 3,
    title: "Premium",
    price: "39",
    period: "per month",
    color: "bg-blue-700",
    features: [
      { text: "Sample Text Here", included: true },
      { text: "Text Space Goes Here", included: true },
      { text: "Description Space", included: true },
      { text: "Sample Text Here", included: true },
    ],
    buttonText: "Buy Now",
  },
];

const PriceTableWithAnimation = () => {
  useEffect(() => {
    const scriptId = "dotlottie-player-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js";
      script.type = "module";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="bg-[#f5f7fb] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
          {/* Left Animation Side */}
          <div className="flex min-h-[320px] items-center justify-center bg-[#083f7a] px-6 py-10">
            <div className="text-center">
              <dotlottie-wc
                src="https://lottie.host/f87bb689-18f2-4471-a66d-c8921355fe0a/5IihnegNYN.lottie"
                style={{ width: "280px", height: "280px", margin: "0 auto" }}
                autoplay
                loop
              ></dotlottie-wc>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Choose Your Plan
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Flexible pricing for your business needs
              </p>
            </div>
          </div>

          {/* Right Pricing Cards */}
          <div className="bg-[#f8fafc] px-6 py-10 md:px-8">
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:-translate-y-5 ${
                    plan.featured ? "scale-[1.03]" : ""
                  }`}
                >
                  {/* Top Badge */}
                  <div className="relative flex justify-center pt-5">
                    <div
                      className={`${plan.color} min-w-[145px] rounded-b-[24px] rounded-t-[16px] px-6 py-3 text-center text-lg font-semibold text-white shadow`}
                    >
                      {plan.title}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="px-8 pt-6 text-center">
                    <div className="flex items-start justify-center gap-2">
                      <span className="text-5xl font-extrabold leading-none text-[#4a4a4a]">
                        ${plan.price}
                      </span>
                      <span className="pt-2 text-xs font-semibold uppercase tracking-wide text-[#555]">
                        {plan.period}
                      </span>
                    </div>

                    <div className="mx-auto mt-5 h-[1px] w-24 bg-gray-300"></div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-5 px-8 py-8">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm font-medium text-[#555]"
                      >
                        {feature.included ? (
                          <Check
                            className="h-5 w-5 shrink-0 text-green-600"
                            strokeWidth={3}
                          />
                        ) : (
                          <X
                            className="h-5 w-5 shrink-0 text-red-500"
                            strokeWidth={3}
                          />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto px-8 pb-8">
                    <div className="mx-auto mb-5 h-[1px] w-24 bg-gray-300"></div>
                    <button className="w-full rounded-full border border-transparent bg-transparent py-3 text-lg font-bold tracking-[0.2em] text-[#4a4a4a] transition hover:bg-gray-100">
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceTableWithAnimation;
