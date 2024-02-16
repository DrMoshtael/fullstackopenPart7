import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`
export const Page = styled.div`
  padding: 1em;
  background: floralwhite;
  margin: 20px;
`

export const NavStyle = styled.nav`
  background-color: aliceblue;
  color: #darkslateblue;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`

export const List = styled.ul`
    list-style: none;
    padding: 0;
    background-color: honeydew;
`

export const ListItem = styled.li`
    padding: 10px;
    color: indigo;
`

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`

export const Form = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const FormGroup = styled.div`
  margin-bottom: 10px;
`

export const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`

export const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.th`
  background-color: #333;
  color: #fff;
  padding: 10px;
`

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align:center;
`