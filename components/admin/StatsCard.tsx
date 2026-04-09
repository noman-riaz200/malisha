

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

export default function StatsCard({ stat }: { stat: Stat }) {
  return (
    <div className="admin-card h-100 hover:-translate-y-2 transition-all duration-300 ease-in-out active:translate-y-0" 
         style={{ 
           borderRadius: '20px',
           boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
         }}>
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 rounded-2xl" 
               style={{ 
                 background: `rgba(${stat.color.match(/\d+/g)?.join(',') || '59,130,246'}, 0.1)`,
                 color: stat.color
               }}>
            <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
          </div>
          <span className="badge bg-success text-xs" style={{ fontSize: '0.75rem' }}>
            {stat.change}
          </span>
        </div>
        <h3 className="mb-1 fw-bold text-3xl text-gray-900" style={{ fontSize: '2rem', color: '#1e293b' }}>
          {stat.value}
        </h3>
        <p className="mb-0 text-muted text-sm">{stat.label}</p>
      </div>
    </div>
  );
}
