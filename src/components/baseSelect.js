
import { useRef, useEffect } from 'react'

import styles from '../styles/forms.module.css'

export default function BaseSelect({ field: { label, type, id, name, placeholder, options, ...attrs }, model }) {
  const selectRef = useRef(null)

  useEffect(() => {
    Object.keys(attrs).forEach((key) => {
      selectRef.current.setAttribute(key, attrs[key])
    })
  }, [attrs])

  function handleChange(e) {
    model[1](e.target.value)
  }

  return (
    <div>
      <label htmlFor={ id } className='block text-sm font-semibold'>
        { label }
      </label>

      <div className='mt-1'>
        <select
          name={ name }
          id={ id }
          ref={ selectRef }
          value={ model[0] }
          className={`${styles.select} rounded-lg shadow-sm`}
          onChange={ handleChange }
        >
          {
            options.map((option) =>
              <option key={ option } value={ option } className={`${styles.option} capitalize`}>
                { option}
              </option>
            )
          }
        </select>
      </div>
    </div>
  )
}
