import styled from 'styled-components'

export const FormRegister = styled.div`
	width: 46rem;
	padding: 2rem 3rem;
	border: 1px solid var(--blue);
	border-radius: 1rem;
	margin: 5rem auto;

	@media (max-width: 768px) {
		width: 42rem;
	}
	@media (max-width: 568px) {
		width: 22rem;
		padding: 2rem 1rem;
	}
`

export const FormTitle = styled.h1`
	font-size: 22px;
	font-weight: 700;
	text-align: center;
	margin-bottom: 1rem;
	color: var(--blue);
`