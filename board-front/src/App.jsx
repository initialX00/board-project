import { Global } from "@emotion/react"
import { global } from "./styles/global"
import MainLayout from "./components/common/MainLayout/MainLayout"
import { Route, Routes } from "react-router-dom"
import AuthRoute from "./routes/AuthRoute/AuthRoute"
import MainRoute from "./routes/MainRoute/MainRoute"
import { useUserMeQuery } from "./queries/userQuery"

function App() {
	
	useUserMeQuery(); //최초의 한번 캐싱처리
	//pending은 요청처리 중
	
	return (
    	<>
			<Global styles={global} />
			<MainLayout>
				<Routes>
					<Route path="/auth/*" element={<AuthRoute />} />
					<Route path="/*" element={<MainRoute />} /> 
				</Routes>
			</MainLayout>
    	</>
  	) //경로는 조건식이라 생각하고 큰 범주는 항상 뒤에
}

export default App