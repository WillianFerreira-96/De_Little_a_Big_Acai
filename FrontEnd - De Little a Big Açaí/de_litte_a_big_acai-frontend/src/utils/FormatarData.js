export function FormatarData(dataLocalDateTime, withTime){
    const [datePart, timePart] = dataLocalDateTime.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);
    const data = new Date(year, month - 1, day, hour, minute, second);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear()
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');

    if(withTime){
        return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    }else{
        return `${dia}/${mes}/${ano}`;
    }
}