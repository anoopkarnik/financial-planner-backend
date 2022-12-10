const Pool = require('pg').Pool
const pool = new Pool({
    user: 'anoop',
    host: 'financial-planner.cdi5vdcneeh0.ap-south-1.rds.amazonaws.com',
    database: 'finances',
    password: 'dasika#1992',
    port: 5432
})

const getUnplannedExpenses = (body,start_time,end_time) => {
    return new Promise(function(resolve,reject){
        const {expense_types,account_types,category_types} = body;
        let expense_type_query = "";
        for (let i =0;i<expense_types.length;i++){
            expense_type_query+="'"+expense_types[i]+"',"
        }
        expense_type_query = expense_type_query.substring(0,expense_type_query.length-1)
        let account_type_query = "";
        for (let i =0;i<account_types.length;i++){
            account_type_query+="'"+account_types[i]+"',"
        }
        account_type_query = account_type_query.substring(0,account_type_query.length-1)
        let category_type_query = "";
        for (let i =0;i<category_types.length;i++){
            category_type_query+="'"+category_types[i]+"',"
        }
        category_type_query = category_type_query.substring(0,category_type_query.length-1)
        const query = "Select * from budget.unplanned_expenses where active = true and created_at>='"+String(start_time)+"' and created_at<'"+String(end_time)+"' and expense_type in ("+expense_type_query+") and account_type in ("+account_type_query+") and category_type in ("+category_type_query+") order by created_at asc"
        pool.query(query,(error,results)=>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getMonthlyPlannedExpenses = (body,start_time,end_time) => {
    return new Promise(function(resolve,reject){
        const {expense_types,account_types,category_types} = body;
        let expense_type_query = "";
        for (let i =0;i<expense_types.length;i++){
            expense_type_query+="'"+expense_types[i]+"',"
        }
        expense_type_query = expense_type_query.substring(0,expense_type_query.length-1)
        let account_type_query = "";
        for (let i =0;i<account_types.length;i++){
            account_type_query+="'"+account_types[i]+"',"
        }
        account_type_query = account_type_query.substring(0,account_type_query.length-1)
        let category_type_query = "";
        for (let i =0;i<category_types.length;i++){
            category_type_query+="'"+category_types[i]+"',"
        }
        category_type_query = category_type_query.substring(0,category_type_query.length-1)
        const query = "Select * from budget.monthly_expenses where active = true and created_at>='"+String(start_time)+"' and created_at<'"+String(end_time)+"' and expense_type in ("+expense_type_query+") and account_type in ("+account_type_query+") and category_type in ("+category_type_query+")"
        pool.query(query,(error,results)=>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getTotalUnplannedExpense = (start_time,end_time) =>{
    return new Promise(function(resolve,reject){
        const query = "Select sum(cost) from budget.unplanned_expenses where active = true and created_at>='"+String(start_time)+"' and created_at<'"+String(end_time)+"'"
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows[0]);
        })
    })
}

const getTotalMonthlyPlannedExpense = (start_time,end_time) =>{
    return new Promise(function(resolve,reject){
        const query = "Select sum(cost) from budget.monthly_expenses where active = true  and created_at>='"+String(start_time)+"' and created_at<'"+String(end_time)+"'"
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows[0]);
        })
    })
}

const getTotalIncome = (start_time,end_time) =>{
    return new Promise(function(resolve,reject){
        const query = "Select sum(cost) from budget.incomes where active = true"
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows[0]);
        })
    })
}

const getRemaining = (start_time,end_time) =>{
    return new Promise(function(resolve,reject){
        const query = "select ((Select sum(cost) from budget.incomes where active = true)- coalesce((Select sum(cost) from budget.unplanned_expenses where active = true and created_at>='"+String(start_time)+"' and created_at<'"+String(end_time)+"'),0) -  coalesce((Select sum(cost) from budget.monthly_expenses where active = true and created_at>='"+String(start_time)+"' and created_at<'"+String(end_time)+"'),0)) sum"
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows[0]);
        })
    })
}

