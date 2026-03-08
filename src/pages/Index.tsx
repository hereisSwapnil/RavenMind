import { useState, useCallback, useRef, useEffect } from "react";
import GameBackground from "@/components/GameBackground";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ResultScreen from "@/components/ResultScreen";
import GaveUpScreen from "@/components/GaveUpScreen";
import { AkinatorEngine } from "@/engine/akinator";
import type { Character } from "@/data/characters";
import type { Question } from "@/data/questions";

type GameState = "welcome" | "playing" | "result" | "wrong" | "gaveup";

const Index = () => {
  const engineRef = useRef<AkinatorEngine>(new AkinatorEngine());
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [guessedCharacter, setGuessedCharacter] = useState<Character | null>(null);
  const [playerWarning, setPlayerWarning] = useState<"random" | "contrarian" | "cheating" | null>(null);

  const engine = engineRef.current;

  const advanceGame = useCallback(() => {
    if (engine.isConfident()) {
      setGuessedCharacter(engine.getGuess());
      setGameState("result");
      return;
    }
    if (engine.hasGivenUp()) {
      setGuessedCharacter(engine.getGuess());
      setGameState("gaveup");
      return;
    }
    const q = engine.getBestQuestion();
    if (!q) {
      setGuessedCharacter(engine.getGuess());
      setGameState("gaveup");
      return;
    }
    setCurrentQuestion(q);
    setQuestionCount(engine.questionCount);
    setConfidence(engine.confidencePercent);
    setPlayerWarning(engine.getPlayerWarning());
  }, [engine]);

  const handlePlay = useCallback(() => {
    engine.reset();
    setQuestionCount(0);
    setConfidence(0);
    setPlayerWarning(null);
    setGuessedCharacter(null);
    setGameState("playing");
    const q = engine.getBestQuestion();
    setCurrentQuestion(q);
  }, [engine]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (answer === "back") {
        engine.undoLastAnswer();
        const q = engine.getBestQuestion();
        setCurrentQuestion(q);
        setQuestionCount(engine.questionCount);
        setConfidence(engine.confidencePercent);
        return;
      }
      if (!currentQuestion) return;
      engine.applyAnswer(currentQuestion.id, answer);
      setQuestionCount(engine.questionCount);
      setConfidence(engine.confidencePercent);
      setPlayerWarning(engine.getPlayerWarning());
      advanceGame();
    },
    [currentQuestion, engine, advanceGame]
  );

  const handleCorrect = useCallback(() => {
    // They confirmed — restart
    setGameState("welcome");
    engine.reset();
  }, [engine]);

  const handleWrong = useCallback(() => {
    // Remove the wrong guess from candidates pool, then continue
    engine.markWrongGuess();
    setGameState("playing");
    // After removing the wrong candidate, get the next best question
    const q = engine.getBestQuestion();
    if (!q) {
      setGuessedCharacter(engine.getGuess());
      setGameState("gaveup");
      return;
    }
    setCurrentQuestion(q);
    setQuestionCount(engine.questionCount);
    setConfidence(engine.confidencePercent);
  }, [engine]);

  const handlePlayAgain = useCallback(() => {
    setGameState("welcome");
    engine.reset();
  }, [engine]);

  // Sync question count display
  useEffect(() => {
    if (gameState === "playing") {
      setQuestionCount(engine.questionCount);
      setConfidence(engine.confidencePercent);
    }
  }, [gameState, engine]);

  return (
    <GameBackground>
      {gameState === "welcome" && <WelcomeScreen onPlay={handlePlay} />}
      {gameState === "playing" && currentQuestion && (
        <QuestionScreen
          question={currentQuestion.text}
          questionNumber={questionCount + 1}
          confidence={confidence}
          playerWarning={playerWarning}
          onAnswer={handleAnswer}
        />
      )}
      {gameState === "result" && guessedCharacter && (
        <ResultScreen
          characterName={guessedCharacter.name}
          characterDescription={guessedCharacter.description}
          characterImage={guessedCharacter.image}
          characterHouse={guessedCharacter.house}
          confidence={confidence}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onPlayAgain={handlePlayAgain}
        />
      )}
      {gameState === "gaveup" && (
        <GaveUpScreen
          bestGuess={guessedCharacter}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </GameBackground>
  );
};

export default Index;
