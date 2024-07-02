import { Question } from "@/app/typing/question";

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

export const genAnswer = () => {
    const data: any = {}
    for (let i = 65; i < 85; i++) {
        data[String.fromCharCode(i).toLowerCase()] = '1'
    }
    return data
}