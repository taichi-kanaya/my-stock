type ValidationErrorMessageProps = {
  children?: React.ReactNode
}

const ValidationErrorMessage: React.FC<ValidationErrorMessageProps> = ({ children }) => {
  return <span>{children && <p className="text-red-500">{children}</p>}</span>
}

export default ValidationErrorMessage
