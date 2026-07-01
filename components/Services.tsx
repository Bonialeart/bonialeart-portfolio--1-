import { useTranslation } from 'react-i18next';
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { Palette, Box, Camera, ArrowRight } from 'lucide-react';
import { Tape } from './Doodles';

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'palette': return <Palette size={32} />;
        case 'box': return <Box size={32} />;
        case 'camera': return <Camera size={32} />;
        default: return <Palette size={32} />;
    }
};

const Services = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {SERVICES.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
                        whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                        whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
                        className="relative group"
                    >
                        {/* Tape Effect */}
                        <Tape className="-top-4 left-1/2 -translate-x-1/2 w-32 h-8" />

                        {/* Card Content */}
                        <div className="bg-[#faf6ec] text-slate-900 p-8 pt-12 rounded-sm shadow-[10px_10px_20px_rgba(0,0,0,0.5)] h-full flex flex-col relative overflow-hidden border border-black/5">

                            {/* Paper Texture Overlay */}
                            <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-multiply bg-[url('/assets/textures/paper.svg')]"></div>
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/assets/textures/noise.svg')]"></div>

                            <div className="mb-6 text-indigo-600 p-4 bg-indigo-50 rounded-full w-fit mx-auto border-2 border-dashed border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors duration-300">
                                {getIcon(service.icon)}
                            </div>

                            <h3 className="text-2xl font-['Permanent_Marker'] text-center mb-4 tracking-wide group-hover:text-indigo-600 transition-colors">
                                {t(`services.items.${service.id}.title`)}
                            </h3>

                            <p className="text-slate-600 text-center font-mono text-sm leading-relaxed mb-8 flex-grow">
                                {t(`services.items.${service.id}.description`)}
                            </p>

                            <div className="mt-auto border-t-2 border-dashed border-slate-200 pt-4 flex justify-between items-center">
                                <span className="font-bold font-['Space_Grotesk'] text-lg text-slate-800">
                                    {t(`services.items.${service.id}.price`)}
                                </span>
                                <a href="#contact" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-bold uppercase tracking-wider group/link">
                                    {t('services.cta')}
                                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
