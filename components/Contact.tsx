
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { StickerSmile } from './Doodles';

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');
        setErrorMessage('');

        // Check if env vars are set
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setFormState('error');
            setErrorMessage('Faltan las claves de configuración (EmailJS). Revisa el archivo .env');
            return;
        }

        if (formRef.current) {
            try {
                await emailjs.sendForm(
                    serviceId,
                    templateId,
                    formRef.current,
                    publicKey
                );
                setFormState('sent');
                if (formRef.current) formRef.current.reset();
                setTimeout(() => setFormState('idle'), 5000);
            } catch (error: any) {
                console.error('FAILED...', error);
                setFormState('error');
                setErrorMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
                setTimeout(() => setFormState('idle'), 5000);
            }
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-12 shadow-2xl shadow-indigo-500/5 relative">
            {/* Decorative Scribble - Hidden on MD (Tablet) to avoid overlap, Visible on LG */}
            <div className="absolute -top-12 -right-12 z-20 hidden lg:block pointer-events-none">
                <StickerSmile className="w-24 h-24 text-pink-500 opacity-90 rotate-12" />
            </div>

            <h3 className="text-3xl md:text-5xl font-['Permanent_Marker'] mb-4 text-center text-white">
                Hablemos
            </h3>
            <p className="text-slate-400 text-center mb-8 font-mono text-xs md:text-sm">
                ¿Tienes un proyecto en mente? Escríbeme.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                    <label htmlFor="user_name" className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
                    <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                        placeholder="Tu nombre"
                    />
                </div>
                <div>
                    <label htmlFor="user_email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                    <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                        placeholder="tu@email.com"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Mensaje</label>
                    <textarea
                        name="message"
                        id="message"
                        required
                        rows={4}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder-slate-600"
                        placeholder="Cuéntame sobre tu idea..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={formState === 'sending' || formState === 'sent'}
                    className={`w-full font-bold py-3 md:py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg ${formState === 'error'
                        ? 'bg-red-500/10 text-red-500 border border-red-500/50'
                        : formState === 'sent'
                            ? 'bg-green-500/10 text-green-500 border border-green-500/50'
                            : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20'
                        } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {formState === 'idle' && (
                        <>
                            <span>Enviar Mensaje</span>
                            <Send size={18} />
                        </>
                    )}
                    {formState === 'sending' && (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Enviando...</span>
                        </>
                    )}
                    {formState === 'sent' && (
                        <>
                            <span>¡Mensaje Enviado!</span>
                            <CheckCircle2 size={18} />
                        </>
                    )}
                    {formState === 'error' && (
                        <>
                            <span>Error al enviar</span>
                            <AlertCircle size={18} />
                        </>
                    )}
                </button>

                {formState === 'error' && errorMessage && (
                    <p className="text-red-400 text-xs text-center mt-2">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

export default Contact;
