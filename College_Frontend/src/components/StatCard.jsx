const StatCard = ({
    title,
    value,
    icon,
    bg,
    text,
    loading = false
}) => {

    return (

        <div className="col-xl-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <p className="text-muted mb-2">
                                {title}
                            </p>

                            <h2 className="fw-bold mb-0">

                                {loading ? (

                                    <span className="spinner-border spinner-border-sm" />

                                ) : (

                                    value

                                )}

                            </h2>

                        </div>

                        <div className={`${bg} ${text} rounded p-3`}>

                            {icon}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default StatCard;