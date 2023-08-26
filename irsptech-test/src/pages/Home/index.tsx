import { useEffect, useState } from "react"
import { Body } from "../../components/Body/Index"
import { iUsers } from "../../interfaces"
import { appApi } from "../../services/appApi"
import { UsersFlexbox, UserBox, ButtonDiv, UserBody, UserLabel, UserLabelGroup, UserTitle, SearchDiv } from './styles' 
import { Spinner, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Button } from "../../components/Button"
import { FaPencilAlt, FaTrash, FaSearch, FaPlus } from "react-icons/fa"
import { ModalEditUser } from "../../components/ModalEditUser"
import { UpdateElementByPosition } from "../../Utils/Helper"
import { useNavigate } from "react-router"

export const Home: React.FC = () => {
	//Funcoes de delete ou post eu to adicionando no array do model pois nao da pra alterar la no link que voces enviaram, apenas simula, no geral eu faco a requisicao novamente de puxar os usuarios apos alterar o array do mesmo no banco
	const nav = useNavigate()

	const [IsLoading, setIsLoading] = useState(false)

	const [ModalEditUserIsOpen, setModalEditUserIsOpen] = useState(false)
	const [ActualEditUser, setActualEditUser] = useState<iUsers>()
	const [PositionActualUser, setPositionActualUser] = useState(-1)

	const [Users, setUsers] = useState<iUsers[]>([])
	const [DeletedId, setDeletedId] = useState('')

	const [Search, setSearch] = useState('')

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

	function UpdateCreateUser(User: iUsers) : void {
		setIsLoading(true)
		appApi.put(`users/${ActualEditUser?.id}`, User)
		.then(() => { 
				setUsers(UpdateElementByPosition(Users, PositionActualUser, User))
				setIsLoading(false);
			})
		.catch(err => { console.log(err); setIsLoading(false);  })
	}

	function OnCloseModalEditUser(): void {
		setModalEditUserIsOpen(false)
		setPositionActualUser(-1)
		setActualEditUser(undefined)
	}

	function OnOpenModalEditUser(e: iUsers, i: number): void {
		setPositionActualUser(i)
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
				onConfirm={(e) => UpdateCreateUser(e)}
				onRequestClose={OnCloseModalEditUser}
			/>
			}
			<div style={{ maxWidth: '1980px', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '0 auto' }}>
				<SearchDiv>
					{window.innerWidth > 768 && <Button fontSize={'20px'} paddingX={'1.5rem'} VarColor={'blue'} onClick={() => nav('/Register')} leftIcon={<FaPlus />}>Register a new User</Button>}
					{window.innerWidth <= 768 && <Button fontSize={'20px'} VarColor={'blue'} onClick={() => nav('/Register')}><FaPlus /></Button>}
					<InputGroup width={'25rem'} borderRadius={'.5rem'} h={'2.5rem'}>
						<InputLeftElement bgColor='white' color='gray.300' borderLeft={'1px'} borderTop={'1px'} borderBottom={'1px'}
								borderRadius='sm' borderColor={'#00000050'}
								pointerEvents='none'
								children={<FaSearch size={'.8rem'} color={'#00000050'} />}
								/>
						<input style={{ width: '100%', padding: '.25rem 1rem', paddingLeft: '3rem',fontWeight: '500', fontSize: '20px', color: 'var(--black)', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none', background: 'white' }} type='tel' placeholder='Search' value={Search} onChange={(e) => setSearch(e.target.value)} />
					</InputGroup>
				</SearchDiv>
				<UsersFlexbox>
					{Users && Users.filter((e) => { if (Search !== '') { return e.name.toLowerCase().includes(Search.toLowerCase()) ? e : false } else { return e } }).map((e, i) => {
						return (
							<UserBox deletedid={DeletedId === e.id ? 'true' : ''} key={e.id}>
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
									<Button onClick={() => OnOpenModalEditUser(e, i)} VarColor={'orange'}><FaPencilAlt /></Button>
									<Button onClick={() => DeleteUser(e.id)} VarColor={'red'}><FaTrash /></Button>
								</ButtonDiv>
								{IsLoading && (DeletedId === e.id) && (
									<Spinner
										pos={'absolute'}
										top={'45%'}
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
			</div>
		</Body>
	)
}