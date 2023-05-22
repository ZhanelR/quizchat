import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchQuizes, fetchQuestions} from "../../redux/actions/quiz/actionQuiz"

const Quiz = () => {

    const dispatch = useDispatch();
    const quizes = useSelector((state) => state.quizes.loadedQuizes);
    const questions = useSelector((state) => state.questions.loadedQuestions);
    console.log(questions);

/*     useEffect(() => {
        dispatch(fetchQuizes());
        dispatch(fetchQuestions());
      }, []); */

    return (
        <div>
        {quizes.map((quiz) => {
            const getCurrentQuizQuestions = () => {
                const returnValue = {};
                if(questions && questions[0] && questions[0].questions) 
                questions[0].questions.forEach(item => {
                    if(quiz.questioinsIds && quiz.questioinsIds.includes(item.id))
                    returnValue = item;
                }) 
                return returnValue
            }
            const currentQuizQuestions = getCurrentQuizQuestions()
            console.log(currentQuizQuestions)
            return (
          
            <div key={quiz.id}>
                <h2>{quiz.title}</h2>
                <div>{currentQuizQuestions}</div>
            </div>
        )}
        )}
    </div>
    )

}

export default Quiz