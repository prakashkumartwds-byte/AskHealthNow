import React from "react";
import TiltedCard from "./TiltedCard";
import {
  MapPin,
  Search,
  ChevronDown,
  MessageCircle,
  Send,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_right,var(--color-ai-bubble-bg),var(--color-white),var(--color-bg-light))] pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-[rgba(47,191,113,0.12)] blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute top-10 right-0 h-60 w-60 rounded-full bg-[rgba(30,107,214,0.10)] blur-3xl sm:top-20 sm:h-80 sm:w-80" />

      <div className="relative mx-auto max-w-[var(--container-max-width)] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="text-center lg:text-left">
            <h1 className="mx-auto max-w-2xl text-[var(--font-size-h1)] font-[var(--font-weight-bold)] leading-[var(--line-height-heading)] text-[var(--color-text-dark)] lg:mx-0">
              Your Personal{" "}
              <span className="text-[var(--color-primary-green)]">Health</span>
              <br />
              Companion – Anytime, Anywhere.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[var(--font-size-body-lg)] leading-[var(--line-height-body)] text-[var(--color-text-grey)] sm:mt-6 lg:mx-0">
              Talk to our AI health assistant, get safe guidance, diet advice,
              and connect with trusted doctors & medical stores near you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <button className="rounded-[var(--btn-radius)] bg-[var(--btn-primary-bg)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)] text-[var(--btn-font-size)] font-[var(--btn-font-weight)] text-[var(--btn-primary-text)] shadow-[var(--shadow-soft)] transition hover:opacity-90">
                Start Free Health Chat
              </button>

              <button className="rounded-[var(--btn-radius)] bg-[var(--btn-secondary-bg)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)] text-[var(--btn-font-size)] font-[var(--btn-font-weight)] text-[var(--btn-secondary-text)] shadow-[var(--shadow-soft)] transition hover:opacity-90">
                Consult Doctor Near Me
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md sm:max-w-xl lg:max-w-2xl">
            <TiltedCard
              containerHeight="420px"
              containerWidth="100%"
              imageHeight="420px"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1.05}
              showMobileWarning={false}
              displayOverlayContent
              overlayContent={
                <div className="relative rounded-[var(--radius-lg)] border border-[var(--color-border-grey)] bg-[var(--color-white)] p-3 shadow-[0_30px_80px_rgba(16,24,40,0.12)] sm:p-4">
                  <div className="rounded-[var(--radius-lg)] bg-[linear-gradient(to_right,var(--color-white),var(--color-ai-bubble-bg))] p-3 sm:p-4">
                    <div className="mb-4 flex items-center gap-2 border-b border-[var(--color-border-grey)] pb-3">
                      <div className="h-3 w-3 rounded-full bg-[var(--color-error)] opacity-50" />
                      <div className="h-3 w-3 rounded-full bg-[var(--color-warning)] opacity-50" />
                      <div className="h-3 w-3 rounded-full bg-[var(--color-success)] opacity-50" />
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-[var(--card-radius)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow-soft)] sm:p-5">
                        <p className="text-[var(--font-size-body-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-dark)]">
                          AI Health Chat
                        </p>
                        <p className="mt-2 text-[var(--font-size-body-sm)] text-[var(--color-text-grey)]">
                          Free general guidance for everyday health questions.
                        </p>

                        <div className="mt-4 flex items-center rounded-[var(--btn-radius)] border border-[var(--color-border-grey)] bg-[var(--color-bg-light)] px-3 py-2">
                          <Search className="mr-2 h-4 w-4 shrink-0 text-[var(--color-text-grey)]" />
                          <input
                            type="text"
                            placeholder="Ask a health question..."
                            disabled
                            className="w-full bg-transparent text-[var(--font-size-body-sm)] outline-none placeholder:text-[var(--color-text-grey)]"
                          />
                          <button className="ml-2 rounded-[var(--radius-sm)] bg-[var(--btn-primary-bg)] px-3 py-1.5 text-[var(--font-size-caption)] font-[var(--font-weight-medium)] text-[var(--btn-primary-text)]">
                            Ask
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <div className="rounded-[var(--card-radius)] bg-[var(--color-white)] p-3 text-center shadow-[var(--shadow-soft)] sm:p-4">
                          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(47,191,113,0.12)] sm:h-10 sm:w-10">
                            💬
                          </div>
                          <p className="text-[var(--font-size-caption)] font-[var(--font-weight-semibold)] text-[var(--color-text-dark)] sm:text-[var(--font-size-body-sm)]">
                            Chat
                          </p>
                        </div>

                        <div className="rounded-[var(--card-radius)] bg-[var(--color-white)] p-3 text-center shadow-[var(--shadow-soft)] sm:p-4">
                          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(30,107,214,0.12)] sm:h-10 sm:w-10">
                            👨‍⚕️
                          </div>
                          <p className="text-[var(--font-size-caption)] font-[var(--font-weight-semibold)] text-[var(--color-text-dark)] sm:text-[var(--font-size-body-sm)]">
                            Doctors
                          </p>
                        </div>

                        <div className="rounded-[var(--card-radius)] bg-[var(--color-white)] p-3 text-center shadow-[var(--shadow-soft)] sm:p-4">
                          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(247,144,9,0.14)] sm:h-10 sm:w-10">
                            🏥
                          </div>
                          <p className="text-[var(--font-size-caption)] font-[var(--font-weight-semibold)] text-[var(--color-text-dark)] sm:text-[var(--font-size-body-sm)]">
                            Stores
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />

            {/* <div className="mt-4 w-full rounded-[var(--card-radius)] border border-[var(--color-border-grey)] bg-[var(--color-white)] p-4 shadow-[0_20px_60px_rgba(16,24,40,0.10)] sm:mx-auto sm:mt-6 sm:max-w-xs lg:absolute lg:-right-6 lg:top-16 lg:mt-0 lg:w-60">
              <div className="rounded-[var(--card-radius)] bg-[linear-gradient(to_right,var(--color-ai-bubble-bg),var(--color-white))] p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(30,107,214,0.12)] text-2xl">
                    👨‍⚕️
                  </div>
                  <div>
                    <p className="text-[var(--font-size-body-sm)] font-[var(--font-weight-bold)] text-[var(--color-text-dark)]">
                      HealthBuddy
                    </p>
                    <p className="text-[var(--font-size-caption)] text-[var(--color-text-grey)]">
                      AI assistant
                    </p>
                  </div>
                </div>

                <div className="rounded-[var(--card-radius)] bg-[rgba(247,144,9,0.10)] px-3 py-2 text-[var(--font-size-body-sm)] text-[var(--color-text-dark)] shadow-[var(--shadow-soft)]">
                  Hi 👋 your health buddy is here to help.
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-border-grey)] px-3 py-2">
                  <MessageCircle className="h-4 w-4 shrink-0 text-[var(--color-text-grey)]" />
                  <input
                    type="text"
                    placeholder="Type here..."
                    disabled
                    className="w-full text-[var(--font-size-body-sm)] outline-none placeholder:text-[var(--color-text-grey)]"
                  />
                  <button className="rounded-[var(--radius-sm)] bg-[var(--btn-secondary-bg)] p-2 text-[var(--btn-secondary-text)]">
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 max-w-5xl sm:mt-12">
          <div className="flex flex-col gap-3 rounded-[var(--card-radius)] border border-[var(--color-border-grey)] bg-[rgba(255,255,255,0.92)] p-3 shadow-[0_20px_60px_rgba(16,24,40,0.08)] backdrop-blur md:flex-row md:items-center">
            <div className="flex flex-1 items-center rounded-[var(--btn-radius)] px-4 py-3">
              <MapPin className="mr-3 h-5 w-5 shrink-0 text-[var(--color-primary-green)]" />
              <input
                type="text"
                placeholder="Find doctors & medical stores near you"
                className="w-full bg-transparent text-[var(--font-size-body-sm)] text-[var(--color-text-dark)] outline-none placeholder:text-[var(--color-text-grey)] sm:text-[var(--font-size-body-lg)]"
              />
            </div>

            <div className="relative flex items-center rounded-[var(--btn-radius)] border border-[var(--color-border-grey)] bg-[var(--color-bg-light)] px-4 py-3 text-[var(--color-text-grey)] transition focus-within:border-[var(--input-focus-border-color)] md:min-h-full md:w-44">
              <select className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-[var(--font-size-body-sm)] font-[var(--font-weight-medium)] outline-none">
                <option value="doctor">Doctor</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="hospital">Hospital</option>
                <option value="clinic">Clinic</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 h-3 w-3 text-[var(--color-text-grey)]" />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-[var(--btn-radius)] bg-[var(--btn-primary-bg)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)] font-[var(--btn-font-weight)] text-[var(--btn-primary-text)] transition hover:opacity-90">
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;