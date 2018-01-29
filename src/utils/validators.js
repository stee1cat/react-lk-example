export function required({field, validator}) {
    return [!validator.isEmpty(field.value), 'Это поле необходимо заполнить'];
}
