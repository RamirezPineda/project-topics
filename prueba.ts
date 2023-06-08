const currentDate = new Date();
console.log(currentDate);

const fechaBase = currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/';
const fecha = fechaBase + currentDate.getDate()

console.log(fecha)

const nuevo = new Date(`${fechaBase} + ${currentDate.getDate()}`);



console.log(nuevo)
