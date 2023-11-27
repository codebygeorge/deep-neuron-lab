import { FC, InputHTMLAttributes } from 'react';

import './checkbox.css';

const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <label className="mcui-checkbox">
    <input type="checkbox" {...props} />
    <div>
      <svg className="mcui-check" viewBox="-2 -2 35 35" aria-hidden="true">
        <title>checkmark</title>
        <polyline points="7.57 15.87 12.62 21.07 23.43 9.93" />
      </svg>
    </div>
  </label>
);

export default Checkbox;
