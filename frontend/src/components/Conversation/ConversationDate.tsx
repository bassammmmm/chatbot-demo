import { format } from 'date-fns';

interface DateProps {
    date: string; //ISO format
}

const ConversationDate = ({ date }: DateProps) => {
    if (!date || isNaN(new Date(date).getTime())) {
        return <span className="bodyMedium pt-2 pb-2">Invalid Date</span>;
    }
    const formattedDate = format(new Date(date), "MMM d, hh:mm a");

    return <div className="bodyMedium pt-2 pb-2">
        {formattedDate}
    </div>;
}

export default ConversationDate;