import styled from 'styled-components'
import propTypes from 'prop-types'

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-bottom: 25px;
`

// passando onChange via props
export default function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputBase 
        onChange={onChange}
        placeholder={placeholder}
        {...props}
        />
    </div>
  )
}

// Input.defaultProps = {
//   value: '',
// }

Input.propTypes = {
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired
}