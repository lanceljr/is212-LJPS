import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

export default function LearningJourneyDetails() {
  var router = useRouter();
  var learningJourneyId = router.query["learningJourneyID"];

  const [learningJourney, setLearningJourney] = useState({});
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (learningJourneyId) {
      const url = `http://localhost:8080/api/learning-journey/${learningJourneyId}`;
      const axiosFn = axios.get;
      axiosFn(url).then(function (response) {
        if (response.data.success) {
          setLearningJourney(response.data.data);
          setCourses(response.data.data.courses);
          setSkills(response.data.data.skills);
        } else {
        }
      });
    }
  }, [learningJourneyId]);

  return (
    <div classname="container">
      <div className="row py-4">
        <div className="col-md-5 d-flex justify-content-center flex-column">
          <div>
            <h3 className="text-primary">
              {learningJourney.Learning_Journey_Name}
            </h3>
            <h4 className="fw-bold">
              {learningJourney.courses?.length} courses
            </h4>
          </div>
          <div className="row mt-4 ">
            <hr></hr>
            <h5 className="mt-2 mb-4">Selected Skills: </h5>
            <div className="col-12">
              {Object.values(skills).map((skill) => (
                <span className="badge rounded-pill bg-dark py-2 me-2">
                  {" "}
                  {skill.Skill_Name}{" "}
                </span>
              ))}
            </div>
          </div>
        </div>


        <div className="col-md-7 d-flex justify-content-center">
          <Player
            src="https://assets3.lottiefiles.com/packages/lf20_DMgKk1.json"
            className="player"
            autoplay
            loop
            style={{ height: "370px", width: "400px" }}
          ></Player>
        </div>
      </div>


      <h4 className="fw-bold"> Courses </h4>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-6 col-sm-6 col-lg-4 mb-5">
            <div className="card mt-2">
              <div className="card-header bg-primary text-light">
                {" "}
                <b>{course.Course_Name}</b>{" "}
              </div>
              <div className="row pt-3 px-3">
                <div className="col-8">
                  <p>Course ID: {course.Course_ID}</p>
                </div>
                <div className="col-4" align="right">
                  <div className=" badge bg-light text-black">
                    {" "}
                    {course.Course_Category}{" "}
                  </div>
                </div>
              </div>

              <div classname="px-3">
                {course.skills.map((skill) => (
                  <span
                    className="badge rounded-pill bg-dark py-1 me-2"
                    style={{ fontSize: "11px" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="row mx-1">
                <div className="col-12">
                  {" "}
                  <p>{course.Course_Desc}</p>{" "}
                </div>
              </div>

              <div className="d-flex justify-content-end m-2">
                <button type="button" className="btn btn-outline-primary">
                  Delete <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}