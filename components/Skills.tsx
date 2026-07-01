
import React from 'react';
import { motion } from 'framer-motion';
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects, SiBlender } from 'react-icons/si';
import { Tape } from './Doodles';

// Custom SVG component for Clip Studio Paint
const ClipStudioPaintIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className={className} style={style}>
    <path d="M37,4H13c-4.962,0-9,4.037-9,9v24c0,4.963,4.038,9,9,9h24c4.962,0,9-4.037,9-9V13C46,8.037,41.962,4,37,4z M34.772,29.527c-0.95,0.745-1.795,1.109-2.082,1.218l-5.35,2.204c-0.064,0.027-0.091,0.105-0.055,0.168l0.75,1.15c0.268,0.427,0.373,0.832,0.373,1.309c0,1.736-1.523,2.15-2.313,2.15c-1.305,0-1.827-0.891-2.259-1.577l-2.786-4.4c-0.295-0.468-0.095-1.086,0.414-1.295l9.577-3.941c0.609-0.241,2.595-1.268,2.595-4.354c0-2.613-2.273-5.568-6.136-5.568c-1.477,0-3.409,0.795-3.409,0.795l-5.954,2.441c-1.773,0.732-1.773,1.404-1.773,1.764c0,0.018,0.086,1.591,2.045,1.591c0.2,0,0.805-0.091,1.636-0.432l5.909-2.445c1.227-0.505,3.136,0.15,3.136,2.023c0,1.027-0.595,1.395-1.495,1.763l-3.677,1.518l-2.145,0.886c-1.214,0.5-2.636,0.777-3.591,0.777c-3.863,0-6.363-2.663-6.363-5.681c0-1.859,0.795-4.404,4.591-5.963c0,0,0,0,2.059-0.845c0.859-0.359,2.077-0.859,3.804-1.573c0.559-0.232,1.123-0.464,1.859-0.641c0.745-0.177,1.659-0.295,2.913-0.295c7.272,0,11.136,5.454,11.136,9.886C38.181,26.023,36.34,28.291,34.772,29.527z" fill="currentColor" />
  </svg>
);

// New Affinity Icon
const AffinityIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg width="100%" height="100%" viewBox="0 0 240 240" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2, ...style }} className={className}>
    <rect x="0" y="0" width="240" height="240" style={{ fill: '#a7f175' }} />
    <path d="M112.908,165.979c-10.413,0 -17.037,-6.317 -17.037,-14.329c0,-34.287 90.164,-41.151 90.164,-77.563c0,-22.213 -25.731,-31.787 -58.577,-31.787c-19.98,0 -42.571,3.698 -63.552,10.315l0,43.438c30.919,-22.52 65.272,-32.16 87.4,-32.16c13.914,0 23.355,3.882 23.355,10.838c0,28.658 -124.353,24.117 -124.353,86.042c0,23.736 16.321,37.335 39.283,37.335c34.732,0 61.003,-33.753 80.657,-74.897l3.982,1.43c-10.351,25.143 -31.771,52.712 -35.943,70.434l44.715,0l0,-91.685l-10.327,0c-14.99,32.574 -36.957,62.59 -59.767,62.59" style={{ fill: '#000000', fillRule: 'nonzero' }} />
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
    color: "#a7f175",
    Icon: AffinityIcon
  }
];

const rotations = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-1'];

const Skills = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 relative">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 md:gap-x-10">
        {SOFTWARE.map((soft, index) => (
          <motion.div
            key={soft.name}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            whileHover={{ rotate: 0, y: -8, scale: 1.04 }}
            className={`relative w-[150px] sm:w-[170px] transform ${rotations[index % rotations.length]} hover:!rotate-0 transition-transform duration-300 group`}
          >
            {/* Tape holding the badge */}
            <Tape className="w-14 h-6 -top-3 left-1/2 -translate-x-1/2" rotate={index % 2 === 0 ? '-rotate-3' : 'rotate-3'} />

            {/* Paper Badge */}
            <div className="bg-[#faf6ec] rounded-sm shadow-[6px_6px_0px_rgba(0,0,0,0.35)] p-5 pt-8 border border-black/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply bg-[url('/assets/textures/paper.svg')]"></div>

              {/* Icon Stamp */}
              <div
                className="relative w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 border-2 border-dashed transition-colors group-hover:border-solid"
                style={{ borderColor: soft.color, backgroundColor: `${soft.color}1f` }}
              >
                <soft.Icon className="w-7 h-7 relative z-0" style={{ color: soft.color }} />
              </div>

              <p className="text-center font-['Permanent_Marker'] text-slate-900 text-base mb-3 leading-tight">
                {soft.name}
              </p>

              {/* Hand-drawn level meter */}
              <div className="flex justify-center gap-1.5 mb-1">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className="w-3 h-3 rounded-full border-2"
                    style={{
                      borderColor: soft.color,
                      backgroundColor: dot < Math.round(soft.level / 20) ? soft.color : 'transparent',
                    }}
                  />
                ))}
              </div>
              <p className="text-center font-mono text-[10px] text-slate-500 tracking-widest">{soft.level}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
