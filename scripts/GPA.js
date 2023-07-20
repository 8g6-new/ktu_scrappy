
function roundTo(n, digits) {
    if (digits === undefined) {
      digits = 0;
    }
  
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    var test =(Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
}
function gpa(grades){

    let gp = {
        "S":10,
        "A+":9,
        "A":8.5,
        "B+":8,
        "B":7.5,
        "C+":7,
        "C":6.5,
        "D":6,
        "P":5.5,
        "F":0,
        "FE":0,
        "I":0,
        "AB":0
    }


    console.log("\n\n_______Grades________\n\nAssumes to Result Not Published\n")

    let sigma_gp_credit_total = 0 
    let total_credits = 0
    let weighted_sgpa = 0
    let sems = Object.values(grades)
        sems.forEach((sem,i)=>{
            
            let sigma_gp_credits = 0,sigma_credits = 0

            console.log(`____________S${i+1}________________\n`)

            let subs = Object.values(sem)

            console.log(" Subject Course Credit Grade  Grade Point  Earned Credit ")

            Object.values(subs).forEach(n=>{
                
                if(n['Course Credit']){
                    console.log(`    ${n["Course"]}           ${parseInt(n['Course Credit'])}          ${n['Grade']}         ${parseFloat(gp[n['Grade']])}             ${n['Earned Credit']}`)
                    sigma_gp_credits += gp[n['Grade']] * parseInt(n['Course Credit'])
                    sigma_credits    +=  parseInt(n['Course Credit'])
                }
                    
            })

            if(!isNaN(sigma_gp_credits)){

                let sgpa = roundTo(sigma_gp_credits/sigma_credits,2)
                
                console.log(`\nTotal Credits   : ${sigma_credits}\nSGPA   : ${sigma_gp_credits/sigma_credits} , KTU Rounded : ${sgpa}\n`)

                total_credits         += sigma_credits 
                sigma_gp_credit_total += sigma_gp_credits 
                weighted_sgpa         += sgpa * sigma_credits

            }
            
        
        })
    
        
        let cgpa = roundTo(weighted_sgpa/total_credits,2)
        
        console.log(`Total CGPA \n Before Rounding : ${sigma_gp_credit_total/total_credits}, KTU Rounded CGPA : ${cgpa} , Effetive % : ${cgpa*10}`)

}


module.exports = gpa