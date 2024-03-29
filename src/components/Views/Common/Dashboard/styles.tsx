import styled from "styled-components"
import theme from "theme/index"

const ArticlesContainer = styled.div`
  width: 97vw;
  margin: 0 auto;
  padding-top: 20px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 50px;
  gap: 10px;

  @media (max-width: 1366px) {
    gap: 10px;
  }

  @media (max-width: 1274px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`

const FullArticle = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding-top: 10px;
`

const Chip = styled.div`
  display: flex;
  align-items: center;

  font-family: ${theme.fonts.titles};
  font-size: 14px;
  gap: 10px;
  padding-bottom: 20px;

  font-weight: 600;

  a {
    margin: 0;
    text-decoration: none;
    color: ${theme.colors.blue_dark};
  }

  span,
  svg {
    color: ${theme.colors.blue};
    font-weight: 200;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  @media (max-width: 414px) {
    margin-left: 10px;
  }
`

const EmptyPage = styled.h2`
  font-family: ${theme.fonts.titles};
  color: ${theme.colors.blue};
  text-align: center;
  padding-top: 20px;
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
`

const CardPlaceholder = styled.div`
  border: 1px solid rgba(70, 106, 149, 0.138);
  border-radius: 18px;

  transition: 0.3s;
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(70, 106, 149, 0.356);
  }

  padding: 5px 25px;

  width: 600px;
  height: 320px;

  animation: skeleton-loading 1.5s linear infinite;

  @keyframes skeleton-loading {
    0% {
      background-color: #ebf1fa;
    }
    100% {
      background-color: #f3f3f3;
    }
  }
`

const AdminButton = styled.div`
  margin-left: 25px;
`

export {
  ArticlesContainer,
  FullArticle,
  Chip,
  EmptyPage,
  ButtonContainer,
  CardPlaceholder,
  AdminButton,
}
