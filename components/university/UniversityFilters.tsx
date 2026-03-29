'use client';
// =============================================================================
// components/university/UniversityFilters.tsx
// =============================================================================
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useTransition, useState } from 'react';

interface FiltersProps {
  cities: string[];
  currentFilters: Record<string, string | undefined>;
}

export function UniversityFilters({ cities, currentFilters }: FiltersProps) {
  const router    = useRouter();
  const pathname  = usePathname();
  const sp        = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentFilters.search || '');

  const update = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page'); // reset pagination
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }, [sp, pathname, router]);

  const clear = () => {
    setSearchValue('');
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
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="University name..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && update('search', searchValue)}
            className="input-field"
          />
          <button
            onClick={() => update('search', searchValue)}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}
            aria-label="Search"
          >
            🔍
          </button>
        </div>
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
        <div className="text-xs text-slate-400">Updating results...</div>
      )}
    </div>
  );
}
