import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const token = localStorage.getItem('adminToken') 


// interface JobApplicationRequestBody {
//     jobId: string
//     employeeId: string
//     cv: File
//     status: string
// }

const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: function (status) {
        return status >= 200 && status < 500 
    }
})


export const searchEmployee = async (requestBody: {
    name?: string;
    experience?: string;
    skills?:string[];
    certifications?: string[];
    education?: string;
    page: number;
}) => {
    try {
        const response = await api.post('/employee/search', requestBody);
        return response.data; 
    } catch (error) {
        console.error('Error fetching employees:', error); 
        throw error;
    }
};

export const updateEmployee = async (id: string, requestBody: unknown, token: string) => {
    try {
        const response = await api.put(`employee/employees/${id}`, requestBody, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const searchJobs = async (requestBody: {
    title: string
    yearsOfExp: string
    minSalary: string
    maxSalary: string
    location: string
    workingTime: string
    page: number
}) => {
    try {
        const { title, yearsOfExp, location, page, minSalary, maxSalary, workingTime } = requestBody
        const response = await api.post('job/jobs/filtered-jobs/', {
            title: title,
            maxYearsOfExp: yearsOfExp,
            location: location,
            minSalary: minSalary,
            maxSalary: maxSalary,
            workingTime: workingTime,
            page: page
        })
        return response
    } catch (error) {
        console.error(error)
    }
}


export const searchVisibleJobs = async (requestBody: {
    title: string;
    yearsOfExp: string;
    minSalary: string;
    maxSalary: string;
    location: string;
    workingTime: string;
    page: number;
}) => {
    try {
        const { title, yearsOfExp, location, page, minSalary, maxSalary, workingTime } = requestBody;
        
       
        const response = await api.post('job/jobs/filtered-jobs/', {
            title: title,
            maxYearsOfExp: yearsOfExp,
            location: location,
            minSalary: minSalary,
            maxSalary: maxSalary,
            workingTime: workingTime,
            page: page,
            isVisible: true
        });

        return response;
    } catch (error) {
        console.error('Error searching for visible jobs:', error);
    }
};


export const deleteJobApplication = async (id: string) => {
    try {
        const response = await api.delete(`jobApplication/jobApplications/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}


export const get_all_users = async (id: unknown, token: string) => {
    try {
        const res = await api.get(`message/get-all-users?id=${id}`, {
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

export const searchCompany = async (requestBody: { companyName: string; page: number }) => {
    try {
        const { companyName, page } = requestBody
        const response = await api.post('company/filter-companies', { companyName, page })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getAllCompany = async () => {
    try {
        const response = await api.get('company/companies')
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getJobByCompany = async (companyID: string) => {
    try {
        const response = await api.get(`job/jobsByCompany?companyID=${companyID}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getAllEmployee = async () => {
    try {
        const response = await api.get('employee/employees')
        return response
    } catch (error) {
        console.error(error)
    }
}

export const deleteEmployee = async (id: string) => {
    try {
        const response = await api.delete(`employee/employees/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getAllJob = async () => {
    try {
        const response = await api.get('job/jobs')
        return response
    } catch (error) {
        console.error(error)
    }
}


export const getAvailableJob = async () => {
    try {
        const response = await api.get('job/availableJobs')
        return response
    } catch (error) {
        console.error(error)
    }
}



export const getVisibleJobs = async () => {
    try {
        
        const response = await api.get('job/jobs', {
            params: { isVisible: true }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getAllJobApply = async () => {
    try {
        const response = await api.get('jobApplication/jobApplications/count')
        return response
    } catch (error) {
        console.error(error)
    }
}



export const deleteCompany = async (id: string) => {
    try {
        const response = await api.delete(`company/companies/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const deleteEmployees = async (data: string[]) => {
    try {
        const response = await api.delete(`/employee/employees/checked`, { data })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const deleteCompanies = async (data: string[]) => {
    try {
        const response = await api.delete(`/company/companies/checked`, { data })
        return response
    } catch (error) {
        console.error(error)
    }
}


export const adminRegister = async (requestBody: { name: string; email: string; password: string }) => {
    try {
        const { name, email, password } = requestBody;
        const response = await api.post('admin/register', { name, email, password });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const adminLogin = async (requestBody: { email: string; password: string }) => {
    try {
        const { email, password } = requestBody;
        const response = await api.post('admin/login', { email, password });
        
        
        if (response.data && response.data.token) {
            console.log('Token received:', response.data.token);
            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('userType', 'admin');
        }
        console.log(localStorage.getItem('adminToken'))
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const updateJobVisibility = async (jobId: string, isVisible: boolean) => {
    try {
        const response = await api.put(`job/jobs/${jobId}/visibility`, { isVisible });
        return response;
    } catch (error) {
        console.error("Error updating job visibility:", error);
    }
};

export const updateCompanyVisibility = async (companyId: string, isVisible: boolean) => {
    try {
        const response = await api.put(`company/companies/${companyId}/visibility`, { isVisible });
        return response;
    } catch (error) {
        console.error("Error updating company visibility:", error);
    }
};

