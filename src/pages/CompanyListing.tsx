import  { useState, useEffect } from 'react';
import { updateCompanyVisibility, getAllCompany } from '../services/adminApi'; 
import { useNavigate } from 'react-router-dom';

const CompanyListing = () => {
    

     interface CompanyData {
        _id: string
        email: string
        phoneNumber: string
        companyName: string
        companyEmails: string[]
        companyWebsites: string[]
        companyPhoneNumbers: string[]
        companyLocations: string[]
        companyLogo: string
        description: string
        isVisible: boolean
    }
    
   const[companies,setCompanies]= useState<CompanyData[]>([]);

    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: keyof CompanyData, direction: 'ascending' | 'descending' }>({
        key: 'companyName',
        direction: 'ascending'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 
    const token = localStorage.getItem('adminToken');
    const navigate = useNavigate();
    console.log(token)

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token == null) {
            navigate("/admin/profile");
            console.log("moved")
        }
    }, [navigate]); 


   
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await getAllCompany();
                setCompanies(response?.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    
    const handleVisibilityToggle = async (companyId: string, currentVisibility: boolean) => {
        try {
            const newVisibility = !currentVisibility;
            const response = await updateCompanyVisibility(companyId, newVisibility);
            if (response?.status === 200) {
                setCompanies((prevCompanies) =>
                    prevCompanies.map((company) =>
                        company._id === companyId ? { ...company, isVisible: newVisibility } : company
                    )
                );
            }
        } catch (error) {
            console.error('Error toggling company visibility:', error);
        }
    };

   
    const handleSort = (key: keyof CompanyData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedCompanies = [...companies].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setCompanies(sortedCompanies);
    };

   
    const currentCompanies = companies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

   
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Company Visibility Management</h1>
            {loading ? (
                <div className="text-center">Loading companies...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-gray-100 rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('companyName')}
                                >
                                    Company Name
                                </th>
                           
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('isVisible')}
                                >
                                    Visibility
                                </th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCompanies.map((company) => (
                                <tr key={company._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{company.companyName}</td>
                                 
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full ${company.isVisible ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                        >
                                            {company.isVisible ? 'Visible' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleVisibilityToggle(company._id, company.isVisible)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            {company.isVisible ? 'Hide' : 'Show'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                  
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-l-md hover:bg-gray-400"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-lg text-gray-700">
                            Page {currentPage}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage * itemsPerPage >= companies.length}
                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-r-md hover:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyListing;
