import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

const App = () => {
  const [num, setNum] = useState(20 );
  const [value, setValue] = useState("linear");
  const [copy, setCopy] = useState("");
  const [gradient,setGradient] = useState([])

  const generateGradient = ()=>{
    const colors = [];

    for(let i=0;i<num;i++){
     
      const color1 =gethexcode();
      const color2 = gethexcode();
      const angles = Math.floor(Math.random()*360);

      const degree_angles = `${angles}deg`
      if(value==="linear"){
        colors.push({
          gradient:`linear-gradient(${degree_angles},${color1},${color2})`,
          css:`background:linear-gradient(${degree_angles},${color1},${color2})`
  
        })

      }
      else{
        colors.push({
          gradient:`radial-gradient(circle,${color1},${color2})`,
          css:`background:radial-gradient(circle,${color1},${color2})`
  
        })

      }
     
    }
    setGradient(colors)
   

  }

  const handlecopy = (css)=>{
    navigator.clipboard.writeText(css);
    toast.success("Gradient Copied Sucessfully !",{position:"top-center"})

  }


  useEffect(()=>{
    generateGradient();

  },[num,value])
  const gethexcode = () => {

    const rgb = 255 * 255 * 255
    const random = Math.floor(Math.random() * rgb);
    const hexcode = random.toString(16)
    const colorcode = hexcode.padStart("6", "0")
    // setCopy(`#${colorcode}`)
    return `#${colorcode}`




  }
  return (
    <div className='min-h-screen bg-slate-900 py-8 '>
      <div className='flex justify-between items-center w-9/12 mx-auto'  >
        <div>
          <h1 className='text-green-400 text-3xl font-bold '> Gradient Generator </h1>
        </div>

        <div className='flex gap-4 '>
          <input
            value={num}
            onChange={(e) => setNum(e.target.value)}
            placeholder='No of gradients'
            type="text" className='p-2 mt-6 border-2 border-gray-100 rounded-lg w-[180px] text-white font-bold ' />

          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='p-2 mt-6 border-2 border-gray-100 rounded-lg w-[180px] text-white font-bold ' name="" id="">
            <option value="linear" className='text-black' >Linear</option>
            <option value="radial" >Radial</option>
          </select>
        </div>

        <button className='cursor-pointer bg-blue-400 text-white px-4 py-2 font-bold rounded-md mt-4 ' onClick={generateGradient} >Generate Colors</button>

      </div>

      <div className='flex gap-4 mt-8  flex-wrap items-center justify-center'>
        {
          gradient.map((item,index)=>{
           return (

           <div
           onClick={()=>handlecopy(item.css)}
            key={index}
            style={{ background: item.gradient }}
            className='h-[180px] ml-28 relative w-[290px] rounded-lg mt-6'>
  
            <button className='bg-black cursor-pointer p-2 text-white rounded-md absolute bottom-3 right-3   ' >COPY</button>
  
          </div>
           )

          })
        }
       

  
      </div>





<ToastContainer/>
    </div>
  )
}

export default App