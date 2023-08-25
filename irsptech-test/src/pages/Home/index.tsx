import { useEffect, useState } from "react"
import { Body } from "../../components/Body/Index"
import { iUsers } from "../../interfaces"
import { appApi } from "../../services/appApi"
import { UsersFlexbox, UserBox, ButtonDiv, UserBody, UserLabel, UserLabelGroup, UserTitle } from './styles' 
import { Spinner } from '@chakra-ui/react'
import { Button } from "../../components/Button"
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { ModalEditUser } from "../../components/ModalEditUser"
import { UpdateElementByPosition } from "../../Utils/Helper"

export const Home: React.FC = () => {
	//Funcoes de delete ou post eu to adicionando no array do model pois nao da pra alterar la no link que voces enviaram, apenas simula, no geral eu faco a requisicao novamente de puxar os usuarios apos alterar o array do mesmo no banco

	const [IsLoading, setIsLoading] = useState(false)

	const [ModalEditUserIsOpen, setModalEditUserIsOpen] = useState(false)
	const [ActualEditUser, setActualEditUser] = useState<iUsers>()
	const [PositionActualUser, setPositionActualUser] = useState(-1)

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

	function UpdateCreateUser(User: iUsers, Creating: boolean) : void {
		setIsLoading(true)
		if (!Creating) {
			appApi.put(`users/${ActualEditUser?.id}`, User)
			.then(() => { 
					setUsers(UpdateElementByPosition(Users, PositionActualUser, User))
					setIsLoading(false);
				})
			.catch(err => { console.log(err); setIsLoading(false);  })
		} else {
			appApi.post(`users/${ActualEditUser?.id}`, User)
			.then(() => { 
				setUsers([...Users, User])
				setIsLoading(false);
				})
			.catch(err => { console.log(err); setIsLoading(false);  })
		}
	}

	function OnCloseModalEditUser(): void {
		setModalEditUserIsOpen(false)
		setPositionActualUser(-1)
		setActualEditUser(undefined)
	}

	function OnOpenModalEditUser(e: iUsers, i: number, edit?: boolean): void {
		if (edit) {
			setPositionActualUser(i)
		}
		setActualEditUser(e)
	}

	useEffect(() => {
		GetUsers()
	}, [])

	useEffect(() => {
		if (ActualEditUser !== undefined) {
			setModalEditUserIsOpen(true)
		}
	}, [ActualEditUser])

	return (
		<Body>
			{ActualEditUser !== undefined && <ModalEditUser
				isOpen={ModalEditUserIsOpen}
				model={ActualEditUser}
				onConfirm={(e, bool) => UpdateCreateUser(e, bool)}
				onRequestClose={OnCloseModalEditUser}
			/>
			}
			<UsersFlexbox>
				{Users && Users.map((e, i) => {
					return (
						<UserBox deletedId={DeletedId === e.id} key={e.id}>
							<UserTitle>{e.name}</UserTitle>
							<UserBody>
								<UserLabelGroup>
									<UserLabel>Username:</UserLabel>
									<span>{e.username}</span>
								</UserLabelGroup>
								<UserLabelGroup>
									<UserLabel>Email:</UserLabel>
									<span>{e.email}</span>
								</UserLabelGroup>
								<UserLabelGroup>
									<UserLabel>Zipcode:</UserLabel>
									<span>{e.address.zipcode}</span>
								</UserLabelGroup>
								<UserLabelGroup>
									<UserLabel>Address:</UserLabel>
									<span>{e.address.street}, {e.address.suite}</span>
								</UserLabelGroup>
								<UserLabelGroup>
									<UserLabel>Phone:</UserLabel>
									<span>{e.phone}</span>
								</UserLabelGroup>
								<UserLabelGroup>
									<UserLabel>Website:</UserLabel>
									<span>{e.website}</span>
								</UserLabelGroup>
								<UserLabelGroup>
									<UserLabel>Company:</UserLabel>
									<span>{e.company.name}</span>
								</UserLabelGroup>
							</UserBody>
							<ButtonDiv>
								<Button onClick={() => OnOpenModalEditUser(e, i, true)} VarColor={'orange'}><FaPencilAlt /></Button>
								<Button onClick={() => DeleteUser(e.id)} VarColor={'red'}><FaTrash /></Button>
							</ButtonDiv>
							{IsLoading && (DeletedId === e.id) && (
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