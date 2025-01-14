import { useNavigate,useLocation} from "react-router-dom";
import { useEffect, useState } from 'react'

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

const Learn = () => {
 const { state } = useLocation()
    const navigate = useNavigate()
    const [filteredResults, setFilteredResults] = useState(state.jobs as JobData[])
    const [totalPages, setTotalPages] = useState(state.totalPages)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchLocation, setSearchLocation] = useState(state.searchLocation)
    const [searchTitle, setSearchTitle] = useState(state.searchTitle)
    const [searchExperience, setSearchExperience] = useState(state.searchExperience)


    const handleNavigate = (result : JobData) =>{
        navigate(`job/${result._id}`, {state : result})
    }
}


export default Learn