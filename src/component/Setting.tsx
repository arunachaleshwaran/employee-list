import './Setting.scss';
import { useRef, useState } from 'react';

export function Setting() {
  const primaryHueRef = useRef<HTMLInputElement>(null);
  const secondaryHueRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openSetting: React.DOMAttributes<HTMLDivElement>['onClick'] =
    () => {
      setIsOpen(!isOpen);
    };
  return (
    <span className={isOpen ? 'open' : ''}>
      <div className='icon' onClick={openSetting}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className='list'>
        Theme
        <label htmlFor='primaryHue'>Primary Hue</label>
        <input
          ref={primaryHueRef}
          id='primaryHue'
          max='255'
          min='0'
          type='range'
          value='0'
        />
        <label htmlFor='secondaryHue'>Secondary Hue</label>
        <input
          ref={secondaryHueRef}
          id='secondaryHue'
          max='255'
          min='0'
          type='range'
          value='0'
        />
      </div>
    </span>
  );
}
