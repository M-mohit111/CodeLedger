// import { useState } from "react"
import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z.object({
    firstName : z.string().min(3,"name should contain 3 character"),
    emailid : z.string(),
    password: z.string().min(8,"minimum 8 length")
})

function Signup() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver:zodResolver(signupSchema)});

    const submittedData = (data) => {
        console.log(data);
    };

   return(
        <>
        <form onSubmit={handleSubmit(submittedData)}>
        <input {...register('firstName')} placeholder='Enter Name'/>
        {errors.firstName && (<span className="text-red-400 text-xs mt-1 block">{errors.firstName.message}</span>)}
        <input {...register('emailid')} placeholder="Enter Email"/>
        {errors.emailid && (<span className="text-red-400 text-xs mt-1 block">{errors.emailid.message}</span>)}
        <input {...register('password')} placeholder="Enter Password"/>
        {errors.password && (<span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>)}
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