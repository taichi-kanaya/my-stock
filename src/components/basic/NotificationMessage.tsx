import clsx from 'clsx'

type NotificationMessageProps = {
  type: 'info' | 'error'
  children?: React.ReactNode
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({ type, children }) => {
  const baseClasses = 'rounded border px-4 py-3'
  const infoClasses = 'border-blue-500 bg-blue-100 text-blue-700'
  const errorClasses = 'border-red-500 bg-red-100 text-red-700'
  const buttonClass = clsx(baseClasses, type === 'info' ? infoClasses : errorClasses)
  return (
    <div className={buttonClass}>{children && <span className="text-sm">{children}</span>}</div>
  )
}

export default NotificationMessage
