import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchJobCard from '~/components/SearchJobCard'
import { Input } from '~/components/ui/input'
import Pagination from '~/components/Pagination'
import { searchVisibleAvailableJobs} from '~/services/api'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { SearchIcon } from 'lucide-react'


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

const Search = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [filteredResults, setFilteredResults] = useState(state.jobs as JobData[])
    const [totalPages, setTotalPages] = useState(state.totalPages)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchLocation, setSearchLocation] = useState(state.searchLocation)
    const [searchTitle, setSearchTitle] = useState(state.searchTitle)
    const [searchExperience, setSearchExperience] = useState(state.searchExperience)
    const [searchWorkingTime, setWorkingTime] = useState('')
    const [minSalary, setMinSalary] = useState('')
    const [maxSalary, setMaxSalary] = useState('')
    const [isPopupVisible, setIsPopupVisisble] = useState(false)
    const [searchCategories, setSearchCategories] = useState(state.searchCategories || []);
    const [searchRequiredSkills, setSearchRequiredSkills] = useState(state.searchRequiredSkills || []);
    const [searchCategoriesString, setSearchCategoriesString] = useState('');
    const [searchRequiredSkillsString, setSearchRequiredSkillsString] = useState('');
    


    useEffect(() => {
        console.log('useEffect triggered:', {
            searchLocation,
            searchTitle,
            searchWorkingTime,
            searchExperience,
            minSalary,
            maxSalary,
            searchCategories,
            currentPage
        })

        handlePageChange(currentPage)
    }, [searchLocation, searchTitle, searchWorkingTime, searchExperience, searchCategories,searchRequiredSkills, minSalary, maxSalary, currentPage])

   
    const handlePageChange = async (page: number) => {
        console.log('Changing to page:', page)
        const response = await searchVisibleAvailableJobs({
            title: searchTitle,
            yearsOfExp: searchExperience,
            location: searchLocation,
            minSalary: minSalary,
            maxSalary: maxSalary,
            workingTime: searchWorkingTime,
            categories: searchCategories,
            requiredSkills: searchRequiredSkills,
            page: page
        })
        if (response?.status === 200) {
            setFilteredResults(response.data.jobs)
            setCurrentPage(page)
            setTotalPages(response.data.totalPages)
        } else {
            console.log(response)
        }
    }

    const togglePopup = () => {
        setIsPopupVisisble(!isPopupVisible)
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchLocation = e.target.value
        setSearchLocation(searchLocation)
    }
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle)
    }

    const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value; 
        setSearchCategoriesString(input);
        const categoriesArray = input.split(',').map(cat => cat.trim());
        setSearchCategories(categoriesArray); 
    };

    const handleRequiredSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setSearchRequiredSkillsString(input);
        const skillsArray = input.split(',').map(cat => cat.trim()); 
        setSearchRequiredSkills(skillsArray); 
    };

  const handleExperienceChange = (value: string) => {
        setSearchExperience(value);

    }

    const handleWorkingTimeChange = (value: string) => {
        const newWorkingTime = searchWorkingTime === value ? '' : value
        setWorkingTime(newWorkingTime)
    }
    // const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    //     const value = e.target.value
    //     if (type === 'min') {
    //         setMinSalary(value)
    //     } else {
    //         setMaxSalary(value)
    //     }
    // }

    const handleSeeJobDetail = (result: JobData) => {
        navigate(`/job/${result._id}`, { state: result })
    }

    const handClearFilter = () => {
        setSearchExperience('')
        setSearchLocation('')
        setSearchTitle('')
        setMinSalary('')
        setMaxSalary('')
        setWorkingTime('')
        setSearchCategories('')
        setSearchCategoriesString('')
        setSearchRequiredSkills('')
        setSearchRequiredSkillsString('')
        handleExperienceChange('')
        // setSliderValue([])
    }

    return (
        <div className='my-8'>
            <div className='my-8  items-start gap-4'>
            <div className='mx-auto  p-4 h-full flex justify-center items-center bg-white rounded-full shadow-md'>
            <div className='px-4 w-full flex items-center'>
                        <SearchIcon className='w-1/12' />
                        <Input
                            type='text'
                            placeholder='Enter job title'
                            className='w-2/3 placeholder-gray-500 text-xl border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            value={searchTitle}
                            onChange={handleTitleChange}
                            
                        />
                      
                        <Input
                            type='text'
                            placeholder='Location'
                            className='w-1/4 placeholder-gray-500 text-xl border-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            value={searchLocation}
                            onChange={handleLocationChange}
                           
                        />
                        <Button
                            className='w-[18%] rounded-full text-md text-white bg-[#275df5] hover:bg-[#275df5ee]'
                           onClick={togglePopup}
                        >
                            Filter
                        </Button>
                    </div>

                    </div>
                    {isPopupVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">    
                <div className='px-4 lg:w-[30%] min-w-max h-max bg-white rounded-lg shadow-sm'>
                    <div className='flex justify-between'>
                    <h1 className='my-4 text-lg font-bold'>Filters</h1>
                    <Button className='my-2  font-semibold bg-red-700 hover:bg-red-500' onClick={togglePopup}>Close </Button>
                    </div>
                    <div className='my-6 flex'>
                        <p className='my-2 font-semibold'>Your Experience</p>

                         <Select defaultValue={searchExperience} onValueChange={(e) => handleExperienceChange(e)}>
                            <SelectTrigger className='w-1/4 placeholder-gray-500 text-xl border-none focus:ring-0 focus:ring-ring focus:ring-offset-0'>
                                <SelectValue placeholder='Experience' />
                            </SelectTrigger>
                            <SelectContent  className="bg-gray-100">
                                <SelectItem value='0'>Fresher</SelectItem>
                                <SelectItem value='1'>1 year</SelectItem>
                                <SelectItem value='2'>2 years</SelectItem>
                                <SelectItem value='3'>3 years</SelectItem>
                                <SelectItem value='4'>4 years</SelectItem>
                                <SelectItem value='5'>5 years</SelectItem>
                                <SelectItem value='6'>6 years</SelectItem>
                                <SelectItem value='7'>7 years</SelectItem>
                                <SelectItem value='8'>8 years</SelectItem>
                                <SelectItem value='9'>9 years</SelectItem>
                                <SelectItem value='10'>10 years</SelectItem>
                            </SelectContent>
                        </Select>
                   
                       
                    </div>

                    
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Working Time</p>
                        <div className='flex items-center space-x-2'>
                            <input
                                type='radio'
                                id='full-time'
                                value='full-time'
                                onChange={() => handleWorkingTimeChange('Full-time')}
                                checked={searchWorkingTime === 'Full-time'}
                            />
                            <label htmlFor='full-time'>Full-time</label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <input
                                type='radio'
                                id='part-time'
                                value='part-time'
                                onChange={() => handleWorkingTimeChange('Part-time')}
                                checked={searchWorkingTime === 'Part-time'}
                            />
                            <label htmlFor='part-time'>Part-time</label>
                        </div>
                    </div>
                       <div className='my-6'>
                        <p className='my-2 font-semibold'>Categories</p>
                        <Input
                            type='text'
                            placeholder='Web Development, Data Science i.e'
                            onChange={handleCategoriesChange}
                            value={searchCategoriesString}
                        />
                    </div>
{/* 
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Min Salary</p>
                        <Input
                            type='number'
                            placeholder='Web Development, Data Science i.e'
                            onChange={(e) => handleSalaryChange(e, 'min')}
                            value={minSalary}
                        />
                    </div>

                    
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Max Salary</p>
                        <Input
                            type='text'
                            placeholder='Web Development, Data Science i.e'
                            onChange={(e) => handleSalaryChange(e, 'max')}
                            value={maxSalary}
                        />
                    </div> */}


                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Skills</p>
                        <Input
                            type='text'
                            placeholder='PHP, English i.e'
                            onChange={handleRequiredSkillsChange}
                            value={searchRequiredSkillsString}
                        />
                    </div>
                    <div className='my-6 flex items-center justify-center'>
                        <Button className='font-semibold bg-blue-700 hover:bg-blue-500' onClick={handClearFilter}>
                            Clear all filters
                        </Button>
                    </div>
                    </div>
                </div>)}
                
                <div className='min-w-min my-5 flex flex-col gap-4 grow'>
                    {filteredResults.map((result) => (
                        <div key={result._id} onClick={() => handleSeeJobDetail(result)}>
                            <SearchJobCard {...result} />
                        </div>
                    ))}
                </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    )
}

export default Search