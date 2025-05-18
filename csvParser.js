const fs = require('fs')
const csv=require('csvtojson')

const members = ['Rachel', 'Janelle', 'Dad', 'Daniel', 'Cherise', 'Michael', 'Mom', 'Sam']

async function parseCSV(year) {
  const csvFilePath=`./csvs/${year}.csv`
  const entries = {}
  const jsonArray=await csv().fromFile(csvFilePath)
  jsonArray.forEach(obj => {
    for (const [name, prediction] of Object.entries(obj)) {
      if (members.includes(name)) {
        if (prediction) {
          entries[name] = entries[name] || new Array(10)
          if(Number(prediction) < 11) {
            entries[name][Number(prediction) - 1] = obj.Title
          } else if (prediction?.toLowerCase() === 'x') {
            entries[name].push(obj.Title)
          }
        }
      }
    }
  })

  fs.writeFile(`src/entries/entries-${year}.json`, JSON.stringify(entries), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
}

parseCSV(2025)