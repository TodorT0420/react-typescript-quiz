import { Box, Flex, Image, Spinner } from "@chakra-ui/react"
import Header from "./components/Header/Header"
import "../global.css";
import { useEffect, useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";
import buggleImg from "./assets/bubble.png";
import { FetchQuizParams, QuizCategory, QuizDifficulty, QuizItem, QuizType } from "./types/quiz-type";
import SetQuestionCategory from "./features/SetQuizCategory";
import { QuizAPI } from "./api/quiz-api";
import SetQuizDifficulty from "./features/SetQuizDifficulty";
import PlayQuiz from "./features/PlayQuiz/PlayQuiz";
import Score from "./features/Score";

enum Step {
  Loading,
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

const App = () => {
  const [step, setStep] = useState<Step>(Step.Loading);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple
  });
  const [history, setHistory] = useState<boolean[]>([]);

  const [categories, setCategories] = useState<QuizCategory[]>([]);
  useEffect(() => {
    (async () => {
      setCategories([{ id: -1, name: "Mixed" }, ...(await QuizAPI.fetchCategories())]);
      setStep(Step.SetQuestionQty);
    })();
  }, [])

  const renderScreenByStep = () => {
    switch (step) {
      case Step.Loading:
        return (
          <Flex
            top={0}
            position={"absolute"}
            justify={"center"}
            alignItems={"center"}
            minH={"100vh"}
            width={"100%"}
          >
            <Spinner size="xl"/>
          </Flex>
        );
      case Step.SetQuestionQty:
        return <SetQuestionQty onClickNext={(amount: number) => {
          setQuizParams({ ...quizParams, amount });
          setStep(Step.SetQuestionCategory);
        }} defaultValue={10} max={30} min={5} step={5} />;
      case Step.SetQuestionCategory:
        return <SetQuestionCategory
          categories={categories}
          onClickNext={(category: string) => {
            setQuizParams({ ...quizParams, category: category === "-1" ? "" : category });
            setStep(Step.SetQuestionDifficulty);
          }}
        />;
      case Step.SetQuestionDifficulty:
        return <SetQuizDifficulty onClickNext={async (difficulty: QuizDifficulty) => {
          const params = { ...quizParams, difficulty };
          setQuizParams(params);
          const quizResponse = await QuizAPI.fetchQuiz(params);
          if (quizResponse.length > 0) {
            setQuiz(quizResponse);
            setStep(Step.Play);
          } else {
            alert(`Couldn't find ${params.amount} questions for this category, restarting game`);
            setStep(Step.SetQuestionQty);
          }
        }} />;
      case Step.Play:
        return <PlayQuiz onFinished={(history_: boolean[]) => {
          setHistory(history_);
          setStep(Step.Score);
        }} quiz={quiz} />;
      case Step.Score:
        return <Score history={history} onNext={() => {
          setStep(Step.SetQuestionQty);
        }} />;
    }
  }



  return (
    <Box py={10} h="100%">
      <Header />
      <Image src={buggleImg} position={"absolute"} zIndex={-1} right={-120} top={100} />
      <Box>{renderScreenByStep()}</Box>
    </Box>
  )
}

export default App;