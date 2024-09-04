import React, { ReactNode } from 'react';
import { Divider } from '@mui/material';

import './styles.css';
import { CustomListDividerProps } from './interfaces';

const CustomListDivider = ( { options }: CustomListDividerProps) => {
  return (
    <div className={"customListDivider__root"}>
        {options.map((item: ReactNode, index: number) => (
          <div className={"customListDivider__item"} key={`opt-list-${index}`}>
            {item}
            {index !== options.length - 1 ? <Divider orientation={'vertical'} className={"customListDivider__divider"}  /> : null}
          </div>
        ))}
    </div>
  );
}

export default CustomListDivider;