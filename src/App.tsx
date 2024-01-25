import { Box, Image } from "@chakra-ui/react"
import Header from "./components/Header/Header"
import "../global.css";
import { useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";
import buggleImg from "./assets/bubble.png";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

const App = () => {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return <SetQuestionQty defaultValue={10} max={30} min={5} step={5} />;
      case Step.SetQuestionCategory:
        return <></>;
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
      <Box>{renderScreenByStep() }</Box>
    </Box>
  )
}

export default App