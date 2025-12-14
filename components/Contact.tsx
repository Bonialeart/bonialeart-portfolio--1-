
import { useTranslation } from 'react-i18next';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { StickerSmile } from './Doodles';

const Tape = ({ className }: { className?: string }) => (
    <div className={`absolute h-8 w-32 bg-[#e2d5b5]/90 backdrop-blur-sm shadow-sm z-20 ${className}`}></div>
);

const Contact = () => {
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');
        setErrorMessage('');

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
                setErrorMessage(t('contact.errorMessage'));
                setTimeout(() => setFormState('idle'), 5000);
            }
        }
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            {/* Paper Container */}
            <div className="bg-[#fcfbf9] text-slate-800 rounded-sm p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,0.2)] transform -rotate-1 relative z-10">

                {/* Tape Elements */}
                <Tape className="-top-4 left-1/2 -translate-x-1/2 -rotate-2" />
                <Tape className="hidden md:block -bottom-4 right-12 rotate-1" />

                {/* Decorative Sticker */}
                <div className="absolute -top-8 -right-8 z-30 hidden lg:block pointer-events-none">
                    <StickerSmile className="w-24 h-24 text-pink-500 opacity-90 rotate-12 drop-shadow-md" />
                </div>

                <h3 className="text-3xl md:text-5xl font-['Permanent_Marker'] mb-4 text-center text-slate-900">
                    {t('contact.title')}
                </h3>
                <p className="text-slate-500 text-center mb-8 font-['Space_Grotesk'] text-sm md:text-base border-b-2 border-indigo-100 pb-4">
                    {t('contact.subtitle')}
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="user_name" className="block text-sm font-bold font-['Space_Grotesk'] text-slate-700 mb-1">{t('contact.name')}</label>
                        <input
                            type="text"
                            name="user_name"
                            id="user_name"
                            required
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-sm px-4 py-3 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder-slate-400 font-['Space_Grotesk']"
                            placeholder={t('contact.namePlaceholder')}
                        />
                    </div>
                    <div>
                        <label htmlFor="user_email" className="block text-sm font-bold font-['Space_Grotesk'] text-slate-700 mb-1">{t('contact.email')}</label>
                        <input
                            type="email"
                            name="user_email"
                            id="user_email"
                            required
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-sm px-4 py-3 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder-slate-400 font-['Space_Grotesk']"
                            placeholder={t('contact.emailPlaceholder')}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-bold font-['Space_Grotesk'] text-slate-700 mb-1">{t('contact.message')}</label>
                        <textarea
                            name="message"
                            id="message"
                            required
                            rows={4}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-sm px-4 py-3 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none placeholder-slate-400 font-['Space_Grotesk']"
                            placeholder={t('contact.messagePlaceholder')}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={formState === 'sending' || formState === 'sent'}
                        className={`w-full font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest border-2 ${formState === 'error'
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : formState === 'sent'
                                ? 'bg-green-50 text-green-600 border-green-200'
                                : 'bg-slate-900 text-white border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1'
                            } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {formState === 'idle' && (
                            <>
                                <span>{t('contact.submit')}</span>
                                <Send size={16} />
                            </>
                        )}
                        {formState === 'sending' && (
                            <>
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                <span>{t('contact.sending')}</span>
                            </>
                        )}
                        {formState === 'sent' && (
                            <>
                                <span>{t('contact.sent')}</span>
                                <CheckCircle2 size={16} />
                            </>
                        )}
                        {formState === 'error' && (
                            <>
                                <span>{t('contact.error')}</span>
                                <AlertCircle size={16} />
                            </>
                        )}
                    </button>

                    {formState === 'error' && errorMessage && (
                        <p className="text-red-500 text-xs text-center mt-2 font-['Space_Grotesk'] bg-red-50 p-2 rounded border border-red-100">{errorMessage}</p>
                    )}
                </form>
            </div>

            {/* Background Sheet Layer for messy stack effect */}
            <div className="absolute inset-0 bg-slate-200 transform rotate-2 rounded-sm shadow-sm z-0"></div>
        </div>
    );
};

export default Contact;
