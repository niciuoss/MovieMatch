import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps){
  const { pathname } = useLocation()

  return(
    <Link 
      data-current={pathname === props.to}
      className='flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white data-[current=true]:text-white' {...props} />
  )
}