const Checkbox = ({ title, state, onChange }) => {
    return (
      <div>
        <input type="checkbox" onChange={onChange} checked={state} id={title}/>
        <label htmlFor={title}>{title}</label>
      </div>
    );
  };
  
  export default Checkbox;
  