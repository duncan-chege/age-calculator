import "./Styles.css";
import { useState } from "react";

export default function Calculator(){
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [showValidate, setShowValidate] = useState(false);
    const [dayError, setDayError] = useState(false);
    const [monthError, setMonthError] = useState(false);
    const [yearError, setYearError] = useState(false);
    
    const handlePeriodChange = (e) => {
        const { name, value } = e.target;
        if (name === "day"){
            setDay(value);
        } else if (name === "month") {
            setMonth(value);
        } else if (name === "year") {
            setYear(value);
        }
    }

    //Create a new date object for the current date
    const currentDate = new Date();

    function validateForm(){
        if (day.length === 0 || month.length === 0 || year.length === 0 ){
            setShowValidate(true);
        } else {
            setShowValidate(false);
        }

        if (day < 1 || day > 31) {
            setDayError(true);
        }
         else {
            setDayError(false);
        }

        if (month < 1 || month > 12) {
            setMonthError(true);
        } else {
            setMonthError(false);
        }

        if (year > 2024) {
            setYearError(true);
        } else {
            setYearError(false);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        validateForm();
    }

    return (
        <div className="calculator-app">
            <form onSubmit={handleSubmit} noValidate>
                <div className="entry-fields">
                    <div>
                        <label htmlFor="day" className={(day < 1 || day > 31) && showValidate ? "invalid-entry" : ""}>DAY</label><br />
                        <input 
                            type="number"
                            id="day"
                            placeholder="DD"
                            name="day"
                            value={day}
                            onChange={handlePeriodChange}
                            className={day.length === 0 && showValidate ? "invalid-entry" : "" || day !== "" && (day < 1 || day > 31) && showValidate ? "invalid-entry" : ""}
                        />
                        {day.length === 0 && showValidate && <p className={`validate ${showValidate && 'block'}`}>This field is required</p>}
                        {day !== "" && (day < 1 || day > 31) && dayError && <p className={`validate ${dayError && `block`}`} >Must be a valid day</p>}
                    </div>

                    <div>                    
                        <label htmlFor="month" className={(month < 1 || month > 12) && showValidate && "invalid-entry"}>MONTH</label><br />
                        <input
                            type="number"
                            id="month" 
                            placeholder="MM"
                            name="month"
                            value={month}
                            onChange={handlePeriodChange}
                            className={month.length === 0 && showValidate ? "invalid-entry" : "" || month !== "" && (month < 1 || month > 12) && showValidate ? "invalid-entry" : ""}
                        />
                        {month.length === 0 && showValidate && <p className={`validate ${showValidate && 'block'}`}>This field is required</p>}
                        {month !== "" && (month < 1 || month > 12) && monthError && <p className={`validate ${monthError && `block`}`} >Must be a valid month</p>}
                    </div>

                    <div>
                        <label htmlFor="year" className={(year < 1 || year > 2024) && showValidate && "invalid-entry"}>YEAR</label><br />
                        <input 
                            type="number"
                            id="year" 
                            placeholder="YYYY" 
                            name="year"
                            value={year}
                            onChange={handlePeriodChange}
                            className={year.length === 0 && showValidate ? "invalid-entry" : "" || year > 2024 && showValidate ? "invalid-entry" : ""}
                        />
                    {year.length === 0 && showValidate && <p className={`validate ${showValidate && 'block'}`}>This field is required</p>}
                    {year > 2024 && yearError && <p className={`validate ${monthError && `block`}`} >Must be in the past</p>}
                    </div>

                </div>
                <div className="submit-btn">
                    <hr />
                    <input 
                        type="submit"
                        value=""
                        onClick={()=>validateForm()} />
                </div>
            </form>
    
            <div className="entered-values">
                <p><span className="dash">--</span>years</p>
                <p><span className="dash">--</span>months</p>
                <p><span className="dash">--</span>days</p>
            </div>
  
        <div className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
          Coded by Duncan Chege
        </div>
      </div>
    );
}