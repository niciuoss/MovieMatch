import { Search, Video } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input"
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./account-menu";

export function Header(){
  return(
    <div className="bg-primary">
      <div className="h-16 flex items-center gap-6 px-6">
        
        <h1 className="text-xl font-semibold text-white">Movie Match</h1>
        <Video className="h-6 w-6 text-white"/>
        <Separator orientation="vertical" className="h-6"/>

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to='/'>
            Home
          </NavLink>
          <Separator orientation="vertical" className="h-6"/>

          <NavLink to='/genre'>
            Gêneros
          </NavLink>
          <Separator orientation="vertical" className="h-6"/>

          <NavLink to='/popular'>
            Populares
          </NavLink>
          <Separator orientation="vertical" className="h-6"/>
          
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400" />
            <Input type="text" placeholder="Buscar" className="pl-10 rounded-full" />
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle/>
          <AccountMenu/>
        </div>

      </div>

    </div>
  )
}