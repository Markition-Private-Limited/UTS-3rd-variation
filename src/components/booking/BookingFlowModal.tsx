'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronRight, Lock, CheckCircle2, CreditCard, User, Calendar, ShieldCheck, Mail, ChevronDown } from 'lucide-react';
import { FlagImage } from 'react-international-phone';
import { BookingState, Vehicle } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';

type Step = 'contact' | 'payment' | 'processing' | 'success';

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: BookingState;
  vehicle: Vehicle;
}

const COUNTRIES = [
  { code: 'GB', dial: '+44',  name: 'United Kingdom' },
  { code: 'US', dial: '+1',   name: 'United States' },
  { code: 'AE', dial: '+971', name: 'UAE' },
  { code: 'FR', dial: '+33',  name: 'France' },
  { code: 'DE', dial: '+49',  name: 'Germany' },
  { code: 'CH', dial: '+41',  name: 'Switzerland' },
  { code: 'SA', dial: '+966', name: 'Saudi Arabia' },
  { code: 'QA', dial: '+974', name: 'Qatar' },
  { code: 'KW', dial: '+965', name: 'Kuwait' },
  { code: 'AU', dial: '+61',  name: 'Australia' },
  { code: 'CA', dial: '+1',   name: 'Canada' },
  { code: 'SG', dial: '+65',  name: 'Singapore' },
  { code: 'IN', dial: '+91',  name: 'India' },
  { code: 'CN', dial: '+86',  name: 'China' },
  { code: 'JP', dial: '+81',  name: 'Japan' },
  { code: 'RU', dial: '+7',   name: 'Russia' },
  { code: 'IT', dial: '+39',  name: 'Italy' },
  { code: 'ES', dial: '+34',  name: 'Spain' },
  { code: 'NL', dial: '+31',  name: 'Netherlands' },
  { code: 'TR', dial: '+90',  name: 'Turkey' },
];

const LABEL = 'block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5';
const INPUT = 'w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all';

function PhoneInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [open, setOpen] = useState(false);
  const [localNum, setLocalNum] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNumChange = (num: string) => {
    setLocalNum(num);
    onChange(`${country.dial} ${num}`);
  };

  const handleCountrySelect = (c: typeof COUNTRIES[0]) => {
    setCountry(c);
    setOpen(false);
    onChange(`${c.dial} ${localNum}`);
  };

  return (
    <div ref={ref}>
      <label className={LABEL}>Phone Number</label>
      <div className={`flex bg-zinc-50 border ${error ? 'border-red-300' : 'border-zinc-200'} rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-zinc-900/20 focus-within:border-zinc-900 transition-all`}>
        {/* Flag + dial code trigger */}
        <button type="button" onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 pl-3.5 pr-2.5 py-3 border-r border-zinc-200 bg-white hover:bg-zinc-50 transition-colors shrink-0 text-sm font-medium text-zinc-700">
          <FlagImage iso2={country.code.toLowerCase()} size={20} />
          <span className="text-xs text-zinc-500">{country.dial}</span>
          <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {/* Number input */}
        <input type="tel" inputMode="numeric" placeholder="7700 900000" value={localNum}
          onChange={e => handleNumChange(e.target.value.replace(/[^\d\s\-()]/g, ''))}
          maxLength={15}
          className="flex-1 bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-[60] mt-1.5 w-64 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="max-h-52 overflow-y-auto py-1">
            {COUNTRIES.map(c => (
              <button key={c.code} type="button" onClick={() => handleCountrySelect(c)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-left hover:bg-zinc-50 transition-colors ${country.code === c.code ? 'bg-zinc-50 font-semibold' : ''}`}>
                <FlagImage iso2={c.code.toLowerCase()} size={20} className="shrink-0" />
                <span className="flex-1 text-zinc-800 truncate">{c.name}</span>
                <span className="text-xs text-zinc-400 shrink-0">{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function ProcessingScreen() {
  const [msgIdx, setMsgIdx] = useState(0);
  const MSGS = ['Verifying your details…', 'Securing your reservation…', 'Confirming vehicle…', 'Almost there…'];

  useEffect(() => {
    const id = setInterval(() => setMsgIdx(i => (i + 1) % MSGS.length), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-8 gap-8 bg-zinc-950">
      {/* Concentric ring animation */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/5 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-2 rounded-full border border-white/8 animate-ping" style={{ animationDuration: '1.6s', animationDelay: '0.2s' }} />
        <div className="absolute inset-4 rounded-full border-2 border-white/10" />
        <div className="absolute inset-4 rounded-full border-2 border-t-white border-r-white/20 border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.1s' }} />
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <span className="text-sm font-bold text-white">U</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-bold text-white">Processing Reservation</p>
        <p key={msgIdx} className="text-sm text-zinc-400 transition-opacity duration-300">{MSGS[msgIdx]}</p>
        {/* Dot trail */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const BookingFlowModal: React.FC<BookingFlowModalProps> = ({ isOpen, onClose, state, vehicle }) => {
  const router = useRouter();
  const [step, setStep] = useState<Step>('contact');

  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvc: '', cardholder: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset to the contact step and clear form state whenever the modal is opened.
  // Without this, React preserves state across open/close cycles (the component
  // never fully unmounts when isOpen flips false → null), so a re-open after
  // advancing to payment — or after a Fast Refresh — would resume mid-flow.
  useEffect(() => {
    if (isOpen) {
      setStep('contact');
      setContact({ name: '', email: '', phone: '' });
      setPayment({ cardNumber: '', expiry: '', cvc: '', cardholder: '' });
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [isOpen]);

  const priceCalc = calculatePrice(state.serviceType, vehicle, {
    distanceKm: state.sampleDistanceKm,
    durationHours: state.durationHours,
  });

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!contact.name.trim()) e.name = 'Full name is required';
    if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = 'Valid email required';
    if (!contact.phone.trim() || contact.phone.replace(/\D/g, '').length < 7) e.phone = 'Valid phone number required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (payment.cardNumber.replace(/\D/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = 'Use MM/YY format';
    if (payment.cvc.replace(/\D/g, '').length < 3) e.cvc = '3–4 digit CVC required';
    if (!payment.cardholder.trim()) e.cardholder = 'Cardholder name required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContactNext = () => { if (validateContact()) { setErrors({}); setStep('payment'); } };
  const handlePaymentSubmit = () => {
    if (!validatePayment()) return;
    setErrors({});
    setStep('processing');
    setTimeout(() => setStep('success'), 2800);
  };

  if (!isOpen) return null;

  const short = (v: string, n = 28) => v.length > n ? v.slice(0, n - 1) + '…' : v;
  const totalStr = priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'TBC';

  const isProcessingOrSuccess = step === 'processing' || step === 'success';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`bg-white w-full sm:rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 flex flex-col
        ${isProcessingOrSuccess ? 'sm:max-w-[400px]' : 'sm:max-w-[540px]'}
        ${step === 'processing' ? 'rounded-t-3xl sm:rounded-3xl' : 'rounded-t-3xl sm:rounded-3xl'}
        max-h-[96vh] sm:max-h-[90vh]`}>

        {/* ── Dark header (contact + payment only) ── */}
        {!isProcessingOrSuccess && (
          <div className="bg-zinc-950 px-5 sm:px-7 pt-5 sm:pt-6 pb-5 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white shrink-0">U</div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">United Travel Services</span>
                  <span className="text-sm font-bold text-white leading-none">{step === 'contact' ? 'Contact Details' : 'Payment Details'}</span>
                </div>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-xl hover:bg-white/10 shrink-0 ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step progress */}
            <div className="flex items-center gap-2 mb-4">
              {(['contact', 'payment'] as const).map((s, i) => {
                const done = step === 'payment' && s === 'contact';
                const active = step === s;
                return (
                  <React.Fragment key={s}>
                    <div className={`flex items-center gap-1.5 ${active || done ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                        done ? 'bg-emerald-500 border-emerald-400 text-white' : active ? 'bg-white border-white text-zinc-950' : 'border-zinc-600 text-zinc-500'
                      }`}>
                        {done ? '✓' : i + 1}
                      </div>
                      <span className="text-[10px] font-semibold text-zinc-300 capitalize">{s}</span>
                    </div>
                    {i === 0 && <div className="flex-1 h-px bg-zinc-700 mx-1" />}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Journey summary pill */}
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block mb-0.5">Your Journey</span>
                <span className="text-xs text-white font-medium block truncate">{short(state.pickupAddress, 24)}{(state.destinationAddress) ? ` → ${short(state.destinationAddress, 18)}` : ''}</span>
                <span className="text-[10px] text-zinc-400">{state.pickupDate} · {state.pickupTime}</span>
              </div>
              <div className="text-right shrink-0 pl-2 border-l border-white/10">
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block mb-0.5">Est. Total</span>
                <span className="text-lg font-black text-white leading-none">{totalStr}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Contact step ── */}
        {step === 'contact' && (
          <div className="overflow-y-auto flex-1 px-5 sm:px-7 py-5 space-y-4">
            <div>
              <label className={LABEL}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                <input className={`${INPUT} pl-10 ${errors.name ? 'border-red-300 focus:ring-red-200' : ''}`}
                  placeholder="e.g. James Harrison" value={contact.name}
                  onChange={e => setContact(c => ({ ...c, name: e.target.value }))} />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className={LABEL}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                <input className={`${INPUT} pl-10 ${errors.email ? 'border-red-300 focus:ring-red-200' : ''}`}
                  type="email" placeholder="e.g. james@example.com" value={contact.email}
                  onChange={e => setContact(c => ({ ...c, email: e.target.value }))} />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <PhoneInput
                value={contact.phone}
                onChange={v => setContact(c => ({ ...c, phone: v }))}
                error={errors.phone}
              />
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed pb-1">
              Your details are used solely to confirm and coordinate your booking. We never share your information with third parties.
            </p>
          </div>
        )}

        {/* ── Payment step ── */}
        {step === 'payment' && (
          <div className="overflow-y-auto flex-1 px-5 sm:px-7 py-5 space-y-4">
            <div>
              <label className={LABEL}>Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                <input className={`${INPUT} pl-10 font-mono tracking-wider ${errors.cardNumber ? 'border-red-300' : ''}`}
                  placeholder="0000 0000 0000 0000" value={payment.cardNumber} inputMode="numeric"
                  onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))} />
              </div>
              {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL}>Expiry</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  <input className={`${INPUT} pl-9 font-mono ${errors.expiry ? 'border-red-300' : ''}`}
                    placeholder="MM/YY" inputMode="numeric" value={payment.expiry}
                    onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} />
                </div>
                {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <label className={LABEL}>CVC</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  <input className={`${INPUT} pl-9 font-mono ${errors.cvc ? 'border-red-300' : ''}`}
                    placeholder="123" inputMode="numeric" maxLength={4} value={payment.cvc}
                    onChange={e => setPayment(p => ({ ...p, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))} />
                </div>
                {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
              </div>
            </div>

            <div>
              <label className={LABEL}>Cardholder Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                <input className={`${INPUT} pl-10 ${errors.cardholder ? 'border-red-300' : ''}`}
                  placeholder="As it appears on your card" value={payment.cardholder}
                  onChange={e => setPayment(p => ({ ...p, cardholder: e.target.value }))} />
              </div>
              {errors.cardholder && <p className="text-xs text-red-500 mt-1">{errors.cardholder}</p>}
            </div>

            <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-800 leading-relaxed">256-bit SSL encryption · Prototype only — no charge will be made</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Base fare (illustrative)</span>
                <span className="font-semibold text-zinc-900">{priceCalc.baseFare !== null ? `£${priceCalc.baseFare.toFixed(2)}` : 'TBC'}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Booking fee</span>
                <span className="font-semibold text-zinc-900">£{priceCalc.bookingFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-zinc-200 pt-2 flex justify-between items-baseline">
                <span className="font-bold text-sm text-zinc-950">Total</span>
                <span className="font-black text-xl text-zinc-950">{totalStr}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Processing ── */}
        {step === 'processing' && <ProcessingScreen />}

        {/* ── Success ── */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center py-10 px-6 sm:px-8 gap-5 text-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-emerald-50 border-2 border-emerald-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-zinc-950">Booking Confirmed!</p>
              <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                Thank you, <span className="font-semibold text-zinc-700">{contact.name || 'valued guest'}</span>. A confirmation has been sent to{' '}
                <span className="font-semibold text-zinc-700">{contact.email || 'your email'}</span>.
              </p>
            </div>

            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-left space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-zinc-900 mt-1.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 block">Pickup</span>
                  <span className="text-xs font-medium text-zinc-900 break-words">{state.pickupAddress}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-500 pt-1 border-t border-zinc-100">
                <span>{state.pickupDate}</span>
                <span>·</span>
                <span>{state.pickupTime}</span>
                <span>·</span>
                <span className="font-semibold text-zinc-700">{vehicle.name}</span>
              </div>
            </div>

            <button onClick={() => router.push('/')}
              className="w-full py-3.5 rounded-2xl bg-zinc-950 text-white text-sm font-bold tracking-wide hover:bg-zinc-800 transition-colors shadow-lg">
              Back to Home
            </button>
            <p className="text-[11px] text-zinc-400">Prototype only · No actual booking has been made</p>
          </div>
        )}

        {/* ── Footer CTAs ── */}
        {(step === 'contact' || step === 'payment') && (
          <div className="shrink-0 px-5 sm:px-7 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center gap-3">
            {step === 'payment' && (
              <button onClick={() => { setErrors({}); setStep('contact'); }}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-zinc-600 border border-zinc-200 bg-white hover:bg-zinc-100 transition-colors">
                Back
              </button>
            )}
            <button onClick={step === 'contact' ? handleContactNext : handlePaymentSubmit}
              className="flex-1 py-3 rounded-xl bg-zinc-950 text-white text-sm font-bold tracking-wide hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md">
              {step === 'contact' ? 'Continue to Payment' : `Confirm & Pay ${totalStr}`}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
