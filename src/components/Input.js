const Input = ({id, label, value, error, isInvalid, onChangeListener}) => {

  return (
    <>
      <label htmlFor={id}>
        {label}
        <input
          type="text"
          id={id}
          name=""
          defaultValue={value}
          onKeyUp={(event) => onChangeListener(id, event.target.value)}
        />
      </label>
      {isInvalid &&
        <span>{error}</span>
      }
    </>
  );
};

export default Input;