import * as React from "react"

interface DropdownProps {
  label?: string
  name: string
  value: string
  options: {
    value: string
    label: string
  }[]
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Dropdown({
  label,
  name,
  value,
  options,
  placeholder = "Pilih salah satu",
  onChange,
}: DropdownProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2 text-sm"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}