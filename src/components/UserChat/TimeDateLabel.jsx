const TimeDateLabel = ({ timestamp }) => {

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });


    return (
        <div className="flex items-center">
            <span>{formattedDate}</span>
            <span
                className="mx-2 inline-block w-[6px] h-[6px] rounded-full bg-[#333] p-1"
            />
            <span>{formattedTime}</span>
        </div>
    );
};

export default TimeDateLabel;
