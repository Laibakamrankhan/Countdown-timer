#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
const res = await inquirer.prompt({
    name: "userinput",
    type: "number",
    message: "Enter Time in Sec",
    validate: (input) => {
        if (isNaN(input)) {
            return chalk.red("Please Enter valid number");
        }
        else if (input > 60) {
            return "Seconds must be 60";
        }
        else {
            return true;
        }
    }
});
let input = res.userinput;
function starttime(value) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(intTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.red("Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
starttime(input);
