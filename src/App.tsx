
import {  useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'

import { useLocation } from 'react-router-dom'
import { getCurrentEmployee } from './services/api'
import { setToken, setEmployee } from '~/features/auth/employeeAuthSlice'
import Navbar from './components/layout/Navbar'
import { Outlet } from 'react-router-dom'
// import  Footer  from './components/layout/Footer';

import { NotificationProvider } from './components/NotificationContext';




const App = () => {

const location = useLocation()
const isEmployeeCompanyDetail = location.pathname.includes('/companyAllDetail')
const isHome = location.pathname === '/'
// const user = useSelector((state: RootState) => state.employeeAuth.employee || state.employerAuth.company)


const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('employeeToken')
        console.log('Get token', token)
        if (token) {
            dispatch(setToken(token))
            getCurrentEmployee(token).then((response: AxiosResponse<unknown, unknown> | undefined) => {
                if (response) {
                    dispatch(setEmployee(response.data))
                }
            })
        }
    }, [dispatch])


  return (
    
    <div className='App'>
    <NotificationProvider>

<div className='bg-beautiful'>
                <div className='mx-auto w-2/3'>
                    <Navbar />
                </div>
            </div>
            <div className={`mx-auto ${isEmployeeCompanyDetail ? 'w-full' : 'w-2/3'} ${isHome ? 'w-full' : 'w-2/3'}`}>
                <Outlet />
            </div>

            <div>
              {/* <Footer/> */}
              </div>

              </NotificationProvider> 

    </div>
  
  );
}

export default App
