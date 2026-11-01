import * as React from "react"

interface RadioButtonProps {
  label: string
  name: string
  value: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RadioButton({
  label,
  name,
  value,
  checked,
  onChange,
}: RadioButtonProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="text-sm">{label}</span>
    </label>
  )
}