import styled from 'styled-components'

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Image: styled.img`
    margin-top: 10px;
    border: none;
    border-radius: 10px;
  `,
  Description: styled.div`
    margin: 10px;
  `
}

type GeneratedCartoonProps = {
  imageUrl: string
  subject: string
}

const GeneratedCartoon = ({ imageUrl, subject }: GeneratedCartoonProps) => {
  return (
    <Styled.Container>
      <h2>Generated Cartoon:</h2>
      <Styled.Description>Description: {subject}</Styled.Description>
      <Styled.Image src={imageUrl} alt="Generated Cartoon" width="300" />
    </Styled.Container>
  )
}

export default GeneratedCartoon
