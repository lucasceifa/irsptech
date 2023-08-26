/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, FormControl, FormLabel, Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { iUsers } from '../../interfaces'
import {v4 as uuidv4} from 'uuid';
import { Button } from '../Button'

interface props {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: (model: iUsers) => void
  model?: iUsers
}

export const ModalEditUser: React.FC<props> = ({ isOpen, onRequestClose, onConfirm, model }) => {
  const myuuid = uuidv4()
  const [Model, setModel] = useState<iUsers>(model ?? { address: { city: '', geo: { lat: '', lng: '' }, street: '', suite: '', zipcode: '' }, company: { bs: '', catchPhrase: '', name: '' }, email: '', id: myuuid.toString(), name: '', phone: '', username: '', website: ''  })

  return (
        <Modal
            isOpen={isOpen}
            onClose={onRequestClose}
        >
            <ModalOverlay />
            <ModalContent w={'26rem'}>
                <Flex justifyContent={'space-between'} pt={'1rem'} px={'1.5rem'} alignItems={'center'}>
                    <Text color={'var(--label-dark)'} fontWeight={'700'} fontSize={'22px'}>Update this user infos</Text>
                    <MdClose cursor={'pointer'} color='var(--blue)' size={24} onClick={onRequestClose} />
                </Flex>
                <ModalBody>
                <Flex flexDir={'column'}>
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
                        <Button bgColor='var(--gray-light)' size='md' onClick={onRequestClose}>Cancel</Button>
                        <Button bgColor='var(--blue)' size='md' onClick={() => { onConfirm(Model); onRequestClose() }}>Update</Button>
                    </Flex>
                </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
  )
}
