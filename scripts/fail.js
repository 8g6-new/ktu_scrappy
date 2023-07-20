
let type = ''

let stats = {
    'Core Subject':[],
    'Final Year Project':[],
    "Labs":[],
    "Non Core  Credited Subjects":[],
    'Useless subject (Mandidatory Non Credit)':[]
}

function core_check(ele){

    let [sub,credit] = ele

    if(credit==4){
        type = 'Core Subject'
    }
    else if(credit>4){
        type = "Final Year Project"
    }
    else if(credit==3 || credit==2){
        type = sub.match("LAB")!=null ?  "Lab" : "Non Core  Credited Subjects" 
    }
    else if(credit==0){
        type = 'Useless subject (Mandidatory Non Credit)'
    }

    stats[type].push(sub);
}

function check_fail(grades){
    
    let sems = Object.keys(grades)

    let failed = []
    let c=0,credits= 0,loss=0;

    let lasesem  = ''
    let temp     = ''
    let sem_wise = ''

    sems.forEach(sem=>{
        temp = sem
        sem_wise += `\n________${sem}_________\n`
        sem=grades[sem]
        let subs = Object.keys(sem)
        subs.forEach(sub=>{
            let cr = parseInt(sem[sub]['Course Credit'])
            try{
                if(sem[sub]['Grade'] == 'F' || sem[sub]['Grade'] == 'AB' || sem[sub]['Grade'] == 'I'){
                    sem_wise += " ".repeat(3)+sem[sub]['Course'] +'\n'
                    failed.push(
                        [
                            sem[sub]['Course'],
                            cr
                        ]
                    )
                    c++;
                    loss+=cr
                }
                else{
                    if(cr){
                        credits += cr
                        c++;
                        lasesem = temp
                    } 
                }
            }
        catch(e){
            console.log(e)
        }
        })
    })

    if(lasesem!="S1"){
        lasesem = `S${parseInt(lasesem.split("")[1])-1}`
    }

    console.log("\n\n")

    if(failed.length==0){
        console.log(`well done, you broke the loop and passed all subs upto ${lasesem}`)
        console.log(`You gained ${credits} credits out of ${credits + loss} credits , (${loss} credits lost)`)
    }
    else{

        failed.map(n=>core_check(n))
   
        Object.keys(stats).forEach(n=>{
            if(stats[n].length>0){
                console.log(`You failed in ${stats[n].length} ${n} ,\n${stats[n].join("\n")}`)
            }
        })

        console.log(sem_wise)
        
        console.log(`\nYou failed in ${failed.length} in total  out of ${c} subjects upto ${lasesem} (${(failed.length * 100 / c).toFixed(2)}% failed)\n`)
        console.log(`You gained ${credits} credits out of ${credits + loss} credits , (${loss} credits lost)`)
    }
}


module.exports = {
    type,
    check_fail,
    core_check,
    stats
}
