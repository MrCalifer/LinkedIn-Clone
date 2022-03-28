import styled from "styled-components";
import { useState } from "react";

const PostModel = (props) => {
  const [editorText, setEditorText] = useState("");

  const reset = (event) => {
    setEditorText("");
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
                <img src="/images/user.svg" alt="" />
                <span>Name</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                ></textarea>
              </Editor>
            </SharedContent>

            <SharedCreation>
              <AttachAssets>
                <AssetButton>
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton>
                  <img src="/images/share-video.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/comment-icon.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton>Post</PostButton>
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
    svg,img {
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
  cursor: pointer;
  padding-right: 16px;
  color: darkgray;
  outline: none;
  transition: 170ms;
  &:hover {
    background-color: #0a66c2;
    color: white;
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

export default PostModel;
