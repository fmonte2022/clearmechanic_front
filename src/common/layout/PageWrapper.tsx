import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSection } from "src/redux/reducers/appStateSlice";

import { PageWrapperProps } from "src/common/layout/interfaces";

const PageWrapper = ({ state, children }: PageWrapperProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (state) {
      dispatch(setSection(state));
    }
  }, [dispatch, state]);

  return (
    <>{children}</>
  );
};

export default PageWrapper;