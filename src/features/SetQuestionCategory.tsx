import { useEffect, useState } from "react"
import { QuizCategory } from "../тъпес/quiz-type";
import { QuizAPI } from "../api/quiz-api";

const SetQuestionCategory = () => {

    const [categories, setCategories] = useState<QuizCategory[]>([]);

    useEffect(() => {
        (async () => {
            setCategories(await QuizAPI.fetchCategories());
        })();
    }, [])

console.log(categories);

    return (
        <div>setQuestionCategory</div>
    )
}

export default SetQuestionCategory