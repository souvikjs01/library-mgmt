import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
import '@/styles/admin.css'
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { prisma } from '@/lib/prisma';


async function layout({children}: {children: ReactNode}) {
  const session = await auth();

  if(!session?.user?.id) {
    redirect("/sign-in")
  }

  const isAdmin = await prisma.user.findUnique({
    where: { 
      id: session.user.id 
    },
    select: { 
      role: true 
    },
  });
  
  if (isAdmin?.role !== "ADMIN") redirect("/");

  
  return (
    <main className=' flex min-h-screen w-full flex-row'>
        <Sidebar session={session}/>

        <div className='admin-container'>
            <Header session={session}/>
            {children}
        </div>
    </main>
  )
}

export default layout
