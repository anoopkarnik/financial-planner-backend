const express = require('express')
const app = express()
const PORT = 3002;
const HOST = '0.0.0.0';

const expenses = require('./expenses')

app.use(express.json())

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', 'http://financial-planner.anoopkarnik.net:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
})

app.post('/unplannedExpenses', (req,res)=>{
    expenses.getUnplannedExpenses(req.body,req.query.start_time,req.query.end_time)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.post('/monthlyPlannedExpenses', (req,res)=>{
    expenses.getMonthlyPlannedExpenses(req.body,req.query.start_time,req.query.end_time)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/getBalances', (req,res)=>{
    expenses.getAllBalances()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/months',(req,res) =>{
    expenses.getMonths()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/expenseType',(req,res) =>{
    expenses.getExpenseType()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/categoryTypes',(req,res) =>{
    expenses.getCategories(req.query.expense_type)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/allCategoryTypes',(req,res) =>{
    expenses.getAllCategories()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/subcategoryTypes',(req,res) =>{
    expenses.getSubcategories(req.query.category_type)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})


app.get('/accountTypes',(req,res) =>{
    expenses.getAccounts()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/subaccountTypes',(req,res) =>{
    expenses.getSubaccounts(req.query.account_type)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})


app.get('/month',(req,res) =>{
    expenses.getMonthRange(req.query.id)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})


app.get('/totalincome',(req,res) =>{
    expenses.getTotalIncome(req.query.start_time,req.query.end_time)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/totalunplannedexpense',(req,res) =>{
    expenses.getTotalUnplannedExpense(req.query.start_time,req.query.end_time)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/totalmonthlyplannedexpense',(req,res) =>{
    expenses.getTotalMonthlyPlannedExpense(req.query.start_time,req.query.end_time)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})


app.get('/remaining',(req,res) =>{
    expenses.getRemaining(req.query.start_time,req.query.end_time)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/getTotalBalance', (req,res)=>{
    expenses.getTotalBalance()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/getLiquidityBalance', (req,res)=>{
    expenses.getLiquidityBalance()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/getFreeLiquidityBalance', (req,res)=>{
    expenses.getFreeLiquidityBalance()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.post('/expense',(req,res) =>{
    expenses.createExpense(req.body)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.post('/monthlyExpense',(req,res) =>{
    expenses.createMonthlyExpense(req.body)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.post('/updateBalance',(req,res) =>{
    expenses.updateAccountBalance(req.body)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/getBudget',(req,res) =>{
    expenses.getBudget(req.query.expense_type)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/getAllBudget',(req,res) =>{
    expenses.getAllBudget(req.query.expense_type)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/getTransactions',(req,res) =>{
    expenses.getTransactions(req.query.expense_type)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.get('/getTotalBudget',(req,res) =>{
    expenses.getTotalBudget(req.query.expense_type)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})

app.delete('/expense/:id',expenses.deleteExpense)
app.delete('/monthlyExpense/:id',expenses.deleteMonthlyExpense)
app.delete('/monthlyBudget/:id',expenses.deleteMonthlyBudget)

app.listen(PORT,HOST, () =>{
    console.log(`App running on port ${HOST}:${PORT}`)
})