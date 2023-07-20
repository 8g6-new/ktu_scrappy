const puppeteer       = require('puppeteer-core');
const config          = require('./config/config');
const login    = require('./scripts/eval');
const get_mark_json       = require('./scripts/details');
const gpa                 = require("./scripts/gpa")

let   {
    type,
    check_fail,
    core_check,
    stats
}                         = require("./scripts/fail")

const {writeFile}     = require('fs').promises

async function getMarks() {

    const browser = await puppeteer.launch(config.options);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); 
    
    await login(page,config.user);
 
    await page.waitForSelector('div.panel-heading',{visible:true})

    await page.goto('https://app.ktu.edu.in/eu/stu/studentDetailsView.htm').then(()=>{
        console.log("Going to Curriculum");
    });

    await page.waitForSelector('#curriculamTab').then(()=>{
        console.log("waiting for  Curriculum");
    });

    await page.click('#curriculamTab').then(()=>{
        console.log("clicking on  Curriculum");
    });
    
   
    let  grades = await page.evaluate(get_mark_json);

    check_fail(grades)

    gpa(grades)
    
    console.log("_".repeat(10),"\n")

    console.log('Writing to file');
    await writeFile('data.json',JSON.stringify(grades))
    console.log('File written');

    // await browser.close();
}

getMarks();