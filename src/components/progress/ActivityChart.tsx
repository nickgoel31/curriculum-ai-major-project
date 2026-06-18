'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ActivityChartProps {
  data: {
    date: string;
    displayDate: string;
    tasks: number;
  }[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-[328px] animate-pulse flex items-center justify-center">
        <div className="text-slate-500">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-6">Activity (Last 30 Days)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="displayDate" 
              stroke="#475569" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value, index) => index % 7 === 0 ? value : ''} // Show roughly one tick per week
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: '#1e293b' }} 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
              itemStyle={{ color: '#818cf8' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
              formatter={(value: any) => [`${value} Tasks Completed`, '']}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="tasks" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.tasks > 0 ? '#4f46e5' : '#334155'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
