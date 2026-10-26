import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
    emailid : z.string().email("Enter a valid email address"),
    password: z.string().min(8,"minimum 8 length")
})

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver:zodResolver(loginSchema)});

    const submittedData = (data) => {
        console.log(data);
    };

   return(
        <>
        <form onSubmit={handleSubmit(submittedData)}>
        <input type="email" autoComplete="email" {...register('emailid')} placeholder="Enter Email"/>
        {errors.emailid && (<span className="text-red-400 text-xs mt-1 block">{errors.emailid.message}</span>)}
        <input type="password" autoComplete="current-password" {...register('password')} placeholder="Enter Password"/>
        {errors.password && (<span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>)}
        <button type='submit' className='btn btn-lg'>Submit</button>
        </form>
        </>
    )
}