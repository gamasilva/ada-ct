import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { Upload, Calendar as CalendarIcon, Dog, User, Phone, Send, Info, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export const BookingForm = () => {
    // Mode Selection: 'day_use' or 'hospedagem'
    const [bookingType, setBookingType] = useState<'day_use' | 'hospedagem'>('hospedagem');

    // Dates Selection
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedRange, setSelectedRange] = useState<any>();

    // API States
    const [loadingVagas, setLoadingVagas] = useState(false);
    const [botaoLiberado, setBotaoLiberado] = useState(false);
    const [isLotado, setIsLotado] = useState(false);
    const [datasLotadas, setDatasLotadas] = useState<Date[]>([]);

    // Form Data
    const [formData, setFormData] = useState({
        tutorName: '',
        whatsapp: '',
        dogName: '',
        breed: '',
        size: 'pequeno',
        vaccines: false,
        neutered: false
    });

    // Fetch occupied dates when hospedagem is selected (runs once on mount & type change)
    useEffect(() => {
        if (bookingType === 'hospedagem') {
            buscarDatasLotadas();
        }
    }, [bookingType]);

    // Reacting to Date Choices
    useEffect(() => {
        if (bookingType === 'hospedagem') {
            if (selectedRange?.from && selectedRange?.to) {
                checarDatas(
                    format(selectedRange.from, 'yyyy-MM-dd'),
                    format(selectedRange.to, 'yyyy-MM-dd')
                );
            } else {
                setBotaoLiberado(false);
            }
        } else {
            if (selectedDate) {
                setBotaoLiberado(true);
            } else {
                setBotaoLiberado(false);
            }
        }
    }, [selectedRange, selectedDate, bookingType]);

    // Cleanup and lock form when switching types
    useEffect(() => {
        setBotaoLiberado(false);
        setIsLotado(false);
    }, [bookingType]);

    // Cleanup lotado state when dates change
    useEffect(() => {
        setIsLotado(false);
    }, [selectedRange, selectedDate]);

    // The Fetch to fetch fully booked dates ahead of time
    async function buscarDatasLotadas() {
        try {
            const res = await fetch('https://webhooks.autosocialflow.com.br/webhook/hotelpet-calendario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'buscar_datas_lotadas' })
            });
            const data = await res.json();

            // Expected backend array of dates strings like 'YYYY-MM-DD'
            if (data?.sucesso && data?.datas_lotadas && Array.isArray(data.datas_lotadas)) {
                const dates = data.datas_lotadas.map((dStr: string) => new Date(dStr + "T00:00:00"));
                setDatasLotadas(dates);
            } else {
                setDatasLotadas([]);
            }
        } catch (e) {
            console.error("Erro ao buscar datas lotadas", e);
        }
    }

    // The Fetch to check webhook
    async function checarDatas(dataEntrada: string, dataSaida: string) {
        setIsLotado(false);
        setLoadingVagas(true);
        const toastId = toast.loading('Consultando vagas, aguarde...', { id: 'check-vagas' });

        try {
            const res = await fetch('https://webhooks.autosocialflow.com.br/webhook/hotelpet-calendario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'checar_disponibilidade',
                    dados: {
                        data_entrada: dataEntrada,
                        data_saida: dataSaida
                    }
                })
            });
            const data = await res.json();

            if (data?.sucesso === false) {
                toast.error('Erro ao verificar disponibilidade.', { id: toastId });
                setBotaoLiberado(false);
            }
            // Check if available from external api
            else if (data?.disponivel) {
                setBotaoLiberado(true);
                toast.success(`Temos ${data.vagas_abertas || 'algumas'} vagas!`, { id: toastId });
            }
            else if (data?.disponivel === false) {
                setBotaoLiberado(false);
                setIsLotado(true);
                toast.error('Puxa, estamos lotados nesse período! \u{1F61F} Tente mudar as datas.', { id: toastId });
            }
            else {
                // Se der erro de resposta do servidor (mas não explodida), libera para não travar venda
                setBotaoLiberado(true);
                toast.success('Pode seguir com a reserva!', { id: toastId });
            }
        } catch (e) {
            console.error(e);
            // Case it errors out, allow to proceed so the owner does not lose the lead
            setBotaoLiberado(true);
            toast.success('Pode seguir com a reserva! Falaremos mais pelo WhatsApp.', { id: toastId });
        } finally {
            setLoadingVagas(false);
        }
    }

    // Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Safety verification just in case user injects button click without it being unlocked
        if (!botaoLiberado) {
            toast.error(bookingType === 'hospedagem' ? "Por favor, selecione datas com vagas disponíveis." : "Por favor, selecione uma data.");
            return;
        }

        let startDate = "Data não selecionada";
        let endDate = "Data não selecionada";
        const servicoStr = bookingType === 'day_use' ? 'Day Use' : 'Hospedagem';

        // Extract formats
        if (bookingType === 'day_use') {
            if (selectedDate) {
                startDate = format(selectedDate, 'dd/MM/yyyy', { locale: ptBR });
                endDate = startDate;
            }
        } else {
            if (selectedRange?.from && selectedRange?.to) {
                startDate = format(selectedRange.from, 'dd/MM/yyyy', { locale: ptBR });
                endDate = format(selectedRange.to, 'dd/MM/yyyy', { locale: ptBR });
            }
        }

        // Message text
        const text = `Olá RK9! \u{1F43E} Gostaria de solicitar uma reserva de *${servicoStr}*.

\u{1F436} *Dados do Pet:*
Nome: ${formData.dogName}
Raça: ${formData.breed}
Porte: ${formData.size}

\u{1F464} *Dados do Tutor:*
Nome: ${formData.tutorName}

\u{1F4C5} *Período:*
De: ${startDate}
Até: ${endDate}

\u{1F4CB} *Saúde:*
Vacinas em dia: ${formData.vaccines ? 'Sim \u{2705}' : 'Não \u{274C}'}
Castrado/Sem Cio: ${formData.neutered ? 'Sim \u{2705}' : 'Não \u{274C}'}

\u{1F4F8} *Estou enviando a foto da carteira de vacina em seguida!*`;

        // Inform user using toast instead of standard alert
        toast.success(
            "Redirecionando para o WhatsApp!\nPor favor, anexe a foto da Carteira de Vacina na conversa para finalizarmos.",
            { duration: 5000 }
        );

        // Allow some time for toast rendering
        setTimeout(() => {
            const whatsappUrl = `https://wa.me/555194244240?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
        }, 1500);
    };

    const css = `
    .rdp-root {
      --rdp-cell-size: 40px;
      --rdp-accent-color: #22c55e;
      --rdp-background-color: #f0fdf4;
      --rdp-day-selected-bg: #22c55e;
      width: 100%;
      margin: 0;
    }
    .rdp-months {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    
    /* Configuração dos dias (LIVRE por padrão) */
    .rdp-day {
      border: 1px solid #86efac;
      color: #166534;
      border-radius: 8px;
      margin: 2px;
      font-weight: 600;
      transition: all 0.2s;
    }
    
    .rdp-day:hover:not(.rdp-day_disabled) {
      background-color: #dcfce7 !important;
    }

    /* Selected state */
    .rdp-day_selected, .rdp-selected, [aria-selected="true"] {
      background-color: #22c55e !important;
      color: white !important;
      border-color: #22c55e !important;
      font-weight: bold;
    }

    /* Range Middle */
    .rdp-day_range_middle, .rdp-range_middle {
      background-color: #dcfce7 !important;
      color: #166534 !important;
      border-color: #dcfce7 !important;
      border-radius: 0 !important;
    }

    /* Disabled / Passado */
    .rdp-day_disabled:not(.rdp-ocupado) {
      background-color: #f3f4f6 !important;
      color: #9ca3af !important;
      border: 1px solid #e5e7eb !important;
      cursor: not-allowed;
      opacity: 0.7;
    }
    
    /* Ocupado */
    .rdp-ocupado {
      background-color: #fee2e2 !important;
      color: #ef4444 !important;
      border: 1px solid #fecaca !important;
      cursor: not-allowed;
      opacity: 0.8;
      text-decoration: none !important;
    }
    `;

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
            <style>{css}</style>

            {/* Top right toaster */}
            <Toaster position="top-center" />

            {/* Top Selection Box: Day Use vs Hospedagem */}
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                <div className="flex flex-col mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Escolha o Serviço</h3>
                    <p className="text-sm text-gray-600">Selecione abaixo o tipo de estadia perfeita para seu melhor amigo.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <label
                        className={`cursor-pointer rounded-2xl border-2 p-5 transition-all flex items-start gap-4 shadow-sm hover:shadow-md ${bookingType === 'day_use' ? 'border-primary bg-primary/5 ring-4 ring-primary/20' : 'border-gray-200 bg-white hover:border-primary/50 opacity-90'}`}
                        onClick={() => setBookingType('day_use')}
                    >
                        <div className={`p-4 rounded-xl transition-all ${bookingType === 'day_use' ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                            <Sun size={24} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-lg mb-1 transition-colors ${bookingType === 'day_use' ? 'text-primary' : 'text-gray-900'}`}>Day Use</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Seu cão passa o dia se divertindo e socializando com a gente, e volta para casa à noite.
                            </p>
                        </div>
                    </label>

                    <label
                        className={`cursor-pointer rounded-2xl border-2 p-5 transition-all flex items-start gap-4 shadow-sm hover:shadow-md ${bookingType === 'hospedagem' ? 'border-primary bg-primary/5 ring-4 ring-primary/20' : 'border-gray-200 bg-white hover:border-primary/50 opacity-90'}`}
                        onClick={() => setBookingType('hospedagem')}
                    >
                        <div className={`p-4 rounded-xl transition-all ${bookingType === 'hospedagem' ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                            <Moon size={24} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-lg mb-1 transition-colors ${bookingType === 'hospedagem' ? 'text-primary' : 'text-gray-900'}`}>Hospedagem</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Seu cão dorme no hotel e aproveita toda nossa estrutura por vários dias seguidos.
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 h-full">

                {/* Left Column - Dynamic Calendar */}
                <div className="lg:col-span-2 bg-gray-50 p-6 md:p-8 border-r border-gray-100 flex flex-col relative transition-all duration-300">
                    {/* Loader overlay */}
                    {loadingVagas && (
                        <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-bl-3xl lg:rounded-bl-none transition-all duration-300">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            <span className="font-semibold text-primary">Buscando vagas no sistema...</span>
                        </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CalendarIcon className="text-primary" />
                        Selecione a Data
                    </h3>

                    {/* Guidance Tooltips based on mode */}
                    <div className="mb-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
                        <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                        {bookingType === 'day_use' ? (
                            <p className="text-sm text-gray-600">
                                Para o <strong>Day Use</strong>, por favor selecione apenas <span className="text-primary font-bold">1 data</span> no calendário abaixo.
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Para a <strong>Hospedagem</strong>, selecione a <span className="text-primary font-bold">Data de Entrada</span> e depois a <span className="text-primary font-bold">Data de Saída</span>.
                            </p>
                        )}
                    </div>

                    <div className={`flex-grow flex items-center justify-center bg-white rounded-2xl shadow-sm p-4 border overflow-x-auto w-full mb-6 transition-colors ${isLotado ? 'border-red-400 bg-red-50/50 rdp-unavailable' : 'border-gray-200'}`}>
                        {bookingType === 'day_use' ? (
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                locale={ptBR}
                                disabled={[{ before: new Date() }]}
                            />
                        ) : (
                            <DayPicker
                                mode="range"
                                selected={selectedRange}
                                onSelect={setSelectedRange}
                                locale={ptBR}
                                modifiers={{
                                    passado: { before: new Date() },
                                    ocupado: datasLotadas
                                }}
                                disabled={[{ before: new Date() }, ...datasLotadas]}
                                modifiersClassNames={{
                                    ocupado: 'rdp-ocupado',
                                    passado: 'rdp-passado'
                                }}
                            />
                        )}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#fee2e2] border-2 border-[#fecaca] shadow-sm"></span>
                            <span className="text-xs font-bold text-gray-700">OCUPADO</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#f3f4f6] border-2 border-[#e5e7eb] shadow-sm"></span>
                            <span className="text-xs font-bold text-gray-700">PASSADO</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border-2 border-[#22c55e] bg-white shadow-sm"></span>
                            <span className="text-xs font-bold text-primary">LIVRE (CLIQUE)</span>
                        </div>
                    </div>

                    <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm text-gray-600 font-medium">
                            <span className="block text-xs text-primary font-bold uppercase tracking-wider mb-1">Período Selecionado</span>
                            {bookingType === 'day_use' ? (
                                selectedDate ? format(selectedDate, 'dd/MM/yyyy') : "Selecione a data do Day Use"
                            ) : (
                                selectedRange?.from ? (
                                    <>
                                        {format(selectedRange.from, 'dd/MM/yyyy')}
                                        {selectedRange.to ? ` - ${format(selectedRange.to, 'dd/MM/yyyy')}` : ''}
                                    </>
                                ) : "Selecione o período (Entrada e Saída)"
                            )}
                        </p>
                    </div>
                </div>

                {/* Right Column - Form Application */}
                <div className="lg:col-span-3 p-6 md:p-8 lg:p-12 relative flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <Dog className="text-secondary" />
                        Dados da Reserva - {bookingType === 'day_use' ? 'Day Use' : 'Hospedagem'}
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
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 outline-none"
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
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 outline-none"
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
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 outline-none"
                                    value={formData.dogName}
                                    onChange={e => setFormData({ ...formData, dogName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Raça</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 outline-none"
                                    value={formData.breed}
                                    onChange={e => setFormData({ ...formData, breed: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Porte</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 outline-none"
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

                        <div className="pt-2">
                            <motion.button
                                disabled={!botaoLiberado}
                                whileHover={botaoLiberado ? { scale: 1.02, y: -2 } : {}}
                                whileTap={botaoLiberado ? { scale: 0.98 } : {}}
                                className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg ${botaoLiberado
                                    ? 'bg-green-600 hover:bg-green-700 shadow-green-600/30 ring-2 ring-offset-2 ring-transparent focus:ring-green-400'
                                    : 'bg-gray-400 cursor-not-allowed shadow-none opacity-80'
                                    }`}
                                type="submit"
                            >
                                <Send size={20} />
                                {botaoLiberado
                                    ? 'Enviar Solicitação via WhatsApp'
                                    : (bookingType === 'hospedagem' ? 'Selecione as datas disponíveis' : 'Selecione uma data acima')
                                }
                            </motion.button>

                            {!botaoLiberado && bookingType === 'hospedagem' && selectedRange?.from && selectedRange?.to && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-center text-red-500 mt-3 font-semibold bg-red-50 p-3 rounded-lg border border-red-100"
                                >
                                    {"\u{1F6AB}"} Data indisponível. Por favor, selecione outro período ou entre em contato na lista de espera.
                                </motion.p>
                            )}
                            <p className="text-xs text-center text-gray-500 mt-4">
                                Ao enviar, você será redirecionado para o WhatsApp do nosso atendimento.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
