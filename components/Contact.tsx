
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');
        // Simulate sending
        setTimeout(() => {
            setFormState('sent');
            setTimeout(() => setFormState('idle'), 3000);
        }, 1500);
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-12 shadow-2xl shadow-indigo-500/5 relative">
            {/* Decorative Scribble - Hidden on MD (Tablet) to avoid overlap, Visible on LG */}
            <div className="absolute -top-8 -right-8 w-16 h-16 text-pink-500 opacity-80 transform rotate-12 pointer-events-none hidden lg:block">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20,50 Q50,20 80,50 T50,80 T20,50" />
                    <path d="M50,20 L50,80" />
                    <path d="M20,50 L80,50" />
                </svg>
            </div>

            <h3 className="text-3xl md:text-5xl font-['Permanent_Marker'] mb-4 text-center text-white">
                Hablemos
            </h3>
            <p className="text-slate-400 text-center mb-8 font-mono text-xs md:text-sm">
                ¿Tienes un proyecto en mente? Escríbeme.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                        placeholder="Tu nombre"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                        placeholder="tu@email.com"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Mensaje</label>
                    <textarea 
                        id="message" 
                        required
                        rows={4}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder-slate-600"
                        placeholder="Cuéntame sobre tu idea..."
                    />
                </div>

                <button 
                    type="submit"
                    disabled={formState !== 'idle'}
                    className="w-full bg-indigo-600 text-white font-bold py-3 md:py-4 rounded-lg hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
                >
                    {formState === 'idle' && (
                        <>
                            <span>Enviar Mensaje</span>
                            <Send size={18} />
                        </>
                    )}
                    {formState === 'sending' && <span>Enviando...</span>}
                    {formState === 'sent' && <span>¡Mensaje Enviado!</span>}
                </button>
            </form>
        </div>
    );
};

export default Contact;
