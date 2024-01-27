import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { useState } from "react"

interface Props {
    defaultValue: number;
    max: number;
    min: number;
    step: number;
    onClickNext: (amount: number) => void;
}

const SetQuestionQty = (props: Props) => {
    const [sliderValue, setSliderValue] = useState<number>(props.defaultValue);

    const renderMarks = (): JSX.Element[] => {
        const marks = [];
        for (let index = props.min; index <= props.max; index += props.step) {
            marks.push(<SliderMark key={index} ml={-2} pt={4} value={index}>{index}</SliderMark>);
        }
        return marks;
    }

    return (
        <>
            <Flex direction={"column"} alignItems={"center"}>
                <Heading as='h1' fontSize={"3xl"} mb={20}>
                    How many questions?
                </Heading>
                <Slider
                    value={sliderValue}
                    maxWidth={400}
                    max={props.max}
                    min={props.min}
                    step={props.step}
                    aria-label='slider-ex-6'
                    colorScheme="yellow"
                    onChange={(val) => setSliderValue(val)}>
                    {renderMarks()}
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Flex>
            <Button onClick={() => props.onClickNext(sliderValue)} position={"absolute"} top={"80%"} right={"10%"} rightIcon={<ArrowForwardIcon />}>Set category</Button>
        </>
    )
}

export default SetQuestionQty;