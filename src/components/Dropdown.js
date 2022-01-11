const Dropdown = ({
  id,
  label,
  options,
  value,
  error,
  isInvalid,
  onChangeListener
}) => {
  return (
    <>
      <label htmlFor={id}>
        {label}
        <select 
        id={id} 
        value={value} 
        onChange={(event) => onChangeListener(id, event.target.value)}>
          <option defaultValue> -- select an option -- </option>
          {!!options &&
            options.map((elem, index) => (
            <option key={`option-${index}`} value={elem}>{elem}</option>
            ))
          }
        </select>
      </label>
      {isInvalid &&
        <span>{error}</span>
      }
    </>
  );
};

export default Dropdown;