import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
// const token = localStorage.getItem('employeeToken') 

const token = `Bearer ${localStorage.getItem('employeeToken')}`;
if (!token) {
    throw new Error('Token not found');
}
interface JobApplicationRequestBody {
    jobId: string
    employeeId: string
    cv: File
    status: string
}

const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: ` ${token}` },
    validateStatus: function (status) {
        return status >= 200 && status < 500 
    }
})

// const api = axios.create({
//     baseURL: API_URL,
//     headers: { Authorization: `Bearer ${token}` },
//     validateStatus: function (status) {
//         return status >= 200 && status < 500 \
//     }
// })

export const register = async (requestBody: { name: string; email: string; password: string }) => {
    try {
        const { name, email, password } = requestBody
        const response = await api.post('employee/register', { name, email, password })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const login = async (requestBody: { email: string; password: string }) => {
    try {
        const { email, password } = requestBody
        const response = await api.post('employee/login', { email, password })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getCurrentEmployee = async (token: string) => {
    try {
        const response = await api.get('employee/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

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


export const searchVisibleAvailableJobs = async (requestBody: {
    title: string;
    yearsOfExp: string;
    minSalary: string;
    maxSalary: string;
    location: string;
    workingTime: string;
    categories: string[];
    requiredSkills: string[];
    page: number;
}) => {
    try {
        const { title, yearsOfExp, location, page, minSalary, maxSalary, workingTime, categories,requiredSkills } = requestBody;
        
    
        const response = await api.post('job/jobs/filtered-available-jobs/', {
            title: title,
            maxYearsOfExp: yearsOfExp,
            location: location,
            minSalary: minSalary,
            maxSalary: maxSalary,
            workingTime: workingTime,
            categories: categories,
            requiredSkills: requiredSkills,
            page: page,
            isVisible: true
        });
      

        return response;
    } catch (error) {
        console.error('Error searching for visible jobs:', error);
    }
};

export const createJobApplication = async (requestBody: JobApplicationRequestBody, token: string) => {
    const formData = new FormData()
    formData.append('jobId', requestBody.jobId)
    formData.append('employeeId', requestBody.employeeId)
    formData.append('status', requestBody.status)
    formData.append('cv', requestBody.cv)

    const response = await api.post('jobApplication/jobApplications', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const getJobApplicationsByEmployee = async (employeeId: string, token: string) => {
    try {
        const response = await api.get(`jobApplication/jobApplications/employee/${employeeId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}



export const searchJobApplicationsByEmployeeId = async (
  requestBody: { jobTitle?: string; page: number},
  employeeId: string,
  token: string
) => {
  try {
    const { jobTitle, page } = requestBody;
    const response = await api.post(
      `/jobApplication/jobApplications/employee/${employeeId}`,
      { jobTitle, page },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    console.error('Error fetching filtered and paginated job applications:', error);
  }
};

export const deleteJobApplication = async (id: string, token: string) => {
    try {
        const response = await api.delete(`jobApplication/jobApplications/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Use the passed token here
            }
          });
        return response

    
    } catch (error) {
        console.error(error)
    }
}

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
        const response = await api.get('jobApplication/jobApplications')
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

export const downloadCV = async (jobApplicationId: string, token: string) => {
    try {
       
        console.log('Employee Token:', token);  
        const response = await api.get(`jobApplication/download-cv/${jobApplicationId}`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
            responseType: 'blob',
          });
        const file = new Blob([response.data], { type: response.headers['content-type'] });
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'download';
        
        if (contentDisposition) {
            const matches = /filename="([^"]+)"/.exec(contentDisposition);
            if (matches && matches[1]) {
                filename = matches[1];
            }
        }

        const fileURL = URL.createObjectURL(file);
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', filename);
        document.body.appendChild(fileLink);

        fileLink.click();
        document.body.removeChild(fileLink);
        URL.revokeObjectURL(fileURL);
    } catch (error) {
        console.error('Error downloading CV:', error);
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

export const getJobByJobId = async (jobId: string) => {
    try {
        const response = await api.get(`job/jobs/${jobId}`)
        return response;
    } catch (error){
        console.error("Error finding job", error);
    }
}