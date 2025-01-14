import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { searchVisibleAvailableJobs, searchJobs } from '~/services/api'
import SearchJobCard from '~/components/SearchJobCard'
interface JobData {
    _id: string
    title: string
    categories: string[]
    workingTime: string
    location: string
    yearsOfExp: string
    description: string
    startDate: string
    endDate: string
    maxPositions: number
    offerSalary: string
    requiredSkills: string[]
    companyID: {
        _id: string
        companyLogo: string
        companyName: string
        companyLocations: string[]
    }
    jobApplicationCount: number
    isVisible: boolean
}

const Home = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [searchTitle, setSearchTitle] = useState('')
    const [searchLocation, setSearchLocation] = useState('')
    const [searchExperience, setSearchExperience] = useState('')
    const [filteredResults, setFilteredResults] = useState<JobData[]>(state?.jobs || [])
    const handleSeeJobDetail = (result: JobData) => {
        navigate(`/job/${result._id}`, { state: result })
    }

    const handleSearchTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value)
    }

    const handleSearchLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(e.target.value)
    }

    const handleSearchExperienceChange = (value: string) => {
        setSearchExperience(value)
    }

    const handleSearch = async () => {
        const response = await searchJobs({
            title: searchTitle,
            page: 0,
            yearsOfExp: '',
            minSalary: '',
            maxSalary: '',
            location: '',
            workingTime: ''
        })
        if (response?.status === 200) {
            const data = response.data
            const state = { ...data, searchTitle, searchExperience, searchLocation }
            navigate('/search', { state })
        } else {
            console.log(response)
        }
    }

    const handleJobListing = async () => {
        const response = await searchVisibleAvailableJobs({
            title: '',
            page: 0,
            yearsOfExp: '',
            minSalary: '',
            maxSalary: '',
            location: 'Ha Noi',
            workingTime: '',
            categories: [],
            requiredSkills: []
        })
        if (response?.status === 200) {
            const data = response.data.jobs
            setFilteredResults(data)
        }
        else { console.log(response) }
    }

    useEffect(() => {
        handleJobListing()
    }, [])

    return (
        <div className='flex flex-col'>
            <div
                className={`relative flex flex-col justify-center items-start gap-4 pt pt-32 pb-44 bg-[url('/newbackground.png')] bg-cover bg-center bg-no-repeat bg-opacity-75`}
            >
                <h1 className='absolute left-30 text-3xl font-bold select-none	'>Your next IT Job is just a click away !</h1>

            </div>
            <div className='w-2/3 mx-auto relative -top-10'>
                <div className='mx-auto  p-4 h-full flex justify-center items-center bg-white rounded-full shadow-md'>
                    <div className='px-4 w-full flex items-center'>
                        <Search className='w-1/12' />
                        <Input
                            type='text'
                            placeholder='Enter job title'
                            className='w-2/3 placeholder-gray-500 text-xl border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            value={searchTitle}
                            onChange={handleSearchTitleChange}
                        />
                        <Select defaultValue={searchExperience} onValueChange={(e) => handleSearchExperienceChange(e)}>
                            <SelectTrigger className='w-1/4 placeholder-gray-500 text-xl border-none focus:ring-0 focus:ring-ring focus:ring-offset-0'>
                                <SelectValue placeholder='Experience' />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                <SelectItem value='0'>Fresher</SelectItem>
                                <SelectItem value='1'>1 year</SelectItem>
                                <SelectItem value='2'>2 years</SelectItem>
                                <SelectItem value='3'>3 years</SelectItem>
                                <SelectItem value='4'>4 years</SelectItem>
                                <SelectItem value='5'>5 years</SelectItem>
                                <SelectItem value='6'>5+ years</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type='text'
                            placeholder='Location'
                            className='w-1/4 placeholder-gray-500 text-xl border-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            value={searchLocation}
                            onChange={handleSearchLocationChange}
                        />
                        <Button
                            className='w-[18%] rounded-full text-md text-white bg-[#275df5] hover:bg-[#275df5ee]'
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </div>
            <div className='w-2/3 my-8 mx-auto flex justify-center items-center gap-4'>
                <div className='flex flex-col w-full md:flex-row gap-4'>
                    <div className='p-6 bg-white rounded-lg shadow-md flex flex-col justify-between'>
                        <h3 className='text-xl font-semibold text-gray-800'>Wide Range of Opportunities</h3>
                        <p className='mt-4 text-gray-600'>
                            Explore job listings across various IT domains including web development, networking, artificial intelligence and more.
                        </p>
                    </div>
                    <div className='p-6 bg-white rounded-lg shadow-md flex flex-col justify-between'>
                        <h3 className='text-xl font-semibold text-gray-800'>User-Friendly Interface</h3>
                        <p className='mt-4 text-gray-600'>
                            Effortlessly search and apply for jobs with intuitive and responsive platform designed for ease of use.
                        </p>
                    </div>
                    <div className='p-6 bg-white rounded-lg shadow-md flex flex-col justify-between'>
                        <h3 className='text-xl font-semibold text-gray-800'>Meet Top IT Companies</h3>
                        <p className='mt-4 text-gray-600'>
                            Collaborate with leading IT companies and startups to discover exclusive job openings tailored to your career goals.
                        </p>
                    </div>
                </div>
            </div>


            <div className='my-5 flex flex-col grow min-w-min mx-5  gap-4 '>
              
                <div className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
                  Jobs in Hanoi
                </div>

          
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredResults.map((result) => (
                        <div
                            key={result._id}
                            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleSeeJobDetail(result)}
                        >
                            <SearchJobCard {...result} />
                        </div>
                    ))}
                </div>

               
                {filteredResults.length === 0 && (
                    <div className="text-center text-gray-500 text-lg mt-6">
                        No jobs available at the moment. Check back later!
                    </div>
                )}

            </div>

        </div>
    )
}

export default Home