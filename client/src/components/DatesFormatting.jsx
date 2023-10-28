

export default function DatesFormatting({booking}){

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    return(
        <div className="flex gap-2">
            <p><b>From:</b> {formatDate(booking.startDate)}</p>
            <p><b>To:</b> {formatDate(booking.endDate)}</p>
        </div>
    )
}