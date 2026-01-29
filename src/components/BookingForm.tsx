import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

import { ptBR } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { Upload, Calendar as CalendarIcon, Dog, User, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const BookingForm = () => {
    const [selectedRange, setSelectedRange] = useState<any>();

    const [formData, setFormData] = useState({
        tutorName: '',
        whatsapp: '',
        dogName: '',
        breed: '',
        size: 'pequeno',
        vaccines: false,
        neutered: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Format dates properly
        let startDate = "Data não selecionada";
        let endDate = "Data não selecionada";

        if (selectedRange?.from) {
            startDate = format(selectedRange.from, 'dd/MM/yyyy', { locale: ptBR });
        }
        if (selectedRange?.to) {
            endDate = format(selectedRange.to, 'dd/MM/yyyy', { locale: ptBR });
        } else if (selectedRange?.from) {
            endDate = startDate; // Same day if no end date
        }

        // Construct the message using Template Literals with proper line breaks
        const text = `Olá RK9! 🐾 Gostaria de solicitar uma reserva.

🐶 *Dados do Pet:*
Nome: ${formData.dogName}
Raça: ${formData.breed}
Porte: ${formData.size}

👤 *Dados do Tutor:*
Nome: ${formData.tutorName}

📅 *Período:*
De: ${startDate}
Até: ${endDate}

📋 *Saúde:*
Vacinas em dia: ${formData.vaccines ? 'Sim ✅' : 'Não ❌'}
Castrado/Sem Cio: ${formData.neutered ? 'Sim ✅' : 'Não ❌'}

📸 *Estou enviando a foto da carteira de vacina em seguida!*`;

        // Alert user about vaccine card photo
        alert('Redirecionando para o WhatsApp! Por favor, anexe a foto da Carteira de Vacina na conversa para finalizarmos.');

        // Create the final URL with proper encoding
        const whatsappUrl = `https://wa.me/555194244240?text=${encodeURIComponent(text)}`;

        // Open in new tab
        window.open(whatsappUrl, '_blank');
    };

    const css = `
    .rdp {
      --rdp-cell-size: 40px;
      --rdp-accent-color: #65a30d;
      --rdp-background-color: #e2e8f0;
      margin: 0;
    }
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: #f0fdf4;
      color: #65a30d;
    }
    .rdp-day_selected, .rdp-day_selected:hover {
      background-color: #65a30d;
      color: white;
    }
  `;

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <style>{css}</style>
            <div className="grid lg:grid-cols-5 h-full">

                {/* Left Column - Calendar */}
                <div className="lg:col-span-2 bg-gray-50 p-8 border-r border-gray-100 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CalendarIcon className="text-primary" />
                        Selecione o Período
                    </h3>
                    <div className="flex-grow flex items-center justify-center bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
                        <DayPicker
                            mode="range"
                            selected={selectedRange}
                            onSelect={setSelectedRange}
                            locale={ptBR}
                            modifiers={{
                                disabled: { before: new Date() }
                            }}
                            styles={{
                                head_cell: { color: '#65a30d', fontWeight: 'bold' },
                                caption: { color: '#111827' }
                            }}
                        />
                    </div>
                    <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <p className="text-sm text-gray-600 font-medium">
                            <span className="block text-xs text-primary font-bold uppercase tracking-wider mb-1">Período Selecionado</span>
                            {selectedRange?.from ? (
                                <>
                                    {format(selectedRange.from, 'dd/MM/yyyy')}
                                    {selectedRange.to ? ` - ${format(selectedRange.to, 'dd/MM/yyyy')}` : ''}
                                </>
                            ) : (
                                "Selecione as datas no calendário"
                            )}
                        </p>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="lg:col-span-3 p-8 lg:p-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <Dog className="text-secondary" />
                        Dados da Reserva
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User size={16} /> Nome do Tutor
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all text-gray-900"
                                    placeholder="Seu nome completo"
                                    value={formData.tutorName}
                                    onChange={e => setFormData({ ...formData, tutorName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Phone size={16} /> WhatsApp
                                </label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all text-gray-900"
                                    placeholder="(00) 00000-0000"
                                    value={formData.whatsapp}
                                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Nome do Pet</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all text-gray-900"
                                    value={formData.dogName}
                                    onChange={e => setFormData({ ...formData, dogName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Raça</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all text-gray-900"
                                    value={formData.breed}
                                    onChange={e => setFormData({ ...formData, breed: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Porte</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all text-gray-900"
                                    value={formData.size}
                                    onChange={e => setFormData({ ...formData, size: e.target.value })}
                                >
                                    <option value="pequeno">Pequeno</option>
                                    <option value="medio">Médio</option>
                                    <option value="grande">Grande</option>
                                    <option value="gigante">Gigante</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${formData.vaccines ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                    {formData.vaccines && <span className="text-white font-bold text-xs">✓</span>}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.vaccines}
                                    onChange={e => setFormData({ ...formData, vaccines: e.target.checked })}
                                />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Vacinas em dia</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${formData.neutered ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                    {formData.neutered && <span className="text-white font-bold text-xs">✓</span>}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.neutered}
                                    onChange={e => setFormData({ ...formData, neutered: e.target.checked })}
                                />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Castrado / Sem Cio</span>
                            </label>
                        </div>

                        {/* Vaccination Card Instruction */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                            <div className="bg-yellow-100 p-2 rounded-lg shrink-0">
                                <Phone size={20} className="text-yellow-700" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 mb-1">
                                    Foto da Carteira de Vacina
                                </p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    A foto da Carteira de Vacina deverá ser enviada diretamente no WhatsApp após clicar no botão abaixo.
                                </p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-800 hover:shadow-green-700/30 transition-all flex items-center justify-center gap-2 text-lg"
                            type="submit"
                        >
                            <Send size={20} />
                            Enviar Solicitação via WhatsApp
                        </motion.button>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Ao enviar, você será redirecionado para o WhatsApp do nosso atendimento.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
