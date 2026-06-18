'use client';

import { useState } from 'react';
import { ROLES_DATA, RoleData } from '@/lib/roles-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Scale, Check } from 'lucide-react';

export function RoleCompare() {
  const [role1Id, setRole1Id] = useState<string>(ROLES_DATA[0].id);
  const [role2Id, setRole2Id] = useState<string>(ROLES_DATA[1].id);

  const role1 = ROLES_DATA.find(r => r.id === role1Id) as RoleData;
  const role2 = ROLES_DATA.find(r => r.id === role2Id) as RoleData;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
          <Scale className="w-4 h-4 mr-2" /> Compare Roles
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-slate-900 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white mb-4">Compare Career Paths</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-start-2">
            <Select value={role1Id} onValueChange={setRole1Id}>
              <SelectTrigger className="bg-slate-950 border-slate-700">
                <SelectValue placeholder="Select first role" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                {ROLES_DATA.map(r => (
                  <SelectItem key={r.id} value={r.id}>{r.emoji} {r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-start-3">
            <Select value={role2Id} onValueChange={setRole2Id}>
              <SelectTrigger className="bg-slate-950 border-slate-700">
                <SelectValue placeholder="Select second role" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                {ROLES_DATA.map(r => (
                  <SelectItem key={r.id} value={r.id}>{r.emoji} {r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <tbody>
              <tr className="border-b border-slate-800 bg-slate-950/50">
                <td className="p-4 font-semibold text-slate-400 w-1/3">Target Role</td>
                <td className="p-4 font-bold text-lg text-white border-l border-slate-800 w-1/3">{role1.emoji} {role1.name}</td>
                <td className="p-4 font-bold text-lg text-white border-l border-slate-800 w-1/3">{role2.emoji} {role2.name}</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="p-4 font-medium text-slate-400">Category</td>
                <td className="p-4 text-slate-300 border-l border-slate-800">{role1.category}</td>
                <td className="p-4 text-slate-300 border-l border-slate-800">{role2.category}</td>
              </tr>
              <tr className="border-b border-slate-800 bg-slate-950/30">
                <td className="p-4 font-medium text-slate-400">Average Salary (India)</td>
                <td className="p-4 text-emerald-400 font-semibold border-l border-slate-800">{role1.salaryRange}</td>
                <td className="p-4 text-emerald-400 font-semibold border-l border-slate-800">{role2.salaryRange}</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="p-4 font-medium text-slate-400">Job Demand</td>
                <td className="p-4 text-slate-300 border-l border-slate-800">{role1.demand} ({role1.jobOpenings})</td>
                <td className="p-4 text-slate-300 border-l border-slate-800">{role2.demand} ({role2.jobOpenings})</td>
              </tr>
              <tr className="border-b border-slate-800 bg-slate-950/30">
                <td className="p-4 font-medium text-slate-400">Time to Job-Ready</td>
                <td className="p-4 text-slate-300 border-l border-slate-800">~{role1.suggestedWeeks} Weeks</td>
                <td className="p-4 text-slate-300 border-l border-slate-800">~{role2.suggestedWeeks} Weeks</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="p-4 font-medium text-slate-400">Difficulty</td>
                <td className="p-4 text-slate-300 border-l border-slate-800">{role1.difficulty}</td>
                <td className="p-4 text-slate-300 border-l border-slate-800">{role2.difficulty}</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-400 align-top">Core Skills Needed</td>
                <td className="p-4 border-l border-slate-800 align-top">
                  <ul className="space-y-2">
                    {role1.skills.map((s, i) => (
                      <li key={i} className="flex items-center text-slate-300"><Check className="w-3.5 h-3.5 text-indigo-400 mr-2 shrink-0" /> {s}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 border-l border-slate-800 align-top">
                  <ul className="space-y-2">
                    {role2.skills.map((s, i) => (
                      <li key={i} className="flex items-center text-slate-300"><Check className="w-3.5 h-3.5 text-indigo-400 mr-2 shrink-0" /> {s}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
