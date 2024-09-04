import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Drawer } from '@mui/material';
import { isEqual } from 'lodash';
import TuneIcon from '@mui/icons-material/Tune';

import './styles.css';
import { MovieFilterDrawerProps } from 'src/pages/components/MovieFilterDrawer/interfaces';
import { useLangFormatter } from 'src/hooks/useLangFormatter';
import { ActionField } from 'src/common/types';
import FormFieldType from 'src/common/FormFieldType/FormFieldType';

const FILTER_PROPS = {
  TITLE: "title",
  GENDER: "gender"
}

const BASE_PREFIX = "movieFilterDrawer_";

const MovieFilterDrawer = ({
  filterParams,
  config,
  handleOnApplyFilter
}: MovieFilterDrawerProps) => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);
  const [localFilterParams, setLocalFilterParams] = useState<any>(filterParams);

  const { getText, getGlobalText } = useLangFormatter(BASE_PREFIX);

  const searchBtnLabel = getText("search_btn_label");
  const cancelBtnLabel =  getGlobalText("cancel");
  const confirmBtnLabel = getGlobalText("confirm");

  const prevFilterParams = useRef(null);

  const fields: ActionField[] = [
    {
      name: "title",
      label: getText("field_title_label"),
      type: "string",
      value: null,
      defaultValue: null,
      required: false,
      isField: true,
    },
    {
      name: "genderId",
      label: getText("field_gender_label"),
      type: "options",
      options: config?.genders,
      value: null,
      defaultValue: null,
      required: false,
      isField: true,
    },
    {
      name: "actors",
      label: getText("field_actor_label"),
      type: "select",
      options: config?.actors,
      value: null,
      defaultValue: null,
      required: false,
      isField: true,
    },
  ];

  useEffect(() => {
    resetLocalFilters();
  }, []);

  useEffect(() => {
    if (!isEqual(filterParams, prevFilterParams.current) && !filterParams) {
      resetLocalFilters();
    }
  }, [prevFilterParams, filterParams]);

  const resetLocalFilters = () => {
    setLocalFilterParams({
      [FILTER_PROPS.TITLE]: null,
      [FILTER_PROPS.GENDER]: null,
    });
  };

  const handleConfirmFilters = useCallback(() => {
    setOpenFilterDrawer(false);
    handleOnApplyFilter && handleOnApplyFilter(localFilterParams);
  }, [localFilterParams]);

  return (
      <>
        <div className="movieFilterDrawer__container">
          <Button
            onClick={() => {
              setOpenFilterDrawer(true);
            }}
            className="movieFilterDrawer__button"
            variant="outlined"
            startIcon={<TuneIcon />}
          >
            {searchBtnLabel}
          </Button>
        </div>
        <Drawer
          className="movieFilterDrawer__drawer"
          anchor={'right'}
          open={openFilterDrawer}
          onClose={() => setOpenFilterDrawer(false)}
        >
          <header className="movieFilterDrawer__title">{searchBtnLabel}</header>
          <div className="movieFilterDrawer__content">
            <FormFieldType
              fields={fields || []}
              itemForm={localFilterParams}
              handleChangeItem={(newItem: any) => { setLocalFilterParams(newItem); prevFilterParams.current = newItem }}
              disableForm={false}
              autoFocusDisabled
            />
          </div>
          <footer className="movieFilterDrawer__actions">
            <div className="movieFilterDrawer__content_action">
              <Button onClick={() => { setOpenFilterDrawer(false); setLocalFilterParams(filterParams || localFilterParams); }} variant="outlined">
                {cancelBtnLabel}
              </Button>
              <Button onClick={handleConfirmFilters} color="primary" variant="contained">
                {confirmBtnLabel}
              </Button>
            </div>
          </footer>
        </Drawer>
      </>
  );
}

export default MovieFilterDrawer;