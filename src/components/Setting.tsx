import './Setting.scss';
import useSessionStorage from '../hook/useSessionStorage';
import { useState } from 'react';

export default function Setting() {
  /** Refer @link {src/index.scss} Orange, Blue color rep.*/
  const DEFAULT_PRIMARY_HUE = 50,
    DEFAULT_SECONDARY_HUE = 240;
  const [isOpen, setIsOpen] = useState(false);
  const openSetting: React.DOMAttributes<HTMLDivElement>['onClick'] =
    () => {
      setIsOpen(!isOpen);
    };
  const [primaryHue, setPrimaryHue] = useSessionStorage(
    'primary-hue',
    DEFAULT_PRIMARY_HUE
  );
  const [secondaryHue, setSecondaryHue] = useSessionStorage(
    'secondary-hue',
    DEFAULT_SECONDARY_HUE
  );
  const changePrimaryHue = (value: number) => {
    document
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .getElementsByTagName('body')[0]
      .style.setProperty('--hue-primary', `${value}`);
    setPrimaryHue(value);
  };
  const changeSecondaryHue = (value: number) => {
    document
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .getElementsByTagName('body')[0]
      .style.setProperty('--hue-secondary', `${value}`);
    setSecondaryHue(value);
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
          id='primaryHue'
          max='255'
          min='0'
          type='range'
          value={`${primaryHue}`}
          onChange={event =>
            changePrimaryHue(parseInt(event.target.value, 10))
          }
        />
        <label htmlFor='secondaryHue'>Secondary Hue</label>
        <input
          id='secondaryHue'
          max='255'
          min='0'
          type='range'
          value={`${secondaryHue}`}
          onChange={event =>
            changeSecondaryHue(parseInt(event.target.value, 10))
          }
        />
      </div>
    </span>
  );
}
