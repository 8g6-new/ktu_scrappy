
function isEmptyObject(obj) {
    return !Boolean(Object.keys(obj).length)
  }
  
  function removeEmpty(data) {
    for (let noteKey in data.ligneNoteDeFrais) {
      const note = data.ligneNoteDeFrais[noteKey]
      if (isEmptyObject(note.fk)) {
        delete note.fk
      }
      for (let detail in note.detailFrais) {
        if (isEmptyObject(note.detailFrais[detail])) {
          delete note.detailFrais[detail]
        }
      }
      if (isEmptyObject(note.detailFrais)) {
        delete note.detailFrais
      }
      if (isEmptyObject(note)) {
        delete data.ligneNoteDeFrais[noteKey]
      }
    }
}

function get_mark_json(){
    
    function exam_detiles(raw_data){
        clean = {}
        raw_data = raw_data.split(' ')
        clean['Sem'] = raw_data[1]
        
        if(raw_data.length < 9){
            clean['Type'] = raw_data[2]=='(R)' ? 'Regular' : 'Supplementary'
            clean['Date of Exam'] = raw_data[4]+' '+raw_data[5]
            clean['Scheme'] = raw_data[6]

        }else{
            clean['Type'] = 'Special Improvement'
            clean['Date of Exam'] = raw_data[5]+' '+raw_data[6]
            clean['Scheme'] = raw_data[7].replace('(','')
        }
        return clean
    }

    function data_clean(sem,row,cell,h){
        let head = h ? ['thead','th'] : ['tbody','td']
        let input = document.querySelector(`#collapseFive${sem} > div > table > ${head[0]} > tr:nth-child(${row}) > ${head[1]}:nth-child(${cell})`).innerText
        input = input.replaceAll('\n','').split('\t')
        input = input.filter(n=>n).filter(n=>n!=' ')
        input = input.join(' ').replaceAll('  ','')
        return input
    }

    let json={},lables=[];
    let sems=document.querySelector('#curriculamTab_curriculam > div').innerText.replaceAll('\n View Grade Card','').replaceAll(' Activity Points','').split('\n').filter(n=>n).map(n=>n.replace(' ',''))
    for(i=1;i<10;i++){
        lables[i-1] = data_clean('S1',1,i,1) //Assuming you have S1 results
    }
    for(i=0;i<sems.length;i++){
        json[sems[i]] = {}
        for(j=1;j<9;j++){
            json[sems[i]][j]={}
            for(k=0;k<lables.length;k++){
                try{
                    json[sems[i]][j][lables[k]] = data_clean(sems[i],j,k+1,0)
                    if(lables[k]=='Examination Details' && json[sems[i]][j]['Completed Status']!='Result Not Published'){
                        json[sems[i]][j][lables[k]] = exam_detiles(json[sems[i]][j][lables[k]])
                    }
                }
                catch(e){
                    console.log(e)
                    console.log(i,j,k)
                }
            }
        }
    }

    Object.keys(json).forEach((key) => {
        if(key == "*Re-RegistrationRequired status may be changed after the result processing based on the eligibility condition and the result."){
            delete json[key];
        }
    });

    return json
}

module.exports = get_mark_json
