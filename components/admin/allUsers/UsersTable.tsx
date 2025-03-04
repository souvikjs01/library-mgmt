import { getAllUser } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Badge, ExternalLink } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

export default async function UsersTable() {
  const users = await getAllUser()
  
  if(!users.success){
    toast('Error', {
        description: users.error
    })
    return notFound()
  }
  return (
    <div className="bg-white rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>University ID No</TableHead>
            <TableHead>University ID Card</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data && users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium capitalize">{user.fullName}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                })}
              </TableCell>
              <TableCell>
                <Button 
                    variant="secondary"
                    className={cn(user.role === "ADMIN" ? 'text-green-500' : 'text-red-400', ' text-xs font-bebas-neue')}
                    size="sm"
                >
                    {user.role}
                </Button>
              </TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <Button variant="link" className="text-blue-500 flex items-center gap-1 p-0">
                  View ID Card
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
