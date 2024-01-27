import { useState } from "react"
import { QuizCategory } from "../types/quiz-type";
import { Button, Flex, Heading, Radio, RadioGroup, SimpleGrid } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const SetQuestionCategory = (props: { categories: QuizCategory[], onClickNext: (categoryId: string) => void; }) => {

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(props.categories[0]?.id.toString())

    const radioList = props.categories.map((category: QuizCategory) => {
        return <Radio key={category.id} value={category.id.toString()}>{category.name}</Radio>

    })

    return (
        <div>
            <Flex direction={"column"} alignItems={"center"}>
                <Heading as='h1' fontSize={"3xl"} mb={20}>
                    Which topic ?
                </Heading>
            </Flex>

            <RadioGroup
                display={"flex"}
                justifyContent={"center"}
                value={selectedCategoryId}
                onChange={setSelectedCategoryId}>
                <SimpleGrid
                    columns={[1, 3, 4]}
                    spacing={"4"}
                    pl={"10"}>
                    {radioList}
                </SimpleGrid>
            </RadioGroup>

            <Button
                onClick={() => props.onClickNext(selectedCategoryId)}
                position={"fixed"}
                top={"90%"}
                right={"10%"}
                rightIcon={<ArrowForwardIcon />}>
                Set difficulty
            </Button>
        </div>
    )
}

export default SetQuestionCategory