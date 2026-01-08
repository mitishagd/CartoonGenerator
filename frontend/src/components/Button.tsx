import styled from "styled-components";

const Styled = {
  Button: styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3703f1ff;
    color: white;
    border: none;
    border-radius: 5px;

    &:disabled {
        background-color: #313030ff;
    }
  `
}

type ButtonProps = {
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    loading?: boolean
    onClick?: () => void
    children: React.ReactNode
}

const Button = ({ type, disabled, loading, onClick, children }: ButtonProps) => {
  return (
    <Styled.Button type={type} disabled={disabled || loading} onClick={onClick}>
      {loading ? 'Generating...' : children}
    </Styled.Button>
  )
}

export default Button