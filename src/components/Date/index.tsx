import { format } from "date-fns";

type DateComponentProps = { dateString: string };
const DateComponent = ({ dateString }: DateComponentProps): JSX.Element => {
    return (
        <time dateTime={dateString}>
            {format(new Date(dateString), "LLLL	d, yyyy")}
        </time>
    );
};

export default DateComponent;
