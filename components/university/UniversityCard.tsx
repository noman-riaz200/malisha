'use client';
// =============================================================================
// components/university/UniversityCard.tsx
// =============================================================================
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface University {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  bannerImage?: string;
  worldRank?: string;
  location?: { city: string; province: string; country: string };
  badges?: { is211: boolean; is985: boolean; isDoubleFirstClass: boolean; cscaRequired: boolean };
  studentsEnrolled?: number;
  intakes?: Array<{ season: string; year: number; deadline: string }>;
}

function CountdownTimer({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000) / 60000);
      setTimeLeft({ days, hours, mins });
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [deadline]);

  if (expired) return null;

  return (
    <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1">
      <span>⏰</span>
      <span className="font-semibold">{timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m</span>
    </div>
  );
}

export function UniversityCard({ university: uni }: { university: University }) {
  const nextIntake = (uni.intakes || [])
    ?.filter(i => new Date(i.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0];

  return (
    <Link href={`/universities/${uni.slug}`}
      className="card group flex flex-col overflow-hidden hover:-translate-y-1 duration-300">
      {/* Banner */}
      <div className="relative h-40 bg-gradient-to-br from-blue-800 to-slate-800 overflow-hidden">
        {uni.bannerImage && (
          <Image 
            src={uni.bannerImage} 
            alt={uni.name} 
            fill 
            className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
          />
        )}
        {/* Logo */}
        <div className="absolute bottom-3 left-4 w-12 h-12 bg-white rounded-xl shadow-lg p-1.5 flex items-center justify-center">
          {uni.logo
            ? <Image src={uni.logo} alt="" width={40} height={40} className="object-contain" quality={80} />
            : <span className="text-lg font-bold text-blue-700">{uni.name[0]}</span>
          }
        </div>
        {/* Countdown */}
        {nextIntake && (
          <div className="absolute bottom-3 right-3">
            <CountdownTimer deadline={nextIntake.deadline} />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {uni.badges?.is211           && <span className="badge-211">211</span>}
          {uni.badges?.is985           && <span className="badge-985">985</span>}
          {uni.badges?.isDoubleFirstClass && <span className="badge-dfc">Double First</span>}
          {uni.badges?.cscaRequired    && <span className="badge-csca">CSCA</span>}
        </div>

        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {uni.name}
        </h3>

        {/* Meta */}
        <div className="space-y-1 mt-auto">
          {uni.worldRank && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>🌐</span><span>World Rank: <span className="font-medium text-slate-700">{uni.worldRank}</span></span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>📍</span><span>{uni.location?.city}, {uni.location?.country}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>🎓</span>
            <span><span className="font-medium text-slate-700">{(uni.studentsEnrolled || 0).toLocaleString()}+</span> students enrolled</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-blue-600 font-semibold group-hover:gap-2 transition-all">
            Apply Now →
          </span>
          {nextIntake && (
            <span className="text-xs text-slate-400 capitalize">{nextIntake.season} {nextIntake.year}</span>
          )}
        </div>
      </div>
    </Link>
  );
}


// =============================================================================
// components/university/UniversityFilters.tsx
// =============================================================================
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useTransition } from 'react';

interface FiltersProps {
  cities: string[];
  currentFilters: Record<string, string | undefined>;
}

export function UniversityFilters({ cities, currentFilters }: FiltersProps) {
  const router    = useRouter();
  const pathname  = usePathname();
  const sp        = useSearchParams();
  const [pending, startTransition] = useTransition();

  const update = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page'); // reset pagination
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }, [sp, pathname, router]);

  const clear = () => {
    startTransition(() => router.push(pathname));
  };

  const hasFilters = Object.values(currentFilters).some(v => v && v !== '');

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-24 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">Filters</h2>
        {hasFilters && (
          <button onClick={clear} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="label">Search</label>
        <input
          type="search"
          placeholder="University name..."
          defaultValue={currentFilters.search}
          onKeyDown={e => e.key === 'Enter' && update('search', (e.target as HTMLInputElement).value)}
          className="input-field"
        />
      </div>

      {/* City */}
      <div>
        <label className="label">City</label>
        <select
          defaultValue={currentFilters.city || ''}
          onChange={e => update('city', e.target.value)}
          className="input-field"
        >
          <option value="">All cities</option>
          {cities.sort().map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Intake */}
      <div>
        <label className="label">Intake Season</label>
        <div className="space-y-2">
          {[
            { value: '',          label: 'Any intake' },
            { value: 'march',     label: '🌸 March 2026' },
            { value: 'september', label: '🍂 September 2026' },
          ].map(opt => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="intake" value={opt.value}
                defaultChecked={currentFilters.intake === opt.value || (!currentFilters.intake && opt.value === '')}
                onChange={() => update('intake', opt.value)}
                className="text-blue-600" />
              <span className="text-sm text-slate-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rankings */}
      <div>
        <label className="label">Ranking / Category</label>
        <div className="space-y-2">
          {[
            { key: 'is211', label: '211 Project' },
            { key: 'is985', label: '985 Project' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox"
                defaultChecked={currentFilters[key] === '1'}
                onChange={e => update(key, e.target.checked ? '1' : '')}
                className="rounded text-blue-600" />
              <span className="text-sm text-slate-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {pending && (
        <div className="text-center py-2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}
    </div>
  );
}
