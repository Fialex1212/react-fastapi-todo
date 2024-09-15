import { useState } from 'react';
import './styles.module.css'; // Assuming you'll put the CSS in a separate file

const CustomCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked ? 'Unchecked' : 'Checked');
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CustomCheckbox;
