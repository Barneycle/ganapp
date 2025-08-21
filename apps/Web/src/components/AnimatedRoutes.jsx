import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./sections/Home";
import { Admin } from "./sections/Admin";
import { Organizer } from "./sections/Organizer";
import { Participants } from "./sections/Participants";
import { Login } from "./sections/Login";
import { CreateEvent } from "./sections/CreateEvent";
import { CreateSurvey } from "./sections/CreateSurvey";
import { SurveyAnalytics } from "./sections/SurveyAnalytics";
import Registration from "./sections/Registration";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/survey-analytics" element={<SurveyAnalytics />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default AnimatedRoutes;
