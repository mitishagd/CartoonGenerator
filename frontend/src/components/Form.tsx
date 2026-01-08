import { useState } from 'react'
import styled from 'styled-components'

import Button from './Button'

const Styled = {
    Form: styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin: 10px 0;
    `,
    Description: styled.div``,
    Input: styled.input`
        min-width: 300px;
        max-width: 90vw;
        padding: 5px 10px;
        box-sizing: border-box;
    `,
}

type FormProps = {
    onImageGenerated: (imageUrl: string, subject: string) => void
}

const Form = ({ onImageGenerated }: FormProps) => {
    const [subject, setSubject] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!subject) {
            console.log("Subject is empty")
            setError("Please enter a text description")
            return
        }

        console.log("Generating cartoon")
        console.log("Subject: ", subject)
        setLoading(true)
        setError(null)

        try {
            console.log("Making API call to backend lambda function")
            const response = await fetch(import.meta.env.VITE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject }),
            })

            if (!response.ok) {
                console.log("Response not ok: ", response.statusText)
                throw new Error(`Error: ${response.statusText}`)
            }

            const data = await response.json()
            const imageUrl = data.imageUrl
            console.log("Generated Image URL: ", imageUrl)

            onImageGenerated(imageUrl, subject)

        } catch (err) {
            console.log("Error during fetch: ", err)
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Styled.Form onSubmit={handleSubmit}>
            <Styled.Description>Enter a text description to generate a cartoon image</Styled.Description>
            <Styled.Input type="text" value={subject} placeholder="e.g. a blue colored happy dog" onChange={(e) => setSubject(e.target.value)} disabled={loading} />
            <Button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Cartoon'}
            </Button>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        </Styled.Form>
    )
}

export default Form