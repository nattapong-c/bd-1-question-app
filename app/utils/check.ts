import { genAnswer } from '../../scripts/data';

export const calculatePoint = (data: object): number => {
    let point = 0;
    const keys = Object.keys(data);
    const answers = genAnswer();

    for(let key of keys) {
        if(key === 'name') {
            continue;
        }

        const answer = answers[key as keyof object];
        if(!answer) {
            continue;
        }

        if(data[key as keyof object] === answer) {
            point += 1;
        }
    }

    return point;
}