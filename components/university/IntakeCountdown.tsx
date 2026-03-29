'use client';
// =============================================================================
// components/university/IntakeCountdown.tsx
// =============================================================================
import { useEffect, useState, ReactNode } from 'react';

interface Props { deadline: string | Date; }

export function IntakeCountdown({ deadline }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [expired,  setExpired]  = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000) / 60000),
        secs:  Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (expired) {
    return <p className="text-blue-200 text-sm font-medium">Deadline passed</p>;
  }

  const units = [
    { label: 'Days',  value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins',  value: timeLeft.mins },
    { label: 'Secs',  value: timeLeft.secs },
  ];

  return (
    <div className="flex gap-2">
      {units.map(({ label, value }) => (
        <div key={label} className="flex-1 bg-white/10 rounded-xl py-2 text-center">
          <div className="font-bold text-xl tabular-nums">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-blue-200 text-xs">{label}</div>
        </div>
      ))}
    </div>
  );
}


// =============================================================================
// components/ui/Button.tsx — Reusable button with variants
// =============================================================================
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?:    'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

    const variants = {
      primary:   'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm focus-visible:ring-blue-500',
      secondary: 'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 focus-visible:ring-slate-400',
      ghost:     'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus-visible:ring-slate-400',
      danger:    'bg-red-600 hover:bg-red-700 text-white shadow-sm focus-visible:ring-red-500',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-5 py-2.5',
      lg: 'text-base px-7 py-3',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';


// =============================================================================
// components/ui/Modal.tsx
// =============================================================================
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen:   boolean;
  onClose:  () => void;
  title?:   string;
  children: ReactNode;
  size?:    'sm' | 'md' | 'lg' | 'xl';
}

const SIZES = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' };

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isOpen) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${SIZES[size]} animate-fade-up`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl leading-none transition-colors">×</button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}


// =============================================================================
// components/ui/DataTable.tsx — Reusable sortable data table
// =============================================================================
interface Column<T> {
  key:     keyof T | string;
  header:  string;
  render?: (row: T) => ReactNode;
  width?:  string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data:    T[];
  keyFn:   (row: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, keyFn, emptyMessage = 'No data found.' }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-slate-400 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : data.map(row => (
            <tr key={keyFn(row)} className="hover:bg-slate-50/70 transition-colors">
              {columns.map(col => (
                <td key={String(col.key)} className="px-4 py-3.5 text-slate-700">
                  {col.render
                    ? col.render(row)
                    : String((row as any)[col.key] ?? '—')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
