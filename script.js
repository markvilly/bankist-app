"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

//BUTTONS

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

let inputLoginUsername = document.querySelector(".login__input--user");
let inputLoginPin = document.querySelector(".login__input--pin");

const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

console.log(containerMovements.innerHTML);

//DISPLAY MOVEMENTS.
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i, arr) {
    //ternary operator

    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((e) => e > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

//Update function
const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
  console.log("LOGIN");
};

//IMPLEMENTING THE LOGIN FEATURE

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); // prevents form submission.

  //use find to allocate current user acc to the current account variable

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = "";
    updateUI(currentAccount);
  }
});

//CLOSE ACCOUNT FEATURE.
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  //   console.log(currentAccount.username);
  if (
    inputCloseUsername.value === currentAccount?.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  } else {
    console.log("not on the money");
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

account1.movements.push(150000);

//////////////////////////////////////

//LOAN FEATURE
//////////////////////////////

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //doing the transfer
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
    inputLoanAmount.value = "";
  }
});

//IMPLEMENTING MONEY TRANSFER

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault(); // working with forms this stop the page from reloading when clicked.

  const amount = Number(inputTransferAmount.value);

  const recieverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, recieverAccount);

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount); // removes the amount to be transfered

    recieverAccount.movements.push(amount);
    console.log("Transfer valid!"); // adds amount to recipient's account.

    updateUI(currentAccount);
  }
});

let sorted = false;

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("cLICKED SORTs");
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ["a", "b", "c", "d", "e"];

//SLICE METHOD.

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log("-----SHALLOW COPPY-----");
console.log(arr.slice());
console.log([...arr]);

//SPLICE METHOD - mutates the array.

// console.log(arr.splice(2));
// console.log(arr);

// console.log(arr.splice(1, 2));
// console.log(arr);

// REVERSE

arr = ["a", "b", "c", "d", "e"];

const arr2 = ["j", "i", "h", "g", "f"];

// console.log(arr2.reverse());
// console.log(arr2);

//Concat methods

const letters = arr.concat(arr2);

// console.log(letters);
// console.log([...arr, ...arr2]);

//JOIN
console.log(letters.join(" - "));

// AT METHOD

// const arr3 = [23, 11, 64];
// console.log(arr3.at(0));

// getting the last element on an array.

// console.log(arr3[arr3.length - 1]);
// // console.log(arr3.slice(-1)[0]);
// // console.log(arr3.at(-1));
// console.log(arr3.at(-2));

console.log("Jonas".at(-1));

//LOOPING ARRAYS FOREACH.

// movements.push(200, 450, -400, 3000, -650, -130, 70, 1300);
console.log("CHECKING MOVEMENT USING FOR OF METHOD");
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log("\n");

console.log(`movements using FOREACH METHOD`);

movements.forEach(function (mov, index, array) {
  if (mov > 0) {
    console.log(`movement ${index + 1}: you deposited ${mov}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${mov}`);
  }
});

// CURRENCIES MAP

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(["USD", "GBP", "USD", "EURO", "EURO"]);

console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:



