import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Button, Flex, Heading, Radio, RadioGroup, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { QuizDifficulty } from "../types/quiz-type"

const SetQuizDifficulty = (props: {onClickNext: (difficulty: QuizDifficulty) => void}) => {
    const [difficulty, setCurrentDifficulty] = useState<QuizDifficulty>(QuizDifficulty.Mixed);

    const radioList = Object.values(QuizDifficulty).map((difficulty: QuizDifficulty) => {
        return <Radio key={difficulty} value={difficulty}><span style={{ textTransform: "capitalize" }}>{difficulty === QuizDifficulty.Mixed ? "Mixed" : difficulty}</span></Radio>
    })
    return (
        <div>
            <Flex direction={"column"} alignItems={"center"}>
                <Heading as='h1' fontSize={"3xl"} mb={20}>
                    Which difficulty ?
                </Heading>
            </Flex>
            <RadioGroup
                value={difficulty}
                onChange={setCurrentDifficulty as (d: string) => void}>
                <VStack>
                    {radioList}
                </VStack>
            </RadioGroup>

            <Button
                onClick={() => props.onClickNext(difficulty)}
                position={"absolute"}
                top={"80%"}
                right={"10%"}
                rightIcon={<ArrowForwardIcon />}>
                Play
            </Button>
        </div>
    )
}

export default SetQuizDifficulty