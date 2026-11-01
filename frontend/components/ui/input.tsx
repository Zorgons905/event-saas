import * as React from "react"

interface InputProps {
  label?: string
  name: string
  type?: string
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2 text-sm"
      />
    </div>
  )
}