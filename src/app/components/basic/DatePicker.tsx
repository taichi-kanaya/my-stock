import React from 'react'
import DatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ja from 'date-fns/locale/ja'

registerLocale('ja', ja)

const DatePickerWithLocale: React.FC<ReactDatePickerProps> = (props) => {
  return (
    <DatePicker
      className="focus:shadow-outline border border-gray-300 bg-white p-2 leading-tight text-gray-700 focus:outline-none"
      locale="ja"
      {...props}
    />
  )
}

export default DatePickerWithLocale
