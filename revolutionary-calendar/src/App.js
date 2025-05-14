import React, { useEffect, useState } from "react";
import moment from "moment-revolution";
import "./App.css";

const App = () => {
  const [revolutionaryDate, setRevolutionaryDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("Floréal");

  useEffect(() => {
    const currentDate = new Date();
    const revolutionaryDate = moment(currentDate).revolution().format();
    setRevolutionaryDate(revolutionaryDate);

    // revolutionaryDate에서 월을 추출
    const month = revolutionaryDate.split(" ")[2]; // "Nonidi 9 Floréal 233" -> "Floréal"
    setSelectedMonth(month);
  }, []);

  // 1~30일을 데카디 요일에 맞게 정렬
  const generateDecadeCalendar = (month) => {
    const weekdays = [
      "Primidi",
      "Duodi",
      "Tridi",
      "Quartidi",
      "Quintidi",
      "Sextidi",
      "Septidi",
      "Octidi",
      "Nonidi",
      "Décadi",
    ];

    // 각 열에 해당 요일별 날짜를 저장 (10열)
    const columns = Array.from({ length: 10 }, () => []);

    // 각 월마다 1일부터 30일까지 날짜를 나눔
    for (let day = 1; day <= 30; day++) {
      const weekdayIndex = (day - 1) % 10;
      columns[weekdayIndex].push(day);
    }

    return { weekdays, columns };
  };

  const { weekdays, columns } = generateDecadeCalendar(selectedMonth);

  return (
    <div className="container">
      <h1>🌞 프랑스 혁명력 달력</h1>
      <h2>{selectedMonth}</h2>

      <div className="calendar">
        {columns.map((days, index) => (
          <div key={index} className="column">
            <div className="weekday">{weekdays[index]}</div>
            {days.map((day, i) => (
              <div key={i} className="day">
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>

      {revolutionaryDate && (
        <p className="today">📅 오늘은: {revolutionaryDate}</p>
      )}
    </div>
  );
};

export default App;
