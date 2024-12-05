import "./Styles.css";

export default function Results ({errors={}, yearDifference, monthDifference, dayDifference}){
    return (
        <>
            <div className="entered-values" role="contentinfo">
                {errors.day || errors.month || errors.year || errors.future ? (
                    <>
                        <p><span className="dash">--</span>years</p>
                        <p><span className="dash">--</span>months</p>
                        <p><span className="dash">--</span>days</p>
                    </>
                ) : (
                    <>
                        <p><span className="dash">{yearDifference === null ? "--" : yearDifference }</span>years</p>
                        <p><span className="dash">{monthDifference === null ? "--" : monthDifference }</span>months</p>
                        <p><span className="dash">{dayDifference === null ? "--" : dayDifference }</span>days</p>
                    </>
                )}
            </div>
    </>
)}