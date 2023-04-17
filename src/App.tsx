import arrowDown from './assets/icon-arrow.svg'
import { useState } from 'react'
import Select from './components/select'
import "./styles.css"

export const months = [
  { id: 0, name: 'January' },
  { id: 1, name: 'February' },
  { id: 2, name: 'March' },
  { id: 3, name: 'April' },
  { id: 4, name: 'May' },
  { id: 5, name: 'June' },
  { id: 6, name: 'July' },
  { id: 7, name: 'August' },
  { id: 8, name: 'September' },
  { id: 9, name: 'October' },
  { id: 10, name: 'November' },
  { id: 11, name: 'December' },
]

const days = generateArray(1,31)

const years = generateArray(1900).reverse()

export function generateArray(start:number, end?:number) {
  const endDate = end || new Date().getFullYear()
  let items = []

  for (var i = start; i <= endDate; i++) {
    items.push({ 
      id: i, 
      name: String(i)
    })
  }

  return items
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function App() {
  const [selectedDay, updateDay] = useState<{id: number, name: string}>(days[0])
  const [selectedMonth, updateMonth] = useState<{id: number, name: string}>(months[0])
  const [selectedYear, updateYear] = useState<{id: number, name: string}>(years[0])

  const [yearsOld, setYearsOld] = useState<number>(0)
  const [monthsOld, setMonthsOld] = useState<number>(0)
  const [daysOld, setDaysOld] = useState<number>(0)

  const [isValid, setIsValid] = useState(true)
  const [isAnimating, updateAnimating] = useState(false)

  function getAge() {
    let m = selectedMonth.id
    let d = selectedDay.id
    let y = selectedYear.id

    /* 
    January: 31 days
    February: 28 days and 29 in every leap year
    March: 31 days
    April: 30 days
    May: 31 days
    June: 30 days
    July: 31 days
    August: 31 days
    September: 30 days
    October: 31 days
    November: 30 days
    December: 31 days
    */

    const currentDate = new Date()
    const birthDate = new Date(y, m, d)

    console.log(currentDate)
    console.log(birthDate)

    // calculate the time difference
    var timeDifference = currentDate.getTime() - birthDate.getTime()

    if(timeDifference > 0) {
      var years = timeDifference / (1000 * 60 * 60 * 24 * 365)
      var months = (years - Math.floor(years)) * 12
      var days = (months - Math.floor(months)) * 30

      setYearsOld(Math.floor(years))
      setMonthsOld(Math.floor(months))
      setDaysOld(Math.floor(days))
      setIsValid(true)
      updateAnimating(true)
    } else {
      setYearsOld(0)
      setMonthsOld(0)
      setDaysOld(0)
      setIsValid(false)
    }
  }

  return (
    <div className='bg-white rounded-t-3xl rounded-l-3xl rounded-br-[100px] sm:rounded-br-[200px] max-w-[736px] px-4 py-12 lg:p-14 mx-4 md:mx-auto my-10 sm:my-20'>
      <div className='grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-8'>
        <div>
          <Select 
            label='Day'
            options={days}
            selected={selectedDay}
            setSelected={updateDay}
            isValid={isValid}
          />
        </div>
        <div>
          <Select
            label='Month'
            options={months}
            selected={selectedMonth}
            setSelected={updateMonth}
            isValid={isValid}
          />
        </div>
        <div>
          <Select 
            label='Year'
            options={years}
            selected={selectedYear}
            setSelected={updateYear}
            isValid={isValid}
          />
          <p 
            className={classNames(
              isValid ? 'invisible' : 'visible',
              'whitespace-nowrap mt-2 italic text-xs text-error peer-invalid:visible'
            )}
            id="input-error"
          >
            Must be in the past
          </p>
        </div>
      </div>
      <div className='relative h-16 my-8'>
        <div className='bg-[#DCDCDC] w-full h-[1px] absolute translate-y-8'>
          <button 
            data-cy="get-age-btn"
            onClick={getAge}
            disabled={false}
            className='w-16 h-16 bg-primary rounded-full absolute right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 -translate-y-8 grid place-content-center outline-none ring-1 ring-inset focus:ring-2 focus:ring-inset ring-primary disabled:bg-[#C3A6FF]'
          >
            <img src={arrowDown} aria-hidden="true" />
            <span className="sr-only">Submit</span>
          </button>
        </div>
      </div>
      
      <div>
        <dl data-cy="age">
          <dt className='flex items-end font-extrabold italic text-6xl tracking-tighter'>
            <span data-cy="years" className='h-14 w-20 inline-block text-primary relative overflow-hidden group'>
              {yearsOld === 0 
                ? '- -'
                : <>
                    <div
                      className={classNames(
                        isAnimating ? "animation-1" : "",
                        "absolute bottom-0 flex flex-col"
                      )}
                      // onAnimationEnd={() => updateAnimating(false)}
                    >
                      {[...Array(yearsOld + 1)].map((_, index) => (
                        <span 
                          key={index}
                          
                        >
                          {index}
                        </span>
                      ))}
                    </div>
                  </>
              }
            </span> years
          </dt>
          <dt className='flex items-end font-extrabold italic text-6xl tracking-tighter'>
            <span data-cy="months" className='h-14 w-20 inline-block text-primary relative overflow-hidden group'>
              {monthsOld === 0
                ? '- -'
                : <>
                    <div 
                      className={classNames(
                        isAnimating ? "animation-2" : "",
                        "absolute bottom-0 flex flex-col"
                      )}
                      // onAnimationEnd={() => updateAnimating(false)}
                    >
                      {[...Array(monthsOld + 1)].map((_, index) => (
                        <span 
                          key={index}
                          
                          
                        >
                          {index}
                        </span>
                      ))}
                    </div>
                  </>
              }
            </span> months
          </dt>
          <dt className='flex items-end font-extrabold italic text-6xl tracking-tighter'>
            <span data-cy="days" className='h-14 w-20 inline-block text-primary relative overflow-hidden group'>
              {daysOld === 0
                ? '- -'
                : <>
                    <div 
                      className={classNames(
                        isAnimating ? "animation-3" : "",
                        "absolute bottom-0 flex flex-col"
                      )}
                      onAnimationEnd={() => updateAnimating(false)}
                    >
                      {[...Array(daysOld + 1)].map((_, index) => (
                        <span 
                          key={index}
                          
                          
                        >
                          {index}
                        </span>
                      ))}
                    </div>
                  </>
              }
            </span> days
          </dt>
        </dl>
      </div>
    </div>
  )
}

export default App