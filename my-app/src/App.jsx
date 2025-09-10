import { useEffect, memo } from "react";
import { usePerformance } from './hooks/usePerformance';
import { Routes, Route, Link } from "react-router-dom"; 
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react"
import Splatoon1Music from "./Other-pages/Splatoon1Music"
import Splatoon2Music from "./Other-pages/Splatoon2Music"

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

const Splatoon2button = memo(() => {
  return (
      <Link
      to="/splatoon2"
      className='inline-flex items-center px-8 py-4 bg-zinc-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-xl'
      >
      Splatoon 2 Music 
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
              <section className="min-h-screen flex items-center justify-center bg-zinc-600 px-4 gap-10">
                <ScrollReveal className="w-full md:w-auto">
                  <div className="rounded-xl p-8 bg-zinc-700 shadow-lg max-w-md text-center items-center flex flex-col justify-center">
                    <img src="/256px-Splatoon_Logo.svg.png" className="w-full h-full object-contain mb-6" alt="Splatoon logo"/>
                    <Splatoon1button/>
                  </div>
                </ScrollReveal>
                <ScrollReveal className="w-full md:w-auto">
                  <div className="rounded-xl p-8 bg-zinc-700 shadow-lg max-w-md text-center items-center flex flex-col justify-center">
                    <img src="/pngegg.png" className="w-full hfull object-contain mb-6" alt="Splatoon 2 logo "/>
                    <Splatoon2button/>
                  </div>
                </ScrollReveal>
              </section>
            </div>
            <SpeedInsights />
            <Analytics />
          </>
        }
      />
      <Route path="/splatoon1" element = {<Splatoon1Music/>}/>
      <Route path="/splatoon2" element = {<Splatoon2Music/>}/>
    </Routes>

  );
});



export default App