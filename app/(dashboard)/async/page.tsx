'use client'

const page = () => {

    const getData =  () =>{
        return new Promise((resolve)=>{           
            setTimeout(()=>{
                    resolve('resolved')
            }, 2000)
        })
    }
/*
    const asyncCall = async() =>{
        console.log('calling')
        const result = await getData()
        console.log(result)
    }
*/
   getData()
    .then((results)=>{
      console.log(results)
    })
  return (
    <div>page</div>
  )
}

export default page