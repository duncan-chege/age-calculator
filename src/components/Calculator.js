import "./Styles.css";
import { useState } from "react";

export default function Calculator(){
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [showValidate, setShowValidate] = useState(false);
    const [dayError, showDayError] = useState(false);
    const [monthError, showMonthError] = useState(false);
    
    const handlePeriodChange = (e) => {
        const { name, value } = e.target;
        if (name === "day"){
            setDay(value);
        } else if (name === "month") {
            setMonth(value);
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
            showDayError(true);
        }
         else {
            showDayError(false);
        }

        if (month < 1 || month > 12) {
            showMonthError(true);
        } else {
            showMonthError(false);
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
                        <label htmlFor="day" className={day.length === 0 && showValidate && "invalid-entry"}>DAY</label><br />
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
                        <label htmlFor="month" className={month.length === 0 && showValidate && "invalid-entry"}>MONTH</label><br />
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
                        <label htmlFor="year" className={year.length === 0 && showValidate && "invalid-entry"}>YEAR</label><br />
                        <input 
                            type="number"
                            id="year" 
                            placeholder="YYYY" 
                            required 
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className={year.length === 0 && showValidate ? "invalid-entry" : ""}
                        />
                    {year.length === 0 && showValidate && <p className={`validate ${showValidate && 'block'}`}>This field is required</p>}
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