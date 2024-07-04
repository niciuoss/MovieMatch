
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUp() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const router = useNavigate()

  async function handleSignUp() {
    try {

    } catch (error) {
      console.log('Erro ao cadastrar:', error)
    }
    router('/sign-in')
  }

  return (
    <>
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-full max-w-md flex-col justify-center gap-6 mx-auto">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Crie sua conta e descubra agora quais filmes foram feitos para você
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input
                id="phone"
                type="tel"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <Button onClick={() => handleSignUp()} className="w-full">
              Cadastrar
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a className="underline underline-offset-4 text-blue-700 dark:text-blue-800" href="#">
                termos de serviços
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4 text-blue-700 dark:text-blue-800" href="#">
                políticas de privacidade.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}