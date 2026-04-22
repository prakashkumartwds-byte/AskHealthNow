import React from "react";

const Trust = () => {
  return (
    <section className="py-16 bg-[var(--color-white)] px-4">
      <div className="max-w-[var(--container-max-width)] mx-auto">

        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 md:w-32 border-t border-dashed border-[var(--color-border-grey)]"></div>

          <h2 className="text-[var(--font-size-h2)] font-[var(--font-weight-semibold)] text-[var(--color-primary-blue)] text-center">
            Privacy & Security You Can Trust
          </h2>

          <div className="h-px w-16 md:w-32 border-t border-dashed border-[var(--color-border-grey)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Doctor Card */}
          <div className="flex flex-col sm:flex-row items-center p-[var(--card-padding)] bg-[var(--color-bg-light)] rounded-[var(--card-radius)] border border-[var(--color-border-grey)] shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]">

            <div className="w-32 h-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 overflow-hidden rounded-[var(--radius-md)]">
              <img
                src="https://img.freepik.com/free-photo/smiling-doctor-with-arms-crossed_107420-84733.jpg"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-[var(--font-size-h3)] font-[var(--font-weight-semibold)] text-[var(--color-text-dark)]">
                Are You a{" "}
                <span className="text-[var(--color-primary-blue)]">
                  Doctor?
                </span>
              </h3>

              <p className="text-[var(--color-text-grey)] text-[var(--font-size-body-sm)] mb-6">
                Join us & get quality patients
              </p>

              <button className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)] rounded-[var(--btn-radius)] text-[var(--btn-font-size)] font-[var(--btn-font-weight)] hover:opacity-90 transition-[var(--transition-fast)] shadow-[var(--shadow-soft)]">
                Register as Doctor
              </button>
            </div>
          </div>

          {/* Medical Store Card */}
          <div className="flex flex-col sm:flex-row items-center p-[var(--card-padding)] bg-[var(--color-bg-light)] rounded-[var(--card-radius)] border border-[var(--color-border-grey)] shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]">

            <div className="w-32 h-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 bg-[var(--color-white)] rounded-[var(--radius-md)] flex items-center justify-center p-4">
              <div className="text-5xl">🏪</div>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-[var(--font-size-h3)] font-[var(--font-weight-semibold)] text-[var(--color-text-dark)]">
                Own a{" "}
                <span className="text-[var(--color-warning)]">
                  Medical Store?
                </span>
              </h3>

              <p className="text-[var(--color-text-grey)] text-[var(--font-size-body-sm)] mb-6">
                Get discovered by nearby users
              </p>

              <button className="bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)] rounded-[var(--btn-radius)] text-[var(--btn-font-size)] font-[var(--btn-font-weight)] hover:opacity-90 transition-[var(--transition-fast)] shadow-[var(--shadow-soft)]">
                Register Medical Store
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Trust;