import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  ModalClose,
  ModalContainer,
  ModalForm,
  ModalGroupRadio,
  ModalGroupRadioLabel,
  ModalOverlay,
  ModalSelect,
  ModalTextArea,
  ModalTitle,
  RadioGroup,
} from "./style";
import { Loader, X } from "react-feather";
import { CoreInput } from "../CoreInput";
import { useForm } from "react-hook-form";
import { CoreButton } from "../../pages/Login/styles";
import { createProduct } from "app/services";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { createNotification, fetchProducts } from "app/store/slicers";
import { productsColorArr } from "../../styles/theme";

interface ShareModalProps {
  hideModal: Dispatch<SetStateAction<boolean>>;
}

const ShareModal = ({ hideModal }: ShareModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [sending, setSending] = useState(false);

  const shareForm = useForm({ mode: "all" });

  const postColorField = shareForm.watch("postColor");

  const handleHideModal = () => {
    hideModal(false);
  };

  const handleOnSubmit = async (formData: any) => {
    setSending(true);

    const { category, image, name, price, quantity } = formData;

    if (category && image && name && price && quantity) {
      try {
        const { data } = await createProduct(formData);

        if (data) {
          setSending(false);
          dispatch(
            createNotification({
              type: "success",
              message: "shared with success",
            })
          );

          handleHideModal();

          dispatch(fetchProducts());
        }
      } catch (err: any) {
        if (err instanceof AxiosError) {
          const { response } = err;

          if (response && response.data && response.data.error) {
            dispatch(
              createNotification({ message: response.data.console.error })
            );
          }

          setSending(false);
        }
      }
    } else {
      setSending(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>share your art</ModalTitle>
        <ModalClose onClick={() => handleHideModal()}>
          <X className="icon"></X>
        </ModalClose>
        <ModalForm onSubmit={shareForm.handleSubmit(handleOnSubmit)}>
          <CoreInput
            control={shareForm.control}
            name="name"
            type="text"
            placeholder="name"
            inputStyle={{ margin: "6px 0" }}
            rules={{ required: true }}
          />
          <ModalSelect
            {...shareForm.register("category", { required: true })}
            defaultValue=""
          >
            <option value="" disabled>
              category
            </option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </ModalSelect>
          <CoreInput
            control={shareForm.control}
            name="price"
            type="number"
            placeholder="price"
            inputStyle={{ margin: "6px 0" }}
            rules={{ required: true, min: 0 }}
          />
          <CoreInput
            control={shareForm.control}
            name="quantity"
            type="number"
            placeholder="quantity"
            inputStyle={{ margin: "6px 0" }}
            rules={{ required: true, min: 0 }}
          />
          <CoreInput
            control={shareForm.control}
            name="image"
            type="file"
            rules={{ required: true }}
            inputStyle={{ margin: "6px 0" }}
          />
          <ModalTextArea
            {...shareForm.register("description", { maxLength: 255 })}
            placeholder="description"
          />
          <ModalGroupRadioLabel>
            select the background color of the post
          </ModalGroupRadioLabel>
          <ModalGroupRadio>
            {productsColorArr.map((el) => (
              <RadioGroup key={el} color={el} selected={postColorField === el}>
                <label>
                  <input
                    type="radio"
                    value={el}
                    placeholder="Blue"
                    {...shareForm.register("postColor", { required: true })}
                  />
                  {el}
                </label>
              </RadioGroup>
            ))}
          </ModalGroupRadio>

          <CoreButton
            style={{ marginTop: 12 }}
            isDisabled={!shareForm.formState.isValid}
            isLoading={sending}
            type="submit"
          >
            {sending ? <Loader className="loader" /> : "share"}
          </CoreButton>
        </ModalForm>
      </ModalContainer>
    </ModalOverlay>
  );
};

export { ShareModal };
