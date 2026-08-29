import {
    FaGraduationCap,
    FaGithub,
    FaLinkedin
} from "react-icons/fa";


function Footer() {

    return (

        <footer className="bg-dark text-white mt-5">

            <div className="container py-5">

                <div className="row">

                    <div className="col-md-5">

                        <h4 className="fw-bold">

                            <FaGraduationCap className="me-2" />

                            CollegeFinder

                        </h4>

                        <p className="text-secondary">

                            Discover colleges, compare courses,
                            explore placements and make better
                            education decisions.

                        </p>

                    </div>


                    <div className="col-md-3">

                        <h6>Explore</h6>

                        <p className="mb-1">
                            Colleges
                        </p>

                        <p className="mb-1">
                            Compare Colleges
                        </p>

                        <p className="mb-1">
                            Reviews
                        </p>

                    </div>


                    <div className="col-md-4">

                        <h6>Connect</h6>

                        <div className="d-flex gap-3 fs-4">

                            <FaGithub />

                            <FaLinkedin />

                        </div>

                    </div>

                </div>

                <hr />

                <p className="text-center text-secondary mb-0">

                    © 2026 CollegeFinder. All rights reserved.

                </p>

            </div>

        </footer>

    );

}


export default Footer;