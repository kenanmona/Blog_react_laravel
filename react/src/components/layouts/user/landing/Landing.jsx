import React from "react";
import { useQuery } from "react-query";
import { request } from "../../../../services/utils/axios-utils";
import LandingPart from "../landingpart/LandingPart";
import "./landing.scss";
import Fade from "react-reveal/Fade";

const Landing = () => {
  const { data } = useQuery(
    "landing",
    async () => {
      return await request({ url: "/latest/article/show" });
    },
    {
      staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return (
    <div className="landing">
      <ul className="container flex-landing">
        <Fade left>
          <li className="left-side">
            <LandingPart data={data?.data?.data[0]} />
          </li>
        </Fade>

        <li className="right-side">
          <Fade top>
            <div className="top-side">
              <LandingPart data={data?.data?.data[1]} />
            </div>
          </Fade>

          <Fade right>
            <div className="bottom-side">
              <div className="left-bottom-side">
                <LandingPart data={data?.data?.data[2]} />
              </div>

              <div className="right-bottom-side">
                <LandingPart data={data?.data?.data[3]} />
              </div>
            </div>
          </Fade>
        </li>
      </ul>
    </div>
  );
};

export default Landing;
