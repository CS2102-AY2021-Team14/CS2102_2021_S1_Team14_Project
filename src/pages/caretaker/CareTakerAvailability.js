import React, { useState, useEffect, useContext } from "react";
import  { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import axios from 'axios';
import { UserContext } from "../../utils/UserProvider";
import YogaPetsLogo from '../../images/logo.png';
import Avatar from '../../components/avatar/Avatar';

const CareTakerAvailability = () => {
    // Caretaker information
  const { username, authToken, roles } = useContext(UserContext); 
  const [caretaker, setCaretaker] = useState({
      user_name: "",
      is_part_time: false,
      introduction: ""
  });

  const [caretakerSalary, setCaretakerSalary] = useState([]);
  const [caretakerJobs, setCaretakerJobs] = useState([]);

  // All the backend URL
  const serverURL = 'http://localhost:8080/api/caretaker/';
  const caretakerURL = serverURL + username;
  const caretakerSalaryURL = caretakerURL + "/salary";
  const caretakerJobsURL = caretakerURL + "/jobs";

  // API call
  useEffect(() => {
      // Getting caretaker data
      axios
          .get(caretakerURL)
          .then((res) => {
              var caretakerData = res.data[0];
              setCaretaker(caretakerData);
              console.log("Content of this caretaker is: " + JSON.stringify(caretakerData));
          });

      // Getting caretaker salary
      axios
          .get(caretakerSalaryURL)
          .then((res) => {
              var caretakerSalaryData = res.data.data;
              setCaretakerSalary(caretakerSalaryData);
              console.log("This caretaker salary data is: " + JSON.stringify(caretakerSalaryData));
          });

      // Get caretaker job
      axios
          .get(caretakerJobsURL)
          .then((res) => {
              var caretakerJobData = res.data.data;
              setCaretakerJobs(caretakerJobData);
              console.log("This caretaker job information is: " + JSON.stringify(caretakerJobData))
          });
  }, [])

  // Find employment
  const findEmployment = () => {
      if (caretakerJobs.length < 1) {
          return "UNEMPLOYED";
      } else {
          return "EMPLOYED";
      }
  }

  const caretakerInfo = {
      username: caretaker.user_name,
      image: YogaPetsLogo,
      job: caretaker.is_part_time ? "Part time" : "Full time",
      join: (new Date(2020, 8, 9).toDateString().split(" ").splice(1).join(" ")),
      employment: findEmployment(),
      salary: caretakerSalary,
      jobs: caretakerJobs,
  }
  
  return (
    <div>
    <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={2} id="sidebar">
            <CaretakerSidebar defaultKey={"Availability"} />
          </Col>
          <Col xs={8} id="page-content">
            SEAN EDIT HERE ADD YOUR STUFF
          </Col>
          <Col xs={2} id="avatar">
            <Avatar user={caretakerInfo} />
          </Col>
        </Row>  
      </Container>
    </div>
  );
}

export default CareTakerAvailability;