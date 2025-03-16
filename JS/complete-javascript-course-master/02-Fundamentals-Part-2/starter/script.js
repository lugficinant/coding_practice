//use it at very first of your code :)
'use strict';


// //bulding a function
// function logger() 
// {
//     console.log('my name is lucan');
// }

// //calling/running/invoking this function
// logger();



//**********************************section 3 challenge 1**************************

// const calcAverage = (sore1, score2, score3) => (sore1 + score2 + score3)/3;

// const scoreDolphins = calcAverage(44, 23, 71);
// const scoreKoalas = calcAverage(85, 54, 41);

// checkWinner(scoreDolphins, scoreKoalas);

// function checkWinner(avgDolphins, avgKoalas)
// {
//     switch(avgDolphins, avgKoalas)
//     {
//         case avgDolphins >= avgKoalas *2:
//         console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`)
//         break;
//         case avgKoalas >= avgDolphins *2:
//         console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`)
//         break;
//         default:
//         console.log('No team wins...');
//     }
// }

//*************************************************************************************** 


//********************************* Array **********************************************

// const friends = ['hehe', 'xixi', 'kaka'];
// //add element 
// friends.push();//last
// friends.unshift();//first
// //remove elements
// friends.pop();//get return
// const oldFrirend = friends.pop();
// //index check
// friends.indexOf('hhehe');//-1 means nothing here
// friends.includes();//true false 

//**************************************************************************************** */

//********************************* S3 C2 **********************************************

// const calcTip = bill => {
//     if(50<= bill && bill<=300) {
//         return bill * 0.15;
//     } else {
//         return bill * 0.2;
//     }
// }

// function calcTip(bill) {
//     if(50<= bill && bill<=300) {
//         return bill * 0.15;
//     } else {
//         return bill * 0.2;
        
//     }
// }

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// console.log(tips);

//*********************************************************************************** 


//************************************S3 C3*************************************************** 

// const john = {
//     fullName: 'John Smith',
//     mass:92,
//     height:1.95,
//     calcBMI: function(){
//         this.bmi = this.mass/(this.height*this.height);
//         return this.bmi
//     }
// };
// const mark = {
//     fullName: 'Mark Miller',
//     mass:78,
//     height:1.69,
//     calcBMI: function(){
//         this.bmi = this.mass/(this.height*this.height);
//         return this.bmi
//     }
// };

// if( john.calcBMI() > mark.calcBMI() ){
//     console.log(`John Smith's BMI (${john.calcBMI()}) is higher than Mark Miller's (${mark.calcBMI()})`);
// } else{
//     console.log(`Mark Miller's BMI (${mark.calcBMI()}) is higher than John Smith's (${john.calcBMI()})`);
// }     

//************************************* loop ************************************************** 

// //original counter / condition / running counter
// const arrayPrac = [1, 2, 3, 4, 5, 6];
// console.log(arrayPrac.length);
// for(let i=0; i<arrayPrac.length; i++){
//     console.log(arrayPrac[i]);
// }

// //loop in loop for 100
// for(let i = 1; i<=10; i++){
//     for(let i = 1; i<=10; i++){
//         console.log('hehe');
//     }        
// }

// //while loop
// let rep = 1;
// while (rep <= 10) {
//     console.log(rep);
//     rep++;
// }

//************************************S3 C4*************************************************** 

// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];

// function calcTip (bills) {
//     if(50<= bills && bills<=300) {
//         return bills * 0.15;
//     } else {
//         return bills * 0.2;
//     } 
// };

// // offical solution one 
// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// function calcAverage (arr) {
//     let rep = 0;
//     let sum = 0;
//     while(rep<arr.length) {
//         sum = sum + arr[rep];
//         console.log(`this is ${rep}`);
//         console.log(sum);
//         rep++
//     }
//     return sum/arr.length;
// };

//***************Main
// let rep = 0;
// while(rep <10) {
//     tips[rep] = calcTip(bills[rep]);
//     totals[rep] = tips[rep] + bills[rep];
//     rep++;
// };

// console.log(calcAverage(totals));


// console.log(bills);
// console.log(tips);
// console.log(totals);