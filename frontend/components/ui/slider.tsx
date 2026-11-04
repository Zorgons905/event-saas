import * as React from "react"

interface SliderProps {
  label?: string
  name: string
  min?: number
  max?: number
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Slider({
  label,
  name,
  min = 0,
  max = 100,
  value,
  onChange,
}: SliderProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}: {value}
        </label>
      )}

      <input
        id={name}
        type="range"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer"
      />
    </div>
  )
}