1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dataJul, dataKat) {
  let shallowJul = dataJul.slice();
  shallowJul.splice(1, -2);

  let shallowKat = dataKat.splice();

  const newDogs = [...shallowJul, ...shallowKat];
  //   console.log(newDogs);

  newDogs.forEach(function (dog, i) {
    dog >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`)
      : console.log(`Dog number ${dog} is still a puppy 🐶`);
  });
};

const testData1 = [
  [3, 5, 2, 12, 7],
  [4, 1, 15, 8, 3],
];

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

//DATA TRANSFORMATIONS MAPS, FILTER, REDUCE

const li = [3, 1, 4, 3, 2];

const bu = li.filter(function (curr) {
  return curr > 2;
});

console.log(bu);

const euroToUsd = 1.1;

console.log(movements.map((curr) => curr * euroToUsd));

console.log("-----SAME THING WITH FOR OF-----");

const newArr = [];

for (const mov of movements) {
  console.log(mov * euroToUsd);
  newArr.push(mov * euroToUsd);
}

console.log(newArr);

const movementsDescriptions = movements.map((mov, i, arr) => {
  `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
    mov
  )}`;
});

console.log(movementsDescriptions.join("\n"));

//COMPUTE USERNAMES.

const createUsernames = function (accs) {
  accs.forEach((acc) => {
    //creating a new property for usernames on the account object.
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });

  //   console.log(username.join(""));
  //   return username;
};

const user = "Steven Thomas William";
createUsernames(accounts);
console.log(accounts);

const obj1 = {
  name: "cow",
  plr: "sWew",
};

// obj1.cow = obj1.name[0];

obj1.cow = obj1?.cow ?? "Moo";

console.log(obj1);

// FILTER METHOD

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositFor.push(mov);
  }
}

console.log(depositFor);

const withdrawals = movements.filter((mov) => mov < 0);

console.log(withdrawals);

//REDUCE FUNCTION

// accumulator is like a snowball.
const balance = movements.reduce((acc, curr) => acc + curr, 0);

console.log(balance);

let balance2 = 100;

for (const mov of movements) {
  balance2 += mov;
}

console.log(balance2);

// Maximum value.

const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(max);

// CODING CHALLENGE.
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (arr) {
  //calc the dog age in human years
  const humYear = arr.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
  const humanage = humYear.filter((age) => age > 18);
  const totaAge = humanage.reduce((acc, ages) => acc + ages, 0);
  console.log(
    `average human age of all the adult dogs is ${Math.trunc(
      totaAge / humanage.length
    )} `
  );

  return humanage;
};

console.log(calcAverageHumanAge(data1));
console.log(calcAverageHumanAge(data2));

//CHAINING METHODS.

// PIPELINE.
// const totalDeposits = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * euroToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

/*
    Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function and using chaining!

    testdata1 = [5,2,4,1,15,8,3]
    testdata2 = [16,6,10,5,6,1,4]

    const calcAverageHumanAge = function (arr) {
  //calc the dog age in human years
  const humYear = arr.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
  const humanage = humYear.filter((age) => age > 18);
  const totaAge = humanage.reduce((acc, ages) => acc + ages, 0);
  console.log(
    `average human age of all the adult dogs is ${Math.trunc(
      totaAge / humanage.length
    )} `
  );

*/

const testdata1 = [5, 2, 4, 1, 15, 8, 3];
const testdata2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverage2 = function (ageArr) {
  //dog to human age conversion
  const averageAge = ageArr
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => {
      //   console.log(age);
      return age > 18;
    })
    .reduce((acc, age, i, arr) => {
      return acc + age / arr.length;
    }, 0);

  return Math.trunc(averageAge);
};

console.log(calcAverage2(testdata1));
console.log(calcAverage2(testdata2));

// console.log(SeriesSum(4));

const series = `1 + 1/4 + 1/7 + 1/10 + 1/13 + 1/16`;

const stattte = series.split("+").map((e) => eval(e));

console.log(
  stattte
    .reduce((acc, curr) => {
      return acc + curr;
    })
    .toString()
);

// FIND METHOD. returns one value.
console.log(movements);
console.log(movements.find((mov) => mov < 0));

console.log(accounts);
console.log(accounts.find((acc) => acc.owner === "Jessica Davis"));

console.log(accounts);

//SOME AND EVERY METHOD.
console.log(movements);

// checks EQUALITY
console.log(movements.includes(-130));

//to out if there are positive movements.
// CHECKS CONDITION.
const anyDeposits = movements.some((mov) => mov > 5000);

console.log(anyDeposits);

// SEPERATE CALL BACK.
const deposit = (mov) => mov > 0;
console.log(account4.movements.every(deposit));
console.log(movements.filter(deposit));
console.log(movements.some(deposit));

const array1 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(array1.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

function squareDigits(num) {
  const numBe = num
    .toString()
    .split("")
    .map((number) => Number(number) * Number(number))
    .join("");
  return numBe;
}

console.log(squareDigits(9119));

const accountMovements = accounts.map((acc) => acc.movements);

console.log(accountMovements);
//

const overallBal = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBal);

// SORTING MOVEMENTS/ ARRAYS.

const owners = ["Jonas", "Zach", "Adam", "Martha"];

console.log(owners.sort());
console.log(owners);

// return < 0, A, B.
// return > 0, B, A.

// ASCENDING
movements.sort((a, b) => {
  //sorting in ascending order
  if (a > b) return 1;
  if (a < b) return -1;
});

console.log(movements);

// DESCENDING
movements.sort((a, b) => {
  //sorting in ascending order
  if (a > b) return -1;
  if (a < b) return 1;
});

console.log(movements);

//CREATING ARRAYS PROGRAMMATICALLY
