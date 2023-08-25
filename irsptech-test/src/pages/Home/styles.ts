import styled from 'styled-components'

interface iProps {
	deletedId: boolean
}

export const UsersFlexbox = styled.div`
	max-width: 95vw;
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	margin: 3rem auto;
`

export const UserBox = styled.div<iProps>`
	position: relative;
	background: ${props => props.deletedId ? 'var(--gray-light)' : '' };
	width: 22rem;
	height: 30rem;
	border: 1px solid black;
	padding: 1rem;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
`

export const UserBody = styled.div`
	flex: 1;
`

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-right: 1rem;
	gap: .5rem;
`