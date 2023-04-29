import { AxiosError } from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Loader } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { LoaderContainer } from "ui/styles/global";
import {
  getAuthToken,
  getCurrentUser,
  removeAuthorizationHeaderToken,
  removeAuthToken,
  setAuthorizationHeaderToken,
} from "../services";
import { RootState } from "../store";
import { removeUserState, setUserState } from "../store/slicers";
import { createNotification } from "../store/slicers/notifier.slicer";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAuthToken();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [show, setShow] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleCurrentUserData = useCallback(async () => {
    if (token) {
      setAuthorizationHeaderToken(token);

      try {
        const { data } = await getCurrentUser();

        if (data) {
          dispatch(setUserState(data));
          setShow(true);
        }
      } catch (err: any) {
        setShow(true);
        dispatch(removeUserState());
        removeAuthToken();
        removeAuthorizationHeaderToken();

        if (err instanceof AxiosError) {
          const { response } = err;

          if (response && response.data && response.data.message) {
            dispatch(createNotification({ message: response.data.message }));
          }
        }
      }
    }
  }, [dispatch, token]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (token && !user) {
      handleCurrentUserData();
    }
  }, [handleCurrentUserData, token, user]);

  if (!token) {
    return children;
  }

  if (user) {
    return children;
  }

  return show ? (
    children
  ) : (
    <LoaderContainer>
      <Loader className="loaderApp" />
    </LoaderContainer>
  );
};

export { ProtectedRoute };
