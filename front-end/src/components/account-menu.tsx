import { ChevronDown, Heart, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function AccountMenu(){
  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='default' className="flex items-center gap-2 select-none">
          Perfil
          <ChevronDown className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[12rem]">
        <DropdownMenuLabel className="flex flex-col">
          <span>Vinicius Sales</span>
          <span className="text-xs font-normal text-muted-foreground">vinicius@mail.com</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4"/>
          <span>Editar Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart className="mr-2 h-4 w-4"/>
          <span>Lista de Favoritos</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
          <LogOut className="mr-2 h-4 w-4"/>
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}