import { Video } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout(){
  return(
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        id="conteudo"
        className="flex flex-col justify-between order-2 md:order-1 border-t md:border-t-0 md:border-r border-foreground/5 bg-muted p-4 md:p-10 text-muted-foreground md:w-1/3"
      >
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Video className='h-5 w-5'/>
          <span className='font-semibold'>movie.match</span>
        </div>
        <footer className="mt-4 md:mt-auto text-sm">
          Painel do parceiro &copy; movie.match - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center order-1 md:order-2 flex-1 p-4 md:p-10">
        <Outlet/>
      </div>
    </div>
  )
}