import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type option = {
  id: number,
  name: string
}

interface Props {
  label?: string
  options: option[]
  selected?: option
  setSelected?: React.Dispatch<React.SetStateAction<option>>
  isValid?: boolean
}

export default function Select({ label, options, selected, setSelected, isValid = true }: Props) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label 
            className={classNames(
              isValid ? "text-zinc-500" : "text-error",
              "block uppercase text-xs font-bold tracking-widest"
            )}
          >
            {label}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button 
              data-cy={`${label?.toLocaleLowerCase()}-select-btn`}
              className={classNames(
                isValid ? "ring-[#DCDCDC]" : "ring-error",
                "relative w-full cursor-default rounded-md bg-white border-0 px-3 sm:px-4 py-3 font-bold text-xs sm:text-lg text-left text-gray-900 outline-none ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-primary focus:invalid:ring-error invalid:ring-error"
              )}
            >
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options 
                className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg"
                >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-primary text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-3 sm:pr-9'
                      )
                    }
                    value={option} 
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary',
                              'hidden sm:flex absolute inset-y-0 right-0 items-center pr-3'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
