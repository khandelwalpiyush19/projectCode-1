import { Link } from "react-router-dom"
import { FaHome, FaLayerGroup, FaBlog, FaComments, FaUsers } from "react-icons/fa"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items with React Icons and updated navigation items for blog app
const items = [
  {
    title: "Home",
    url: "/",
    icon: FaHome,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: FaLayerGroup,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: FaBlog,
  },
  {
    title: "Comments",
    url: "/comments",
    icon: FaComments,
  },
  {
    title: "Users",
    url: "/users",
    icon: FaUsers,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Blog Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}