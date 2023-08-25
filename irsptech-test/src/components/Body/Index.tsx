/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner } from '@chakra-ui/react'
import * as React from 'react'
import { Container, Div, SpinnerDiv } from './styles'

interface iBodyProps{
  isLoading?: boolean
	children: any
}

export const Body: React.FC<iBodyProps> = ({ isLoading, children }) => {
  return (
    <Container>
			{(isLoading) && (
				<SpinnerDiv>
          <Spinner
            thickness='6px'
            speed='0.72s'
            emptyColor='var(--gray-light)'
            color='var(--blue)'
            height={'18rem'}
            width='18rem'
          />
        </SpinnerDiv>
			)}
			{(!isLoading) && (
				<Div>{children}</Div>
			)}
		</Container>
  )
}