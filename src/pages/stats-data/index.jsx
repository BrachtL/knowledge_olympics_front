import "./styles.css";
import React, { useState, useRef, useEffect } from "react";
import Question from '../../components/Question';
//import { useResponse } from '../../contexts/responseContext'
import { getStatsData } from "../../components/api";
import { setCookie, getCookie, deleteCookie } from "../../cookieHandler"; //todo: I am using session here
//import Modal from '../../components/modal';
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function StatsData() {
  const [questionData, setQuestionData] = useState({
    labels: [],
    studentCounts: [],
  });
  const [chartData, setChartData] = useState({
    labels: "a",
    datasets: [
      {
        label: "Correct Answers",
        data: 0,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [name, setName] = useState('Name Holder');
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [previousMarkedOptions, setPreviousMarkedOptions] = useState(-1);


  // Define the chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Acertos por questão"
      }
    }
  }


  useEffect(() => {
    //getExamData(sessionStorage.getItem('jwt_token'))
    getStatsData(sessionStorage.getItem("jwt_token"))
      .then((pageData) => {
        console.log("NAME HERE: ", pageData.name);
        setName(pageData.name);
        setQuestions(pageData.questionsData);
        setUserId(pageData.userId);
        setPreviousMarkedOptions(pageData.markedOptions);

        console.log(pageData.questionsData);

        const labels = pageData.statsData.map((item) => `Q ${item.id}`);
        const correctCounts = pageData.statsData.map((item) => item.right_answers);

        // Create the chart data object
        const chartData = {
          labels,
          datasets: [
            {
              label: "Correct Answers",
              data: correctCounts,
              backgroundColor: "rgba(75, 192, 192, 0.8)", // Adjust the color as needed
              borderColor: "rgba(75, 192, 192, 1)", // Adjust the color as needed
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty array ensures the effect runs only on mount
  
    const handleOptionChange = async (questionId, option) => {

  };

  return (
    <div className="questions-container">
      <div className="bar-chart">
        <h2>Estatísticas</h2>
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <header className="questions-header">
        <div className="student-id-info fixed-header">{name}</div>
        <br />
        <h1 className="questions-header-title">Bem vindo(a), {name}!<br /><br />1ª Olímpiada da Língua Alemã</h1>
        <h2 className="questions-header-subtitle">Escola De Educação Básica Madre Benvenuta</h2>
        <p className="questions-header-description">
          Sistema de Luciano Bracht
        </p>
        <br />
      </header>

      <div className="questions-list">
        {questions.map((question) => (
          <Question
            key={question.id}//.id
            question={question}
            selectedOption={previousMarkedOptions[question.id]}
            onOptionChange={(option) => handleOptionChange(question.id, option)}
          />
        ))}
      </div>
    </div>

  );
}

export default StatsData;

/*
  useEffect(() => {
    if (userId != -1) {

      matchCookie({ userId: userId, type: "stats" }, sessionStorage.getItem('jwt_token'));
      //matchCookie({ userId: userId, type: "teacher" }, getCookie("jwt_token"));
      const intervalId = setInterval(
        () => matchCookie({ userId: userId, type: "stats" }, sessionStorage.getItem('jwt_token')),
        //() => matchCookie({ userId: userId, type: "teacher" }, getCookie("jwt_token")),
        5000
      );
      console.log("start interval");
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  async function handleCheckResults() {

    try {

      const cookieMatchResponse = await matchCookie({ userId: userId, type: "stats" }, sessionStorage.getItem('jwt_token'));

      console.log("checkpoint 00019");

      const data = await postCheckResults(sessionStorage.getItem('jwt_token'));

      navigate('/stats-data');

    } catch (error) {
      console.log("checkpoint 00020");
      console.log(error);
    }
  };

  return (
    <div className="questions-container">
      <header className="questions-header">
        <div className="student-id-info fixed-header">{studentName}, {numberId}, {classromm}</div>
        <br/>
        <h1 className="questions-header-title">Bem vindo(a), {studentName}!<br /><br />1ª Olímpiada da Língua Alemã</h1>
        <h2 className="questions-header-subtitle">Escola De Educação Básica Madre Benvenuta</h2>
        <p className="questions-header-description">
          Sistema de Luciano Bracht
        </p>
        <br/>
      </header>

      <div className="questions-list">
        {questions.map((question) => (
          <Question
            key={question.id}//.id
            question={question}
            selectedOption={selectedOptions[question.id] || previousMarkedOptions[question.id] || ''}
            onOptionChange={(option) => handleOptionChange(question.id, option)}//.id
          />
        ))}
      </div>

      {questions.length > 0 && (
        <div className="questions-finish-button-container">
          <button className="questions-finish-button" onClick={handleFinish}>
            Entregar
          </button>
        </div>
      )}

      {score > 0 && <p>Your score: {score} out of {questions.length}</p>}
    </div>
  );
  
}

*/
