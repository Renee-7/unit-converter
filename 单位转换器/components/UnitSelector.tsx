'use client'

import { Unit } from '@/lib/conversion';

interface UnitSelectorProps {
  label: string;
  units: Unit[];
  selectedUnit: Unit;
  onChange: (unit: Unit) => void;
}

export default function UnitSelector({
  label,
  units,
  selectedUnit,
  onChange,
}: UnitSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-apple-blue transition-colors"
        value={selectedUnit.id}
        onChange={(e) => {
          const unit = units.find((unit) => unit.id === e.target.value);
          if (unit) onChange(unit);
        }}
      >
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.name}
          </option>
        ))}
      </select>
    </div>
  );
} 