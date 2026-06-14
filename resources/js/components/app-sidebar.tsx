import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types'; 

import {
  Package,
  CalendarDays,
  ShoppingCart,
} from "lucide-react"


const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: {
      url: '/admin/dashboard',
      method: 'get',
    },
    icon: LayoutGrid,
  },
  {
    title: 'Produk',
    href: {
      url: '/admin/products',
      method: 'get',
    },
    icon: Package,
  },
  {
    title: 'Workshop',
    href: {
      url: '/admin/workshops',
      method: 'get',
    },
    icon: CalendarDays,
  },
  {
    title: 'Pesanan',
    href: {
      url: '/admin/orders',
      method: 'get',
    },
    icon: ShoppingCart,
  },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
