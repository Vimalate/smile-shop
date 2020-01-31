const fs=require('fs')
fs.readFile('./goods.json','utf8',(err,data)=>{
    let newData=JSON.parse(data)
    let pushData=[]
    let i=0
    newData.RECORDS.map((val,index)=>{
        if(val.IMAGE1){
            pushData.push(val)
            i++
            console.log(val.NAME)
        }
    })
console.log(i)
// console.log(pushData)
fs.writeFile('./newGoods.json',JSON.stringify(pushData),(err)=>{
    if(err) console.log('写入文件失败！')
    console.log('写入成功')
})
})