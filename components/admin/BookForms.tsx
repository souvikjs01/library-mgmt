"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { 
    useForm,
} from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { bookSchema } from "@/lib/validations"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import FileUpload from "../auth/FileUpload"
import ColorPicker from "./ColorPicker"
import { createBook } from "@/actions/admin/books"
import { toast } from "sonner"

interface Props extends Partial<Book> {
    type?: 'create' | 'update',
}

export default function BookForm ({ type, ...book }: Props) {
    const router = useRouter()
    const form  = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            genre: "",
            rating: 1,
            totalCopies: 1,
            coverUrl: '',
            coverColor: '',
            videoUrl: '',
            summary: '',
        }
    })
    
    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        const result = await createBook(values);
        if(result.success) {
            toast('Success', {
                description: "Book Created Successfully",
            })
            router.push(`/admin/books/${result.data?.id}`);
        } else {
            toast('Error', {
                description: result.error
            })
        }        
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* book title */}
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Book Title</FormLabel>
                        <FormControl>
                            <Input 
                                required 
                                placeholder="Book Title"
                                {...field} 
                                className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                            /> 
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* author */}
            <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Author</FormLabel>
                        <FormControl>
                            <Input 
                                required 
                                placeholder="Book author"
                                {...field} 
                                className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                            /> 
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* genre */}
            <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Genre</FormLabel>
                        <FormControl>
                            <Input 
                                required 
                                placeholder="Book genre"
                                {...field} 
                                className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                            /> 
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* rating */}
            <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Rating</FormLabel>
                        <FormControl>
                            <Input 
                                type="number"
                                min={1}
                                max={5}
                                placeholder="Book rating"
                                {...field} 
                                className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                            /> 
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* total copies */}
            <FormField
                control={form.control}
                name="totalCopies"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Total Copies</FormLabel>
                        <FormControl>
                            <Input 
                                type="number"
                                min={0}
                                max={10000}
                                placeholder="Total book copies"
                                {...field} 
                                className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                            /> 
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* cover url */}
            <FormField
                control={form.control}
                name="coverUrl"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Book Image</FormLabel>
                        <FormControl>
                            <FileUpload 
                                type="image"
                                accept="image/*"
                                placeholder="Upload a book cover"
                                folder="books/covers"
                                variant="light"
                                onFileChange={field.onChange}
                                value={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* cover color */}
            <FormField
                control={form.control}
                name="coverColor"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Primary Color</FormLabel>
                        <FormControl>
                            <ColorPicker 
                                onPickerChange={field.onChange}
                                value={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* description */}
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Book Description</FormLabel>
                        <FormControl>
                            <Textarea 
                                placeholder="Book Description"
                                {...field}
                                rows={10}
                                className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* video url */}
            <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Book Trailer</FormLabel>
                        <FormControl>
                            <FileUpload 
                                type="video"
                                accept="video/*"
                                placeholder="Upload a book trailer"
                                folder="books/videos"
                                variant="light"
                                onFileChange={field.onChange}
                                value={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* summary */}
            <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                    <FormItem className=" flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Book Summary</FormLabel>
                        <FormControl>
                            <Textarea 
                                placeholder="Book summary"
                                {...field}
                                rows={5}
                                className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" className="min-h-14 w-full bg-primary-admin hover:bg-primary-admin/95">
                Add Book to Library
            </Button>
        </form>
    </Form>
  )
}

