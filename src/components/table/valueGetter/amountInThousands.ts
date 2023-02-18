export function amountInThousands(value:any) {
    return value.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}