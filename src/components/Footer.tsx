import React from 'react';
import { Instagram, Phone, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react';

export const Footer = () => {
    return (
        <footer id="contato" className="bg-green-700 text-white relative z-10 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12 mb-16">

                    {/* Column 1: Brand & Contact */}
                    <div className="space-y-8">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <img
                                src="/logo.png"
                                alt="RK9 CSS Logo"
                                width={64}
                                height={64}
                                loading="lazy"
                                className="h-16 w-auto rounded-full shadow-lg shadow-yellow-500/20 border-2 border-yellow-500/20"
                            />
                            <div>
                                <h3 className="text-2xl font-black text-white leading-none tracking-tight">RK9</h3>
                                <p className="text-yellow-300 text-xs font-bold tracking-[0.2em] uppercase mt-1">CT e Hotel</p>
                            </div>
                        </div>

                        {/* Contact List */}
                        <div className="space-y-4">
                            <h4 className="text-yellow-300 font-bold uppercase tracking-wider text-sm border-b border-yellow-300/30 pb-2 inline-block">
                                Fale Conosco
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <a href="https://wa.me/5528999574221" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group min-h-[48px]">
                                        <div className="bg-white/5 p-3.5 rounded-xl group-hover:bg-yellow-400/20 transition-all duration-300 border border-white/5 group-hover:border-yellow-400/30">
                                            <Phone className="text-yellow-400 w-5 h-5" />
                                        </div>
                                        <span className="text-gray-100 group-hover:text-white transition-colors font-medium">+55 (28) 99957-4221</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:contato@rk9.com.br" className="flex items-center gap-4 group min-h-[48px]">
                                        <div className="bg-white/5 p-3.5 rounded-xl group-hover:bg-yellow-400/20 transition-all duration-300 border border-white/5 group-hover:border-yellow-400/30">
                                            <Mail className="text-yellow-400 w-5 h-5" />
                                        </div>
                                        <span className="text-gray-100 group-hover:text-white transition-colors font-medium">contato@rk9.com.br</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/ctromeirok9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group min-h-[48px]">
                                        <div className="bg-white/5 p-3.5 rounded-xl group-hover:bg-yellow-400/20 transition-all duration-300 border border-white/5 group-hover:border-yellow-400/30">
                                            <Instagram className="text-yellow-400 w-5 h-5" />
                                        </div>
                                        <span className="text-gray-100 group-hover:text-white transition-colors font-medium">@ctromeirok9</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Location & Map */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-yellow-300 font-bold uppercase tracking-wider text-sm border-b border-yellow-300/30 pb-2 inline-block mb-4">
                                Localização
                            </h4>
                            <div className="flex items-start gap-3 text-gray-100 mb-6">
                                <MapPin className="text-yellow-400 w-5 h-5 shrink-0 mt-1" />
                                <p className="leading-relaxed">R. dos Marlins, 741 - Guanabara<br />Anchieta - ES, 29230-000</p>
                            </div>
                        </div>

                        {/* Map Component */}
                        <div className="h-48 w-full rounded-xl overflow-hidden shadow-2xl border-2 border-green-600/50 bg-green-800 relative group">
                            <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors duration-300 z-10" />
                            <iframe
                                title="Mapa de Localização"
                                src="https://maps.google.com/maps?q=R.+dos+Marlins,+741+-+Guanabara,+Anchieta+-+ES,+29230-000,+Brasil&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </div>

                    {/* Column 3: Hours & Rules */}
                    <div className="space-y-6">
                        <h4 className="text-yellow-300 font-bold uppercase tracking-wider text-sm border-b border-yellow-300/30 pb-2 inline-block">
                            Horário de Funcionamento
                        </h4>

                        <div className="bg-green-800/30 p-6 rounded-2xl border border-white/5 backdrop-blur-sm space-y-6 hover:bg-green-800/50 transition-colors duration-300">
                            <div className="flex items-start gap-4">
                                <Clock className="text-yellow-400 w-6 h-6 shrink-0 mt-1" />
                                <div className="space-y-3 w-full">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                        <p className="text-white font-bold text-sm">Segunda a Sábado</p>
                                        <p className="text-yellow-300 text-sm font-mono">08h-12h / 14h-18h</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <p className="text-white font-bold text-sm">Domingo</p>
                                        <p className="text-yellow-300 text-sm font-mono">08h-12h / 14h-16h</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rules */}
                        <div className="flex gap-4 items-start bg-yellow-400/5 p-5 rounded-xl border border-yellow-400/10">
                            <AlertTriangle className="text-yellow-500 w-5 h-5 shrink-0 mt-0.5" />
                            <div className="space-y-2">
                                <p className="text-xs text-gray-100 italic leading-relaxed">
                                    <span className="text-yellow-500 not-italic font-bold">Tolerância de 15min na busca.</span>
                                </p>
                                <p className="text-xs text-gray-100 italic leading-relaxed">
                                    Após 1h do fechamento, a retirada será permitida apenas no dia seguinte.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-green-600/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-green-200/60">
                    <p>&copy; 2026 RK9 CT e Hotel. Todos os direitos reservados.</p>
                    <p className="flex items-center gap-1.5 transition-colors hover:text-green-200">
                        Desenvolvido por <span className="text-yellow-300 font-bold tracking-wide">Auto Social Flow</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
