import { Buffer } from "buffer";
import { Edit2, MessageSquare } from "react-feather";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import Header from "../../components/Header";
import {
  ProfileAvatar,
  ProfileAvatarContainer,
  ProfileAvatarEdit,
  ProfileContainer,
  ProfileContent,
  ProfileContentBio,
  ProfileContentHeader,
  ProfileContentInfo,
  ProfileContentTitle,
  ProfileContentUsername,
  ProfileProductsContainer,
  ProfileProductsContent,
  ProfileProductsTitle,
} from "./style";

export const renderBufferToImg = (buffer: Buffer): string => {
  return `data:image/jpg;base64,${buffer}`;
};

const ProfilePage = () => {
  let { username } = useParams();
  const user = useSelector((state: RootState) => state.user.user);
  const isMyProfile = user.id === username;

  return (
    <>
      <Header />
      <ProfileContainer>
        <ProfileContent>
          <ProfileContentHeader>
            <ProfileContentTitle>
              <b>{isMyProfile && "my"}</b> profile
            </ProfileContentTitle>
            {!isMyProfile && <MessageSquare />}
          </ProfileContentHeader>
          <ProfileContentInfo>
            <ProfileAvatarContainer>
              <ProfileAvatar
                src={renderBufferToImg(user.avatar.image)}
              ></ProfileAvatar>
              {isMyProfile && (
                <ProfileAvatarEdit>
                  <Edit2 className="edit" />
                </ProfileAvatarEdit>
              )}
            </ProfileAvatarContainer>
            <ProfileContentUsername>@{user.username}</ProfileContentUsername>
            <ProfileContentBio>{user.bio}</ProfileContentBio>
          </ProfileContentInfo>
          <ProfileProductsContainer>
            <ProfileProductsTitle>
              <b>{isMyProfile && "my"}</b> arts
            </ProfileProductsTitle>
            <ProfileProductsContent>
              nothing to show here
            </ProfileProductsContent>
          </ProfileProductsContainer>
        </ProfileContent>
      </ProfileContainer>
    </>
  );
};

export default ProfilePage;
