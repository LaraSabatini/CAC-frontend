import styled from "styled-components"
import theme from "theme"

const Card = styled.div<{ background: string }>`
  width: 420px;
  height: 270px;

  border: 1px solid green;
  border-radius: 18px;
  border: 1px solid rgba(70, 106, 149, 0.138);
  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);
  cursor: pointer;
  transition: 0.3s;

  position: relative;

  .watch {
    visibility: hidden;
  }

  &:hover {
    .watch {
      visibility: visible;
    }

    border: 1px solid rgba(70, 106, 149, 0.356);
    box-shadow: 0px 8px 24px rgba(70, 106, 149, 0.248);

    .info {
      background-color: #00000071;
    }
  }

  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 22.78%, #000000 100%),
    url(${props => props.background}) no-repeat center;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .info {
    border-radius: 18px;
    padding: 0 15px 15px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 5px;
    height: 100%;
    transition: 0.3s;
  }

  p {
    margin: 0;
    color: white;
  }

  .title {
    font-family: ${theme.fonts.titles};
    font-size: 16px;
    font-weight: ${theme.fontWeights.semiBold};
  }

  .description {
    font-family: ${theme.fonts.extra};
    font-size: 14px;
  }
`

const WatchButton = styled.button`
  position: absolute;
  background-color: transparent;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    color: ${theme.colors.white};
    height: 50px;
    width: 50px;
  }
`

const Player = styled.div`
  height: 80vh;
  border-radius: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .player-header {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    justify-content: space-between;
    width: 90%;
    padding-top: 10px;
    color: ${theme.colors.blue_dark};

    h3 {
      margin: 0;
      font-family: ${theme.fonts.titles};
      font-size: 16px;
      font-weight: ${theme.fontWeights.semiBold};
    }
  }

  iframe {
    border-radius: 18px;
  }

  @media (max-width: 414px) {
    height: 400px;
  }
`

const IconButton = styled.button`
  align-self: flex-end;
  border: none;
  background-color: transparent;

  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-self: center;
  gap: 10px;

  .delete {
    color: ${theme.colors.red};
  }

  .edit {
    color: ${theme.colors.blue};
  }
`

export { Card, WatchButton, Player, IconButton, ButtonContainer }
