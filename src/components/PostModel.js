import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { connet } from "react-redux";
import firebase from "firebase/compat/app";
import { postArticleAPI } from "../actions";

const getUserName = (props) => {
  if (props.user != null) {
    return props.user.displayName;
  } else {
    return "Name";
  }
};

const PostModel = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [shareVideo, setShareVideo] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === " " || image == "undefined") {
      alert(`Not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setShareVideo("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: shareVideo,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };

  const reset = (event) => {
    setEditorText("");
    setShareImage("");
    setShareVideo("");
    setAssetArea("");
    props.handleClick(event);
  };

  return (
    <>
      {props.showModel === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>

            <SharedContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{getUserName(props)}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
              </Editor>
              {assetArea === "image" ? (
                <UploadImage>
                  <input
                    type="file"
                    accept="image/gifs , image/jpeg , image/jpg , image/png"
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <p>
                    <label htmlFor="file" style={{ cursor: "pointer" }}>
                      Select an image to share.
                    </label>
                  </p>
                  {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                </UploadImage>
              ) : (
                assetArea === "media" && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter a video link."
                      value={shareVideo}
                      style={{ border: "none" }}
                      onChange={(e) => setShareVideo(e.target.value)}
                    ></input>
                    {shareVideo && (
                      <ReactPlayer width={"100%"} url={shareVideo} />
                    )}
                  </>
                )
              )}
            </SharedContent>

            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/share-video.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/comment-icon.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)}>
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.5s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    align-items: center;
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    background-color: white;
    vertical-align: middle;
    cursor: pointer;
    svg,
    img {
      pointer-events: none;
    }
    &:hover {
      border-radius: 45%;
      background-color: rgba(0, 0, 0, 0.08);
      transition: 100ms;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 10px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  border: none;
  color: rgba(0, 0, 0, 0.5);
  img {
    padding: 10px;
    cursor: pointer;
    &:hover {
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const AttachAssets = styled.div`
  display: flex;
  padding-right: 8px;
  align-items: center;

  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 80px;
  border-radius: 20px;
  border: none;
  padding-left: 16px;
  vertical-align: middle;
  cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
  padding-right: 16px;
  color: ${(props) => (props.disabled ? "black" : "white")};
  background-color: ${(props) => (props.disabled ? "drakgray" : "#0a66c2")};
  outline: none;
  transition: 170ms;
  &:hover {
    background-color: ${(props) => (props.disabled ? "drakgray" : "#0a66c2")};
    color: ${(props) => (props.disabled ? "black" : "white")};
    cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    border: none;
    resize: none;
    outline: none;
  }
  input {
    width: 100%;
    height: 15px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    margin-bottom: 5px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle :(payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModel);
