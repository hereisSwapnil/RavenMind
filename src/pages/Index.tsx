import { useState, useCallback } from "react";
import GameBackground from "@/components/GameBackground";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ResultScreen from "@/components/ResultScreen";

const QUESTIONS = [
  "Is your character real (exists or existed in real life)?",
  "Is your character female?",
  "Is your character associated with music?",
  "Is your character from a movie?",
  "Is your character American?",
  "Is your character still alive?",
  "Is your character known for acting?",
  "Is your character a superhero?",
  "Does your character have superpowers?",
  "Is your character from an animated show?",
  "Is your character associated with science?",
  "Does your character wear glasses?",
  "Is your character from a video game?",
  "Is your character a villain?",
  "Is your character from Japan?",
];

type GameState = "welcome" | "playing" | "result";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);

  const handlePlay = useCallback(() => {
    setGameState("playing");
    setQuestionIndex(0);
  }, []);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (answer === "back") {
        if (questionIndex > 0) setQuestionIndex((i) => i - 1);
        return;
      }
      if (questionIndex >= QUESTIONS.length - 1) {
        setGameState("result");
      } else {
        setQuestionIndex((i) => i + 1);
      }
    },
    [questionIndex]
  );

  const handlePlayAgain = useCallback(() => {
    setGameState("welcome");
    setQuestionIndex(0);
  }, []);

  return (
    <GameBackground>
      {gameState === "welcome" && <WelcomeScreen onPlay={handlePlay} />}
      {gameState === "playing" && (
        <QuestionScreen
          question={QUESTIONS[questionIndex]}
          questionNumber={questionIndex + 1}
          totalQuestions={QUESTIONS.length}
          onAnswer={handleAnswer}
        />
      )}
      {gameState === "result" && (
        <ResultScreen
          characterName="Sherlock Holmes"
          characterDescription="A fictional detective created by Sir Arthur Conan Doyle, known for his brilliant deductive reasoning."
          characterImage="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Sherlock_Holmes_Portrait_Paget.jpg/220px-Sherlock_Holmes_Portrait_Paget.jpg"
          onCorrect={handlePlayAgain}
          onWrong={handlePlayAgain}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </GameBackground>
  );
};

export default Index;
