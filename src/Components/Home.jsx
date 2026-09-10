  import React from "react";


  const Home = () => {
    
    
    return (
      <section id="home" className="min-h-screen pt-32 left-0 bg-linear-to-r right-0 from-violet-700 via-purple-600 to-fuchsia-500 overflow-x-hidden relative">
        
        <div className="w-full mx-auto px-10 pt-12">
          <div className="grid lg:grid-cols-2 items-center gap-10">

            <div className="py-5">
              <h1 className="text-white text-5xl text-left leading-tight font-semibold">
                Sed Imperdiet Enim Ii
                <br />
                Vitae <span className="font-bold">Viverra Justo</span>
              </h1>

              <p className="text-white/80 mt-8 text-lg text-left leading-8 max-w-md">
                Nam sollicitudin nunc, cursus eros vulputate sed. Vestibulum sit
                amet tortor sit amet libero lobortis.
              </p>

              <div className="flex items-center text-left gap-8 mt-10">
                <div className="flex items-center gap-3 cursor-pointer">
                  <img src="src\assets\Play.png" alt="" className="w-10" />

                  <span className="text-white hover:text-gray-950 text-sm">
                    WATCH VIDEO
                  </span>
                </div>

                <button className="bg-lime-400 hover:bg-gray-950 px-8 py-3 cursor-pointer rounded-full text-white font-semibold">
                  GET NOW
                </button>
              </div>
            </div>

            {/* Right */}

            <div className="flex justify-center">
              <img
                src="src\assets\Dashboard.png"
                alt=""
                className="w-full max-w-137.5 object-contain hover:scale-110 drop-shadow-2xl"
              />   
            </div>
          </div>
        </div>

        {/* Bottom Wave */}

        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg preserveAspectRatio="none" viewBox="0 0 1440 220" className="w-full" fill="white">
            <path d="M0,160L80,181.3C160,203,320,245,480,229.3C640,213,800,139,960,138.7C1120,139,1280,213,1360,250.7L1440,288V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z" />
          </svg>
        </div>
      </section>
    );
  };

  export default Home;
