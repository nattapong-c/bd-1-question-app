import { Question } from "@/app/typing/question";

export const questions: Question[] = [];

export const genQuestion = () => {
    const data: Question[] = []
    for (let i = 65; i < 85; i++) {
        data.push({
            id: String.fromCharCode(i).toLowerCase(),
            question: String.fromCharCode(i),
            answers: ['1', '2', '3', '4']
        })
    }
    return data
}

export const answers: object = {
    a: '1',
    b: '1'
}