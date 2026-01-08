import { useState } from 'react'
import styled from 'styled-components'

const Styled = {
  Root: styled.div``,
  Title: styled.h1``,
  Description: styled.p``,
  Form: styled.form``,
  Input: styled.input``,
  Button: styled.button``,
}

const App = () => {
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!subject) {
      setError("Please enter a subject")
      return
    }

    console.log("Subject: ", subject)
    setLoading(true)
    setError(null)
    setImageUrl(null)

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      setImageUrl(data.imageUrl)
      console.log("Generated Image URL: ", data.imageUrl)

    } catch (err) { 
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }


  return (
    <Styled.Root>
      <Styled.Title>🎨 Cartoon Generator</Styled.Title>
      <Styled.Description>Enter a subject to generate a cartoon image</Styled.Description>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Input type="text" value={subject} placeholder="e.g. a blue colored happy dog" onChange={(e) => setSubject(e.target.value)} />
        <Styled.Button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Cartoon'}
        </Styled.Button>
      </Styled.Form>
    </Styled.Root>
  )
}

export default App