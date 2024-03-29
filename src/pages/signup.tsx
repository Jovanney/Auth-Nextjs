import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

interface SignupType {
  email: string;
  password: string;
  password_confirm: string;
}

interface UserInterface {
  email: string;
  id: string;
}


const SignupPage = () => {
  const methods = useForm<SignupType>({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { signUp } = useAuth();

  const router = useRouter();
  const onSubmit = async (data: SignupType) => {
    try {
      if (data.email.toLocaleLowerCase().endsWith("ufpe.br") && data.password == data.password_confirm) {
        await signUp(data.email, data.password);
        onAuthStateChanged(auth,async (user)=> {
          if (user) {
            const uuid = user.uid
            try {
              const body = {} as UserInterface;
              body.email = data.email;
              body.id = uuid;
              await fetch('/api/createUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              });
            } catch (error) {
              console.error(error);
            }
          }
        })

        router.push("/welcomepage");   
      }else if(data.password != data.password_confirm){
          alert("Senhas não conferem")
      }
      else{
        alert("Email não pertence ao Domínio UFPE")
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">Sign Up</h2>
      <FormProvider {...methods}>
        <form action="" className="w-80 mx-auto pb-12 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Senha
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Confirme sua Senha
              </label>
            </div>

            <input
              type="password"
              {...register("password_confirm", {
                required: "Verifique sua Senha",
              })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password_confirm && (
              <p className="text-red-400">{errors.password_confirm.message}</p>
            )}
          </div>
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <p className="capitalize text-white font-normal">submit</p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupPage;

