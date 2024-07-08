import { Search, Video } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./account-menu";

export function Header() {
  return (
    <div className="bg-primary">
      <div className="h-16 flex items-center gap-6 px-4 md:px-6">
        <h1 className="text-2xl font-semibold text-white">Movie Match</h1>
        <Video className="h-10 w-10 lg:h-[3.4rem] lg:w-[3.4rem] text-white"/>
        <Separator orientation="vertical" className="h-6 hidden md:block"/>

        <nav className="flex items-center space-x-4 md:space-x-6 flex-1">
          <NavLink to='/' className="hidden md:block">Home</NavLink>
          <Separator orientation="vertical" className="h-6 hidden md:block"/>
          
          <NavLink to='/genre' className="hidden md:block">Gêneros</NavLink>
          <Separator orientation="vertical" className="h-6 hidden md:block"/>

          <NavLink to='/popular' className="hidden md:block">Populares</NavLink>
          <Separator orientation="vertical" className="h-6 hidden md:block"/>
          
          <div className="relative flex items-center flex-1">
            <Search className="absolute left-3 text-gray-400" />
            <Input type="text" placeholder="Buscar" className="pl-10 rounded-full w-full" />
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
