import styled from 'styled-components'

interface iProps {
	deletedid: string
}

export const UsersFlexbox = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	gap: 2.5%;
	padding: 3rem 5rem;

	@media (max-width: 568px) {
		padding: 3rem 2rem;
	}
`

export const UserBox = styled.div<iProps>`
	overflow: hidden;
	position: relative;
	font-size: 18px;
	background: ${props => props.deletedid === 'true' ? 'var(--gray-light)' : '' };
	margin-bottom: 2rem;
	width: 23%;
	height: 30rem;
	border: 1px solid black;
	border-radius: 1rem;
	padding-bottom: 1rem;
	display: flex;
	flex-direction: column;

	@media (max-width: 1700px) {
		width: 31.65%;
	}

	@media (max-width: 1256px) {
		width: 48.75%;
	}
	@media (max-width: 768px) {
		width: 100%;
		margin: 0 auto;
		margin-bottom: 2rem;
		height: auto;
	}
`

export const UserTitle = styled.h2`
	font-weight: 700;
	font-size: 26px;
	padding: 1rem;
	background-color: var(--blue);
	color: white;
`

export const UserLabel = styled.span`
	font-weight: 700;
`
export const UserLabelGroup = styled.div`
	margin: 1rem 0;
	display: flex;
	gap: .5rem;
	align-items: center; 
`

export const UserBody = styled.div`
	padding: 1rem;
	flex: 1;
`

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-right: 1rem;
	gap: .5rem;
`

export const SearchDiv = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	margin-top: 1.5rem;
	padding-left: 5rem;
	padding-right: 5rem;
	justify-content: space-between;

	@media (max-width: 568px) {
		padding: 3rem 2rem;
		gap: 1rem;
	}
`