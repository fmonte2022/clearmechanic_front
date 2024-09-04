import React, { useCallback, useEffect, useRef } from 'react';
import { isEmpty, isNil } from 'lodash';
import { FormControl, InputAdornment } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";

import './styles.css';
import { FormFieldTypeProps } from './interfaces';
import { useLangFormatter } from 'src/hooks/useLangFormatter';
import { ActionField } from 'src/common/types';
import StringUtility from 'src/utilities/StringUtility';
import CustomTextField from 'src/common/CustomTextField/CustomTextField';
import CustomRadioButton from 'src/common/CustomRadioButton/CustomRadioButton';
import CustomSelect from '../CustomSelect/CustomSelect';

const NUMBER_PATTERN = "[0-9]+";
const BASE_PREFIX = "formFieldType_";

const FormFieldType = ({
    fields,
    itemForm,
    disableForm,
    validateForm,
    autoFocusDisabled,
    showErrorInput,
    handleChangeItem,
}: FormFieldTypeProps) => {
  const { getText } = useLangFormatter(BASE_PREFIX);
  const inputPlaceholderLabel = getText("input_placelholder");

  const firstInputRef = useRef<any>(null);

  useEffect(() => {
    if (firstInputRef?.current) {
        firstInputRef?.current?.focus();
    }
  }, [firstInputRef]);

  const isValidValueType = useCallback((field: ActionField) => {
    if (!validateForm || !itemForm) return true;

      return StringUtility.validatePattern(getPatternField(field), itemForm[field.name]);
  }, [itemForm]);

  const handleOnChangeValue = useCallback((field: ActionField, newValue: any) => {
    if (!isEmpty(newValue) && field.type === "number" && !Number.isInteger(+newValue)) return;

    handleChangeItem({
        ...itemForm,
        [field.name]: newValue,
    });
  }, [itemForm]);

  const getInputField = (field: ActionField, isAutoFocus: boolean) => {
    switch(field.type) {
      case "string": {
        return (
            <CustomTextField
                focused={autoFocusDisabled && isAutoFocus}
                disabled={disableForm}
                error={validateForm && showErrorInput && isEmpty(itemForm[field.name])}
                label={field.label}
                required={field.required}
                value={itemForm[field.name] || field.defaultValue || ""}
                placeholder={inputPlaceholderLabel}
                inputRef={
                    (input: any) => {
                        if(input != null && !autoFocusDisabled && isNil(firstInputRef.current)) {
                           firstInputRef.current = input;
                           input.focus();
                        }
                    }
                }
                inputProps={{
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            style={{ display: isEmpty(itemForm[field.name]) ? 'none' : 'flex' }}
                            onClick={() => handleOnChangeValue(field, "")}
                            sx={{ cursor: 'pointer'}}
                            disablePointerEvents={disableForm}
                        >
                            <ClearIcon />
                        </InputAdornment>
                    )
                }}
                handleOnChangeValue={(value: any) =>  handleOnChangeValue(field, value)}
            />
        );
      }
      case "number": {
        return (
            <CustomTextField
                focused={autoFocusDisabled && isAutoFocus}
                disabled={disableForm}
                label={field.label}
                error={!isValidValueType(field) && showErrorInput}
                required={field.required}
                value={itemForm[field.name] || field.defaultValue || ""}
                placeholder={inputPlaceholderLabel}
                inputProps={{ pattern: NUMBER_PATTERN }}
                inputRef={
                    (input: any) => {
                        if(input != null && !autoFocusDisabled && isNil(firstInputRef.current)) {
                            firstInputRef.current = input;
                            input.focus();
                        }
                    }
                }
                handleOnChangeValue={(value: any) =>  handleOnChangeValue(field, value)}
            />
        );
      }
      case "options": {
        return (
            <>
                <div className="formFieldType__form_options">
                    <CustomRadioButton
                        options={field.options}
                        value={itemForm[field.name] || field.defaultValue}
                        label={field.label}
                        handleOnChangeValue={(newValue: string) => handleOnChangeValue(field, newValue)}
                    />
                </div>
            </>
        );
      }
      case "select": {
        return (
            <>
                <div className="formFieldType__form_options">
                    <CustomSelect
                        options={field.options}
                        value={itemForm[field.name] || field.defaultValue}
                        label={field.label}
                        handleOnChangeValue={(newValue: string) => handleOnChangeValue(field, newValue)}
                    />
                </div>
            </>
        );
      }
      default: return null;
    }
  };

  const getPatternField = (field: ActionField) => {
    switch(field.type) {
        case "number": return NUMBER_PATTERN;
        default: return null;
    }
  };

  return (
    <div className="formFieldType__container">
        <FormControl className="formFieldType__form">
            {itemForm && fields.map((field: ActionField, index: number) => (
                <div key={`${field.name}_${index}`}>
                    {getInputField(field, index === 0)}
                </div>
            ))}
        </FormControl>
    </div>
  );
}

export default FormFieldType;