import { AxiosError } from "axios";
import { ReactElement, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getAuthToken,
  getCurrentUser,
  removeAuthToken,
  setAuthorizationHeaderToken,
} from "../services";
import { RootState } from "../store";
import { setUserState } from "../store/slicers";
import { createNotification } from "../store/slicers/notifier.slicer";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAuthToken();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleCurrentUserData = useCallback(async () => {
    if (token) {
      setAuthorizationHeaderToken(token);
    }

    try {
      const { data } = await getCurrentUser();

      if (data) {
        dispatch(setUserState(data));
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const { response } = err;

        if (response) {
          console.log(response.data.error);
          dispatch(createNotification({ message: response.data.error }));
        }

        removeAuthToken();

        navigate("/login");
      }
    }
  }, [dispatch, navigate, token]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (token && token.length && !user) {
      handleCurrentUserData();
    }
  });

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export { ProtectedRoute };
