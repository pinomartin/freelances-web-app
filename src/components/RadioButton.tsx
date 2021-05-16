import { RadioButtonPros } from '../interfaces/radioButton';

const RadioButton: React.FC<RadioButtonPros> = ({
    id,
    changed,
    value,
    label,
    isSelected,
  }) => {
    return (
      <div className="custom-control custom-radio custom-control-inline mt-2 mb-2">
        <input
          className="custom-control-input"
          id={id}
          onChange={changed}
          value={value}
          type="radio"
          checked={isSelected}
        />
        <label className="custom-control-label mr-3 primaryFontColor" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  };

export default RadioButton
