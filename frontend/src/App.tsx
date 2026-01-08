import { useState } from 'react'
import styled from 'styled-components'

import Button from './components/Button'
import Form from './components/Form'
import GeneratedCartoon from './components/GeneratedCartoon'

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px;
  `,
  Title: styled.h1``,
}

const App = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [subject, setSubject] = useState<string>('')

  const handleImageGenerated = (url: string, subj: string) => {
    setImageUrl(url)
    setSubject(subj)
  }

  const handleGenerateAnother = () => {
    setImageUrl(null)
  }

  return (
    <Styled.Root>
      <Styled.Title>🎨 Cartoon Generator</Styled.Title>

      {!imageUrl && <Form onImageGenerated={handleImageGenerated} />}

      {imageUrl && <GeneratedCartoon imageUrl={imageUrl} subject={subject} />}

      {imageUrl && <Button onClick={handleGenerateAnother}>Generate Another</Button>}
    </Styled.Root>
  )
}

export default App