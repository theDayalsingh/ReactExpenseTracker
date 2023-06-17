import Button from "react-bootstrap/Button";

export default function Welcome() {
  const img="https://cdn.pixabay.com/photo/2015/03/23/15/59/the-background-686237_640.jpg"
  return (
    <>
    <section style={{ height:640,backgroundImage:`url(${img})`}}>
    <div className="text-center fw-bold fs-1 p-5 border-white border-5 rounded-4 text-white">
    <div className="fs-1 my-5 text-danger ">REACT EXPENSE </div>
    <div className="my-5 fs-2 text-secondary">Keep track of your expenses and save money with expense tracker app.</div>
    <a href="/dailyexp"><Button variant="info" className="border border-3 fw-bold text-danger border-primary rounded-4 px-5" size="lg">Get Started </Button>
    </a>
    </div>
    </section>
    
    </>
  );
}
