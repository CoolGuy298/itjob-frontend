import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const token = `Bearer ${localStorage.getItem('employerToken')}`;
if (!token) {
    throw new Error('Token not found');
}

const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: ` ${token}` },
    validateStatus: function (status) {
        return status >= 200 && status < 500 
    }
})

export const employerRegister = async (requestBody: { companyName: string; email: string; password: string }) => {
    try {
        const { companyName, email, password } = requestBody
        const response = await api.post('company/register', { companyName, email, password })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const employerLogin = async (requestBody: { email: string; password: string }) => {
    try {
        const { email, password } = requestBody
        const response = await api.post('company/login', { email, password })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getCurrentCompany = async (token: string) => {
    try {
        const response = await api.get('company/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const updateCompany = async (
    id: string,
    requestBody: {
        _id: string
        email: string
        phoneNumber: string | null
        companyName: string
        companyEmails: string[]
        companyWebsites: string[]
        companyPhoneNumbers: string[]
        companyLocations: string[]
        companyLogo: string
        description: string | null
    },
    token: string
) => {
    try {
        const response = await api.put(`company/companies/${id}`, requestBody, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}


export const createJob = async (requestBody: {
    title: string
    categories: string[]
    level: string
    requiredSkills: string[]
    maxPositions?: number
    yearsOfExp: string
    description: string
    workingTime: string
    offerSalary: string
    startDate: string
    endDate: string
    phases: string[]
    companyID: string
}, token : string) => {
    try {
        const response = await api.post('job/jobs', requestBody, {
            headers: {
             Authorization: `Bearer ${token}`, 
            }})
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getJob = async (id: string) => {
    try {
        const response = await api.get(`job/jobs/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const updateJob = async (
    id: string,
    requestBody: {
        title: string
        categories: string[]
        level: string
        requiredSkills: string[]
        maxPositions: number
        yearsOfExp: string
        description: string
        workingTime: string
        offerSalary: string
        startDate: string
        endDate: string
        phases: string[]
    },token:string
) => {
    try {
        console.log('Company Token:', token);  
    
        const response = await api.put(`job/jobs/${id}`, requestBody, {
               headers: {
                Authorization: `Bearer ${token}`, 
               }})
        return response
    } catch (error) {
        console.error(error)
    }
}

export const filterJobByCompany = async (requestBody: { title: string; companyID: string; page: number }) => {
    try {
        const { title, companyID, page } = requestBody
        const response = await api.post(`job/jobs/filtered-jobs-by-company`, { title, companyID, page })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const get_all_users = async (id: unknown, token: string) => {
    try {
        const res = await api.get(`message/get-company-all-users?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.error(error)
    }
}

export const deleteJob = async (id: string, token: string) => {
    try {
        const response = await api.delete(`/job/jobs/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const searchJobApplicationByCompanyId = async (
    requestBody: { jobTitle: string; page: number },
    companyID: string,
    token: string
) => {
    try {
        const { jobTitle, page } = requestBody
        const response = await api.post(
            `/jobApplication/jobApplications/company/${companyID}`,
            { jobTitle: jobTitle, page: page },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return response
    } catch (error) {
        console.error(error)
    }
}


export const searchJobApplicationByCompanyIdStatus = async (
    requestBody: { jobStatus: string; page: number },
    companyID: string,
    token: string
) => {
    try {
        const { jobStatus, page } = requestBody
        const response = await api.post(
            `/jobApplication/jobApplications/company/${companyID}/status`,
            { jobStatus: jobStatus, page: page },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return response
    } catch (error) {
        console.error(error)
    }
}
export const updateJobApplicationStatus = async (
    requestBody: { status: string },
    jobApplicationId: string,
    token: string
) => {
    try {
    
        const { status } = requestBody
        const response = await api.put(
            `/jobApplication/jobApplications/${jobApplicationId}`,
            { status: status },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getNumberOfApplication = async (jobId: string) => {
    try {
        const response = await api.get(`/jobApplication/jobApplications/job/${jobId}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const downloadCV = async (jobApplicationId: string,token: string) => {
    try {
        
        console.log('Company Token:', token);  // Log the token
        const response = await api.get(`jobApplication/download-cv/${jobApplicationId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Use the passed token here
            },
            responseType: 'blob',
          });
        const file = new Blob([response.data], { type: response.headers['content-type'] })
        console.log('Headers:', response.headers)
        const contentDisposition = response.headers['content-disposition']
        let filename = 'download'
        if (contentDisposition) {
            const matches = /filename="([^"]+)"/.exec(contentDisposition)
            if (matches && matches[1]) {
                filename = matches[1]
            }
        }
        const fileURL = URL.createObjectURL(file)
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', filename)
        document.body.appendChild(fileLink)

        fileLink.click()

        document.body.removeChild(fileLink)
        URL.revokeObjectURL(fileURL)
    } catch (error) {
        console.error(error)
    }
}

export const getEmployeeById = async (employeeId: string) => {
    try {
        const response = await api.get(`employee/employees/${employeeId}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export const searchCompany = async (requestBody: { companyName: string; page: number }) => {
    try {
        const { companyName, page } = requestBody
        const response = await api.post('company/filter-companies', { companyName, page })
        return response
    } catch (error) {
        console.error(error)
    }
}