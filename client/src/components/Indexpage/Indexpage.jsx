import { Button, Col ,Row} from "react-bootstrap";
import "./indexpage.css";
import { FaLocationArrow } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { AiOutlineUser ,AiOutlineSearch} from "react-icons/ai";
import Cards from "./Cards";

const Indexpage = () => {
  
  return (
    <div>
      <section className="d-flex align-items-center hero">
        <div className="container mb-5">
          <h1 className="display-3">
            Dream, Relax,
            <br />
            Discover
          </h1>
          <h4 className="mb-5 caption">Find and book a great experience!</h4>
          <Button className="btn" href="#cards">
          <AiOutlineSearch className="mb-1" size="33px"/>Start your search</Button>
        </div>
      </section>
      <div className="container">
        <div className="mt-5">
          <Row className="content d-flex align-items-center justify-content-center">
            <Col className=" location-box " xm={3}>
              <h6 className="p-4">
                <span className="p-2">
                  <FaLocationArrow />
                </span>
                Location
              </h6>
              <h6>where are you going?</h6>
              
            </Col>
            <Col className=" location-box " xm={3}>
              <h6 className="p-4">
                <span className="p-2">
                <BsFillCalendarDateFill />
                </span>
                Checkin
              </h6>
              <h6>Add date</h6>
              
            </Col>
            <Col className=" location-box " xm={3}>
              <h6 className="p-4">
                <span className="p-2">
                <BsFillCalendarDateFill />
                </span>
                Checkout
              </h6>
              <h6>Add date</h6>
              
            </Col>
            <Col className=" location-box " xm={3}>
              <h6 className="p-4">
                <span className="p-2">
                <AiOutlineUser />
                </span>
                Travellers
              </h6>
              <h6>Add guest</h6>
              
            </Col>
          </Row>
          
        </div>
      </div>

      <div id="cards">
      <Cards />
      </div>
    </div>
  );
};

export default Indexpage;
