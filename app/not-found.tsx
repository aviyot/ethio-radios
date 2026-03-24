import Link from "next/link";

export default function NotFound() {
  return (
    <section className="w-full max-w-xl rounded-3xl border border-white/20 bg-surface/80 px-6 py-10 text-center shadow-2xl shadow-black/40 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-widest text-white/55">404</p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
        Station Not Available
      </h2>
      <p className="mt-3 text-sm text-white/70">
        The station you requested could not be found. Choose another radio
        station from the list below.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full border border-accent/70 bg-accent/10 px-6 py-2 text-xs font-semibold uppercase tracking-wide text-accent transition hover:bg-accent/20"
      >
        Back Home
      </Link>
    </section>
  );
}
