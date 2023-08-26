import { Flex, FormControl, FormLabel } from "@chakra-ui/react"
import { useState } from "react"
import { iUsers } from "../../interfaces"
import {v4 as uuidv4} from 'uuid';
import { FormRegister, FormTitle } from "./styles";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router";
import { appApi } from "../../services/appApi";

/* eslint-disable no-mixed-spaces-and-tabs */
export const Register: React.FC = () => {
	const myuuid = uuidv4()
	const nav = useNavigate()

	const [Model, setModel] = useState<iUsers>({ address: { city: '', geo: { lat: '', lng: '' }, street: '', suite: '', zipcode: '' }, company: { bs: '', catchPhrase: '', name: '' }, email: '', id: myuuid.toString(), name: '', phone: '', username: '', website: ''  })

	function Register(e: iUsers) {
		appApi.post('/Users', e)
			.then(res => console.log(res.data))
			.catch(err => console.log(err))
	}

  return (
		<FormRegister>
			<FormTitle>Register your new user</FormTitle>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Name</FormLabel>
							<input value={Model.name} onChange={(e) => setModel({ ...Model, name: e.target.value })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
					</FormControl>
			</Flex>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Username</FormLabel>
							<input value={Model.username} onChange={(e) => setModel({ ...Model, username: e.target.value })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
					</FormControl>
			</Flex>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Email</FormLabel>
							<input value={Model.email} onChange={(e) => setModel({ ...Model, email: e.target.value })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
					</FormControl>
			</Flex>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Zipcode</FormLabel>
							<input value={Model.address.zipcode} onChange={(e) => setModel({ ...Model, address: { ...Model.address, zipcode: e.target.value } })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
					</FormControl>
			</Flex>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Street</FormLabel>
							<Flex alignItems={'center'} gap={'1rem'}>
									<input value={Model.address.street} onChange={(e) => setModel({ ...Model, address: { ...Model.address, street: e.target.value } })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
							</Flex>
					</FormControl>
			</Flex>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Suite</FormLabel>
							<input value={Model.address.suite} onChange={(e) => setModel({ ...Model, address: { ...Model.address, suite: e.target.value } })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
					</FormControl>
			</Flex>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Phone</FormLabel>
							<input value={Model.phone} onChange={(e) => setModel({ ...Model, phone: e.target.value })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
					</FormControl>
			</Flex>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Website</FormLabel>
							<input value={Model.website} onChange={(e) => setModel({ ...Model, website: e.target.value })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
					</FormControl>
			</Flex>
			<Flex mb={'1rem'}>
					<FormControl>
							<FormLabel fontWeight={'700'}>Company</FormLabel>
							<input value={Model.company.name} onChange={(e) => setModel({ ...Model, company: { ...Model.company, name: e.target.value } })} style={{ width: '100%', padding: '.25rem 1rem',fontWeight: '500', fontSize: '20px', border: '1px solid #00000050', borderRadius: '.5rem', outline: 'none' }}/>
					</FormControl>
			</Flex>
			<Flex justifyContent={'flex-end'} gap={'1rem'} my={'1rem'}>
          <Button bgColor='var(--gray-light)' size='md' onClick={() => nav('/')}>Return</Button>
          <Button bgColor='var(--blue)' size='md' onClick={() => { Register(Model) }}>Register</Button>
      </Flex>
		</FormRegister>
		)
}