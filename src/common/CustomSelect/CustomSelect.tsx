import React from 'react';
import { FormControl, FormLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import classNames from 'classnames';

import './styles.css';
import { CustomSelectProps } from './interfaces';
import { OptionSelect } from 'src/common/types';

const CustomSelect = ({
    value,
    label,
    options,
    customClasses,
    handleOnChangeValue,
}: CustomSelectProps) => {

  const getLabel = (label: string) => {
    return (
        <div className="customSelect__label">
            {label}
        </div>
    );
  };

  return (
    <FormControl className={classNames("customSelect__root", customClasses && customClasses.root)}>
        <FormLabel id="select-label">{label}</FormLabel>
        <Select
            aria-labelledby="select-label"
            name="controlled-select-label"
            value={value}
            onChange={(event: SelectChangeEvent) => handleOnChangeValue && handleOnChangeValue(event.target.value)}
            className="customSelect__content"
        >
            {options?.map((option: OptionSelect, index: number) => (
                <MenuItem key={`option_sel_${index}`} value={option.value}>{getLabel(option.label)}</MenuItem>
            ))}
        </Select>
    </FormControl>
  );
}

export default CustomSelect;