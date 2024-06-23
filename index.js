#!/usr/bin/enc node
import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.magentaBright("\t", "=".repeat(60)));
console.log(chalk.bgCyan.bold.underline.italic("\t\t\t***** 'OOP MY BANK PROJECT' *****"));
console.log(chalk.magentaBright("\t", "=".repeat(60)));
//Bank Account class :
class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.bgBlueBright.bold(`\nWithdrawl of $${amount} successful. Remaining balance is $${this.balance}\n`));
        }
        else {
            console.log(chalk.red("\nInsufficient balance.\n"));
        }
    }
    //Check Balance :
    checkBalance() {
        console.log(chalk.bgGreen.bold(`\nCurrent Balance : $${this.balance}\n`));
    }
}
//create customer class
class customer {
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Create bank accounts :
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
//Create customers :
const customers = [
    new customer("Hamza", "khan", "Male", 35, 3121066438, accounts[0]),
    new customer("Shezi", "Samad", "female", 30, 3121065738, accounts[1]),
    new customer("Misha", "Babar", "Female", 30, 3121087438, accounts[2])
];
//Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.bgGreen("\nEnter your account number :\n")
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.magentaBright(`\nWelcome, ${customer.firstName} ${customer.lastName}\n`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an Operation",
                    choices: ["Deposite", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposite":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bgGreenBright("\nEnter the amount to deposit :\n")
                    });
                    customer.account.deposite(depositeAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bgGreenBright("Enter the amount to withdraw :\n")
                    });
                    customer.account.withdraw(WithdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.redBright("\nExiting bank program..."));
                    console.log(chalk.bgYellowBright.black("\n\t\tThank you for using our bank services.Have a great day!\n"));
                    return;
            }
        }
        else {
            console.log(chalk.red("Invalid account number.Please try again"));
        }
    } while (true);
}
service();
