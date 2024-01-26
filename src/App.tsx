import { Box, Image } from "@chakra-ui/react"
import Header from "./components/Header/Header"
import "../global.css";
import { useEffect, useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";
import buggleImg from "./assets/bubble.png";
import { FetchQuizParams, QuizCategory, QuizDifficulty, QuizType } from "./тъпес/quiz-type";
import SetQuestionCategory from "./features/SetQuestionCategory";
import { QuizAPI } from "./api/quiz-api";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

const App = () => {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple
  });

  console.log(quizParams);
  

  const [categories, setCategories] = useState<QuizCategory[]>([]);
  useEffect(() => {
    (async () => {
      setCategories([{ id: -1, name: "Mixed" }, ...(await QuizAPI.fetchCategories())]);
    })();
  }, [])

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return <SetQuestionQty onClickNext={(amount: number) => {
          setQuizParams({ ...quizParams, amount });
          setStep(Step.SetQuestionCategory)
        }} defaultValue={10} max={30} min={5} step={5} />;
      case Step.SetQuestionCategory:
        return <SetQuestionCategory
          categories={categories}
          onClickNext={(category: string) => {
            setQuizParams({ ...quizParams, category: category === "-1" ? "" : category});
            setStep(Step.SetQuestionDifficulty);
          }}
        />;
      case Step.SetQuestionDifficulty:
        return <></>;
      case Step.Play:
        return <></>;
      case Step.Score:
        return <></>;
    }
  }

  return (
    <Box py={"10"} h="100%">
      <Header />
      <Image src={buggleImg} position={"absolute"} zIndex={-1} right={-120} top={100} />
      <Box>{renderScreenByStep()}</Box>
    </Box>
  )
}

export default App