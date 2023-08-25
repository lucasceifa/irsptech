import { useEffect, useState } from "react"
import { Body } from "../../components/Body/Index"
import { iUsers } from "../../interfaces"
import { appApi } from "../../services/appApi"
import { UsersFlexbox, UserBox } from './styles' 

export const Home: React.FC = () => {

	const [Users, setUsers] = useState<iUsers[]>()

	function GetUsers(): void {
		appApi.get('users')
			.then(res => setUsers(res.data))
			.catch(err => console.log(err))
	}

	useEffect(() => {
		GetUsers()
	}, [])

	return (
		<Body>
			<UsersFlexbox>
				{Users && Users.map(e => {
					return (
						<UserBox key={e.id} onClick={() => { appApi.delete(`users/${e.id}`).then(() => setUsers(Users.filter(users => users.id !== e.id ))).catch(err => console.log(err)) }}>
							{e.name}
						</UserBox>
					)
				}
				)}
			</UsersFlexbox>
		</Body>
	)
}