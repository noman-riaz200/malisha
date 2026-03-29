'use client';
// =============================================================================
// components/homepage/SearchBar.tsx
// =============================================================================
import { useState, useEffect, useRef, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const POPULAR = ['Beijing', 'Shanghai', 'Nanjing', 'Hangzhou', 'Wuhan'];
const DEGREES = ['Bachelor', 'Master', 'PhD', 'Foundation'];

export function SearchBar() {
  const router = useRouter();
  const [query,  setQuery]  = useState('');
  const [city,   setCity]   = useState('');
  const [degree, setDegree] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query)  params.set('search', query);
    if (city)   params.set('city',   city);
    if (degree) params.set('degree', degree.toLowerCase());
    router.push(`/universities?${params.toString()}`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
        {/* Text search */}
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search university or program..."
            className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        {/* City select */}
        <select
          value={city}
          onChange={e => setCity(e.target.value)}
          className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 min-w-[140px]"
        >
          <option value="" className="text-slate-900">Any City</option>
          {POPULAR.map(c => (
            <option key={c} value={c} className="text-slate-900">{c}</option>
          ))}
        </select>

        {/* Degree select */}
        <select
          value={degree}
          onChange={e => setDegree(e.target.value)}
          className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 min-w-[140px]"
        >
          <option value="" className="text-slate-900">Any Degree</option>
          {DEGREES.map(d => (
            <option key={d} value={d} className="text-slate-900">{d}</option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap shadow-lg shadow-blue-900/30"
        >
          Search →
        </button>
      </form>

      {/* Quick tags */}
      <div className="flex flex-wrap gap-2 mt-2 px-2">
        <span className="text-white/40 text-xs py-1">Popular:</span>
        {POPULAR.map(city => (
          <button
            key={city}
            onClick={() => router.push(`/universities?city=${city}`)}
            className="text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/15 px-2.5 py-1 rounded-full transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}


// =============================================================================
// components/homepage/StatsCounter.tsx
// =============================================================================
interface Props { value: string; label: string; icon: string; }

function parseValue(v: string): { num: number; suffix: string } {
  const match = v.match(/^(\d+)(.*)$/);
  return match ? { num: parseInt(match[1]), suffix: match[2] } : { num: 0, suffix: '' };
}

export function StatsCounter({ value, label, icon }: Props) {
  const { num, suffix } = parseValue(value);
  const [count,   setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps    = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, num]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">{icon}</div>
      <div className="font-display font-bold text-3xl md:text-4xl text-slate-900">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-slate-500 text-sm mt-1">{label}</div>
    </div>
  );
}


// =============================================================================
// components/homepage/TestimonialSlider.tsx
// =============================================================================
const TESTIMONIALS = [
  {
    name:        'Neena P.',
    university:  "Xi'an Jiaotong University",
    country:     'Thailand 🇹🇭',
    avatar:      'N',
    color:       'from-blue-500 to-blue-700',
    quote:       "EduPro helped me from day one — documents, flights, even airport pickup. I always had someone to contact whenever I faced difficulties. Studying in China was absolutely the right choice.",
  },
  {
    name:        'Tatanjaky M.',
    university:  'Nanjing University of Post and Telecommunications',
    country:     'Madagascar 🇲🇬',
    avatar:      'T',
    color:       'from-purple-500 to-purple-700',
    quote:       "My biggest dream was to study abroad. I contacted EduPro and they supported me through everything. The platform made it so simple — I'm incredibly grateful.",
  },
  {
    name:        'Md Rezoan A.',
    university:  'Beijing Normal University, Zhuhai',
    country:     'Bangladesh 🇧🇩',
    avatar:      'R',
    color:       'from-emerald-500 to-emerald-700',
    quote:       "EduPro's branch network across multiple countries is impressive. They helped countless students navigate higher education and even offer free scholarships to those in need.",
  },
  {
    name:        'Ayoub A.',
    university:  'Sichuan University',
    country:     'Morocco 🇲🇦',
    avatar:      'A',
    color:       'from-amber-500 to-orange-600',
    quote:       "Thanks to EduPro, I'm now studying at Sichuan University! The teaching quality is top-notch and the professors are amazing. I really recommend studying in China through EduPro.",
  },
  {
    name:        'Jose M.',
    university:  'Southwest Petroleum University',
    country:     'Angola 🇦🇴',
    avatar:      'J',
    color:       'from-rose-500 to-rose-700',
    quote:       "They helped me with everything — documents, paperwork, all of it. They made part of my dream come true. Thank you so much to the entire EduPro team.",
  },
];

export function TestimonialSlider() {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);

  const next = useCallback(() => setActive(a => (a + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = TESTIMONIALS[active];

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-card-lg p-8 md:p-10 text-center relative overflow-hidden">
        {/* Decorative quote mark */}
        <div className="absolute top-6 left-8 font-display text-7xl text-slate-100 leading-none select-none">"</div>

        {/* Avatar */}
        <div className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg`}>
          {t.avatar}
        </div>

        {/* Quote */}
        <blockquote className="text-slate-700 text-lg leading-relaxed mb-6 relative z-10">
          "{t.quote}"
        </blockquote>

        {/* Attribution */}
        <div>
          <p className="font-semibold text-slate-900">{t.name}</p>
          <p className="text-sm text-slate-500 mt-0.5">{t.university}</p>
          <p className="text-xs text-slate-400 mt-1">{t.country}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={prev} className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-sm">
          ←
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'bg-blue-600 w-6' : 'bg-slate-200 w-1.5 hover:bg-slate-300'}`}
            />
          ))}
        </div>

        <button onClick={next} className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-sm">
          →
        </button>
      </div>
    </div>
  );
}
