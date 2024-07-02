import { Question } from "../typing/question";

const randomIndex = (list: any[], max: number): number => {
    return Math.floor(Math.random() * max);
}

export const randomQuestion = (questions: Question[]): Question[] => {
    const random: Question[] = [];
    let total = questions.length;

    while(total > 0) {
        const index = randomIndex(questions, total);
        const randomedQuestion = questions[index];
        const newAnswers: string[] = [];
        let totalAns = randomedQuestion.answers.length;

        while(totalAns > 0) {
            const indexAns = randomIndex(randomedQuestion.answers, totalAns);
            newAnswers.push(randomedQuestion.answers[indexAns]);

            randomedQuestion.answers.splice(indexAns, 1);
            totalAns--;
        }

        randomedQuestion.answers = newAnswers;
        random.push(randomedQuestion);
        questions.splice(index, 1);
        total--;

    }
    
    return random;
}