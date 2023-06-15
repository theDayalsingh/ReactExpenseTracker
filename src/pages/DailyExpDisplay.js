import { useContext } from "react";
import AuthContext from "../Store/storeContext";
import Button from "react-bootstrap/Button";

export default function DailyExpDisplay(props) {
  const authContext = useContext(AuthContext);
  const handleEditExpense = (expItem) => {
    props.onEditExpense(expItem);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {authContext.expItems.map((expItem) => (
          <tr key={expItem.description}>
            <td>{expItem.amount}</td>
            <td>{expItem.description}</td>
            <td>{expItem.category}</td>
            <td>
              <Button
                variant="warning"
                onClick={() => {
                  handleEditExpense(expItem);
                  
                }}
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() => authContext.deleteExpense(expItem.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}