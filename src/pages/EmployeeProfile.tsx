import { Briefcase, CalendarDays, Mail, MapPin, Pencil, Phone } from 'lucide-react'
import { useSelector } from 'react-redux'

import ProfileSection from '~/components/ProfileSection'
import { Badge } from '~/components/ui/badge'
import { RootState } from '~/store'
import { Link, useNavigate } from 'react-router-dom'
import { PiGenderIntersex } from 'react-icons/pi'

const EmployeeProfile = () => {
    const navigate = useNavigate()
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)

    if (!employee) return null

    return (
        <div className='mt-12 mx-auto w-2/3 min-w-min flex flex-col gap-4'>
            <div className='p-12 bg-white rounded-3xl shadow-sm'>
                <div className='flex items-center gap-12 lg:gap-20'>
                    <div className='relative'>
                        <div className='w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden outline-offset-4 outline-gray-200 outline'>
                            <img src={employee.avatar} alt='' />
                        </div>
                    </div>
                    <div className='grow flex flex-col gap-4'>
                        <div className='flex justify-start items-center gap-4 pb-4 text-2xl font-semibold border-b'>
                            {employee.name}{' '}
                            <button title='edit' className='px-2 hover:text-gray-600' onClick={() => navigate('edit')}>
                                <Pencil className='w-5' />
                            </button>
                        </div>
                        <ul className='text-[#474d6a] min-w-max grid grid-cols-2 gap-x-4 gap-y-2'>
                            <li className='flex justify-start items-center gap-4'>
                                <MapPin className='w-4' />
                                {employee.address.country || 'Empty'}
                            </li>
                            <li className='flex justify-start items-center gap-4'>
                                <Briefcase className='w-4' />
                                {employee.experience || 'Empty'}
                            </li>
                            <li className='flex justify-start items-center gap-4'>
                                <CalendarDays className='w-4' />
                                {employee.joinDate.toString().slice(0, 10)}
                            </li>
                            <li className='flex justify-start items-center gap-4'>
                                <Phone className='w-4' />
                                {employee.phoneNumber || 'Empty'}
                            </li>
                            <li className='flex justify-start items-center gap-4'>
                                <Mail className='w-4' />
                                {employee.email || 'Empty'}
                            </li>
                            <li className='flex justify-start items-center gap-4'>
                                <PiGenderIntersex className='w-4' />
                                {employee.gender || 'Empty'}
                            </li>
                        </ul>
                        <Link to='/job-applications'>
                            <p className='text-sm underline'>My job applications</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <ProfileSection
                    title='Profile summary'
                    description='Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.'
                >
                    <p className='mt-4 text-md text-gray-800'>{employee.description}</p>
                </ProfileSection>
                <ProfileSection
                    title='Skills'
                    description='Tell recruiters what you know or what you are known for e.g. English, Oracle, Java etc.
                       Each skill is separated by a comma.'
                    editLink='edit/skills'
                >
                    {employee.skill.technical.length + employee.skill.soft.length > 0 ? (
                        <div>
                            <h3 className='text-md italic'>Technical skills</h3>
                            <div className='my-2 flex items-center'>
                                {employee.skill.technical.map((skill, index) => (
                                    <Badge key={`technical ${index}`}>{skill}</Badge>
                                ))}
                            </div>
                            <h3 className='text-md italic'>Soft skills</h3>
                            <div className='mt-2 flex items-center'>
                                {employee.skill.soft.map((skill, index) => (
                                    <Badge key={`soft ${index}`} variant='outline'>
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </ProfileSection>
                <ProfileSection
                    title='Education'
                    description='Please mention your education details. You can add details about your school, college and degree'
                    editLink='edit/education'
                >
                    {employee.education.length > 0
                        ? employee.education.map((education, index) => (
                              <Badge key={index} variant='outline'>
                                  {education.nameSchool}
                              </Badge>
                          ))
                        : null}
                </ProfileSection>
                <ProfileSection
                    title='Certifications'
                    description='Add details of certifications you have achieved/completed.'
                    editLink='edit/certification'
                >
                    {employee.certificates.length > 0
                        ? employee.certificates.map((cert, index) => (
                              <Badge key={index} variant='outline'>
                                  {cert.name}
                              </Badge>
                          ))
                        : null}
                </ProfileSection>
           
            </div>
        </div>
    )
}

export default EmployeeProfile