const getMonths = () =>{
    return new Promise(function(resolve,reject){
        pool.query('select * from common.current_month order by start_time',(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getExpenseType = () =>{
    return new Promise(function(resolve,reject){
        pool.query('select * from common.expense_type order by id',(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getCategories = (expense_type) =>{
    return new Promise(function(resolve,reject){
        const query = 'select * from common.category_type where expense_type_id =' +String(expense_type) +' order by id'
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getAllCategories = (expense_type) =>{
    return new Promise(function(resolve,reject){
        const query = 'select * from common.category_type order by id'
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getSubcategories = (category_type) =>{
    return new Promise(function(resolve,reject){
        const query = 'select * from common.sub_category_type where category_id =' +String(category_type) +' order by id'
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getAccounts = () =>{
    return new Promise(function(resolve,reject){
        const query = 'select * from common.account_type order by id'
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getSubaccounts= (account_type) =>{
    return new Promise(function(resolve,reject){
        const query = 'select * from common.sub_account_type where account_id =' +String(account_type) +' order by id'
        pool.query(query,(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}



const getMonthRange = (id) =>{
    return new Promise(function(resolve,reject){
        pool.query('select * from common.current_month where id = $1',[id],(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(results.rows[0]);
        })
    })
}

const createExpense = (body) =>{
    return new Promise(function(resolve,reject){
        const {name,cost,expense_type,category_type,sub_category_type,account_type,sub_account_type} = body
        pool.query('Insert into budget.unplanned_expenses(name,cost,expense_type,category_type,sub_category_type,account_type,sub_account_type) values ($1,$2,$3,$4,$5,$6,$7) returning *',[name,cost,expense_type,category_type,sub_category_type,account_type,sub_account_type],(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(`A new expense has been added : ${results.rows[0]}`);
        })
    })
}

const createMonthlyExpense = (body) =>{
    return new Promise(function(resolve,reject){
        const {name,cost,expense_type,category_type,sub_category_type,account_type,sub_account_type} = body
        pool.query('Insert into budget.monthly_expenses(name,cost,expense_type,category_type,sub_category_type,account_type,sub_account_type) values ($1,$2,$3,$4,$5,$6,$7) returning *',[name,cost,expense_type,category_type,sub_category_type,account_type,sub_account_type],(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(`A new expense has been added : ${results.rows[0]}`);
        })
    })
}

const updateAccountBalance = (body) =>{
    return new Promise(function(resolve,reject){
        const {cost,sub_account_type} = body
        pool.query('update common.sub_account_type set balance = balance - $1 where id = $2',[cost,sub_account_type],(error,results) =>{
            if (error) {
                reject(error)
            }
            resolve(`Account updated : ${results}`);
        })
    })
}

const deleteExpense = (request,response) => {
    const id = parseInt(request.params.id)
    pool.query('update budget.unplanned_expenses set active = false where id = $1',[id],(error,results)=>{
        if (error){
           throw error
        }
        response.status(200).send(`User deleted withh ID: ${id}`)
    })
}

const deleteMonthlyExpense = (request,response) => {
    const id = parseInt(request.params.id)
    pool.query('update budget.monthly_expenses set active = false where id = $1',[id],(error,results)=>{
        if (error){
           throw error
        }
        response.status(200).send(`User deleted withh ID: ${id}`)
    })
}

const deleteMonthlyBudget = (request,response) => {
    const id = parseInt(request.params.id)
    pool.query('update budget.monthly_budget set active = false where id = $1',[id],(error,results)=>{
        if (error){
           throw error
        }
        response.status(200).send(`Budget payed with ID: ${id}`)
    })
}

const getAllBalances = (request,response) => {
    return new Promise(function(resolve,reject){
        const query = 'Select * from common.sub_account_type where balance!=0 order by id'
        pool.query(query,(error,results)=>{
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getTotalBalance = (request,response) => {
    return new Promise(function(resolve,reject){
        pool.query('Select sum(balance) from common.sub_account_type',(error,results)=>{
            if (error){
                throw error
            }
            resolve(results.rows[0]);
        })
    })
}

const getLiquidityBalance= (request,response) => {
    return new Promise(function(resolve,reject){
        pool.query('Select sum(balance) from common.sub_account_type where liquidity = true',(error,results)=>{
            if (error){
                throw error
            }
            resolve(results.rows[0]);
        })
    })
}

const getFreeLiquidityBalance = (request,response) => {
    return new Promise(function(resolve,reject){
        pool.query('Select sum(balance) from common.sub_account_type where free_liquidity = true',(error,results)=>{
            if (error){
                throw error
            }
            resolve(results.rows[0]);
        })
    })
}

const getBudget= (expense_type) => {
    return new Promise(function(resolve,reject){
        const query = "Select coalesce(sum(cost),0) sum from budget.monthly_budget where expense_type = '" +expense_type +"'"
        pool.query(query,(error,results)=>{
            if (error){
                throw error
            }
            resolve(results.rows[0]);
        })
    })
}

const getTotalBudget= (expense_type) => {
    return new Promise(function(resolve,reject){
        const query = "Select plan_percentage from budget.monthly_budget_plan where expense_type = '" +expense_type +"'"
        pool.query(query,(error,results)=>{
            if (error){
                throw error
            }
            resolve(results.rows[0]);
        })
    })
}

const getAllBudget= (expense_type) => {
    return new Promise(function(resolve,reject){
        const query = "Select * from budget.monthly_budget where expense_type = '" +expense_type +"'"
        pool.query(query,(error,results)=>{
            if (error){
                throw error
            }
            resolve(results.rows);
        })
    })
}

const getTransactions = (expense_type) => {
    return new Promise(function(resolve,reject){
        const query = "Select (Select coalesce(sum(cost),0) sum from budget.monthly_expenses where active = true and expense_type = '" +expense_type +"') + (Select coalesce(sum(cost),0) sum from budget.unplanned_expenses where active = true and expense_type = '" +expense_type +"') sum"
        pool.query(query,(error,results)=>{
            if (error){
                throw error
            }
            resolve(results.rows[0]);
        })
    })
}

module.exports = {
    getUnplannedExpenses,
    getTotalUnplannedExpense,
    getTotalMonthlyPlannedExpense,
    getTotalIncome,
    createExpense,
    createMonthlyExpense,
    deleteExpense,
    getRemaining,
    getMonths,
    getMonthRange,
    getExpenseType,
    getMonthlyPlannedExpenses,
    getCategories,
    getSubcategories,
    getAccounts,
    getSubaccounts,
    getAllCategories,
    getAllBalances,
    getTotalBalance,
    getLiquidityBalance,
    getFreeLiquidityBalance,
    deleteMonthlyExpense,
    updateAccountBalance,
    getBudget,
    getAllBudget,
    getTransactions,
    deleteMonthlyBudget ,
    getTotalBudget
}