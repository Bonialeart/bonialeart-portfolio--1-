
import React from 'react';
import { motion } from 'framer-motion';
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects, SiBlender, SiAffinity } from 'react-icons/si';

// Custom SVG component for Clip Studio Paint
const ClipStudioPaintIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className={className} style={style}>
    <path d="M37,4H13c-4.962,0-9,4.037-9,9v24c0,4.963,4.038,9,9,9h24c4.962,0,9-4.037,9-9V13C46,8.037,41.962,4,37,4z M34.772,29.527c-0.95,0.745-1.795,1.109-2.082,1.218l-5.35,2.204c-0.064,0.027-0.091,0.105-0.055,0.168l0.75,1.15c0.268,0.427,0.373,0.832,0.373,1.309c0,1.736-1.523,2.15-2.313,2.15c-1.305,0-1.827-0.891-2.259-1.577l-2.786-4.4c-0.295-0.468-0.095-1.086,0.414-1.295l9.577-3.941c0.609-0.241,2.595-1.268,2.595-4.354c0-2.613-2.273-5.568-6.136-5.568c-1.477,0-3.409,0.795-3.409,0.795l-5.954,2.441c-1.773,0.732-1.773,1.404-1.773,1.764c0,0.018,0.086,1.591,2.045,1.591c0.2,0,0.805-0.091,1.636-0.432l5.909-2.445c1.227-0.505,3.136,0.15,3.136,2.023c0,1.027-0.595,1.395-1.495,1.763l-3.677,1.518l-2.145,0.886c-1.214,0.5-2.636,0.777-3.591,0.777c-3.863,0-6.363-2.663-6.363-5.681c0-1.859,0.795-4.404,4.591-5.963c0,0,0,0,2.059-0.845c0.859-0.359,2.077-0.859,3.804-1.573c0.559-0.232,1.123-0.464,1.859-0.641c0.745-0.177,1.659-0.295,2.913-0.295c7.272,0,11.136,5.454,11.136,9.886C38.181,26.023,36.34,28.291,34.772,29.527z" fill="currentColor" />
  </svg>
);

const SOFTWARE = [
  {
    name: "Photoshop",
    level: 95,
    color: "#31A8FF",
    Icon: SiAdobephotoshop
  },
  {
    name: "Illustrator",
    level: 90,
    color: "#FF9A00",
    Icon: SiAdobeillustrator
  },
  {
    name: "After Effects",
    level: 80,
    color: "#9999FF",
    Icon: SiAdobeaftereffects
  },
  {
    name: "Blender",
    level: 85,
    color: "#EA7600",
    Icon: SiBlender
  },
  {
    name: "Clip Studio Paint",
    level: 95,
    color: "#FF6B6B",
    Icon: ClipStudioPaintIcon
  },
  {
    name: "Affinity",
    level: 60,
    color: "#1B72BE",
    Icon: SiAffinity
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
              <soft.Icon
                className="w-8 h-8"
                style={{ color: soft.color }}
              />
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
