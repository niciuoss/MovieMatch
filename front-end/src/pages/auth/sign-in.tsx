import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link } from 'react-router-dom'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn(){
  const {register, handleSubmit} = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return(
    <>
      <Helmet title='Login'/>
      <div className="relative p-4 sm:p-8">
        <div className="flex flex-col w-full max-w-lg justify-center gap-6 mx-auto mt-16">
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Acessar seu perfil
            </h1>
            <p className='text-sm text-muted-foreground'>
              Veja a lista de filmes ideais para você
            </p>
          </div>

          <form onSubmit={ handleSubmit(handleSignIn) } className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>
                Seu email
              </Label>
              <Input type='email' id='email' {...register('email')}/>
            </div>
            <Button className='w-full' type='submit'>
              Acessar perfil          
            </Button>                    
            <p className='text-sm leading-relaxed text-muted-foreground'>
              Ainda não possui uma conta? clique {' '} 
              <a href="./sign-up" className='underline underline-offset-4 text-blue-700 dark:text-blue-800'>
                Aqui
              </a> {' '} e faça seu novo cadastro.
            </p>
          </form>
        </div>
      </div>
    </>
    
  )
}