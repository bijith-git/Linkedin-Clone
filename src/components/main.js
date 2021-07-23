/*eslint-disable*/
import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PostModel from "./postModel";
import { connect } from "react-redux";
import { getArticlesApi } from "../actions/index";
import ReactPlayer from "react-player";

function Main(props) {
  useEffect(() => {
    props.getArticles();
  }, []);
  const [showModel, setShowModel] = useState("close");
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModel) {
      case "open":
        setShowModel("close");
        break;
      case "close":
        setShowModel("open");
        break;
      default:
        setShowModel("close");
    }
  };
  console.log("main", props.articles);
  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <button
              onClick={handleClick}
              disabld={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button
              onClick={handleClick}
              disabld={props.loading ? true : false}
            >
              <img src="/images/photo-icon.svg" alt="" />
              <span>Photo</span>
            </button>
            <button
              onClick={handleClick}
              disabld={props.loading ? true : false}
            >
              <img src="/images/video-icon.svg" alt="" />
              <span>Video</span>
            </button>
            <button
              onClick={handleClick}
              disabld={props.loading ? true : false}
            >
              <img src="/images/event-icon.svg" alt="" />
              <span>Event</span>
            </button>
            <button
              onClick={handleClick}
              disabld={props.loading ? true : false}
            >
              <img src="/images/article-icon.svg" alt="" />
              <span>Write article</span>
            </button>
          </div>
        </ShareBox>
        {props.articles.length === 0 ? (
          <p>There is no article</p>
        ) : (
          <Content>
            {props.loading && <img src="/images/three-dots.svg" alt="" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/menu.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <ShareImg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && (
                          <img src={article.sharedImg} alt="" />
                        )
                      )}
                    </a>
                  </ShareImg>
                  <SocialCount>
                    <li>
                      <button>
                        <img src="/images/reaction1.svg" alt="" />
                        <img src="/images/reaction2.svg" alt="" />
                        <img src="/images/reaction3.svg" alt="" />
                        <span>
                          {article.likes},{article.comments}comments
                        </span>
                      </button>
                    </li>
                    {/* <li>
                      <a>{article.comments}</a>
                    </li> */}
                  </SocialCount>
                  <SocialAction>
                    <button>
                      <img src="/images/like-icon.svg" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comment-icon.svg" alt="" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="/images/share-icon.svg" alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send-icon.svg" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialAction>
                </Article>
              ))}
          </Content>
        )}
        <PostModel showModel={showModel} handleClick={handleClick} />
      </Container>
    </>
  );
}

const Container = styled.div`
  grid-area: main;
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        padding-left: 16px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgb(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const ShareImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      outline: none;
      border: none;
      display: flex;
      background-color: transparent;
    }
  }
  span {
    margin-left: 5px;
  }
`;
const SocialAction = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  img {
    padding: 5px;
  }
  button {
    display: inline-flex;
    outline: none;
    background: transparent;
    border: none;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.8);
    }
    @media (max-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
