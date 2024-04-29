import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "shared/ui";
import css from './LoginForm.module.css';

type Inputs = {
    email: string;
    password: string;
}

export const SignInForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // try {
        //     const url = qs.stringifyUrl({
        //       url: '/api/channels/',
        //       query: {
        //         serverId: params?.serverId,
        //       },
        //     });
        //     await axios.post(url, data);
      
        //     form.reset();
        //     router.refresh();
        //     onClose();
        //   } catch (error) {
        //     console.error(error);
        //   }
    }

    return(
        <form style={{display: "flex", flexDirection: "column", gap: "16px"}} onSubmit={handleSubmit(onSubmit)}>
            <label style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                Email
                <TextField 
                    type='email'
                    register={{...register("email", { required: "Email Address is required" })}}
                    errorMessage={errors["email"]?.message}
                />
            </label>
            
            <label style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                Password
                <TextField 
                    type='password' 
                    register={{...register("password", { required: "Password is required" })}} 
                    errorMessage={errors["password"]?.message}
                />
            </label>

            <Button type='submit'>Submit</Button>
        </form>
    )
}