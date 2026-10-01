import "./BookingLoader.css";

function BookingLoader({ isLoader }) {
    return (
        <>
            {isLoader && (
                <div className="booking-loader">
                    <div className="circle"></div>
                </div>
            )}
        </>
    );
}

export default BookingLoader;