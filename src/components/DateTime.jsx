import moment from 'moment';
import CalendarSmall from '@/assets/icons/calendar-sm.svg';

const DateTime = ({ date, containerStyles }) => {
  const formattedDate = moment(date).format('MMM D, YYYY / h:mm a');

  return (
    <div className={`text-xs flex items-center gap-1.5 ${containerStyles}`}>
      <img src={CalendarSmall} alt="" className="w-3" />
      {formattedDate}
    </div>
  );
};

export default DateTime;
