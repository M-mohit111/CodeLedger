// import { useState } from "react"
import {useForm} from "react-hook-form"

function Signup() {

    const {
        register,
        handleSubmit,
    } = useForm();

    const submittedData = (data) => {
        console.log(data);
    };

   return(
        <>
        <form onSubmit={handleSubmit(submittedData)}>
        <input {...register('firstName')} placeholder='Enter Name'/>
        <input {...register('email')} placeholder="Enter Email"/>
        <input {...register('password')} placeholder="Enter Password"/>
        <button type='submit' className='btn btn-lg'>Submit</button>
        </form>
        </>
    )

    // const [name,setname] = useState('');
    // const [email,setemail] = useState('');
    // const [password,setpassword] = useState('');

    // const handlesubmit = (e)=>{
    //     e.preventDefault();
    //     console.log(name,email,password);
    // }

    // return(
    //     <>
    //         <form onSubmit={handlesubmit}>
    //             <input type="text" value={name} placeholder="enter name" onChange={(e)=>setname(e.target.value)}/>
    //             <input type="email" value={email} placeholder="enter email" onChange={(e)=>setemail(e.target.value)}/>
    //             <input type="password" value={password} placeholder="enter password" onChange={(e)=>setpassword(e.target.value)}/>
    //             <button type="submit">submit</button>
    //         </form>
    //     </>
    // )
}

export default Signup