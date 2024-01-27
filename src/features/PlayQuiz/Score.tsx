import { Button, Flex, Heading, Text } from "@chakra-ui/react"


const Score = (props: { history: boolean[], onNext: () => void }) => {

    const rightAnswers = props.history.filter((isValidAnswer: boolean) => isValidAnswer === true)
        .length;


    const renderMessage = () => {
        const rightAnswersPercentage = (rightAnswers * 100) / props.history.length;
        if (rightAnswersPercentage < 30) {
            return "You need more practice";
        } else if (rightAnswersPercentage < 50) {
            return "Not bad ! Keep training you'r getting better";
        } else if (rightAnswersPercentage < 75) {
            return "Good job!";
        } else {
            return "Whoah ! You did amazing !";
        }
    }

    return (
        <Flex direction={"column"} alignItems={"center"}>
            <Heading fontSize={"3xl"}>
                Score
            </Heading>
            <Heading fontSize={"xl"} mt={"5"}>
                {rightAnswers}/{props.history.length}
            </Heading>
            <Text fontWeight={"bold"} mt={20}>
                {renderMessage()}
            </Text>
            <Button position={"absolute"} top={"80%"} right={"10%"} onClick={props.onNext}>
                New Game
            </Button>
        </Flex>
    )
}

export default Score;