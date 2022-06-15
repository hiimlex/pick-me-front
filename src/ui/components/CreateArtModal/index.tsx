import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ModalContainer, ModalOverlay, ModalTitle } from "./style";

const CreateArtModal = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>add a new art</ModalTitle>
        <select placeholder="select a category">
          {categories.map((category) => (
            <option value={category.name} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CreateArtModal;
