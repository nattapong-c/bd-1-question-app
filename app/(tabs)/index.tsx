import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

import { genQuestion as demoQuestion } from "../../scripts/data";
import { Question } from "../typing/question";
import { randomQuestion } from "../utils/random";
import { calculatePoint } from "../utils/check";

export default function HomeScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [scoreUser, setScoreUser] = useState(0);

  useEffect(() => {
    setQuestions(randomQuestion(demoQuestion()));
  }, []);

  const submitForm = (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const score = calculatePoint(formProps);

    const users = localStorage.getItem("users");
    let updatedUsers = [];
    if (!users) {
      updatedUsers.push({
        name: formProps["name"] || new Date().getTime(),
        score,
      });
    } else {
      updatedUsers = [
        ...JSON.parse(users),
        { name: formProps["name"] || new Date().getTime(), score },
      ];
    }
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setTimeout(() => {
      setIsLoading(false);
      setScoreUser(score);
      setShowScore(true);
      e.target.reset()
    }, 1000);
  };

  return (
    <>
    <div style={styles.title}>
        <h1>Questions</h1>
      </div>
    <ScrollView>
      <div style={styles.container}>
        <form name="question-form" onSubmit={submitForm}>
          <label>Name: </label>
          <input name="name" />
          {questions.map((question, index) => (
            <div key={question.id} style={styles.questionContainer}>
              <h3>
                {index + 1}. {question.question}
              </h3>
              <div style={styles.answerSection}>
                {question.answers.map((answer, index) => (
                  <div key={index} style={styles.answerContainer}>
                    <input type="radio" name={question.id} value={answer} />
                    <label>{answer}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {showScore ? (
            <div>
              <h3>Your score</h3>
              <h4>{scoreUser}</h4>
            </div>
          ) : (
            <></>
          )}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <button style={styles.button} type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </ScrollView>
  
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    backgroundColor: "#a2c6ff",
    padding: 20,
  },
  questionContainer: {
    marginBottom: 50,
  },
  answerSection: {
    display: "flex",
  },
  answerContainer: {
    marginRight: 30,
  },
  button: {
    backgroundColor: "#a2c6ff",
    borderWidth: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 3,
  },
});
