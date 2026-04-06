import "./index.css";

export const App = () => {
  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-2xl px-4 py-16">
          {/* Hero Section */}
          <section className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Could&apos;ve Been Bollywood
            </h1>
            <p className="text-lg text-muted-foreground">
              Where would you have been born?
            </p>
          </section>

          {/* Optional Country Input Section */}
          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <p className="mb-4 text-sm text-muted-foreground">
              Check the odds for your actual country of origin
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter a country..."
                className="flex-1 rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="rounded-lg bg-secondary px-5 py-2.5 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                Check my odds
              </button>
            </div>

            {/* Country odds result card */}
            <div className="mt-4 rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Country Name</p>
              <p className="text-2xl font-bold text-primary">X.XX%</p>
            </div>
          </section>

          {/* Main Action Button */}
          <section className="mb-12 text-center">
            <button className="rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95">
              Where would I be born?
            </button>
          </section>

          {/* Results Card */}
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-3xl font-bold">Country Name</h2>
              <p className="text-4xl font-bold text-primary">XX.XX%</p>
              <p className="mt-1 text-sm text-muted-foreground">
                probability of being born here
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="mb-4 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
              <span className="text-muted-foreground">map goes here</span>
            </div>

            {/* Info Placeholder */}
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
              <span className="text-muted-foreground">info goes here</span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
