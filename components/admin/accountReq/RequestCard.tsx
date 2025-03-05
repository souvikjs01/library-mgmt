"use client";
import { getUserDetails, userApproved, userRevoked } from '@/actions/user'
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card'
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table'
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface User {
  id: string;
  fullName: string;
  createdAt: Date;
  universityId: number;
  universityCard: string;
  status: "APPROVED" | "REJECTED" | "PENDING";
}

export default function RequestCard() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allUsers = async () => {
      try {
        const res = await getUserDetails();
        if (res.success && res.data) {
           setUsers(res.data)
        } else {
          toast.error("Error", {
            description: "Something went wrong, Try again later",
          });
        }
      } catch (error) {
        toast.error("Error", {
          description: "Failed to fetch users",
        });
      }
    };
    allUsers();
  }, []);

  const handleAproved = async (id: string) => {
    try {
        setLoading(true)
        const res = await userApproved(id);
        if (res.success) {
          toast.success("Success", {
            description: "User approved successfully",
          });
          setUsers(users.map((user) => (user.id === id ? { ...user, status: "APPROVED" } : user)));
        } else {
          toast.error("Error", {
            description: res.error,
          });
        }
    } catch (error) {
        toast.error("Error", {
            description: "Failed to approve user",
        }) 
    } finally {
        setLoading(false)
    }
    router.push("/admin/account-requests");
  }

  const handleRevoke = async (id: string) => {
    try {
        setLoading(true)
        const res = await userRevoked(id);
        if (res.success) {
          toast.success("Success", {
            description: "User Revoked successfully",
          });
          setUsers(users.map((user) => (user.id === id ? { ...user, status: "REJECTED" } : user)));
        } else {
          toast.error("Error", {
            description: res.error,
          });
        }
    } catch (error) {
        toast.error("Error", {
            description: "Failed to approve user",
        }) 
    } finally {
        setLoading(false)
    }
    router.push("/admin/account-requests");
  }

  return (
    <Card className="border-none shadow-none p-4">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-bold">Account Registration Requests</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead>University ID No</TableHead>
                <TableHead>University ID Card</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium capitalize">{user.fullName}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}
                  </TableCell>
                  <TableCell>{user.universityId}</TableCell>
                  <TableCell>
                    <Button variant="link" size="sm" className="text-blue-500 p-0 h-auto font-normal" asChild>
                      <Link href="#">
                        View ID Card <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{user.status}</TableCell>
                  <TableCell>
                    {user.status === "PENDING" ? (
                      <Button
                        size="sm"
                        className="bg-green-50 w-full hover:bg-green-100 text-green-600 hover:text-green-700 border border-green-200"
                        onClick={() => {handleAproved(user.id)}}
                        disabled={loading}
                      >
                        Approve Account
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-red-50 w-full hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200"
                        onClick={() => handleRevoke(user.id)}
                      >
                        { user.status === "REJECTED" ? "Recjcted" : "Revoke Account"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
