import React from "react";
import DatePicker, {
  registerLocale,
  ReactDatePickerProps,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

registerLocale("ja", ja);

interface DatePickerWithLocaleProps extends ReactDatePickerProps {}

const DatePickerWithLocale: React.FC<DatePickerWithLocaleProps> = (props) => {
  return <DatePicker {...props} locale="ja" />;
};

export default DatePickerWithLocale;
