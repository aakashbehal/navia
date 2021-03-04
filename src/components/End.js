import React, { useEffect, useState } from 'react';

const End = ({ results, data, onReset }) => {
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        let correct = 0;
        results.forEach((result, index) => {
            if (result.a === data[index].correct) {
                correct++
            }
        });
        setCorrectAnswers(correct)
    }, [results, data])

    const resultHandler = () => {
        return results.map((res, i) => {
            let classString = "mb-1"
            if (res.a === '') {
                classString += " has-background-warning-dark "
            } else if (res.a === data[i].correct) {
                classString += " has-background-success "
            } else {
                classString += " has-background-danger "
            }
            return (
                <div className={classString} key={i}>
                    <p className="has-text-white">{res.q}</p>
                    <p className="has-text-white">Correct: {data[i].correct}</p>
                    <p className="has-text-white">Your: {res.a}</p>
                </div>
            )
        })
    }

    return (

        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h3>Your Result</h3>
                    <p>{correctAnswers} of {data.length}</p>
                    {resultHandler()}
                    <button className="button is-success" onClick={onReset}>try again</button>
                </div>
            </div>
        </div>
    )
}

export default End