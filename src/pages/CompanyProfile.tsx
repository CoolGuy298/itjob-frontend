import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '~/store'
import { Button } from '~/components/ui/button'


const CompanyProfile = () => {
    const navigate = useNavigate()
    const company = useSelector((state: RootState) => state.employerAuth.company)
    if (!company) return null

    return (
        <div className='my-8 py-6 px-8 flex flex-col bg-white rounded-lg'>
            <div className='relative grid grid-cols-2 gap-12 items-start'>
                <Button
                    variant='secondary'
                    className='absolute top-0 right-0 shadow-md'
                    onClick={() => navigate('/employer/profile/edit')}
                >
                    Edit profile
                </Button>
                <div className='aspect-square flex justify-center items-center overflow-hidden border rounded-lg shadow-md'>
                    {company.companyLogo && (
                        <img src={company.companyLogo} alt='Company Logo' className='max-w-md' />
                    )}
                </div>
                <div className='text-md'>
                    <h1 className='text-2xl font-semibold'>{company.companyName}</h1>
                    <div className='my-2 grid grid-cols-1'>
                        <p>Email: {company.email}</p>
                        <p>Phone: {company.phoneNumber}</p>
                        <ul className='list-disc'>
                            <h2>Websites:</h2>
                            {company.companyWebsites.map((website, index) => (
                                <li className='ml-4' key={index}>
                                    {website}
                                </li>
                            ))}
                        </ul>
                        <ul className='list-disc'>
                            <h2>Locations:</h2>
                            {company.companyLocations.map((location, index) => (
                                <li className='ml-4' key={index}>
                                    {location}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className='my-4'>Description: {company.description}</p>
                </div>
            </div>
            <div className='my-4 flex justify-center items-center gap-4'>
                <Link to='/employer/jobs'>
                    <Button variant='outline' className='shadow-md'>
                        Manage jobs
                    </Button>
                </Link>
                <Link to='/employer/jobApplications'>
                    <Button variant='outline' className='shadow-md'>
                        Manage job applications
                    </Button>
                </Link>
            </div>
         
        </div>
    )
}

export default CompanyProfile