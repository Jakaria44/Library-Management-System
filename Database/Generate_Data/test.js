const fs = require('fs');

const jsonData = JSON.parse(fs.readFile('books.json', 'utf8'));


const data = jsonData.filter(item=>item.language !===).map(item=>{
  
   return {
    ...item, 
    title : item.title.slice(0, 490),
    description: item.description.slice(0,2990)
   }
})

// fs.writeFile('books2.json', JSON.stringify(data), 'utf8', (err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('done')
// });
console.log(data);