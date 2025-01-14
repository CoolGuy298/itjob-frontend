import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Label } from '~/components/ui/label'
import { Button } from '../components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { updateEmployee } from '~/services/api'
// import { useNotification } from '~/components/NotificationContext'

const editableStringFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email'
    },
    {
        name: 'avatar',
        label: 'Avatar URL',
        type: 'text'
    },
    {
        name: 'description',
        label: 'Profile Summary',
        type: 'text'
    },
    {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'text'
    },
    // {
    //     name: 'experience',
    //     label: 'Experience',
    //     type: 'text'
    // }
]

const editableSelectFields = [
    {
        name: 'gender',
        label: 'Gender',
        values: [
            {
                name: 'Fresher',
                label: 'Fresher'
            },
            {
                name: '1 Year',
                label: '1 Year'
            },
            {
                name: '2 Years',
                label: '2 Years'
            },
            {
                name: '3 Years',
                label: '3 Years'
            },
            {
                name: '4 Years',
                label: '4 Years'
            },
            {
                name: 'More than 4 Years',
                label: 'More than 4 Years'
            },
            {
                name: 'None',
                label: 'None'
            }
        ]
    },
    {
        name: 'experience',
        label: 'Experience',
        values: [
            {}
        ]
    }
]

const EmployeeProfileEdit = () => {
    // const { addNotification } = useNotification()
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)
    const navigate = useNavigate()
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const [employeeData, setEmployeeData] = useState(employee)
    // const showSuccess = () => {
    //     addNotification(" successfully updated", "success");
    // };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (employeeData.phoneNumber && !/^\d{10}$/.test(employeeData.phoneNumber)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }
        updateEmployee(employeeData._id, employeeData, token)
        alert("Employee updated successfully!");
        navigate(`/profile/${employeeData._id}`)
        window.location.reload()

    }

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (employeeData.phoneNumber && !/^\d{10}$/.test(employeeData.phoneNumber)) {
    //         alert("Phone number must be exactly 10 digits.");
    //         return;
    //     }

    //     try {
    //        
    //         await updateEmployee(employeeData._id, employeeData, token); 

    //         
    //         alert("Employee updated successfully!");

    //        
    //         navigate(`/profile/${employeeData._id}`);
    //     } catch (error) {
    //         console.error("Error updating employee:", error);
    //         alert("Failed to update employee. Please try again.");
    //     }
    // };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const avatarFile = e.target.files?.[0]
        if (avatarFile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                console.log(base64String)
                setEmployeeData((prevState) => ({
                    ...prevState,
                    avatar: base64String
                }))
            }
            reader.readAsDataURL(avatarFile)
        }
    }

    useEffect(() => {
        setEmployeeData(employee)
    }, [employee])

    if (!employeeData) return null

    return (
        <form className='my-12 mx-auto w-2/3' onSubmit={handleSubmit}>
            <Label htmlFor='avatar' className='text-md'>
                Avatar
            </Label>
            <div className='mx-auto w-min flex flex-col justify-center gap-2'>
                <Input type='file' id='avatar' onChange={handleFileChange} />
                <div className='w-64 aspect-square flex rounded-lg overflow-hidden'>
                    {employeeData.avatar && <img src={employeeData.avatar} alt='Preview' />}
                </div>
            </div>
            {editableStringFields.map((field, index) => (
                <div key={index} className='my-4 grid w-full items-center gap-1'>
                    <Label htmlFor={index.toString()} className='text-md'>
                        {field.label}
                    </Label>
                    <Input
                        type={field.type}
                        id={index.toString()}
                        value={employeeData[field.name as keyof typeof employeeData]?.toString() || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (field.name === 'phoneNumber') {
                                if (/^\d{0,10}$/.test(value)) {
                                    setEmployeeData({ ...employeeData, [field.name]: value });
                                }
                            } else
                                setEmployeeData({ ...employeeData, [field.name]: e.target.value })
                        }}
                        readOnly={field.type === 'email'}
                    />
                </div>
            ))}
            {editableSelectFields.map((field, index) => (
                <div key={index} className='my-4 grid w-full items-center gap-1'>
                    <Label htmlFor={`select-${index}`} className='text-md'>
                        {field.label}
                    </Label>
                    {(field.name === 'gender') &&
                        <Select onValueChange={(value) => setEmployeeData({ ...employeeData, [field.name]: value })}>
                            <SelectTrigger id={`select-${index}`}>
                                <SelectValue
                                    placeholder={
                                        employeeData[field.name as keyof typeof employeeData]?.toString() ||
                                        'Select your gender'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='male'>Male</SelectItem>
                                    <SelectItem value='female'>Female</SelectItem>
                                    <SelectItem value='other'>Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>}

                    {(field.name === 'experience') &&
                        <Select onValueChange={(value) => setEmployeeData({ ...employeeData, [field.name]: value })}>
                            <SelectTrigger id={`select-${index}`}>
                                <SelectValue
                                    placeholder={
                                        employeeData[field.name as keyof typeof employeeData]?.toString() ||
                                        'Select your experience'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='None'>None</SelectItem>
                                    <SelectItem value='Fresher'>Fresher</SelectItem>
                                    <SelectItem value='1 Year'>1 Year</SelectItem>
                                    <SelectItem value='2 Years'>2 Years</SelectItem>
                                    <SelectItem value='3 Years'>3 Years</SelectItem>
                                    <SelectItem value='4 Years'>4 Years</SelectItem>
                                    <SelectItem value='More than 4 Years'>More than 4 Years</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>}
                </div>
            ))}
            <Button type='submit'>Confirm</Button>
        </form>
    )
}

export default EmployeeProfileEdit