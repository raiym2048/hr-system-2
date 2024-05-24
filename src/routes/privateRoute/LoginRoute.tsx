import { useAppSelector } from '../../redux/store/store'
import { Navigate, Outlet } from 'react-router-dom'

function LoginRoute() {
  const user = useAppSelector((state) => state.authSlice.user)

  return (
    <div className={'main'}>
      {user === null || [] ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  )
}

export default LoginRoute
