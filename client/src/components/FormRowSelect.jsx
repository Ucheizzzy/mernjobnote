const FormRowSelect = ({ name, labelText, list, defaultValue = '' }) => {
  return (
    <div className='form-row'>
      <label htmlFor='jobStatus' className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id='jobStatus'
        className='form-select'
        defaultValue={defaultValue}
      >
        {list.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect
