'use client'
import { useState, useEffect } from 'react'
import { fetchClient } from '@/config/fetchClient'
import { useParams, useRouter } from 'next/navigation'

const initialFormValues = { title: '', description: '' }

export default function Tasks() {
  const [formValue, setFormValue] = useState(initialFormValues)
  const param = useParams()
  const router = useRouter()
  const action = param.id ? 'Edit' : 'New'

  useEffect(() => {
    // if (param) {
    //   fetch(`/api/tasks/${param.id}`)
    //     .then((res) => res.json())
    //     .then((data) => setFormValue(data))
    // }

    const fetchData = async () => {
      if (param.id) {
        try {
          const data = await fetchClient({ url: `/api/tasks/${param.id}` })
          setFormValue(data)
        } catch (error) {
          console.error('Error fetching task:', error)
        }
      }
    }

    fetchData()
  }, [param])

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setFormValue({ ...formValue, [name]: value })
  }

  const handleAddTask = async () => {
    try {
      const res = await fetchClient({
        url: '/api/tasks',
        method: 'POST',
        body: formValue,
      })
      setFormValue(initialFormValues)
      return { success: true, res: res }
    } catch (error) {
      console.error(error)
      return { success: false, res: {} }
    }
  }

  const handleUpdateTask = async () => {
    try {
      const res = await fetchClient({
        url: `/api/tasks/${param.id}`,
        method: 'PUT',
        body: formValue,
      })
      setFormValue(initialFormValues)
      return { success: true, res: res }
    } catch (error) {
      console.error(error)
      return { success: false, res: {} }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (action === 'New') {
      await handleAddTask()
    } else {
      await handleUpdateTask()
    }

    router.push('/')
    router.refresh()
  }

  const handleOnDelete = async (event) => {
    event.preventDefault()
    try {
      const res = await fetchClient({
        url: `/api/tasks/${param.id}`,
        method: 'DELETE',
      })

      if (res.success) {
        setFormValue(initialFormValues)
        router.push('/')
        router.refresh()
      }

      return { success: true, res: res }
    } catch (error) {
      console.error(error)
      return { success: false, res: {} }
    }
    // finally {
    //   router.push('/')
    //   router.refresh()
    // }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">{`${action} Task`}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about your task.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      type="text"
                      name="title"
                      className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-visible:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                      value={formValue.title}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-visible:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                      value={formValue.description}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {param.id && (
              <button
                onClick={handleOnDelete}
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-gray-50"
              >
                Delete
              </button>
            )}
            <button
              onClick={handleSubmit}
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              {action === 'New' ? 'Save' : 'Edit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
