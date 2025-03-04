import UsersTable from '@/components/admin/allUsers/UsersTable'
import React from 'react'

export default function page() {
  return (
    <>
      <div>
        <h1 className=' font-bold text-xl'>All Users</h1>
      </div>
        

      <section className=' my-6'>
        <UsersTable />
      </section>
    </>
  )
}
