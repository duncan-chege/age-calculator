import "./Styles.css";
import { useState } from "react";
import Results from "./Results";

export default function Calculator() {
  const [day, setDay] = useState("");
  const [monthNumber, setMonthNumber] = useState("");
  const [newYear, setYear] = useState("");
  const [showValidate, setShowValidate] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [futureError, setFutureError] = useState("");
  const [dayDifference, setDaysDifference] = useState(null);
  const [monthDifference, setMonthDifference] = useState(null);
  const [yearDifference, setYearDifference] = useState(null);

  const [errors, setErrors] = useState({
    day: "",
    month: "",
    year: "",
    future: "",
  });

  const handleMonthChange = (e) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setMonthNumber(value);
    }
  };

  const handleYearChange = (e) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
        setYear(value);
    }
  };

  const handleDayChange = (e) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
        setDay(value);
        setDayError(false);
    }
  };

  function formValidation() {
    let dayError,
      monthError,
      yearError,
      futureError = "";
    const currentYear = new Date().getFullYear();
    const today = new Date();

    // Validate day
    if (!day || day < 1 || day > 31) {
      dayError = "Must be a valid day";
    }

    // Validate month
    if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
      monthError = "Must be a valid month";
    }

    // Validate year
    if (!newYear || newYear < 1970 || newYear > currentYear) {
      yearError = "Must be a valid year";
    }

    // Future date check
    const inputDate = new Date(
      `${newYear}-${monthNumber.padStart(2, "0")}-${day.padStart(2, "0")}`
    );
    if (inputDate > today) {
      futureError = "No future dates";
    }

    // Set errors state
    setErrors({
      day: dayError,
      month: monthError,
      year: yearError,
      future: futureError,
    });

    // Calculate differences
    if (!dayError && !monthError && !yearError) {
      const inputDate = new Date(
        `${newYear}-${monthNumber.padStart(2, "0")}-${day.padStart(2, "0")}`
      );

      let yearsDifference = today.getFullYear() - inputDate.getFullYear();
      let monthsDifference = today.getMonth() - inputDate.getMonth();
      let daysDifference = today.getDate() - inputDate.getDate();

      if (daysDifference < 0) {
        monthsDifference -= 1;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        daysDifference += prevMonth.getDate();
      }

      if (monthsDifference < 0) {
        yearsDifference -= 1;
        monthsDifference += 12;
      }

      setDaysDifference(daysDifference);
      setMonthDifference(monthsDifference);
      setYearDifference(yearsDifference);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    formValidation();
  }

  return (
    <main role="main">
      <div className="calculator-app">
        <form onSubmit={handleSubmit}>
          <div className="entry-fields" role="contentinfo">
            <div>
              <label
                htmlFor="day"
                className={errors.day ? "invalid-entry" : ""}>
                DAY
              </label>
              <br />
              <input
                type="text"
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
              <label
                htmlFor="monthNumber"
                className={errors.month ? "invalid-entry" : ""}>
                MONTH
              </label>
              <br />
              <input
                type="text"
                id="month"
                placeholder="MM"
                name="monthNumber"
                value={monthNumber}
                onChange={handleMonthChange}
                className={errors.month ? "invalid-entry" : ""}
              />
              {errors.month && (
                <p className={`validate block`}>{errors.month}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="year"
                className={errors.year ? "invalid-entry" : ""}>
                YEAR
              </label>
              <br />
              <input
                type="text"
                id="year"
                placeholder="YYYY"
                name="newYear"
                value={newYear}
                onChange={handleYearChange}
                className={errors.year ? "invalid-entry" : ""}
              />
              {errors.year && <p className="validate block">{errors.year}</p>}
            </div>
          </div>

          {errors.future && <p className="validate block">{errors.future}</p>}

          <div className="submit-btn">
            <hr />
            <input type="submit" aria-label="calculate age" />
          </div>
        </form>

        <Results
          errors={errors}
          dayDifference={dayDifference}
          monthDifference={monthDifference}
          yearDifference={yearDifference}
        />
      </div>
    </main>
  );
}
