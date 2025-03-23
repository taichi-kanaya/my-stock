type LocalHeaderProps = {
  children: React.ReactNode
}

const LocalHeader: React.FC<LocalHeaderProps> = ({ children }) => {
  return (
    <h1 className="border-b-2 border-t-2 border-blue-800 py-2 text-2xl text-blue-800">
      {children}
    </h1>
  )
}

export default LocalHeader
