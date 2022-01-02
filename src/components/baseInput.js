
import { useRef, useEffect } from 'react'

import styles from '../styles/forms.module.css'

export default function BaseInput({ field: { label, type, id, name, placeholder, ...attrs }, model }) {
  const inputRef = useRef(null)

  useEffect(() => {
    Object.keys(attrs).forEach((key) => {
      inputRef.current.setAttribute(key, attrs[key])
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
        <input
        ref={ inputRef }
          id={ id }
          name={ name }
          value={ model[0] }
          autoComplete='off'
          type={ type || 'text' }
          placeholder={ placeholder || '' }
          className={ `${styles.input} rounded-lg shadow-sm` }
          onChange={ handleChange }
        />
      </div>
    </div>
  )
}
