import React from "react";
import "./assets/css/page.css";
import { useHistory } from "react-router-dom";
import CustomizedBreadcrumbs from "../component/Breadcrumb";

export default function PageNotFound() {
  const history = useHistory();
  
  return (
    <div className="error">
      <div className="container-floud">
        <div className="col-xs-12 ground-color text-center">
          <div className="container-error-404">
            <div className="clip">
              <div className="shadow">
                <span className="digit thirdDigit">4</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit secondDigit">0</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit firstDigit">4</span>
              </div>
            </div>
            <div className="msg">
              OH!<span className="triangle"></span>
            </div>
          </div>
          <h2 className="h1">Sorry! Page not found</h2>
          <CustomizedBreadcrumbs
            name="Page Not Found"
            style={{ margin: "auto", width: "fit-content", padding: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
