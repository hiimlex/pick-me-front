import styled from "styled-components";
import {
  inputBackgroundColor,
  mainColorTheme,
  mainTextColor,
  secondaryColorTheme,
  secondaryTextColor,
} from "../../styles/theme";

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileContent = styled.div`
  padding: 42px 64px;
  width: 1024px;
`;

export const ProfileContentHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 12px;
`;

export const ProfileContentTitle = styled.div`
  font-size: 22px;
  margin-bottom: 12px;
`;

export const ProfileContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ProfileAvatar = styled.img`
  width: 82px;
  height: 82px;
  border-radius: 50%;

  margin-bottom: 12px;
`;

export const ProfileContentUsername = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${secondaryTextColor};
  margin-bottom: 12px;
`;

export const ProfileContentBio = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${secondaryTextColor};
  margin-bottom: 12px;
`;

export const ProfileProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 32px;
`;

export const ProfileProductsTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${mainColorTheme};
  text-align: center;
`;

export const ProfileProductsContent = styled.div`
  margin-top: 12px;
  display: flex;
  width: 100%;
  border: 1px solid ${mainColorTheme}33;
  padding: 24px;
`;

export const ProfileAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: fit-content;
  height: fit-content;
`;

export const ProfileAvatarEdit = styled.div`
  position: absolute;
  right: -6px;
  bottom: 12px;
  background: ${mainColorTheme};
  cursor: pointer;

  width: 32px;
  height: 32px;

  padding: 8px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;

  &:hover {
    background: ${secondaryColorTheme};
  }

  .edit {
    stroke: ${inputBackgroundColor};
    transform: scale(1);
  }
`;
