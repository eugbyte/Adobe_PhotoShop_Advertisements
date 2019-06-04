//3 objects in total
//Income
//Expenses
//Profits

//Income and expenses are duplicates, so should have a function constructor
//How to set individual prop and prop values individually?
//Both should have a method to loop through each item to get the total income and expenses. use a closure instead of an ordinary accumulator?
//Profits should have a method, which binds/call the this 
//Finally, wrap the entire code in an IIFE

var BudgetConstructor = function(){
}

BudgetConstructor.prototype.addItems = function(item, price){
    var obj = this;
    obj[item] = price;
}

BudgetConstructor.prototype.removeItems = function(item){
    var obj = this;
    delete obj[item];
}


var income = new BudgetConstructor();
income.addItems('Salary', 4000);
income.addItems('Dividends', 1000);
income.addItems('lottery', 500);
income.removeItems('lottery');

var expenses = new BudgetConstructor();
expenses.addItems('Rent', 1500);
expenses.addItems('Bills', 500);

var balance = {
    calcTotal: function (){
        var obj = this;     //to be later bound to a target object
        var arrValues = Object.values(obj);
        var totalPrice = arrValues.reduce(function(accumulator, currentValue){
            return accumulator + currentValue;
        });
        return totalPrice;
    },
    totalIncome: function() {
        return this.calcTotal.call(income) || '0'; 
        //'0' is default value if user does not input anything
        //'0' not 0 because 0 is falsy value
    },
    totalExpenses : function() {
        return this.calcTotal.call(expenses) || '0';
    },
    finalBalance: function (){
        return this.totalIncome() - this.totalExpenses();
    },
    calcPercentageOfTotal: function (obj){
        var arrKeys = Object.keys(obj);
        var arrValues = Object.values(obj);
        var totalIncome = this.totalIncome();
        var arrResult = arrValues.map(function (currentValue){
            var result = currentValue / totalIncome;
            return Math.round(result * 100);
        });
        var objToReturn = {};
        for (let i = 0; i < arrKeys.length; i++){
            objToReturn[arrKeys[i]] = arrResult[i] + '%';
        }
        return objToReturn;
    },
}
