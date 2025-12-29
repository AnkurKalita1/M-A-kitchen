import coreValuesBg from "../../../assets/coreValuesBg.png"


const CoreValues = () => {
  return (
    <section className="relative w-[98vw] h-[98vh] flex items-center justify-center overflow-hidden bg-cover bg-center mx-auto align-middle" style={{ backgroundImage: `url(${coreValuesBg})` }}>
      {/* Background image placeholder */}
     

      {/* Centered content */}
      <div className=" z-10 text-center px-4 sm:px-6 lg:px-8 max-w-xl flex flex-col items-center justify-center gap-10 font-serif mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-stone-800 mb-16 ">
          CORE <br />VALUES
        </h2>
        <p className="text-md md:text-lg lg:text-2xl max-w-3xl leading-relaxed text-black  font-semibold mb-18">
          {/* Placeholder text content */}

          Values Beyond Expectetions <br /> Intergrity <br />Courage <br /> Transparency <br /> Diversity <br /> Leadership
        </p>
      </div>
    </section>
  );
};

export default CoreValues;

