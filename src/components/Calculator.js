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
    const [errors, setErrors] = useState({
        day: "",
        month: "",
        year: ""
    });

    const handleMonthChange = (e) => {
        const { value } = e.target;
        setMonthNumber(value);
    };

    const handleYearChange = (e) => {
        const { value } = e.target;
        setYear(value);
    }

    const handleDayChange = (e) => {
        const { value } = e.target;
        setDay(value);
        setDayError(false);
    }


    function formValidation(){
        let dayError, monthError, yearError = "";
        const currentYear = new Date().getFullYear();
        const currentDate = new Date();

        if (day && (day < 1 || day > 31)) {
            dayError = "Must be a valid day";
        } else if (day === "") {
            dayError = "This field is required";
        }

        if (monthNumber && (monthNumber < 1 || monthNumber > 12)) {
            const monthName = new Date(newYear, monthNumber -1, 1).toLocaleString('default', {month: 'long'});
            console.log(monthName);
            monthError = "Must be a valid month";
        } else if (monthNumber === "") {
            monthError = "This field is required";
        }

        if (newYear && (newYear < 1970 || newYear > currentYear)){
            yearError = "Must be a valid year";
        } else if (newYear === ""){
            yearError = "This field is required";
        }

        if (day && monthNumber && newYear) {
            const daysInMonth = new Date(newYear, monthNumber, 0).getDate();
            if(day < 1 || day > daysInMonth) {
                dayError = "Must be a valid date";
            }
        }

        setErrors({
            day: dayError,
            month: monthError,
            year: yearError
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        formValidation();
    }

    return (
        <div className="calculator-app">
            <form onSubmit={handleSubmit}>
                <div className="entry-fields">
                    <div>
                        <label htmlFor="day" className={errors.day ? "invalid-entry" : ""}>DAY</label><br />
                        <input 
                            type="number"
                            id="day"
                            placeholder="DD"
                            name="day"
                            value={day}
                            onChange={handleDayChange}
                            className={errors.day ? "invalid-entry" : ""}
                        />
                        {errors.day && <p className="validate block">{errors.day}</p>}
                    </div>

                    <div>                    
                        <label htmlFor="monthNumber" className={errors.month ? "invalid-entry" : ""}>MONTH</label><br />
                        <input
                            type="number"
                            id="month" 
                            placeholder="MM"
                            name="monthNumber"
                            value={monthNumber}
                            onChange={handleMonthChange}
                            className={errors.month ? "invalid-entry" : ""}
                        />
                        {errors.month && (<p className={`validate block`}>{errors.month}</p>)}
                    </div>

                    <div>
                        <label htmlFor="year" className={errors.year ? "invalid-entry" : ""}>YEAR</label><br />
                        <input 
                        type="number"
                        id="year"
                        placeholder="YYYY"
                        name="newYear"
                        value={newYear}
                        onChange={handleYearChange}
                        className={errors.year ? "invalid-entry" : ""}
                        />
                    {errors.year && (<p className="validate block">{errors.year}</p>)}
                    </div>
                </div>

                <div className="submit-btn">
                    <hr />
                    <input type="submit" value="" />
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