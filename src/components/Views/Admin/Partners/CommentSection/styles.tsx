import styled from "styled-components"
import theme from "theme"

const CommentContainer = styled.div`
  width: 96vw;
  margin: 0 auto;
  padding-top: 20px;
  position: relative;
`

const Title = styled.h4`
  font-family: ${theme.fonts.titles};
  margin: 0;
  color: ${theme.colors.blue_dark};
`

const CommentList = styled.div`
  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);
  border-radius: 10px;
  width: 62%;
  margin-top: 15px;
  padding: 10px 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 300px;
  overflow: auto;
  background-color: #fffffff5;

  @media (max-width: 414px) {
    width: 87%;
  }
`

const Comment = styled.div`
  font-family: ${theme.fonts.extra};
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  border-bottom: 1px solid rgba(21, 54, 84, 0.6);

  .comment {
    font-weight: ${theme.fontWeights.light};
    font-size: 14px;
    padding-top: 10px;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: ${theme.fontWeights.light};
    b {
      font-weight: ${theme.fontWeights.medium};
      font-size: 16px;
    }
  }

  p {
    margin: 0;
    color: ${theme.colors.blue};
  }
`

const AddCommentButton = styled.div`
  position: absolute;
  top: 15px;
  left: 120px;
`

export { CommentContainer, Title, CommentList, Comment, AddCommentButton }
