export function validateData(data: unknown) {
    if (!data
        || typeof data !== 'object'
        || !('azalea' in data)
        || !data.azalea
        || typeof data.azalea !== 'boolean'
        || !('listing' in data)
        || !data.listing
        || typeof data.listing !== 'object'
    ) {
        return { valid: false, data: null };
    };

    return { valid: true, data };
}

export function validateItem(item: unknown) {
    if (!item
        || typeof item !== 'object'
        || !('id' in item)
        || !item.id
        || typeof item.id !== 'string'
        || !('date' in item)
        || (item.date !== 0 && !item.date)
        || typeof item.date !== 'number'
        || !('answers' in item)
        || !item.answers
        || !Array.isArray(item.answers)
    ) {
        return { valid: false, item: null };
    };

    return { valid: true, item };
}

export function validateAnswers(answers: unknown) {
    if (!Array.isArray(answers) || !answers.every(answer => typeof answer === 'string')) {
        return { valid: false, answers: null };
    }

    return { valid: true, answers };
}