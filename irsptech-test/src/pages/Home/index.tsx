import { useEffect, useState } from "react"
import { Body } from "../../components/Body/Index"
import { iUsers } from "../../interfaces"
import { appApi } from "../../services/appApi"
import { UsersFlexbox, UserBox, ButtonDiv, UserBody } from './styles' 
import { Spinner } from '@chakra-ui/react'
import { Button } from "../../components/Button"
import { FaPencilAlt, FaTrash } from "react-icons/fa"

export const Home: React.FC = () => {
	//Funcoes de delete ou post eu to adicionando no array do model pois nao da pra alterar la no link que voces enviaram, apenas simula, no geral eu faco a requisicao novamente de puxar os usuarios apos alterar o array do mesmo no banco

	const [IsLoading, setIsLoading] = useState(false)

	const [Users, setUsers] = useState<iUsers[]>([])
	const [DeletedId, setDeletedId] = useState('')

	function GetUsers(): void {
		appApi.get('users')
			.then(res => setUsers(res.data))
			.catch(err => console.log(err))
	}

	function DeleteUser(userId: string) : void {
		setIsLoading(true)
		setDeletedId(userId)
		appApi.delete(`users/${userId}`)
			.then(() => { setUsers(Users.filter(users => users.id !== userId )); setIsLoading(false); setDeletedId('') })
			.catch(err => { console.log(err); setIsLoading(false); setDeletedId('') })
	}

	useEffect(() => {
		GetUsers()
	}, [])

	return (
		<Body>
			<UsersFlexbox>
				{Users && Users.map(e => {
					return (
						<UserBox deletedId={DeletedId === e.id} key={e.id}>
							<h3>{e.name}</h3>
							<UserBody>
							</UserBody>
							<ButtonDiv>
								<Button VarColor={'orange'}><FaPencilAlt /></Button>
								<Button onClick={() => DeleteUser(e.id)} VarColor={'red'}><FaTrash /></Button>
							</ButtonDiv>
							{IsLoading && DeletedId === e.id && (
								<Spinner
									pos={'absolute'}
									top={'35%'}
									left={'38%'}
									transform={'translate(-50%, -50%)'}
									thickness='6px'
									speed='0.72s'
									emptyColor='white'
									color='var(--blue)'
									height={'5rem'}
									width='5rem'
								/>
							)}
						</UserBox>
					)
				}
				)}
			</UsersFlexbox>
		</Body>
	)
}