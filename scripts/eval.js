
async function login(page,user){
    await page.goto('https://app.ktu.edu.in/login.jsp').then(()=>{
        console.log("Page loaded");
    });

    await page.waitForSelector('#login-username').then(()=>{
        console.log("Found user name feild");
    });

    await page.type('#login-username', user.name).then(()=>{
        console.log("entered user name");
    });

    await page.type('#login-password', user.pass).then(()=>{
        console.log("entered password");
    });

    await page.click('#btn-login').then(()=>{
        console.log("Clicked on login button");
    });
}

module.exports = login
