export function required({field, validator}) {
    return [!validator.isEmpty(field.value), 'Это поле необходимо заполнить'];
}

export function isPhone({field}) {
    return [/\+7 \d{3} \d{3}-\d{2}-\d{2}$/i.test(field.value), 'Неправильный формат телефона'];
}
