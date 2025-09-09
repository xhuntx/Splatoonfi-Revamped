import { useEffect, memo } from "react";
import { usePerformance } from './hooks/usePerformance';
import { Routes, Route, Link } from "react-router-dom"; 
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import Splatoon1Music from "./Other-pages/Splatoon1Music"

export const ScrollReveal = memo(({ children, className = 'my-8' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: 'easeOut'
      } 
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
});

const Splatoon1button = memo(() => {
  return (
      <Link
      to="/splatoon1"
      className='inline-flex items-center px-8 py-4 bg-zinc-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-xl'
      >
      Splatoon 1 Music 
      </Link>
  );
});


const App = memo(() => {
  usePerformance();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="min-h-screen bg-zinc-700 text-white">
              <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-20">
                <div className="text-center max-w-4xl mx-auto">
                  <ScrollReveal>
                    <h1 className="text-5xl md:text-6xl font-bold">
                      Hello Splatoonfi
                    </h1>
                  </ScrollReveal>
                </div>
              </section>

              <section className="min-h-screen flex gap-8 px-6 py-20 bg-zinc-600">
                <div className="rounded-xl p-8 bg-zinc-700 shadow-lg max-w-md text-center items-center flex flex-col justify-center">
                  <img src="/256px-Splatoon_Logo.svg.png" className="w-full h-full object-contain" alt="Splatoon logo"/>
                  <Splatoon1button/>
                </div>

                <div className="rounded-xl p-8 bg-zinc-700 shadow-lg max-w-md text-center flex flex-col"></div>
              </section>
            </div>
          </>
        }
      />
      <Route path="/splatoon1" element = {<Splatoon1Music/>}/>
    </Routes>
  );
});



export default App