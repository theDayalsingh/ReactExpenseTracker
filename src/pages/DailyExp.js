import React, { useContext, useRef, useState } from "react";

import AuthContext from "../Store/storeContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import DailyExpDisplay from "./DailyExpDisplay";

export default function DailyExp() {
  const { addExpense, updateExpense , editExpense} = useContext(AuthContext);
  const amountSpentRef = useRef(null);
  const descriptionRef = useRef(null);
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedExpense, setSelectedExpense] = useState(null);

  const handleAddExpense = () => {
    const amountSpent = amountSpentRef.current.value;
    const description = descriptionRef.current.value;
    const category = selectedCategory;
  
    if (selectedExpense) {
      const updatedExpense = {
        id: selectedExpense.id,
        amount: amountSpent,
        description: description,
        category: category
      };
      updateExpense(updatedExpense);
      setSelectedExpense(null);
    } else {
      addExpense(amountSpent, description, category);
    }
  
    amountSpentRef.current.value = "";
    descriptionRef.current.value = "";
    setSelectedCategory("Category");
  };
  
  const handleEditExpense = (expItem) => {
    editExpense(expItem.id,expItem.amount, expItem.description, expItem.category );
    setSelectedExpense(expItem);
    amountSpentRef.current.value = expItem.amount;
    descriptionRef.current.value = expItem.description;
    setSelectedCategory(expItem.category);
  }
  
  return (
    <div style={{ padding: "1rem" }}>
      <Form>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Amount Spent"
              className="mb-2"
            >
              <Form.Control
                type="number"
                placeholder="Enter amount in Rs"
                ref={amountSpentRef}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Description"
              className="mb-2"
            >
              <Form.Control
                type="text"
                placeholder="Expenditure Description"
                ref={descriptionRef}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <Dropdown
  onSelect={(eventKey) => setSelectedCategory(eventKey)}
>
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    {selectedCategory ? selectedCategory : "Category"}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
    <Dropdown.Item eventKey="Entertainment">Entertainment</Dropdown.Item>
    <Dropdown.Item eventKey="Groceries">Groceries</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item eventKey="Miscellaneous">Miscellaneous</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
          </Col>
          <Col>
            <Button variant="dark" onClick={handleAddExpense}>Add</Button>
          </Col>
        </Row>
      </Form>
      <DailyExpDisplay onEditExpense={handleEditExpense} />
    </div>
  );
}