import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import classNames from 'classnames';

import './styles.css';
import { CustomRadioButtonProps } from './interfaces';
import { OptionRadioButton } from 'src/common/types';

const CustomRadioButton = ({
    value,
    label,
    options,
    customClasses,
    handleOnChangeValue,
}: CustomRadioButtonProps) => {

  const getLabel = (label: string, symbol?: any) => {
    if (!symbol) return label;

    return (
        <div className="customRadioButton__label">
            {label}
            {symbol}
        </div>
    );
  };

  return (
    <FormControl className={classNames("customRadioButton__root", customClasses && customClasses.root)}>
        <FormLabel id="radio-buttons-group">{label}</FormLabel>
        <RadioGroup
            aria-labelledby="radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={(_, value: string) => handleOnChangeValue && handleOnChangeValue(value)}
            className="customRadioButton__content"
        >
            {options?.map((option: OptionRadioButton, index: number) => (
                <FormControlLabel
                    value={option.value}
                    key={`option_rb_${index}`} control={<Radio />} label={getLabel(option.label, option.symbol)}
                />
            ))}
        </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioButton;