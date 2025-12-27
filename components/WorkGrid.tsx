export type Brand = {
  id: string | number;
  name: string;
  logo: string; // ex: "/brands/disney.svg"
};

export default function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <section className="bg-white text-black py-16">
      <div className="px-6 sm:px-10 lg:px-14">
        {/* Titre style screenshot */}
        <div className="flex items-center gap-6">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            ILS NOUS FONT CONFIANCE
          </h3>
          <span className="h-[2px] w-20 bg-black/80" />
        </div>

        {/* Logos: petits, réguliers */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-x-10 gap-y-10">
          {brands.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-center"
              title={b.name}
            >
              {/* Logo */}
              <img
              src={b.logo}
              alt={b.name}
              className="h-12 sm:h-14 md:h-16 w-auto opacity-90 hover:opacity-100 transition"
              loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
