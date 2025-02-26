import { Global } from "@emotion/react"
import { global } from "./styles/global"
import MainLayout from "./components/common/MainLayout/MainLayout"
import MainContainer from "./components/common/MainContainer/MainContainer"
import MainSidebar from "./components/common/MainSidebar/MainSidebar"
import LoginPage from "./pages/LoginPage/LoginPage"
import { Route, Routes } from "react-router-dom"
import JoinPage from "./pages/JoinPage/JoinPage"
import { useUserMeQuery } from "./queries/userQuery"
import AccountPage from "./pages/AccountPage/AccountPage"

function App() {

	const loginUser = useUserMeQuery();

	return (
    	<>
			<Global styles={global} />
			<MainLayout>
				<MainSidebar />
				<MainContainer>
					<Routes>
						<Route path="/account/setting" element={<AccountPage />} />
						<Route path="/auth/login" element={<LoginPage />} />
						<Route path="/auth/join" element={<JoinPage />} />
					</Routes>
				</MainContainer>
			</MainLayout>
			
    	</>
  	)
}

export default App