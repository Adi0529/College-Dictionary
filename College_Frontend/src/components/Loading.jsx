function Loading() {

    return (

        <div className="text-center py-5">

            <div
                className="spinner-border text-primary"
                style={{
                    width: "3rem",
                    height: "3rem"
                }}
            />

            <p className="mt-3 text-muted">
                Loading...
            </p>

        </div>

    );

}


export default Loading;