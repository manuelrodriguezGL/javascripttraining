// function sendCars(day, ...allCarIds)
// {
//     allCarIds.forEach( id => console.log(id));
// }

// //sendCars("Monday", 7, 2, 3);

// let carIds = [7, 2, 5];
// let [car1, ...remainingCars] = carIds;
// console.log(car1, remainingCars);

// // In the case of objects, fields and paramneters MUST be called the same
// let car = {id: 5000, style: "convertible"};
// let id, style;
// ({id, style} = car); // We use the parenthesis so the compiler knows it's an object, and not a code block
// console.log(id, style);

// function startCars(car1, car2, car3, ...rest){
//     console.log(car1, car2, car3, rest);
// }
// let carIds = [1, 2, 3, 4, 5, 6];
// startCars(...carIds);

// console.log(typeof([carIds]));

// --- For loops ---

// For with break
console.log("--- For loop with break statement ---");
for (let i = 0; i <= 5; i++) {
    if (i === 4) {
        break; // This will stop execution, so 5 will never be printed
    }
    console.log(i);
}

// For with continue
console.log("--- For loop with continue statement ---");
for (let i = 0; i <= 5; i++) {
    if (i === 4) {
        continue; // This will skip one execution, so 4 will never be printed
    }
    console.log(i);
}