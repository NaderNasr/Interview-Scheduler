import React from 'react';
import classNames from 'classnames';

import '../components/styles/Button.scss';

export default function Button({
  confirm,
  children,
  danger,
  disabled,
  onClick,
}) {
  const buttonClass = classNames('button', {
    'button--confirm': confirm,
    'button--danger': danger,
  });
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
