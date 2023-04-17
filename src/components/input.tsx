function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  name?: string
  id?: string
  placeholder?: string
  value?: string
  minLength?: number
  maxLength?: number
  isValid?: boolean
  label?: string
  errorMessage?: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ 
  name, 
  id, 
  placeholder, 
  value,
  minLength,
  maxLength,
  isValid = true,
  label,
  errorMessage,
  setValue,
  onChange
}: Props) {
  return (
    <div>
      <label 
        htmlFor={id} 
        className={classNames(
          isValid ? 'text-zinc-500' : 'text-error',
          'block uppercase text-xs font-bold tracking-widest'
        )}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 outline-none px-4 lg:px-6 py-3 font-bold text-lg ring-1 ring-inset ring-[#DCDCDC] placeholder:opacity-50 focus:ring-2 focus:ring-inset focus:ring-primary focus:invalid:ring-error invalid:ring-error peer"
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          aria-invalid="true"
          aria-describedby="input-error"
        />
        <p 
          className={classNames(
            isValid ? 'invisible' : 'visible',
            'mt-2 italic text-xs text-error peer-invalid:visible'
          )}
          // className="invisible mt-2 text-sm text-red-600" 
          id="input-error"
        >
          {errorMessage}
        </p>
      </div>
    </div>
  )
}


// className={classNames(
//   true ? '' : '',
//   ''
// )}