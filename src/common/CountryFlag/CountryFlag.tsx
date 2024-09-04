import { ReactCountryFlag } from '@fadi-ui/react-country-flag';
import { Divider } from '@mui/material';
import classNames from 'classnames';

import './styles.css';
import { CountryFlagProps } from './interfaces';

const CountryFlag = ({width, height, esEnabled, enEnabled}: CountryFlagProps) => {
  return (
    <div className="countryFlag__flags">
        <span className={classNames(!esEnabled && "countryFlag__flagDisabled")}><ReactCountryFlag countryCode="es" height={height || 25} width={width|| 35} />{' '}</span>
        <Divider orientation="vertical" className="countryFlag__divider" />
        <span className={classNames(!enEnabled && "countryFlag__flagDisabled")}><ReactCountryFlag countryCode="us" height={height || 25} width={width || 35} />{' '}</span>
    </div>
  );
}

export default CountryFlag;