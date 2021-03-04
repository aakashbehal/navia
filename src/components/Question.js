import React, { useState, useEffect, useRef } from 'react'



const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
    const [selected, setSelected] = useState('');
    const [counter, setCounter] = useState(20)

    const radioWrapper = useRef();
    let interval;
    useEffect(() => {
        const findCheckedInput = radioWrapper.current.querySelector('input:checked')
        if (findCheckedInput) {
            findCheckedInput.checked = false
        }
    }, [data])

    useEffect(() => {
        interval = setTimeout(() => {
            let count = counter - 1
            if (count < 0) {
                nextSkipClickHandler()
            } else {
                setCounter(count)
            }
        }, 1000)
        return () => { clearInterval(interval) }
    }, [counter])


    const changeHandler = (e) => {
        setSelected(e.target.value)
    }

    const nextClickHandler = (e) => {
        clearInterval(interval)
        setCounter(20)
        onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
        setSelected('');
        if (activeQuestion < numberOfQuestions - 1) {
            onSetActiveQuestion(activeQuestion + 1)
        } else {
            onSetStep(3)
        }
    }

    const nextSkipClickHandler = () => {
        clearInterval(interval)
        setCounter(20)
        onAnswerUpdate(prevState => [...prevState, { q: data.question, a: '' }]);
        setSelected('');
        if (activeQuestion < numberOfQuestions - 1) {
            onSetActiveQuestion(activeQuestion + 1)
        } else {
            onSetStep(3)
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <p>Time Left: {counter}</p>
                    <h2 className="mb-5">{data.question}</h2>
                    <div className="control" ref={radioWrapper}>
                        {
                            data.choices.map((choice, i) => (
                                <label className="radio has-background-light" key={i}>
                                    <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                                    {choice}
                                </label>
                            ))
                        }
                    </div>
                    <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Next</button>
                    <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextSkipClickHandler}>Skip</button>
                </div>
            </div>
        </div>
    )
}

export default Question