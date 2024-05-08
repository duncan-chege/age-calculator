import "./Styles.css";
import { useState } from "react";

export default function Calculator() {
    const [day, setDay] = useState("");
    const [monthNumber, setMonthNumber] = useState("");
    const [newYear, setYear] = useState("");
    const [showValidate, setShowValidate] = useState(false);
    const [dayError, setDayError] = useState(false);
    const [monthError, setMonthError] = useState(false);
    const [yearError, setYearError] = useState(false);

    const currentYear = new Date().getFullYear();

    const handleMonthChange = (e) => {
        const { value } = e.target;
        setMonthNumber(value);
    };

    const handleYearChange = (e) => {
        const { value } = e.target;
        const parsedYear = parseInt(value, 10);

        if (value.length === 4 && parsedYear >= 1970 && parsedYear <= currentYear) {
            setYear(parsedYear);
        } else {
            setYear("");
        }
    }

    const handleDayChange = (e) => {
        const { value } = e.target;
        setDay(value);
        setDayError(false);
    }

    //Create a new date object for the current date
    const currentDate = new Date();

    function validateForm(){
        if (day.length === 0 || monthNumber.length === 0 || newYear.length === 0 ){
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

        if (monthNumber >= 1 && monthNumber <= 12) {
            const monthName = new Date(newYear, monthNumber - 1, 1).toLocaleString('default', { month: 'long' });
            console.log(monthName);
            setMonthError(false);
        } else {
            setMonthError(true); // Reset month if input is invalid
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
                    onChange={handleDayChange}
                    className=""
                />
                <p className="">This field is required</p>
                    <p className="">Must be a valid day</p>
            </div>

                    <div>                    
                        <label htmlFor="monthNumber" className={(monthNumber < 1 || monthNumber > 12) && showValidate && "invalid-entry"}>MONTH</label><br />
                        <input
                            type="number"
                            id="month" 
                            placeholder="MM"
                            name="monthNumber"
                            value={monthNumber}
                            onChange={handleMonthChange}
                            className={(monthNumber < 1 || monthNumber > 12) && showValidate && "invalid-entry"}
                        />
                        {monthNumber.length === 0 && showValidate && <p className={`validate ${showValidate && 'block'}`}>This field is required</p>}
                        {monthNumber !== "" && monthError && <p className={`validate ${monthNumber && `block`}`} >Must be a valid month</p>}
                    </div>

                    <div>
                        <label htmlFor="year" className={showValidate && "invalid-entry"}>YEAR</label><br />
                        <input 
                           type="number"
                           id="year"
                           placeholder="YYYY"
                           name="newYear"
                           value={newYear}
                           onChange={handleYearChange}
                           className={newYear.length === 0 && showValidate ? "invalid-entry" : "" || (newYear < 1970 || newYear > currentYear) && showValidate ? "invalid-entry" : ""}
                        />
                    {newYear.length === 0 && showValidate && <p className={`validate ${showValidate && 'block'}`}>This field is required</p>}
                    {newYear > 2024 && yearError && <p className={`validate ${monthNumber && `block`}`} >Must be in the past</p>}
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