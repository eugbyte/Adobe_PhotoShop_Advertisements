//CRUD

//CREATE
//Function to obtain the (1) item, (2) price

var form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit(event){
    event.preventDefault(); 
    var accountType = document.getElementById('account-type').value;
    var item = document.querySelector('#item').value;
    var price = document.querySelector('#price').value;
    price = Number(price);
    if (accountType == 'income'){
        income.addItems(item, price);
    } else if (accountType == 'expense'){
        expenses.addItems(item, price);
    }
    return;
}

//READ 
function generateIndividualTable(obj){
    var numberOfTables = document.getElementsByClassName('incomeExpenseTable').length;
    var bootstrapDiv = document.createElement('div');
    bootstrapDiv.className = 'col-sm-6 incomeExpenseDiv bootstrapDiv';
    document.body.appendChild(bootstrapDiv);

    return function(){
        var table = document.createElement('table');
        table.id = numberOfTables;
        table.className = 'table table-bordered incomeExpenseTable';
        // table.style.width = '40%';     

        //th
        var th_0;
        if (table.id == 0){
            th_0 = '<u>INCOME</u>';
        } else if (table.id = 1){
            th_0 = '<u>EXPENSES</u>';
        }

        var arr_th = [th_0, 'Value', 'Percentage of income', 'Edit/Delete'];
        var header = table.createTHead();
        header.className = 'thead-light';
        var row = header.insertRow(0);     
        for (let i = 0; i < arr_th.length; i++){
            let td = row.insertCell(-1);
            td.outerHTML =  '<th scope="col">' + arr_th[i] +'</th>';
        }
        
        //td
        var arrKeys = Object.keys(obj);
        var arrValues = Object.values(obj);
        var arrPercentages = Object.values(balance.calcPercentageOfTotal(obj));

        for (let j = 0; j < arrKeys.length; j++){
            let row = table.insertRow();
            row.id = arrKeys[j];
            var tdKey = row.insertCell(0);
            tdKey.textContent = arrKeys[j];
            var tdValue = row.insertCell(-1);
            tdValue.textContent = arrValues[j];
            var tdPercentage = row.insertCell(-1);
            tdPercentage.textContent = arrPercentages[j];
            var tdButton = row.insertCell(-1);
            tdButton.innerHTML = "<button class = 'editButtons btn btn-primary btn-sm'>update</button>";
        }
        bootstrapDiv.appendChild(table);

        //Label
        // var label = document.createElement('label');
        // label.setAttribute('for', table.id);
        // label.innerHTML = '<u>' + th_0 + '</u>';
        // (table.parentNode).insertBefore(label, table);

        return;
    };
}

    //Closures
function generateTables(){
    var generateIncome = generateIndividualTable(income);
    generateIncome();
    var generateExpense = generateIndividualTable(expenses);
    generateExpense();
}

generateTables();

function generateBalance(){
    var bootstrapDiv = document.createElement('div');
    bootstrapDiv.className = 'col-sm-12 bootstrapDiv';
    document.body.appendChild(bootstrapDiv);

    var obj = balance;
    var table = document.createElement('table');
    table.className = 'table table-bordered table-sm';
    //table.style.width = '80%';
    table.id = 2;

    //th
    var arr_th = ['<u>SUMMARY</u>', 'Value'];
    var header = table.createTHead();
    var row = header.insertRow(0);     
    row.className = 'bg-success';
    for (let i = 0; i < arr_th.length; i++){
        let td = row.insertCell(-1);
        td.outerHTML =  '<th scope="col">' + arr_th[i] +'</th>';
    }

    //td
    var arrText = ['Total Income', 'Total Expenses', 'Final Balance']
    var arrValues = [obj.totalIncome(), '-' + obj.totalExpenses(), obj.finalBalance()];

    for (let i = 0; i < 3; i++){
        row = table.insertRow();
        row.insertCell(0).outerHTML = '<th scope="row">' + arrText[i] + '</th>';
        row.insertCell(-1).textContent = arrValues[i];
    }

    bootstrapDiv.appendChild(table);
}

generateBalance();

//UPDATE
//To delete the previous table. Everytime a form is submitted, the earlier table is destroyed and a new one takes its place
function deleteTable(){
    var arrDivs = document.querySelectorAll('.bootstrapDiv');
    arrDivs.forEach(function(currentValue){
        currentValue.remove();   
    });

    return;
}

form.addEventListener('submit', function(){
    deleteTable();
    generateTables();    
    generateBalance();
});

//DELETE 
    //Event bubbling
var tableList = document.getElementsByTagName('table');
for (let i = 0; i < tableList.length; i++){
    tableList[i].addEventListener('click', editRow);
}

function editRow(event){
    //if what is clicked is not a button, end the function
    if (event.target.tagName != 'BUTTON'){
        return;
    } 

    //Get the item and price for that particular row
    td_btn = event.target.parentNode;
    siblingList = td_btn.parentNode.children;
    var item = siblingList[0].textContent;
    var price = siblingList[1].textContent;

    //Set the item and price in the form
    var form_item = document.getElementById('item');
    var form_price = document.getElementById('price');    
    form_item.value = item;
    form_price.value = price;

    //Select the account type
    var table = td_btn.parentNode.parentNode.parentNode;
    var select = document.getElementById('account-type');
        //The selectedIndex property sets or returns the index of the selected option in a drop-down list. The index starts at 0.
    select.selectedIndex = table.id;

    //Delete the row
    var row = td_btn.parentNode;
    row.parentNode.removeChild(row);

    return;
}

//For some reason, after submitting the form, editRow() is no longer active. Below is the fix
form.addEventListener('submit', function(){
    //tableList = document.getElementsByTagName('table');
    for (let i = 0; i < tableList.length; i++){
        tableList[i].addEventListener('click', editRow);
    }
});



