import React from "react";
import "./assets/css/page.css";
import { useHistory } from "react-router-dom";
import CustomizedBreadcrumbs from "../component/Breadcrumb";

export default function PageNotFound() {
  const history = useHistory();
  
  return (
    <div class="error">
      <div class="container-floud">
        <div class="col-xs-12 ground-color text-center">
          <div class="container-error-404">
            <div class="clip">
              <div class="shadow">
                <span class="digit thirdDigit">4</span>
              </div>
            </div>
            <div class="clip">
              <div class="shadow">
                <span class="digit secondDigit">0</span>
              </div>
            </div>
            <div class="clip">
              <div class="shadow">
                <span class="digit firstDigit">4</span>
              </div>
            </div>
            <div class="msg">
              OH!<span class="triangle"></span>
            </div>
          </div>
          <h2 class="h1">Sorry! Page not found</h2>
          <CustomizedBreadcrumbs
            name="Page Not Found"
            style={{ margin: "auto", width: "fit-content", padding: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
