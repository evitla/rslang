import styled from 'styled-components';

export const QuestionWrapper = styled.div`
  display: grid;
  .question-num {
    margin-bottom: 30px;
    text-align: center;
  }

  .img {
    display: block;
    width: 100%;
    max-width: 30px;
  }

  .answers-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }

  .button {
    background-color: #ffffff;
    border: 0;
    border-radius: 0.5rem;
    box-sizing: border-box;
    color: #111827;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding: 0.75rem 1rem;
    text-align: center;
    text-decoration: none #d1d5db solid;
    text-decoration-thickness: auto;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .button:hover {
    background-color: rgb(249, 250, 251);
  }

  .button:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  .button:focus-visible {
    box-shadow: none;
  }

  .button.play-audio {
    margin: 0 auto;
  }
`;
