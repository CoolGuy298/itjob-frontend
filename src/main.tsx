import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/style.css';
import './css/satoshi.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'jsvectormap'
import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import EmployeeRegisterForm from './components/EmployeeRegisterForm.tsx'
import EmployeeLoginForm from './components/EmployeeLoginForm.tsx'
import EmployeeAuth from './pages/EmployeeAuth.tsx'
import EmployerAuth from './pages/EmployerAuth.tsx'
import EmployerLoginForm from './components/EmployerLoginForm.tsx'
import EmployerRegisterForm from './components/EmployerRegisterForm.tsx'
import Search from './pages/Search.tsx'
import EmployeeSearch from './pages/EmployeeSearch.tsx'
import Home from './pages/Home.tsx'
import CompanyApp from './CompanyApp.tsx'
import CompanyHome from './pages/CompanyHome.tsx'
import CompanyProfile from './pages/CompanyProfile.tsx'
import CompanyProfileEdit from './pages/CompanyProfileEdit.tsx'
import CompanyCreateJob from './pages/CompanyCreateJob.tsx'
import CompanyEditJob from './pages/CompanyEditJob.tsx'
import CompanyJobs from './pages/CompanyJobs.tsx'
import CompanyJobApplications from './pages/CompanyJobApplications.tsx'
import ApplicantProfile from './pages/ApplicantProfile.tsx'
import EmployeeCompany from './pages/EmployeeCompany.tsx'
import EmployeeJobDetail from './pages/EmployeeJobDetail.tsx'
import EmployeeCompanyDetail from './pages/EmployeeCompanyDetail.tsx'
import EmployeeProfile from './pages/EmployeeProfile.tsx'
import EmployeeProfileEdit from './pages/EmployeeProfileEdit.tsx'
import EmployeeProfileEditCertification from './pages/EmployeeProfileEditCertification.tsx'
import EmployeeProfileEditEducation from './pages/EmployeeProfileEditEducation.tsx'
import EmployeeProfileEditSkills from './pages/EmployeeProfileEditSkills.tsx'
import EmployeeJobApplication from './pages/EmployeeJobApplication.tsx'

// Import admin components


import Profile from './pages/Profile';
import DefaultLayout from './layout/DefaultLayout';
import JobListing from './pages/JobListing.tsx';
import CompanyListing from './pages/CompanyListing.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Users from './pages/Users.tsx';
import AdminRegister from './pages/AdminRegister.tsx';
const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {
              path: '/',
              element: <Home />
          },
        //   {
        //     path: '/employee-search',
        //     element: <EmployeeSearch />
        // },
          {
              path: '/search',
              element: <Search />
          },
          {
            path: '/companyAll',
            element: <EmployeeCompany />
          },
          {
            path: '/job/:id',
            element: <EmployeeJobDetail />
          },
          {
            path: 'job-applications',
            element: <EmployeeJobApplication />
        },
          {
            path: '/companyAllDetail/:id',
            element: <EmployeeCompanyDetail />
        },
        {
            path: '/profile/:id',
            element: <EmployeeProfile />
        },
        {
            path: '/profile/:id/edit',
            element: <EmployeeProfileEdit />
        },
        {
            path: '/profile/:id/edit/education',
            element: <EmployeeProfileEditEducation />
        },
        {
            path: '/profile/:id/edit/certification',
            element: <EmployeeProfileEditCertification />
        },
        {
            path: '/profile/:id/edit/skills',
            element: <EmployeeProfileEditSkills />
        },
         
      ]
  },
  {
      path: '/auth',
      element: <EmployeeAuth />,
      children: [
          {
              path: '/auth/login',
              element: <EmployeeLoginForm />
          },
          {
              path: '/auth/register',
              element: <EmployeeRegisterForm />
          }
      ]
  },
  {
      path: '/employer/auth',
      element: <EmployerAuth />,
      children: [
          {
              path: '/employer/auth/login',
              element: <EmployerLoginForm />
          },
          {
              path: '/employer/auth/register',
              element: <EmployerRegisterForm />
          }
      ]

  },
  {
      path: '/employer',
      element: <CompanyApp />,
      children: [
          {
              path: '',
              element: <CompanyHome />
          },
          {
            path: 'profile/:id',
            element: <CompanyProfile />
        },
        {
            path: 'profile/edit',
            element: <CompanyProfileEdit />
        },
        {
          path: 'employee-search',
          element: <EmployeeSearch />
      },
        {
            path: 'jobs',
            element: <CompanyJobs />
        },
        {
            path: 'jobs/create',
            element: <CompanyCreateJob />
        },
        {
            path: 'jobs/:id/edit',
            element: <CompanyEditJob />
        },
        {
            path: 'jobApplications',
            element: <CompanyJobApplications />
        },
        {
            path: 'jobApplications/applicant/:id',
            element: <ApplicantProfile />
        }
  
      ]
  },
  {
    path: '/admin',
   
    children: [
      {
        path: '',
        element:  <DefaultLayout><Dashboard /></DefaultLayout>
      },
      {
        path: 'users',
        element: <DefaultLayout><Users /></DefaultLayout> 
      },
      {
        path: 'profile',
        element:  <Profile />
      },

      {
        path: 'register',
        element:  <AdminRegister />
      },
   
      {
        path: 'jobs',
        element:  <DefaultLayout><JobListing /></DefaultLayout>
      },
      {
        path: 'companies',
        element:  <DefaultLayout><CompanyListing /></DefaultLayout>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <Provider store = {store}>
    <RouterProvider router = {router}/>,  
    </Provider>
  

  </React.StrictMode>,
)
