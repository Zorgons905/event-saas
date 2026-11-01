import * as React from "react"

interface TextAreaProps {
  label?: string
  name: string
  placeholder?: string
  value: string
  rows?: number
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({
  label,
  name,
  placeholder,
  value,
  rows = 4,
  onChange,
}: TextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2 text-sm"
      />
    </div>
  )
}