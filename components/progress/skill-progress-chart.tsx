"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type SkillProgress = {
  skill: string;
  value: number;
};

export function SkillProgressChart({ data }: { data: SkillProgress[] }) {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 12, top: 12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis
            dataKey="skill"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#CBD5E1", fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              background: "rgba(15,23,42,0.92)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              color: "#fff"
            }}
          />
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            fill="url(#skillGradient)"
            barSize={42}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="55%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
