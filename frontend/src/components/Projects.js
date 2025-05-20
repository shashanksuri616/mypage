// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const projects = [
//   { title: "Project One", desc: "UI/UX & Development", img: "...", details: "Full details about Project One..." },
//   { title: "Project Two", desc: "E-commerce Platform", img: "...", details: "Full details about Project Two..." },
//   { title: "Project Three", desc: "Portfolio Website", img: "...", details: "Full details about Project Three..." },
//   { title: "Project Four", desc: "Portfolio Website", img: "...", details: "Full details about Project Four..." },
//   { title: "Project Five", desc: "Portfolio Website", img: "...", details: "Full details about Project Five..." },
//   { title: "Project Six", desc: "Portfolio Website", img: "...", details: "Full details about Project Six..." },
// ];

// const Projects = () => {
//   const [selected, setSelected] = useState(null);
//   const [rowsSplit, setRowsSplit] = useState(false);

//   const firstRow = projects.slice(0, 3);
//   const secondRow = projects.slice(3, 6);

//   // Animation variants for rows
//   const rowVariants = {
//     initial: { y: 0 },
//     split: (direction) => ({
//       y: direction === 'up' ? -120 : 120,
//       transition: { type: "spring", stiffness: 60, damping: 18, duration: 0.7 }
//     }),
//     reset: { y: 0, transition: { type: "spring", stiffness: 60, damping: 18, duration: 0.7 } }
//   };

//   // Handle open/close animation order
//   const handleCardClick = (i) => {
//     setRowsSplit(true);
//     setTimeout(() => setSelected(i), 500); // Wait for rows to split before showing popup
//   };
//   const handleClose = () => {
//     setSelected(null);
//     setTimeout(() => setRowsSplit(false), 500); // Wait for popup to close before rows come together
//   };

//   return (
//     <section className="relative overflow-hidden py-32 px-6">
//       {/* Static background layer */}
//       <div className="absolute inset-0 bg-gray-50 z-0" aria-hidden="true" />
//       <h2 className="text-5xl font-bold mb-16 text-center relative z-10">Selected Work</h2>
//       <div className="max-w-6xl mx-auto relative z-10" style={{ minHeight: "700px" }}>
//         <div className="grid grid-cols-1 gap-8">
//           {/* First Row */}
//           <motion.div
//             className="flex justify-center gap-8"
//             variants={rowVariants}
//             animate={rowsSplit ? "split" : "reset"}
//             custom="up"
//           >
//             {firstRow.map((proj, i) => (
//               <motion.div
//                 key={proj.title}
//                 className={`group relative overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg cursor-pointer transition-all duration-500 ${
//                   selected === i ? "ring-4 ring-purple-500" : ""
//                 }`}
//                 onClick={() => handleCardClick(i)}
//                 whileHover={{ scale: 1.05 }}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: i * 0.12
//                 }}
//               >
//                 <img src={proj.img} alt={proj.title} className="w-64 h-48 object-cover" />
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
//                   <div className="text-center text-white">
//                     <h3 className="text-2xl font-bold">{proj.title}</h3>
//                     <p className="text-sm mt-2">{proj.desc}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Details Panel */}
//           <AnimatePresence
//             onExitComplete={() => setRowsSplit(false)}
//           >
//             {selected !== null && (
//               <motion.div
//                 key="details"
//                 initial={{ opacity: 0, scale: 0.92, y: 40 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.92, y: 40 }}
//                 transition={{
//                   duration: 0.6,
//                   ease: "easeInOut",
//                   delay: 0.3
//                 }}
//                 className="mx-auto bg-white rounded-2xl shadow-2xl p-12 max-w-4xl w-full relative z-20"
//                 style={{ minHeight: "340px", margin: "0 auto" }}
//               >
//                 <button
//                   className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-red-500"
//                   onClick={handleClose}
//                   aria-label="Close"
//                 >
//                   &times;
//                 </button>
//                 <h3 className="text-4xl font-bold mb-6">{projects[selected].title}</h3>
//                 <p className="mb-6 text-lg">{projects[selected].details}</p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Second Row */}
//           <motion.div
//             className="flex justify-center gap-8"
//             variants={rowVariants}
//             animate={rowsSplit ? "split" : "reset"}
//             custom="down"
//           >
//             {secondRow.map((proj, i) => (
//               <motion.div
//                 key={proj.title}
//                 className={`group relative overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg cursor-pointer transition-all duration-500 ${
//                   selected === i + 3 ? "ring-4 ring-purple-500" : ""
//                 }`}
//                 onClick={() => handleCardClick(i + 3)}
//                 whileHover={{ scale: 1.05 }}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: i * 0.12 + 0.36
//                 }}
//               >
//                 <img src={proj.img} alt={proj.title} className="w-64 h-48 object-cover" />
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
//                   <div className="text-center text-white">
//                     <h3 className="text-2xl font-bold">{proj.title}</h3>
//                     <p className="text-sm mt-2">{proj.desc}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;
import { motion } from 'framer-motion';

const projects = [
  { title: "Project One", desc: "UI/UX & Development", img: "...", details: "Full details about Project One..." },
  { title: "Project Two", desc: "E-commerce Platform", img: "...", details: "Full details about Project Two..." },
  { title: "Project Three", desc: "Portfolio Website", img: "...", details: "Full details about Project Three..." },
  { title: "Project Four", desc: "Portfolio Website", img: "...", details: "Full details about Project Four..." },
  { title: "Project Five", desc: "Portfolio Website", img: "...", details: "Full details about Project Five..." },
  { title: "Project Six", desc: "Portfolio Website", img: "...", details: "Full details about Project Six..." },
];

const Projects = () => (
  <section id="projects" className="relative overflow-hidden py-32 px-6">
    <div className="absolute inset-0 bg-gray-50 z-0" aria-hidden="true" />
    <h2 className="text-5xl font-bold mb-16 text-center relative z-10">Selected Work</h2>
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.title}
            className="group relative overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg cursor-pointer transition-all duration-500 bg-white"
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: i * 0.12
            }}
          >
            <img src={proj.img} alt={proj.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{proj.title}</h3>
              <p className="text-gray-600">{proj.desc}</p>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">View Details</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;