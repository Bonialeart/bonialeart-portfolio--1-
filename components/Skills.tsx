
import React from 'react';
import { motion } from 'framer-motion';

const SOFTWARE = [
    {
        name: "Photoshop",
        level: 95,
        color: "#31A8FF",
        path: "M2.5 2h19a.5.5 0 0 1 .5.5v19a.5.5 0 0 1-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5Zm6.5 5a3 3 0 0 1 3 3v4.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V10a1 1 0 0 0-1-1H8v5.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h2.5Zm6 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-1.5 1.5a1.5 1.5 0 0 1 1.5-1.5h.5v3h-.5a1.5 1.5 0 0 1-1.5-1.5Z" 
    },
    {
        name: "Illustrator",
        level: 90,
        color: "#FF9A00",
        path: "M2.5 2h19a.5.5 0 0 1 .5.5v19a.5.5 0 0 1-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5Zm7.854 5h-1.708L5.5 15h1.5l.75-2.143h3.5L12 15h1.5L10.354 7Zm-.854 2.286L10.667 11.5H8.333L9.5 9.286ZM16.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 4a1.5 1.5 0 0 1 1.5 1.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2A1.5 1.5 0 0 1 16.5 11Z"
    },
    {
        name: "After Effects",
        level: 80,
        color: "#9999FF",
        path: "M2.5 2h19a.5.5 0 0 1 .5.5v19a.5.5 0 0 1-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5Zm8.354 5h-1.708L6 15h1.5l.75-2.143h3.5L12.5 15H14l-3.146-8Zm-.854 2.286L11.167 11.5H8.833L10 9.286ZM15.5 11h3a.5.5 0 0 1 0 1h-3v1h3.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-3.5v1Z"
    },
    {
        name: "Blender",
        level: 85,
        color: "#EA7600",
        path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 2c1.8 0 3.5.6 4.9 1.6L12 10.5 7.1 5.6C8.5 4.6 10.2 4 12 4Zm-6.4 2.4 4.9 4.9-4.9 4.9C4.6 14.8 4 13.5 4 12c0-2.1.6-4 1.6-5.6Zm6.4 11.2c-1.8 0-3.5-.6-4.9-1.6l4.9-4.9 4.9 4.9c-1.4 1-3.1 1.6-4.9 1.6Zm6.4-2.4-4.9-4.9 4.9-4.9c1 1.4 1.6 3.1 1.6 4.9 0 2.1-.6 4-1.6 5.6Z"
    },
    {
        name: "Figma",
        level: 75,
        color: "#A259FF",
        path: "M12 2a4 4 0 0 0-4 4 4 4 0 0 0-4 4 4 4 0 0 0 4 4v4a4 4 0 1 0 8 0V6a4 4 0 0 0-4-4Zm0 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm2-2H8a2 2 0 1 1 0-4h6v4Zm0-6H8a2 2 0 1 1 2-2h2a2 2 0 0 1 2 2Z"
    }
];

const Skills = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {SOFTWARE.map((soft, index) => (
          <motion.div 
            key={soft.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            className="flex items-center gap-6"
          >
            {/* Logo Icon */}
            <div className="w-16 h-16 flex-shrink-0 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 group hover:border-indigo-500/50 transition-colors shadow-lg">
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8" 
                style={{ fill: soft.color }}
              >
                <path d={soft.path} />
              </svg>
            </div>

            {/* Bar Info */}
            <div className="flex-grow">
                <div className="flex justify-between mb-2">
                    <span className="font-bold text-lg tracking-wide text-slate-200">{soft.name}</span>
                    <span className="text-slate-500 font-mono text-sm">{soft.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${soft.level}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                        style={{ backgroundColor: soft.color }}
                    />
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
