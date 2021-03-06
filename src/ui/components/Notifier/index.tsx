import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../../app/store/slicers/notifier.slicer";
import { NotifierType } from "../../styles/theme";
import { NotificationContent } from "./styles";

export type NotifierPosition = "top" | "bottom";

export interface NotifierProps {
  id: number;
  message: string;
  type?: NotifierType;
  position?: NotifierPosition;
  duration?: number;
}

const Notifier = ({
  message,
  type = "success",
  position = "bottom",
  duration = 3000,
  id,
}: NotifierProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  }, [dispatch, id, duration]);

  return (
    <NotificationContent type={type} position={position}>
      {message.toLowerCase()}
    </NotificationContent>
  );
};

export default Notifier;
