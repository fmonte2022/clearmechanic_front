import { useMemo } from "react";
import { isEmpty } from 'lodash';
import { FormControl, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import './styles.css';
import { SearchMovieFilterProps } from "src/pages/components/SearchMovieFilter/interfaces";
import { useLangFormatter } from "src/hooks/useLangFormatter";
import CustomTextField from "src/common/CustomTextField/CustomTextField";

const BASE_PREFIX = "searchMovieFilter_";

const SearchMovieFilter = ({ searchValue, handleChangeValue }: SearchMovieFilterProps) => {
  const { getText } = useLangFormatter(BASE_PREFIX);
  const placeholderSearchLabel = getText("placeholder_search_label");
  
  const showClearIcon = useMemo(() => {
    return isEmpty(searchValue) ? 'none' : 'flex';
  }, [searchValue]);

  const handleClick = () => {
    handleChangeValue("");
  };

  return (
    <div className="searchMovieFilter__container">
      <FormControl className="searchMovieFilter__form">
        <CustomTextField
          value={searchValue}
          placeholder={placeholderSearchLabel}
          handleOnChangeValue={(value: any) => handleChangeValue(value)}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleClick}
                sx={{ cursor: 'pointer'}}
              >
                <ClearIcon />
              </InputAdornment>
            )
          }}
          customClasses={{
            textField: "searchMovieFilter__textField"
          }}
        />
      </FormControl>
    </div>
  );
}

export default SearchMovieFilter;