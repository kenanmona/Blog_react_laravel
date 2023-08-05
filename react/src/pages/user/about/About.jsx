import React, { useEffect, useState } from "react";
import NavBar from "../../../components/layouts/user/navbar/NavBar";
import Footer from "../../../components/layouts/user/footer/Footer";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./about.scss";
import { Link } from "react-router-dom";
import { checkLogUser } from "../../../store/user/checkUserSlice";
import { useDispatch } from "react-redux";
import Loader from "../../../components/loader/Loader";
const About = () => {
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();
    const devs = [
        {
            id: 1,
            name: "Kenan Mona",
            social: {
                linkedin: "https://www.linkedin.com/in/kenanmona/",
                github: "https://github.com/kenanmona",
            },
            field: "Full Stack Developer",
            img: "../../../image/services.jpg",
            summary:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        },
        {
            id: 2,
            name: "Hasan Khalil",
            social: {
                linkedin: "https://www.linkedin.com/in/kenanmona/",
                github: "https://github.com/kenanmona",
            },
            field: "Front End Developer",
            img: "../../../image/services.jpg",
            summary:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        },
    ];

    useEffect(() => {
        dispatch(checkLogUser());
        const clearTime = setTimeout(() => {
            setLoader((prev) => {
                return false;
            });
        }, 1000);
        return () => {
            clearTimeout(clearTime);
        };
    });

    if (loader) {
        return <Loader />;
    }

    return (
        <>
            <title>KGS | About</title>
            <NavBar />
            <div className={`about`}>
                <div className="container">
                    {devs.map((dev) => {
                        return (
                            <div className="about-person" key={dev.id}>
                                <div className="social-media">
                                    {/* <Link
                    to={dev.social.linkedin}
                    className="social-icon"
                    target="_blank"
                  > */}
                                    <LinkedInIcon />
                                    {/* </Link> */}
                                    {/* <Link
                    to={dev.social.github}
                    className="social-icon"
                    target="_blank"
                  > */}
                                    <GitHubIcon />
                                    {/* </Link> */}
                                </div>
                                <div className="img-box">
                                    <img
                                        src={dev.img}
                                        alt=""
                                        className="img-person"
                                    />
                                </div>
                                <div className="about-me">
                                    <h2 className="name-person">{dev.name}</h2>
                                    <div className="field-person">
                                        {dev.field}
                                    </div>
                                    <p className="summary">{dev.summary}</p>
                                    <a
                                        href="../../../image/services.jpg"
                                        className="download-cv"
                                        download
                                    >
                                        Download CV
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
